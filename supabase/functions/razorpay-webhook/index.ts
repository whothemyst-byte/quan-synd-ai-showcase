import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type, x-razorpay-signature",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function getEnv(name: string): string {
  const value = Deno.env.get(name);
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

async function hmacSha256Hex(secret: string, payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return [...new Uint8Array(signatureBuffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  try {
    const supabaseUrl = getEnv("SUPABASE_URL");
    const supabaseServiceRoleKey = getEnv("SUPABASE_SERVICE_ROLE_KEY");
    const webhookSecret = getEnv("RAZORPAY_WEBHOOK_SECRET");
    const adminClient = createClient(supabaseUrl, supabaseServiceRoleKey);

    const rawBody = await req.text();
    const receivedSignature = req.headers.get("x-razorpay-signature");
    if (!receivedSignature) {
      return jsonResponse(401, { error: "Missing x-razorpay-signature header" });
    }

    const expectedSignature = await hmacSha256Hex(webhookSecret, rawBody);
    if (!timingSafeEqual(expectedSignature, receivedSignature)) {
      return jsonResponse(401, { error: "Invalid webhook signature" });
    }

    const event = JSON.parse(rawBody) as {
      event?: string;
      payload?: {
        payment?: { entity?: Record<string, unknown> };
      };
    };

    const eventType = event.event ?? "";
    const payment = event.payload?.payment?.entity;
    if (!payment) {
      return jsonResponse(200, { ok: true, ignored: true });
    }

    const paymentId = String(payment.id ?? "");
    const orderId = String(payment.order_id ?? "");
    if (!paymentId || !orderId) {
      return jsonResponse(200, { ok: true, ignored: true });
    }

    const statusMap: Record<string, string> = {
      "payment.captured": "paid",
      "payment.authorized": "authorized",
      "payment.failed": "failed",
      "refund.processed": "refunded",
    };

    const mappedStatus = statusMap[eventType] ?? String(payment.status ?? "created");

    const { data: existingAttempt } = await adminClient
      .from("payment_attempts")
      .select("id,user_id,plan_id,plan_tier,billing_interval")
      .or(`provider_payment_id.eq.${paymentId},provider_order_id.eq.${orderId}`)
      .maybeSingle();

    if (existingAttempt?.id) {
      await adminClient
        .from("payment_attempts")
        .update({
          provider_payment_id: paymentId,
          status: mappedStatus,
          payment_method: typeof payment.method === "string" ? payment.method : null,
          metadata: event,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingAttempt.id);
    } else {
      const notes = (payment.notes ?? {}) as Record<string, unknown>;
      const planTier = typeof notes.plan_tier === "string" ? notes.plan_tier : null;
      const billingInterval = typeof notes.billing_interval === "string" ? notes.billing_interval : null;
      const planId = typeof notes.plan_id === "string" ? notes.plan_id : null;
      const userId = typeof notes.user_id === "string" ? notes.user_id : null;

      if (planTier && billingInterval && planId && userId) {
        await adminClient.from("payment_attempts").insert({
          user_id: userId,
          plan_tier: planTier,
          billing_interval: billingInterval,
          plan_id: planId,
          amount_cents: typeof payment.amount === "number" ? payment.amount : 0,
          currency: typeof payment.currency === "string" ? payment.currency : "INR",
          provider: "razorpay",
          provider_order_id: orderId,
          provider_payment_id: paymentId,
          status: mappedStatus,
          payment_method: typeof payment.method === "string" ? payment.method : null,
          metadata: event,
        });
      }
    }

    const { data: attemptForFinalize } = await adminClient
      .from("payment_attempts")
      .select("id,user_id,plan_tier,billing_interval,plan_id,invoice_id")
      .or(`provider_payment_id.eq.${paymentId},provider_order_id.eq.${orderId}`)
      .maybeSingle();

    if (
      attemptForFinalize &&
      !attemptForFinalize.invoice_id &&
      (mappedStatus === "paid" || mappedStatus === "authorized")
    ) {
      const { data: invoice } = await adminClient.rpc("complete_subscription_checkout", {
        p_plan_id: String(attemptForFinalize.plan_id),
        p_billing_interval: String(attemptForFinalize.billing_interval),
        p_provider_ref: paymentId,
        p_payment_method: typeof payment.method === "string" ? payment.method : "Razorpay",
        p_receipt_url: `https://dashboard.razorpay.com/app/payments/${paymentId}`,
        p_provider: "razorpay",
        p_user_id_override: String(attemptForFinalize.user_id),
      });

      const invoiceId = (invoice as { id?: string } | null)?.id ?? null;
      if (invoiceId) {
        await adminClient
          .from("payment_attempts")
          .update({
            invoice_id: invoiceId,
            status: "paid",
            updated_at: new Date().toISOString(),
          })
          .eq("id", attemptForFinalize.id);
      }
    }

    return jsonResponse(200, { ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return jsonResponse(500, { error: message });
  }
});

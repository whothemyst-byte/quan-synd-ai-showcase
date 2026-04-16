import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type VerifyPayload = {
  planTier?: "flux" | "forge";
  billingInterval?: "monthly" | "annual";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
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

function isValidTier(value: string): value is "flux" | "forge" {
  return value === "flux" || value === "forge";
}

function isValidInterval(value: string): value is "monthly" | "annual" {
  return value === "monthly" || value === "annual";
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
    const supabaseAnonKey = getEnv("SUPABASE_ANON_KEY");
    const supabaseServiceRoleKey = getEnv("SUPABASE_SERVICE_ROLE_KEY");
    const razorpayKeyId = getEnv("RAZORPAY_KEY_ID");
    const razorpayKeySecret = getEnv("RAZORPAY_KEY_SECRET");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return jsonResponse(401, { error: "Missing Authorization header" });
    }

    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const adminClient = createClient(supabaseUrl, supabaseServiceRoleKey);

    const {
      data: { user },
      error: userError,
    } = await userClient.auth.getUser();

    if (userError || !user) {
      return jsonResponse(401, { error: "Authentication required" });
    }

    const body = (await req.json()) as VerifyPayload;
    const {
      planTier,
      billingInterval,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = body;

    if (
      !planTier ||
      !billingInterval ||
      !razorpayOrderId ||
      !razorpayPaymentId ||
      !razorpaySignature ||
      !isValidTier(planTier) ||
      !isValidInterval(billingInterval)
    ) {
      return jsonResponse(400, { error: "Invalid verification payload" });
    }

    const expectedSignature = await hmacSha256Hex(
      razorpayKeySecret,
      `${razorpayOrderId}|${razorpayPaymentId}`,
    );
    if (!timingSafeEqual(expectedSignature, razorpaySignature)) {
      await adminClient
        .from("payment_attempts")
        .update({
          status: "failed",
          error_code: "signature_mismatch",
          error_description: "Razorpay signature validation failed",
          provider_signature: razorpaySignature,
          updated_at: new Date().toISOString(),
        })
        .eq("provider_order_id", razorpayOrderId)
        .eq("user_id", user.id);
      return jsonResponse(400, { error: "Signature verification failed" });
    }

    const basicAuth = btoa(`${razorpayKeyId}:${razorpayKeySecret}`);
    const paymentResponse = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(razorpayPaymentId)}`, {
      headers: { Authorization: `Basic ${basicAuth}` },
    });
    const paymentJson = await paymentResponse.json();

    if (!paymentResponse.ok || !paymentJson?.id) {
      return jsonResponse(502, { error: "Unable to fetch payment details from Razorpay" });
    }

    if (String(paymentJson.order_id) !== razorpayOrderId) {
      return jsonResponse(400, { error: "Payment does not belong to provided order" });
    }

    const paymentStatus = String(paymentJson.status || "");
    if (paymentStatus !== "captured" && paymentStatus !== "authorized") {
      return jsonResponse(400, { error: `Payment not successful: ${paymentStatus}` });
    }

    const { data: existingInvoice } = await adminClient
      .from("billing_invoices")
      .select("id,amount,currency,plan_tier,billing_interval")
      .eq("provider", "razorpay")
      .eq("provider_ref", razorpayPaymentId)
      .maybeSingle();

    let invoiceId: string | null = existingInvoice?.id ?? null;

    if (!invoiceId) {
      const { data: invoice, error: checkoutError } = await userClient.rpc("complete_subscription_checkout", {
        p_plan_id: `${planTier}_${billingInterval}`,
        p_billing_interval: billingInterval,
        p_provider_ref: razorpayPaymentId,
        p_payment_method: String(paymentJson.method ?? "Razorpay"),
        p_receipt_url: `https://dashboard.razorpay.com/app/payments/${razorpayPaymentId}`,
        p_provider: "razorpay",
      });

      if (checkoutError || !invoice) {
        return jsonResponse(500, { error: "Failed to finalize subscription checkout" });
      }

      invoiceId = String((invoice as { id: string }).id);
    }

    await adminClient.from("payment_attempts").upsert(
      {
        user_id: user.id,
        plan_tier: planTier,
        billing_interval: billingInterval,
        plan_id: `${planTier}_${billingInterval}`,
        amount_cents: Number(paymentJson.amount),
        currency: String(paymentJson.currency || "INR").toUpperCase(),
        provider: "razorpay",
        provider_order_id: razorpayOrderId,
        provider_payment_id: razorpayPaymentId,
        provider_signature: razorpaySignature,
        status: "paid",
        payment_method: String(paymentJson.method ?? "Razorpay"),
        receipt_url: `https://dashboard.razorpay.com/app/payments/${razorpayPaymentId}`,
        invoice_id: invoiceId,
        metadata: paymentJson,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "provider_payment_id" },
    );

    return jsonResponse(200, {
      ok: true,
      paymentId: razorpayPaymentId,
      orderId: razorpayOrderId,
      invoiceId,
      amount: Number(paymentJson.amount) / 100,
      currency: String(paymentJson.currency || "INR").toUpperCase(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return jsonResponse(500, { error: message });
  }
});

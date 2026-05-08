import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type CreateOrderPayload = {
  planTier?: "spark" | "flux" | "forge";
  billingInterval?: "monthly" | "annual";
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

function parseBody(input: CreateOrderPayload) {
  const planTier = input.planTier;
  const billingInterval = input.billingInterval;

  if (!planTier || !["spark", "flux", "forge"].includes(planTier)) {
    throw new Error("Invalid plan tier");
  }

  if (!billingInterval || !["monthly", "annual"].includes(billingInterval)) {
    throw new Error("Invalid billing interval");
  }

  return { planTier, billingInterval, planId: `${planTier}_${billingInterval}` };
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

    const body = (await req.json()) as CreateOrderPayload;
    const { planTier, billingInterval, planId } = parseBody(body);

    const { data: plan, error: planError } = await adminClient
      .from("plans")
      .select("id,tier,interval,price_cents,currency")
      .eq("id", planId)
      .eq("interval", billingInterval)
      .maybeSingle();

    if (planError || !plan) {
      return jsonResponse(400, { error: "Invalid plan configuration" });
    }

    if (Number(plan.price_cents) <= 0) {
      return jsonResponse(400, { error: "This plan does not require payment" });
    }

    const receipt = `qs_${user.id.slice(0, 8)}_${Date.now()}`;
    const basicAuth = btoa(`${razorpayKeyId}:${razorpayKeySecret}`);

    const orderResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Number(plan.price_cents),
        currency: String(plan.currency).toUpperCase(),
        receipt,
        notes: {
          user_id: user.id,
          plan_id: planId,
          plan_tier: planTier,
          billing_interval: billingInterval,
        },
      }),
    });

    const orderJson = await orderResponse.json();
    if (!orderResponse.ok || !orderJson?.id) {
      const message = typeof orderJson?.error?.description === "string"
        ? orderJson.error.description
        : "Failed to create Razorpay order";
      return jsonResponse(502, { error: message });
    }

    const { error: insertError } = await adminClient.from("payment_attempts").insert({
      user_id: user.id,
      plan_tier: planTier,
      billing_interval: billingInterval,
      plan_id: planId,
      amount_cents: Number(plan.price_cents),
      currency: String(plan.currency).toUpperCase(),
      provider: "razorpay",
      provider_order_id: String(orderJson.id),
      status: "created",
      metadata: orderJson,
    });

    if (insertError) {
      return jsonResponse(500, { error: "Failed to persist payment attempt" });
    }

    return jsonResponse(200, {
      keyId: razorpayKeyId,
      orderId: String(orderJson.id),
      amountCents: Number(orderJson.amount),
      currency: String(orderJson.currency),
      planTier,
      billingInterval,
      planId,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return jsonResponse(500, { error: message });
  }
});

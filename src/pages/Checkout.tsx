import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { completeBillingCheckout } from "@/components/dashboard/dashboardSupabase";

type RazorpaySuccessResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOrderResult = {
  keyId: string;
  orderId: string;
  amountCents: number;
  currency: string;
  planTier: "spark" | "flux" | "forge";
  billingInterval: "monthly" | "annual";
};

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, callback: (response: unknown) => void) => void;
    };
  }
}

const RAZORPAY_SCRIPT_ID = "razorpay-checkout-sdk";

function loadRazorpayScript(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();
  const existing = document.getElementById(RAZORPAY_SCRIPT_ID);
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Failed to load Razorpay SDK")), { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = RAZORPAY_SCRIPT_ID;
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
    document.body.appendChild(script);
  });
}

export default function Checkout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const planId = searchParams.get("plan") || "forge";
  const interval = searchParams.get("interval") || "monthly";
  const planName = useMemo(() => {
    if (planId === "spark") return "Vibe ADE Spark";
    if (planId === "flux") return "Vibe ADE Flux";
    return "Vibe ADE Forge";
  }, [planId]);
  const amount = useMemo(() => {
    if (planId === "spark") return 0;
    return 1;
  }, [planId]);
  const formatInr = (value: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value);

  useEffect(() => {
    void loadRazorpayScript().catch(() => {
      toast.error("Unable to load Razorpay checkout.");
    });
  }, []);

  const handleSparkPlan = async () => {
    const billingInvoice = await completeBillingCheckout({
      planTier: "spark",
      billingInterval: interval === "annual" ? "annual" : "monthly",
      providerRef: null,
      paymentMethod: "Free",
      provider: "razorpay",
    });
    navigate(
      `/payment-success?plan=${planId}&interval=${interval}&amount=${(billingInvoice?.amount ?? amount).toFixed(2)}`,
    );
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const accessToken = session?.access_token;
      if (!accessToken) {
        throw new Error("Your session expired. Please sign in again.");
      }

      const authUser = (await supabase.auth.getUser()).data.user;
      if (!authUser?.id) throw new Error("You must be signed in to complete checkout.");

      if (planId === "spark") {
        await handleSparkPlan();
        setLoading(false);
        return;
      }

      await loadRazorpayScript();
      if (!window.Razorpay) {
        throw new Error("Razorpay SDK unavailable");
      }

      const orderResult = await supabase.functions.invoke<RazorpayOrderResult>("create-razorpay-order", {
        body: {
          planTier: planId === "flux" ? "flux" : "forge",
          billingInterval: interval === "annual" ? "annual" : "monthly",
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (orderResult.error || !orderResult.data) {
        throw new Error(orderResult.error?.message || "Failed to initialize payment.");
      }

      const createdOrder = orderResult.data;
      const checkout = new window.Razorpay({
        key: createdOrder.keyId,
        amount: createdOrder.amountCents,
        currency: createdOrder.currency,
        name: "Quansynd",
        description: `${planName} ${interval} subscription`,
        order_id: createdOrder.orderId,
        handler: async (response: RazorpaySuccessResponse) => {
          try {
            const verifyResult = await supabase.functions.invoke<{
              amount: number;
              currency: string;
            }>("verify-razorpay-payment", {
              body: {
                planTier: createdOrder.planTier,
                billingInterval: createdOrder.billingInterval,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              },
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });

            if (verifyResult.error || !verifyResult.data) {
              throw new Error(verifyResult.error?.message || "Payment verification failed.");
            }

            navigate(
              `/payment-success?plan=${planId}&interval=${interval}&amount=${verifyResult.data.amount.toFixed(2)}`,
            );
          } catch (verifyError) {
            const verifyMessage =
              verifyError instanceof Error ? verifyError.message : "Payment verification failed.";
            toast.error(verifyMessage);
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          email: authUser.email ?? undefined,
          name: authUser.user_metadata?.full_name ?? undefined,
        },
        notes: {
          user_id: authUser.id,
          plan_id: `${createdOrder.planTier}_${createdOrder.billingInterval}`,
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
        theme: {
          color: "#C8882A",
        },
      });

      checkout.on("payment.failed", (failureResponse: unknown) => {
        const failureData = failureResponse as {
          error?: { description?: string };
        };
        toast.error(failureData?.error?.description || "Payment failed. Please try again.");
        setLoading(false);
      });

      checkout.open();
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || "Payment failed, please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col lg:flex-row font-sans text-zinc-50 selection:bg-amber-500/30">
      {/* LEFT: ORDER SUMMARY */}
      <div className="flex-1 bg-[#0c0c0e] border-r border-zinc-800/50 p-6 md:p-12 lg:p-24 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_right,rgba(200,136,42,0.1)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-md w-full mx-auto lg:mx-0 lg:ml-auto relative z-10">
          <div className="mb-8">
            <span className="text-amber-500 font-semibold tracking-wider text-xs uppercase">Checkout</span>
            <h1 className="text-3xl font-medium tracking-tight mt-2 text-white">{planName}</h1>
            <p className="text-zinc-400 text-sm mt-2">
              {planId === "spark"
                ? "A free plan for getting started."
                : "Unlimited power for elite quantitative engineering."}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {[
              ...(planId === "spark"
                ? [
                    "2 workspaces",
                    "Community support",
                    "Core sync access",
                  ]
                : planId === "flux"
                  ? [
                      "Unlimited workspaces",
                      "Unlimited terminal panes",
                      "Cloud sync (Unlimited)",
                      "Task board limits",
                      "20 QuanSwarm runs / month",
                    ]
                  : [
                      "Unlimited workspaces",
                      "Unlimited terminal panes",
                      "Cloud sync (Unlimited)",
                      "All 12 curated themes",
                      "@mention AI assist (Codex)",
                      "Priority 24/7 support",
                    ])
            ].map((f, i) => (
              <div key={i} className="flex gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-amber-500 shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-800/50 pt-6 space-y-3">
            <div className="flex justify-between text-zinc-300">
              <span>Subtotal</span>
              <span>{formatInr(amount)}</span>
            </div>
            <div className="flex justify-between text-zinc-400 text-sm">
              <span>Tax (estimated)</span>
              <span>{formatInr(0)}</span>
            </div>
            <div className="flex justify-between text-xl font-medium text-white pt-4 border-t border-zinc-800/50 mt-2">
              <span>Total due today</span>
              <span>{formatInr(amount)}</span>
            </div>
            <p className="text-xs text-zinc-500 mt-2 block">
              Billed {interval === "annual" ? "annually" : "monthly"}. By subscribing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT: PAYMENT ACTION (Razorpay Checkout) */}
      <div className="flex-1 bg-zinc-950 p-6 md:p-12 lg:p-24 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto lg:mx-0 lg:mr-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-white">Secure Checkout</h2>
              <p className="text-xs text-zinc-400">Powered by Razorpay</p>
            </div>
          </div>

          <form onSubmit={handlePayment} className="space-y-6">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 text-sm text-zinc-300">
              {amount === 0
                ? "Continue to activate your free Spark plan."
                : "You'll be redirected to Razorpay's secure checkout modal to complete payment."}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-medium text-base transition-colors flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <>Processing...</>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  {amount === 0 ? "Continue free" : `Pay ${formatInr(amount)}`}
                </>
              )}
            </Button>

            <div className="flex flex-col items-center justify-center gap-2 mt-6 opacity-70">
              <p className="text-xs text-zinc-500 flex items-center gap-1">
                Payments are securely processed by <strong>Razorpay</strong>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

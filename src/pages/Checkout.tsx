import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, Lock, ShieldCheck, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { completeBillingCheckout } from '@/components/dashboard/dashboardSupabase';

export default function Checkout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const planId = searchParams.get('plan') || 'forge';
  const interval = searchParams.get('interval') || 'monthly';
  const planName = useMemo(() => {
    if (planId === 'spark') return 'Vibe ADE Spark';
    if (planId === 'flux') return 'Vibe ADE Flux';
    return 'Vibe ADE Forge';
  }, [planId]);
  const amount = useMemo(() => {
    if (planId === 'spark') return 0;
    if (planId === 'flux') return interval === 'annual' ? 10 : 12;
    return interval === 'annual' ? 20 : 25;
  }, [interval, planId]);

  // Mock processing the payment simulation
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call to Cashfree/payment provider
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (planId === 'spark') {
        setLoading(false);
        navigate(`/payment-success?plan=${planId}&interval=${interval}&amount=${amount}`);
        return;
      }

      const billingInvoice =
        planId === 'spark'
          ? null
          : await (async () => {
              const authUser = (await supabase.auth.getUser()).data.user;
              if (!authUser?.id) throw new Error('You must be signed in to complete checkout.');

              const providerRef =
                typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
                  ? `INV-${crypto.randomUUID().replace(/-/g, '').slice(0, 12).toUpperCase()}`
                  : `INV-${Date.now().toString(36).toUpperCase()}`;

              return completeBillingCheckout({
                planTier: planId === 'flux' ? 'flux' : 'forge',
                billingInterval: interval === 'annual' ? 'annual' : 'monthly',
                providerRef,
                paymentMethod: 'Cashfree',
              });
            })();

      setLoading(false);
      navigate(`/payment-success?plan=${planId}&interval=${interval}&amount=${(billingInvoice?.amount ?? amount).toFixed(2)}`);
    } catch (err) {
      const error = err as Error;
      setLoading(false);
      toast.error(error.message || 'Payment failed, please try again.');
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
              {planId === 'spark'
                ? 'A free plan for getting started.'
                : 'Unlimited power for elite quantitative engineering.'}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {[
              ...(planId === 'spark'
                ? [
                    '2 workspaces',
                    'Community support',
                    'Core sync access',
                  ]
                : planId === 'flux'
                  ? [
                      'Unlimited workspaces',
                      'Unlimited terminal panes',
                      'Cloud sync (Unlimited)',
                      'Task board limits',
                      '20 QuanSwarm runs / month',
                    ]
                  : [
                      'Unlimited workspaces',
                      'Unlimited terminal panes',
                      'Cloud sync (Unlimited)',
                      'All 12 curated themes',
                      '@mention AI assist (Codex)',
                      'Priority 24/7 support',
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
              <span>${amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-zinc-400 text-sm">
              <span>Tax (estimated)</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between text-xl font-medium text-white pt-4 border-t border-zinc-800/50 mt-2">
              <span>Total due today</span>
              <span>${amount.toFixed(2)}</span>
            </div>
            <p className="text-xs text-zinc-500 mt-2 block">
              Billed monthly. By subscribing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT: PAYMENT FORM (Simulating Cashfree Drop-in) */}
      <div className="flex-1 bg-zinc-950 p-6 md:p-12 lg:p-24 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto lg:mx-0 lg:mr-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-white">Secure Checkout</h2>
              <p className="text-xs text-zinc-400">Powered by Cashfree Payments</p>
            </div>
          </div>

          <form onSubmit={handlePayment} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  defaultValue="user@example.com" 
                  className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 h-11 focus-visible:ring-amber-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName" className="text-zinc-300">Name on Card</Label>
                <Input 
                  id="cardName" 
                  placeholder="John Doe" 
                  required
                  className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 h-11 focus-visible:ring-amber-500"
                />
              </div>
              
              <div className="space-y-2 relative">
                <Label htmlFor="cardNumber" className="text-zinc-300">Card Information</Label>
                <div className="relative">
                  <Input 
                    id="cardNumber" 
                    placeholder="0000 0000 0000 0000" 
                    required
                    className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 h-11 focus-visible:ring-amber-500 pl-10"
                  />
                  <CreditCard className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3">
                   <Input 
                      placeholder="MM/YY" 
                      required
                      className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 h-11 focus-visible:ring-amber-500"
                    />
                    <Input 
                      placeholder="CVC" 
                      required
                      className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 h-11 focus-visible:ring-amber-500"
                    />
                </div>
              </div>
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
                  {amount === 0 ? 'Continue free' : `Pay $${amount.toFixed(2)}`}
                </>
              )}
            </Button>
            
            <div className="flex flex-col items-center justify-center gap-2 mt-6 opacity-70">
              <p className="text-xs text-zinc-500 flex items-center gap-1">
                Payments are securely processed by <strong>Cashfree</strong>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

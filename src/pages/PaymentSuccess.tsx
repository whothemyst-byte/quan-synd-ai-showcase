import React, { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Copy, PartyPopper } from 'lucide-react';
import { toast } from 'sonner';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan') || 'forge';
  const amount = searchParams.get('amount') || '24.00';
  const orderId = "ORD-" + Math.random().toString(36).substring(2, 10).toUpperCase();

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId);
    toast.success("Order ID copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 font-sans selection:bg-amber-500/30">
      <div className="max-w-md w-full bg-[#0c0c0e] border border-zinc-800/50 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-400" />
        
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="text-2xl font-medium tracking-tight text-white">Payment Successful</h1>
            <PartyPopper className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-zinc-400 text-sm">
            Thank you for subscribing to {plan === 'spark' ? 'Vibe ADE Spark' : plan === 'flux' ? 'Vibe ADE Flux' : 'Vibe ADE Forge'}. Your workspace is being upgraded now.
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-zinc-400 text-sm">Amount Paid</span>
            <span className="text-white font-medium">${amount}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-zinc-400 text-sm">Payment Method</span>
            <span className="text-white font-medium">Card ending in •••• 4242</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-400 text-sm">Order ID</span>
            <div className="flex items-center gap-2">
              <span className="text-zinc-300 font-mono text-sm">{orderId}</span>
              <button onClick={handleCopy} className="text-zinc-500 hover:text-white transition-colors">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={() => navigate('/dashboard/billing')}
            className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-medium"
          >
            Go to Billing
          </Button>
          <Link to="/">
            <Button variant="ghost" className="w-full text-zinc-400 hover:text-white hover:bg-zinc-900 mt-2">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

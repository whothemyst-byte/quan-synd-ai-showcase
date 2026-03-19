import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  CreditCard,
  Key,
  LayoutDashboard,
  LogOut,
  Settings,
  Sparkles,
  TerminalSquare
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

type PlanRecord = {
  id: string;
  name: string;
  tier: string;
  interval: string;
  price_cents: number;
  currency: string;
  limits?: Record<string, any>;
};

type SubscriptionRecord = {
  id: string;
  status: string;
  current_period_end: string | null;
  plan?: PlanRecord;
};

type UsageRecord = {
  period_start: string;
  period_end: string;
  tasks_created: number;
  swarms_started: number;
};

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profileName, setProfileName] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionRecord | null>(null);
  const [usage, setUsage] = useState<UsageRecord | null>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackPlan = useMemo<PlanRecord>(
    () => ({
      id: 'spark_monthly',
      name: 'Vibe ADE Spark',
      tier: 'spark',
      interval: 'monthly',
      price_cents: 0,
      currency: 'USD',
      limits: { cloud_synced_workspaces: 2 }
    }),
    []
  );

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    let active = true;
    const load = async () => {
      setLoading(true);
      const [{ data: profileData }, { data: subscriptionData }, { data: usageData }, { data: invoiceData }] =
        await Promise.all([
          supabase.from('profiles').select('display_name,email').eq('id', user.id).maybeSingle(),
          supabase
            .from('subscriptions')
            .select('id,status,current_period_end,plan:plans(id,name,tier,interval,price_cents,currency,limits)')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle(),
          supabase
            .from('usage_counters')
            .select('period_start,period_end,tasks_created,swarms_started')
            .eq('user_id', user.id)
            .order('period_start', { ascending: false })
            .limit(1)
            .maybeSingle(),
          supabase
            .from('invoices')
            .select('id,amount_cents,currency,created_at')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(5)
        ]);

      if (!active) return;
      setProfileName(profileData?.display_name ?? null);
      setSubscription(subscriptionData ?? null);
      setUsage(usageData ?? null);
      setInvoices(invoiceData ?? []);
      setLoading(false);
    };

    void load();
    return () => {
      active = false;
    };
  }, [user?.id]);

  const plan = subscription?.plan ?? fallbackPlan;
  const workspacesLimit = plan?.limits?.cloud_synced_workspaces ?? null;
  const workspacesUsed = 0;
  const renewsOn = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString()
    : '—';

  const sidebarLinks = [
    { icon: <LayoutDashboard size={18} />, label: 'Overview', active: true },
    { icon: <CreditCard size={18} />, label: 'Billing & Subscriptions' },
    { icon: <Key size={18} />, label: 'API Keys' },
    { icon: <Settings size={18} />, label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row text-zinc-50 selection:bg-amber-500/30 font-sans">
      <aside className="w-full md:w-64 border-r border-zinc-800/50 bg-[#0c0c0e] flex flex-col pt-6 pb-4 px-4 sticky top-0 md:h-screen">
        <Link to="/" className="flex items-center gap-2 px-2 mb-10 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold tracking-tight text-xl">QuanSynd</span>
        </Link>

        <nav className="flex-1 space-y-1">
          {sidebarLinks.map((link, idx) => (
            <button
              key={idx}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                link.active ? 'bg-amber-500/10 text-amber-500 font-medium' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              {link.icon}
              {link.label}
            </button>
          ))}
        </nav>

        <div className="mt-8 pt-4 border-t border-zinc-800/50">
          <div className="px-3 py-2 mb-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-400">
              {(profileName?.[0] || user?.email?.[0] || 'U').toUpperCase()}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-medium text-zinc-200 truncate">{profileName || user?.email || 'user@example.com'}</p>
            </div>
          </div>
          <button
            onClick={async () => {
              await signOut();
              navigate('/');
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-zinc-500 hover:bg-zinc-900 hover:text-red-400 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-zinc-950/50">
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Welcome back.</h1>
          <p className="text-zinc-400">Manage your workspaces, subscriptions, and AI settings here.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="col-span-1 lg:col-span-2 bg-[#0F0F11] border border-zinc-800/50 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Sparkles className="w-32 h-32" />
            </div>

            <span className="text-xs font-semibold tracking-wider text-amber-500 uppercase mb-2 block">Active Subscription</span>
            <div className="flex items-end justify-between mb-8 relative z-10">
              <div>
                <h2 className="text-2xl font-medium text-white">{plan?.name ?? 'Vibe ADE Spark'}</h2>
                <p className="text-zinc-400 text-sm mt-1">
                  {plan?.interval === 'annual' ? 'Billed annually' : 'Billed monthly'} • Renews on {renewsOn}
                </p>
              </div>
              <Link to="/products/vibe-ade/pricing">
                <Button variant="outline" className="border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-800 hover:text-white">
                  Upgrade Plan
                </Button>
              </Link>
            </div>

            <div className="border-t border-zinc-800/50 pt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-300">Workspaces Limit</span>
                <span className="text-zinc-400 font-medium">
                  {workspacesLimit === null ? 'Unlimited' : `${workspacesUsed} / ${workspacesLimit} active`}
                </span>
              </div>
              <div className="w-full bg-zinc-900 rounded-full h-2 mt-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-orange-400 h-2 rounded-full"
                  style={{ width: workspacesLimit ? `${(workspacesUsed / workspacesLimit) * 100}%` : '100%' }}
                />
              </div>
            </div>
          </div>

          <div className="bg-[#0F0F11] border border-zinc-800/50 rounded-xl p-6 flex flex-col">
            <h3 className="text-sm font-medium text-white mb-4">Quick Actions</h3>
            <div className="space-y-3 flex-1">
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-zinc-900/50 hover:bg-zinc-800/80 border border-zinc-800/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <TerminalSquare className="w-5 h-5 text-zinc-400 group-hover:text-amber-500 transition-colors" />
                  <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">Launch Vibe ADE</span>
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-zinc-900/50 hover:bg-zinc-800/80 border border-zinc-800/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <BarChart className="w-5 h-5 text-zinc-400 group-hover:text-amber-500 transition-colors" />
                  <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                    Usage: {usage ? `${usage.tasks_created} tasks, ${usage.swarms_started} swarms` : '—'}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-medium text-white mb-4">Recent Invoices</h3>
        <div className="bg-[#0F0F11] border border-zinc-800/50 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800/50 bg-zinc-900/20">
                <th className="py-3 px-5 text-xs font-medium text-zinc-500 uppercase tracking-wider">Date</th>
                <th className="py-3 px-5 text-xs font-medium text-zinc-500 uppercase tracking-wider">Amount</th>
                <th className="py-3 px-5 text-xs font-medium text-zinc-500 uppercase tracking-wider">Plan</th>
                <th className="py-3 px-5 text-xs font-medium text-zinc-500 uppercase tracking-wider text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {loading ? (
                <tr>
                  <td className="py-4 px-5 text-sm text-zinc-400" colSpan={4}>
                    Loading…
                  </td>
                </tr>
              ) : invoices.length === 0 ? (
                <tr>
                  <td className="py-4 px-5 text-sm text-zinc-400" colSpan={4}>
                    No invoices yet.
                  </td>
                </tr>
              ) : (
                invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="py-4 px-5 text-sm text-zinc-300">
                      {new Date(invoice.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-5 text-sm text-white font-medium">
                      ${(invoice.amount_cents / 100).toFixed(2)}
                    </td>
                    <td className="py-4 px-5 text-sm text-zinc-400">{plan?.name ?? 'Vibe ADE Spark'}</td>
                    <td className="py-4 px-5 text-sm text-right">
                      <button className="text-amber-500 hover:text-amber-400 font-medium">Download</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

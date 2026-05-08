import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { currentUsageMonth, getDashboardPlan, type DashboardTier } from './dashboardPlans';

export interface CloudProfile {
  id: string;
  email: string | null;
  display_name: string | null;
  company: string | null;
  role: string | null;
  timezone: string | null;
  notifications_enabled: boolean | null;
  theme: "light" | "dark" | "system" | null;
  default_workspace_id: string | null;
  tier: DashboardTier | null;
  usage_month: string | null;
  tasks_created: number | null;
  swarms_started: number | null;
  updated_at: string | null;
}

export interface CloudWorkspace {
  id: string;
  name: string;
  rootDir: string;
  activePaneId: string | null;
  createdAt: string;
  updatedAt: string;
  paneCount: number;
}

export interface CloudDashboardSnapshot {
  profile: CloudProfile | null;
  planTier: DashboardTier;
  workspaces: CloudWorkspace[];
  usageMonth: string;
  tasksCreated: number;
  swarmsStarted: number;
}

function countPanes(layout: unknown): number {
  if (!layout || typeof layout !== 'object') {
    return 0;
  }
  const node = layout as { type?: string; children?: unknown[] };
  if (node.type === 'pane') {
    return 1;
  }
  if (!Array.isArray(node.children)) {
    return 0;
  }
  return node.children.reduce((acc, child) => acc + countPanes(child), 0);
}

async function loadSnapshot(userId: string): Promise<CloudDashboardSnapshot> {
  const now = new Date();
  const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0));
  const nextMonthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0));

  const [profileResult, workspacesResult, layoutsResult, subscriptionResult, usageCountersResult, usageEventsResult] = await Promise.allSettled([
    supabase
      .from('profiles')
      .select('id,email,display_name,company,role,timezone,notifications_enabled,theme,default_workspace_id,tier,usage_month,tasks_created,swarms_started,updated_at')
      .eq('id', userId)
      .maybeSingle(),
    supabase
      .from('workspaces')
      .select('id,name,root_dir,active_pane_id,created_at,updated_at')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false }),
    supabase
      .from('terminal_layouts')
      .select('workspace_id,layout,updated_at')
      .eq('user_id', userId)
      .eq('is_current', true),
    supabase
      .from('subscriptions')
      .select('plan_id,status,updated_at,created_at')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from('usage_counters')
      .select('period_start,period_end,tasks_created,swarms_started,updated_at')
      .eq('user_id', userId)
      .order('period_start', { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from('usage_events')
      .select('event_type,amount,occurred_at')
      .eq('user_id', userId)
      .gte('occurred_at', monthStart.toISOString())
      .lt('occurred_at', nextMonthStart.toISOString())
      .order('occurred_at', { ascending: false })
      .limit(200)
  ]);

  const profileData = profileResult.status === 'fulfilled' ? profileResult.value.data ?? null : null;
  const workspaceData = workspacesResult.status === 'fulfilled' ? workspacesResult.value.data ?? [] : [];
  const layoutsData = layoutsResult.status === 'fulfilled' ? layoutsResult.value.data ?? [] : [];
  const subscriptionData = subscriptionResult.status === 'fulfilled' ? subscriptionResult.value.data ?? null : null;
  const usageCounterData = usageCountersResult.status === 'fulfilled' ? usageCountersResult.value.data ?? null : null;
  const usageEventsData = usageEventsResult.status === 'fulfilled' ? usageEventsResult.value.data ?? [] : [];

  const subscriptionTier = (() => {
    const planId = typeof subscriptionData?.plan_id === 'string' ? subscriptionData.plan_id : null;
    const status = typeof subscriptionData?.status === 'string' ? subscriptionData.status : null;
    if (!planId || !status || status !== 'active') return null;
    if (planId.startsWith('forge_')) return 'forge';
    if (planId.startsWith('flux_')) return 'flux';
    if (planId.startsWith('spark_')) return 'spark';
    return null;
  })();

  const layouts = layoutsData as Array<{ workspace_id: string; layout: unknown; updated_at: string }>;
  const layoutByWorkspace = new Map(layouts.map((layout) => [layout.workspace_id, layout]));
  const workspaceList = (workspaceData as Array<{
    id: string;
    name: string;
    root_dir: string;
    active_pane_id: string | null;
    created_at: string;
    updated_at: string;
  }>).map((workspace) => {
    const layout = layoutByWorkspace.get(workspace.id);
    return {
      id: workspace.id,
      name: workspace.name,
      rootDir: workspace.root_dir,
      activePaneId: workspace.active_pane_id,
      createdAt: workspace.created_at,
      updatedAt: layout?.updated_at ?? workspace.updated_at,
      paneCount: layout ? countPanes(layout.layout) : 0
    };
  });

  const workspaceIds = new Set(workspaceList.map((workspace) => workspace.id));
  for (const layout of layouts) {
    if (workspaceIds.has(layout.workspace_id)) continue;
    workspaceList.push({
      id: layout.workspace_id,
      name: 'Synced workspace',
      rootDir: 'Unknown',
      activePaneId: null,
      createdAt: layout.updated_at,
      updatedAt: layout.updated_at,
      paneCount: countPanes(layout.layout)
    });
  }

  workspaceList.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const usageMonthFromCounter = typeof usageCounterData?.period_start === 'string' ? usageCounterData.period_start.slice(0, 7) : null;
  let tasksFromEvents = 0;
  let swarmsFromEvents = 0;
  for (const item of usageEventsData as Array<{ event_type?: string | null; amount?: number | null }>) {
    const amount = typeof item.amount === 'number' ? item.amount : 1;
    if (item.event_type === 'task') tasksFromEvents += amount;
    if (item.event_type === 'swarm') swarmsFromEvents += amount;
  }
  const tasksCreated = typeof usageCounterData?.tasks_created === 'number'
    ? usageCounterData.tasks_created
    : (tasksFromEvents > 0 ? tasksFromEvents : (profileData?.tasks_created ?? 0));
  const swarmsStarted = typeof usageCounterData?.swarms_started === 'number'
    ? usageCounterData.swarms_started
    : (swarmsFromEvents > 0 ? swarmsFromEvents : (profileData?.swarms_started ?? 0));
  const usageMonth = usageMonthFromCounter ?? profileData?.usage_month ?? currentUsageMonth();

  return {
    profile: profileData as CloudProfile | null,
    planTier: (subscriptionTier as DashboardTier | null) ?? (profileData?.tier as DashboardTier | undefined) ?? 'spark',
    workspaces: workspaceList,
    usageMonth,
    tasksCreated,
    swarmsStarted
  };
}

function subscribeSnapshot(userId: string, onInvalidate: () => void): () => void {
  const channel = supabase
    .channel(`dashboard-${userId}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles', filter: `id=eq.${userId}` }, onInvalidate)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'workspaces', filter: `user_id=eq.${userId}` }, onInvalidate)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'terminal_layouts', filter: `user_id=eq.${userId}` }, onInvalidate)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'subscriptions', filter: `user_id=eq.${userId}` }, onInvalidate)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'billing_invoices', filter: `user_id=eq.${userId}` }, onInvalidate)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'usage_counters', filter: `user_id=eq.${userId}` }, onInvalidate)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'usage_events', filter: `user_id=eq.${userId}` }, onInvalidate)
    .subscribe();
  return () => {
    void supabase.removeChannel(channel);
  };
}

export function useCloudDashboard(userId: string | null | undefined) {
  const [snapshot, setSnapshot] = useState<CloudDashboardSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!userId) {
      setSnapshot(null);
      setLoading(false);
      return () => {
        cancelled = true;
      };
    }

    const refresh = async () => {
      try {
        const next = await loadSnapshot(userId);
        if (!cancelled) {
          setSnapshot(next);
          setError(null);
        }
      } catch (nextError) {
        if (!cancelled) {
          setError(nextError instanceof Error ? nextError.message : 'Failed to load dashboard data.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void refresh();
    const unsubscribe = subscribeSnapshot(userId, () => {
      void refresh();
    });
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [userId]);

  const tier = getDashboardPlan(snapshot?.planTier ?? 'spark');
  const usageMonth = snapshot?.usageMonth ?? currentUsageMonth();
  const tasksCreated = snapshot?.tasksCreated ?? 0;
  const swarmsStarted = snapshot?.swarmsStarted ?? 0;

  return {
    snapshot,
    plan: tier,
    loading,
    error,
    usageMonth,
    tasksCreated,
    swarmsStarted
  };
}

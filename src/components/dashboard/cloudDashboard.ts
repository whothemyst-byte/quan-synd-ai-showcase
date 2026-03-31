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
  const [profileResult, workspacesResult, layoutsResult] = await Promise.allSettled([
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
      .eq('is_current', true)
  ]);

  const profileData = profileResult.status === 'fulfilled' ? profileResult.value.data ?? null : null;
  const workspaceData = workspacesResult.status === 'fulfilled' ? workspacesResult.value.data ?? [] : [];
  const layoutsData = layoutsResult.status === 'fulfilled' ? layoutsResult.value.data ?? [] : [];

  const layouts = layoutsData as Array<{ workspace_id: string; layout: unknown; updated_at: string }>;
  const layoutByWorkspace = new Map(layouts.map((layout) => [layout.workspace_id, layout]));

  return {
    profile: profileData as CloudProfile | null,
    planTier: (profileData?.tier as DashboardTier | undefined) ?? 'spark',
    workspaces: (workspaceData as Array<{
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
    })
  };
}

function subscribeSnapshot(userId: string, onInvalidate: () => void): () => void {
  const channel = supabase
    .channel(`dashboard-${userId}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles', filter: `id=eq.${userId}` }, onInvalidate)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'workspaces', filter: `user_id=eq.${userId}` }, onInvalidate)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'terminal_layouts', filter: `user_id=eq.${userId}` }, onInvalidate)
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
  const usageMonth = snapshot?.profile?.usage_month ?? currentUsageMonth();
  const tasksCreated = snapshot?.profile?.tasks_created ?? 0;
  const swarmsStarted = snapshot?.profile?.swarms_started ?? 0;

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

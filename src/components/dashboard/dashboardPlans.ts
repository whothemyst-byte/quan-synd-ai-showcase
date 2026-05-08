export type DashboardTier = 'spark' | 'flux' | 'forge';

export interface DashboardPlanLimits {
  taskBoardTasksPerMonth: number | null;
  swarmRunsPerMonth: number | null;
  concurrentAgentsPerSwarm: number | null;
  maxCloudSyncedWorkspaces: number | null;
  maxPanesPerWorkspace: number | null;
}

export interface DashboardPlan {
  tier: DashboardTier;
  label: string;
  support: string;
  features: {
    taskBoard: boolean;
    swarms: boolean;
  };
  limits: DashboardPlanLimits;
  perks: string[];
}

export const DASHBOARD_PLANS: Record<DashboardTier, DashboardPlan> = {
  spark: {
    tier: 'spark',
    label: 'Spark',
    support: 'Community',
    features: { taskBoard: false, swarms: false },
    limits: {
      taskBoardTasksPerMonth: null,
      swarmRunsPerMonth: null,
      concurrentAgentsPerSwarm: null,
      maxCloudSyncedWorkspaces: 2,
      maxPanesPerWorkspace: 4
    },
    perks: ['Unlimited local workspaces', 'Local save unlimited']
  },
  flux: {
    tier: 'flux',
    label: 'Flux',
    support: 'Email support (48h)',
    features: { taskBoard: true, swarms: true },
    limits: {
      taskBoardTasksPerMonth: 300,
      swarmRunsPerMonth: 20,
      concurrentAgentsPerSwarm: 5,
      maxCloudSyncedWorkspaces: null,
      maxPanesPerWorkspace: null
    },
    perks: ['Unlimited cloud sync']
  },
  forge: {
    tier: 'forge',
    label: 'Forge',
    support: 'Priority support (12h)',
    features: { taskBoard: true, swarms: true },
    limits: {
      taskBoardTasksPerMonth: null,
      swarmRunsPerMonth: null,
      concurrentAgentsPerSwarm: null,
      maxCloudSyncedWorkspaces: null,
      maxPanesPerWorkspace: null
    },
    perks: ['Beta access', 'Advanced usage dashboard', 'Future features auto-unlock']
  }
};

export function currentUsageMonth(date = new Date()): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${date.getFullYear()}-${month}`;
}

export function getDashboardPlan(tier?: string | null): DashboardPlan {
  if (tier === 'flux' || tier === 'forge') {
    return DASHBOARD_PLANS[tier];
  }
  return DASHBOARD_PLANS.spark;
}

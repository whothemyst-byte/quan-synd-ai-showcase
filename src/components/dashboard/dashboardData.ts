export type DashboardWorkspace = {
  id: string;
  name: string;
  stack: string;
  status: "Active" | "Paused" | "Archived";
  path: string;
  lastSyncedAt: string;
  notes: string;
};

export type DashboardApiKey = {
  id: string;
  name: string;
  keyPrefix: string;
  secret?: string;
  scopes: string[];
  createdAt: string;
  lastUsedAt: string | null;
  revoked: boolean;
};

export type DashboardSettings = {
  displayName: string;
  company: string;
  role: string;
  email: string;
  timezone: string;
  notifications: boolean;
  theme: "light" | "dark" | "system";
  defaultWorkspaceId: string;
};

export type DashboardActivity = {
  id: string;
  title: string;
  detail: string;
  type: "auth" | "billing" | "workspace" | "api" | "settings" | "system";
  timestamp: string;
};

export type BillingInvoice = {
  id: string;
  invoiceNumber: string;
  userId: string;
  planTier: "spark" | "flux" | "forge";
  billingInterval: "monthly" | "annual";
  amount: number;
  currency: string;
  status: "pending" | "paid" | "failed" | "refunded";
  provider: string;
  providerRef: string | null;
  paymentMethod: string | null;
  periodStart: string | null;
  periodEnd: string | null;
  receiptUrl: string | null;
  createdAt: string;
};

export function maskApiKey(key: string) {
  if (key.length <= 10) return key;
  return `${key.slice(0, 10)}...${key.slice(-4)}`;
}

export function formatDateTime(value: string | null | undefined) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function formatDate(value: string | null | undefined) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
  }).format(date);
}

export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

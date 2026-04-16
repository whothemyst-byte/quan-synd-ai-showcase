import { supabase } from "@/lib/supabase";
import {
  formatCurrency,
  type BillingInvoice,
  type DashboardActivity,
  type DashboardApiKey,
  type DashboardSettings,
} from "./dashboardData";

type DashboardProfileRow = {
  id: string;
  email: string | null;
  display_name: string | null;
  company: string | null;
  role: string | null;
  timezone: string | null;
  notifications_enabled: boolean | null;
  theme: "light" | "dark" | "system" | null;
  default_workspace_id: string | null;
  created_at: string | null;
  updated_at: string | null;
};

type ApiKeyRow = {
  id: string;
  name: string;
  key_prefix: string;
  scopes: string[] | null;
  created_at: string;
  last_used_at: string | null;
  revoked: boolean;
};

type WorkspaceRow = {
  id: string;
  name: string;
  updated_at: string | null;
  created_at: string;
};

type BillingInvoiceRow = {
  id: string;
  invoice_number: string;
  user_id: string;
  plan_tier: "spark" | "flux" | "forge";
  billing_interval: "monthly" | "annual";
  amount: number | string;
  currency: string;
  status: "pending" | "paid" | "failed" | "refunded";
  provider: string;
  provider_ref: string | null;
  payment_method: string | null;
  period_start: string | null;
  period_end: string | null;
  receipt_url: string | null;
  created_at: string;
};

function mapBillingInvoice(row: BillingInvoiceRow): BillingInvoice {
  return {
    id: row.id,
    invoiceNumber: row.invoice_number,
    userId: row.user_id,
    planTier: row.plan_tier,
    billingInterval: row.billing_interval,
    amount: Number(row.amount),
    currency: row.currency,
    status: row.status,
    provider: row.provider,
    providerRef: row.provider_ref,
    paymentMethod: row.payment_method,
    periodStart: row.period_start,
    periodEnd: row.period_end,
    receiptUrl: row.receipt_url,
    createdAt: row.created_at,
  };
}

export async function loadDashboardSettings(userId: string): Promise<DashboardSettings | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id,email,display_name,company,role,timezone,notifications_enabled,theme,default_workspace_id")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  const profile = data as DashboardProfileRow;
  return {
    displayName: profile.display_name ?? "",
    company: profile.company ?? "",
    role: profile.role ?? "",
    email: profile.email ?? "",
    timezone: profile.timezone ?? "Asia/Calcutta",
    notifications: profile.notifications_enabled ?? true,
    theme: profile.theme ?? "system",
    defaultWorkspaceId: profile.default_workspace_id ?? "",
  };
}

export async function saveDashboardSettings(userId: string, settings: DashboardSettings): Promise<void> {
  const { error } = await supabase.from("profiles").upsert(
    {
      id: userId,
      email: settings.email || null,
      display_name: settings.displayName || null,
      company: settings.company || null,
      role: settings.role || null,
      timezone: settings.timezone || null,
      notifications_enabled: settings.notifications,
      theme: settings.theme,
      default_workspace_id: settings.defaultWorkspaceId || null,
    },
    { onConflict: "id" }
  );

  if (error) {
    throw error;
  }
}

export async function loadDashboardApiKeys(userId: string): Promise<DashboardApiKey[]> {
  const { data, error } = await supabase
    .from("api_keys")
    .select("id,name,key_prefix,scopes,created_at,last_used_at,revoked")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => {
    const apiKey = row as ApiKeyRow;
    return {
      id: apiKey.id,
      name: apiKey.name,
      keyPrefix: apiKey.key_prefix,
      scopes: apiKey.scopes ?? [],
      createdAt: apiKey.created_at,
      lastUsedAt: apiKey.last_used_at,
      revoked: apiKey.revoked,
    } satisfies DashboardApiKey;
  });
}

export async function createDashboardApiKey(name: string, scopes: string[]): Promise<DashboardApiKey> {
  const { data, error } = await supabase.rpc("create_api_key", {
    api_name: name,
    scopes_in: scopes,
  });

  if (error) {
    throw error;
  }

  const row = Array.isArray(data) ? (data[0] as Record<string, unknown>) : (data as Record<string, unknown>);
  return {
    id: String(row.id),
    name: String(row.name),
    keyPrefix: String(row.key_prefix),
    secret: String(row.key),
    scopes: Array.isArray(row.scopes_out) ? row.scopes_out.map(String) : [],
    createdAt: String(row.created_at),
    lastUsedAt: row.last_used_at ? String(row.last_used_at) : null,
    revoked: Boolean(row.revoked),
  } satisfies DashboardApiKey;
}

export async function revokeDashboardApiKey(apiKeyId: string): Promise<void> {
  const { error } = await supabase.rpc("revoke_api_key", {
    api_key_id: apiKeyId,
  });

  if (error) {
    throw error;
  }
}

export async function loadBillingInvoices(userId: string): Promise<BillingInvoice[]> {
  const { data, error } = await supabase
    .from("billing_invoices")
    .select(
      "id,invoice_number,user_id,plan_tier,billing_interval,amount,currency,status,provider,provider_ref,payment_method,period_start,period_end,receipt_url,created_at"
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => mapBillingInvoice(row as BillingInvoiceRow));
}

export async function completeBillingCheckout(input: {
  planTier: BillingInvoice["planTier"];
  billingInterval: BillingInvoice["billingInterval"];
  providerRef?: string | null;
  paymentMethod?: string | null;
  receiptUrl?: string | null;
  provider?: string | null;
}): Promise<BillingInvoice> {
  const { data, error } = await supabase
    .rpc("complete_subscription_checkout", {
      p_plan_id: `${input.planTier}_${input.billingInterval}`,
      p_billing_interval: input.billingInterval,
      p_provider_ref: input.providerRef ?? null,
      p_payment_method: input.paymentMethod ?? "Razorpay",
      p_receipt_url: input.receiptUrl ?? null,
      p_provider: input.provider ?? "razorpay",
    });

  if (error) {
    throw error;
  }

  return mapBillingInvoice(data as BillingInvoiceRow);
}

export async function deleteDashboardWorkspace(workspaceId: string, userId: string): Promise<void> {
  const { error: layoutError } = await supabase
    .from("terminal_layouts")
    .delete()
    .eq("workspace_id", workspaceId)
    .eq("user_id", userId);

  if (layoutError) {
    throw layoutError;
  }

  const { error: workspaceError } = await supabase
    .from("workspaces")
    .delete()
    .eq("id", workspaceId)
    .eq("user_id", userId);

  if (workspaceError) {
    throw workspaceError;
  }
}

export async function loadDashboardActivity(userId: string): Promise<DashboardActivity[]> {
  const [profileResult, workspacesResult, keysResult, billingInvoicesResult] = await Promise.allSettled([
    supabase
      .from("profiles")
      .select("updated_at,theme,notifications_enabled,display_name,company,role,default_workspace_id")
      .eq("id", userId)
      .maybeSingle(),
    supabase
      .from("workspaces")
      .select("id,name,created_at,updated_at")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false }),
    supabase
      .from("api_keys")
      .select("id,name,created_at,last_used_at,revoked")
      .eq("user_id", userId)
      .order("created_at", { ascending: false }),
    supabase
      .from("billing_invoices")
      .select("id,invoice_number,user_id,plan_tier,billing_interval,amount,currency,status,provider,provider_ref,payment_method,period_start,period_end,receipt_url,created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false }),
  ]);

  const activities: DashboardActivity[] = [];
  const seen = new Set<string>();
  const push = (entry: DashboardActivity) => {
    const key = `${entry.type}:${entry.title}:${entry.timestamp}`;
    if (seen.has(key)) return;
    seen.add(key);
    activities.push(entry);
  };

  if (profileResult.status === "fulfilled" && profileResult.value.data?.updated_at) {
    push({
      id: `profile-${userId}`,
      type: "settings",
      title: "Profile synced",
      detail: "Your dashboard profile was last updated in Supabase.",
      timestamp: profileResult.value.data.updated_at,
    });
  }

  if (workspacesResult.status === "fulfilled") {
    const workspaces = (workspacesResult.value.data ?? []) as WorkspaceRow[];
    for (const workspace of workspaces) {
      push({
        id: `workspace-${workspace.id}`,
        type: "workspace",
        title: workspace.name || "Workspace updated",
        detail: "Workspace data changed in your account.",
        timestamp: workspace.updated_at ?? workspace.created_at,
      });
    }
  }

  if (keysResult.status === "fulfilled") {
    const keys = (keysResult.value.data ?? []) as ApiKeyRow[];
    for (const key of keys) {
      push({
        id: `api-${key.id}`,
        type: "api",
        title: key.revoked ? "API key revoked" : "API key available",
        detail: key.name,
        timestamp: key.last_used_at ?? key.created_at,
      });
    }
  }

  if (billingInvoicesResult.status === "fulfilled") {
    const billingInvoices = (billingInvoicesResult.value.data ?? []) as BillingInvoiceRow[];
    for (const invoice of billingInvoices) {
      const amount = formatCurrency(Number(invoice.amount), invoice.currency);
      const interval = invoice.billing_interval === "annual" ? "annual" : "monthly";
      const statusLabel = invoice.status === "paid" ? "paid" : invoice.status;
      push({
        id: `invoice-${invoice.id}`,
        type: "billing",
        title: `${invoice.plan_tier.toUpperCase()} ${interval} invoice ${statusLabel}`,
        detail: `${amount} via ${invoice.provider}`,
        timestamp: invoice.created_at,
      });
    }
  }

  return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

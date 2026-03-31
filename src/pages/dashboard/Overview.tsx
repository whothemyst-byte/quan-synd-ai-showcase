import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, ExternalLink, Layers3, RefreshCw,
  ShieldCheck, Sparkles, Wallet, Workflow,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { formatDateTime, type DashboardActivity } from "@/components/dashboard/dashboardData";
import { loadDashboardActivity } from "@/components/dashboard/dashboardSupabase";
import { useCloudDashboard } from "@/components/dashboard/cloudDashboard";
import { useDashboardTheme } from "@/components/dashboard/dashboardTheme";

// ─── Shared card style ────────────────────────────────────────────────────────
const useStyles = (theme: string) => ({
  card: {
    background: theme === "dark" ? "#161411" : "var(--card-bg)",
    border: `1px solid ${theme === "dark" ? "rgba(243,238,229,0.08)" : "var(--rule)"}`,
    borderRadius: "10px",
    padding: "24px",
  } as React.CSSProperties,
  innerCard: {
    background: theme === "dark" ? "#1a1815" : "#ede7d9",
    border: `1px solid ${theme === "dark" ? "rgba(243,238,229,0.06)" : "var(--rule)"}`,
    borderRadius: "8px",
    padding: "16px",
  } as React.CSSProperties,
  rowLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    borderRadius: "8px",
    background: theme === "dark" ? "#1a1815" : "#ede7d9",
    border: `1px solid ${theme === "dark" ? "rgba(243,238,229,0.06)" : "var(--rule)"}`,
    textDecoration: "none",
    transition: "border-color 0.18s ease, background 0.18s ease",
  } as React.CSSProperties,
  amber: theme === "dark" ? "#d79a3d" : "#c8882a",
  ink: theme === "dark" ? "#f3eee5" : "var(--ink)",
  muted: theme === "dark" ? "#b1a692" : "var(--muted-ui)",
  eyebrow: {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "10px",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: theme === "dark" ? "#d79a3d" : "var(--amber)",
    marginBottom: "6px",
    display: "block",
  } as React.CSSProperties,
  heading: {
    fontFamily: "'Instrument Serif', serif",
    fontWeight: 400,
    fontSize: "20px",
    letterSpacing: "-0.01em",
    color: theme === "dark" ? "#f3eee5" : "var(--ink)",
    marginBottom: "0",
  } as React.CSSProperties,
});

export default function DashboardOverview() {
  const { user } = useAuth();
  const theme = useDashboardTheme();
  const { snapshot, plan, loading, error, tasksCreated, swarmsStarted } = useCloudDashboard(user?.id);
  const [recentActivity, setRecentActivity] = useState<DashboardActivity[]>([]);
  const [activityLoading, setActivityLoading] = useState(true);
  const [activityError, setActivityError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!user?.id) {
      setActivityLoading(false);
      return () => {
        cancelled = true;
      };
    }

    const run = async () => {
      try {
        const data = await loadDashboardActivity(user.id);
        if (!cancelled) {
          setRecentActivity(data.filter((e) => e.type === "billing" || e.type === "workspace" || e.type === "api" || e.type === "settings"));
          setActivityError(null);
        }
      } catch (nextError) {
        if (!cancelled) {
          setActivityError(nextError instanceof Error ? nextError.message : "Failed to load account activity.");
        }
      } finally {
        if (!cancelled) {
          setActivityLoading(false);
        }
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const S = useStyles(theme);
  const profileName = snapshot?.profile?.display_name ?? user?.email?.split("@")[0] ?? "there";
  const workspaceCount = snapshot?.workspaces.length ?? 0;
  const workspaceLimit = plan.limits.maxCloudSyncedWorkspaces;
  const paneLimit = plan.limits.maxPanesPerWorkspace;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* ── Top row: Welcome + Quick Actions ──────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "20px", alignItems: "start" }}>

        {/* Welcome card */}
        <div style={{ ...S.card, position: "relative", overflow: "hidden" }}>
          {/* Amber glow */}
          <div style={{
            position: "absolute", top: 0, right: 0, width: "320px", height: "200px",
            background: `radial-gradient(circle at top right, rgba(200,136,42,0.14) 0%, transparent 65%)`,
            pointerEvents: "none",
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
              <div>
                <span style={S.eyebrow}>Overview</span>
                <h1 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: "28px", letterSpacing: "-0.02em", color: S.ink, margin: 0, lineHeight: 1.2 }}>
                  Welcome back, {profileName}.
                </h1>
                <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "14px", color: S.muted, marginTop: "8px", lineHeight: 1.6, maxWidth: "520px" }}>
                  Your web dashboard and Vibe ADE desktop app share the same Supabase identity, usage counters, and tier limits.
                </p>
              </div>
              <Link
                to="/products/vibe-ade/pricing"
                className="amber-btn"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "10px 20px", borderRadius: "6px", fontSize: "13px",
                  textDecoration: "none", whiteSpace: "nowrap",
                  fontFamily: "'Geist Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em",
                }}
              >
                Upgrade plan <ArrowRight size={13} />
              </Link>
            </div>

            {/* 3 stat mini-cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {[
                { icon: Wallet, label: "Billing", value: plan.label, sub: `${snapshot?.profile?.tier ?? "spark"} plan` },
                { icon: Layers3, label: "Workspaces", value: String(workspaceCount), sub: workspaceLimit ? `${workspaceLimit} sync slots` : "Unlimited sync" },
                { icon: Sparkles, label: "Usage", value: `${tasksCreated} tasks`, sub: `${swarmsStarted} swarms this month` },
              ].map(({ icon: Icon, label, value, sub }) => (
                <div key={label} style={S.innerCard}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
                    <Icon size={13} style={{ color: S.amber }} />
                    <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: S.muted }}>
                      {label}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: "20px", color: S.ink, margin: 0, lineHeight: 1.1 }}>{value}</p>
                  <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "12px", color: S.muted, marginTop: "4px" }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div style={S.card}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div>
              <span style={S.eyebrow}>Quick Actions</span>
              <h2 style={S.heading}>Navigate the dashboard</h2>
            </div>
            <Workflow size={18} style={{ color: S.muted }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { to: "/dashboard/workspaces", icon: Layers3, label: "Manage workspaces" },
              { to: "/dashboard/billing", icon: Wallet, label: "Review billing" },
              { to: "/dashboard/api-keys", icon: ShieldCheck, label: "Rotate API keys" },
              { to: "/dashboard/activity", icon: RefreshCw, label: "View activity log" },
            ].map(({ to, icon: Icon, label }) => (
              <Link key={to} to={to} style={S.rowLink}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = S.amber; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = theme === "dark" ? "rgba(243,238,229,0.06)" : "var(--rule)"; }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "'Geist', sans-serif", fontSize: "13px", color: S.ink }}>
                  <Icon size={14} style={{ color: S.amber }} /> {label}
                </span>
                <ArrowRight size={13} style={{ color: S.muted }} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Plan & Usage + Recent Billing ─────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "20px", alignItems: "start" }}>

        {/* Plan card */}
        <div style={S.card}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div>
              <span style={S.eyebrow}>Subscription</span>
              <h2 style={S.heading}>Plan and usage</h2>
            </div>
            <Link to="/dashboard/billing" style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: S.amber, textDecoration: "none" }}>
              Open billing →
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
            <div style={S.innerCard}>
              <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: S.muted, marginBottom: "8px" }}>Current status</p>
              <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "15px", fontWeight: 500, color: S.ink }}>{plan.features.taskBoard ? "Paid tier active" : "Free tier active"}</p>
              <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "12px", color: S.muted, marginTop: "4px" }}>{plan.features.swarms ? "Task board & swarms enabled" : "Task board & swarms locked"}</p>
            </div>
            <div style={S.innerCard}>
              <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: S.muted, marginBottom: "8px" }}>Usage period</p>
              <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "15px", fontWeight: 500, color: S.ink }}>{snapshot?.profile?.usage_month ?? "Live"}</p>
              <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "12px", color: S.muted, marginTop: "4px" }}>{tasksCreated} tasks · {swarmsStarted} swarms</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div style={S.innerCard}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ fontFamily: "'Geist', sans-serif", fontSize: "13px", color: S.ink }}>Workspace sync</span>
                <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "11px", color: S.muted }}>
                  {workspaceLimit ? `${Math.min(workspaceCount, workspaceLimit)} / ${workspaceLimit}` : `${workspaceCount} active`}
                </span>
              </div>
              <div style={{ height: "4px", borderRadius: "2px", background: theme === "dark" ? "rgba(243,238,229,0.08)" : "var(--rule)", overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: "2px", background: `linear-gradient(90deg, ${S.amber}, #e8a740)`, width: workspaceLimit ? `${Math.min((workspaceCount / workspaceLimit) * 100, 100)}%` : "100%" }} />
              </div>
            </div>
            <div style={S.innerCard}>
              <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: S.muted, marginBottom: "8px" }}>Pane limit</p>
              <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "15px", fontWeight: 500, color: S.ink }}>{paneLimit ? `${paneLimit} panes / ws` : "Unlimited"}</p>
              <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "12px", color: S.muted, marginTop: "4px" }}>Reflected from shared tier rules.</p>
            </div>
          </div>
        </div>

        {/* Recent billing */}
        <div style={S.card}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div>
              <span style={S.eyebrow}>Recent billing invoices</span>
              <h2 style={S.heading}>Latest billing activity</h2>
            </div>
            <Link to="/dashboard/billing" style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: S.amber, textDecoration: "none" }}>View all →</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {loading ? (
              <div style={{ ...S.innerCard, fontFamily: "'Geist', sans-serif", fontSize: "13px", color: S.muted }}>Loading account data…</div>
            ) : activityLoading ? (
              <div style={{ ...S.innerCard, fontFamily: "'Geist', sans-serif", fontSize: "13px", color: S.muted }}>Loading activity…</div>
            ) : activityError ? (
              <div style={{ ...S.innerCard, border: "1px solid rgba(186,26,26,0.3)", fontFamily: "'Geist', sans-serif", fontSize: "13px", color: "#ba1a1a" }}>{activityError}</div>
            ) : error ? (
              <div style={{ ...S.innerCard, border: "1px solid rgba(186,26,26,0.3)", fontFamily: "'Geist', sans-serif", fontSize: "13px", color: "#ba1a1a" }}>{error}</div>
            ) : recentActivity.length === 0 ? (
              <div style={{ ...S.innerCard, textAlign: "center", padding: "32px 16px" }}>
                <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: "16px", color: S.muted }}>No billing events yet.</p>
                <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "11px", color: S.muted, marginTop: "6px" }}>Usage from Vibe ADE will appear here.</p>
              </div>
            ) : (
              recentActivity.slice(0, 5).map((entry) => (
                <div key={entry.id} style={{ ...S.innerCard, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "13px", fontWeight: 500, color: S.ink, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{entry.title}</p>
                    <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "12px", color: S.muted, marginTop: "2px" }}>{entry.detail}</p>
                  </div>
                  <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", textTransform: "uppercase", color: S.muted, whiteSpace: "nowrap" }}>{formatDateTime(entry.timestamp)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom 3 info cards ────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {[
          {
            eyebrow: "Profile",
            heading: "Connected account",
            body: user?.email ?? "No email connected",
            sub: snapshot?.profile?.display_name ? `Account name: ${snapshot.profile.display_name}` : "Profile row available in Supabase.",
            action: { to: "/dashboard/settings", label: "Open settings", outline: true },
          },
          {
            eyebrow: "Workspaces",
            heading: "Manage environments",
            body: "Review your synced environments and the live desktop workspace list.",
            sub: null,
            action: { to: "/dashboard/workspaces", label: "Open workspaces", outline: false, icon: ExternalLink },
          },
          {
            eyebrow: "Account",
            heading: "Keep settings in sync",
            body: "Update your profile, theme, and notification preferences from the settings page.",
            sub: null,
            action: { to: "/dashboard/settings", label: "Open settings", outline: true },
          },
        ].map(({ eyebrow, heading, body, sub, action }) => (
          <div key={eyebrow} style={S.card}>
            <span style={S.eyebrow}>{eyebrow}</span>
            <h3 style={{ ...S.heading, fontSize: "17px", marginBottom: "12px" }}>{heading}</h3>
            <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "13px", color: S.muted, lineHeight: 1.6 }}>{body}</p>
            {sub && <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "12px", color: S.muted, marginTop: "4px" }}>{sub}</p>}
            <Link
              to={action.to}
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                marginTop: "16px", padding: "9px 16px", borderRadius: "6px",
                fontFamily: "'Geist Mono', monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em",
                textDecoration: "none", transition: "all 0.18s ease",
                ...(action.outline
                  ? { background: "transparent", border: `1px solid ${theme === "dark" ? "rgba(243,238,229,0.12)" : "var(--rule)"}`, color: S.ink }
                  : { background: S.amber, color: "#fff", border: "none" }),
              }}
            >
              {action.label} {action.icon ? <ExternalLink size={12} /> : <ArrowRight size={12} />}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Folder, Trash2, ExternalLink, Info, Download } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useCloudDashboard, type CloudWorkspace } from "@/components/dashboard/cloudDashboard";
import { useDashboardTheme } from "@/components/dashboard/dashboardTheme";
import { formatDateTime } from "@/components/dashboard/dashboardData";
import { deleteDashboardWorkspace } from "@/components/dashboard/dashboardSupabase";
import { VIBE_ADE_DOWNLOAD_URL } from "@/lib/vibeAdeRelease";

export default function DashboardWorkspaces() {
  const { user } = useAuth();
  const theme = useDashboardTheme();
  const { snapshot, plan, loading } = useCloudDashboard(user?.id);
  const [deletingWorkspaceId, setDeletingWorkspaceId] = useState<string | null>(null);

  const amber = theme === "dark" ? "#d79a3d" : "#c8882a";
  const ink = theme === "dark" ? "#f3eee5" : "var(--ink)";
  const muted = theme === "dark" ? "#b1a692" : "var(--muted-ui)";
  const rule = theme === "dark" ? "rgba(243,238,229,0.08)" : "var(--rule)";
  const cardBg = theme === "dark" ? "#161411" : "var(--card-bg)";

  const card: React.CSSProperties = { background: cardBg, border: `1px solid ${rule}`, borderRadius: "10px", padding: "28px" };
  const eyebrow: React.CSSProperties = { fontFamily: "'Geist Mono', monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: amber, display: "block", marginBottom: "6px" };
  const sectionRule: React.CSSProperties = { display: "block", width: "32px", height: "2px", background: amber, marginBottom: "12px" };

  const allWorkspaces = snapshot?.workspaces ?? [];
  const workspaceLimit = plan.limits.maxCloudSyncedWorkspaces;
  const hasUnlimitedSlots = workspaceLimit === null;
  const displayWorkspaces = allWorkspaces;
  const usagePercent = hasUnlimitedSlots
    ? 100
    : Math.min((displayWorkspaces.length / Math.max(workspaceLimit, 1)) * 100, 100);

  const handleDeleteWorkspace = async (workspace: CloudWorkspace): Promise<void> => {
    if (!user?.id) {
      toast.error("You must be signed in to delete a workspace.");
      return;
    }
    const confirmed = window.confirm(`Permanently delete "${workspace.name}" and all of its synced data?`);
    if (!confirmed) {
      return;
    }

    setDeletingWorkspaceId(workspace.id);
    try {
      await deleteDashboardWorkspace(workspace.id, user.id);
      toast.success(`"${workspace.name}" deleted.`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete workspace.";
      toast.error(message);
    } finally {
      setDeletingWorkspaceId(null);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <span style={eyebrow}>Workspaces</span>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: "32px", letterSpacing: "-0.02em", color: ink, margin: 0 }}>Cloud Workspaces</h1>
        <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "15px", color: muted, marginTop: "8px" }}>All workspaces synced from the Vibe ADE desktop application, including terminal and browser pane state.</p>
      </div>

      {/* Usage bar */}
      <div style={card}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <div>
            <span style={eyebrow}>Sync Usage</span>
            <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "14px", color: ink }}>
              {hasUnlimitedSlots
                ? `${displayWorkspaces.length} cloud sync slots used (Unlimited plan)`
                : `${displayWorkspaces.length} of ${workspaceLimit} cloud sync slots used`}
            </p>
          </div>
          <a href="/products/vibe-ade/pricing" style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: amber, textDecoration: "none" }}>Upgrade →</a>
        </div>
        <div style={{ height: "6px", borderRadius: "3px", background: theme === "dark" ? "rgba(243,238,229,0.08)" : "rgba(14,14,11,0.08)", overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: "3px", background: `linear-gradient(90deg, ${amber}, #e8a740)`, width: `${usagePercent}%`, transition: "width 0.4s ease" }} />
        </div>
      </div>

      {/* Workspaces */}
      <div>
        <span style={sectionRule} />
        <span style={eyebrow}>Active Workspaces</span>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: "22px", color: ink, marginBottom: "20px" }}>{displayWorkspaces.length} workspace{displayWorkspaces.length !== 1 ? "s" : ""} connected</h2>

        {loading ? (
          <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "13px", color: muted }}>Loading…</p>
        ) : allWorkspaces.length === 0 ? (
          <div style={{ ...card, textAlign: "center", padding: "56px 32px" }}>
            <Folder size={40} style={{ color: muted, margin: "0 auto 16px", display: "block" }} />
            <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: "22px", color: ink, marginBottom: "8px" }}>No workspaces connected yet.</p>
            <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "14px", color: muted, marginBottom: "24px" }}>Open Vibe ADE on your desktop to sync workspaces here.</p>
            <a
              href={VIBE_ADE_DOWNLOAD_URL}
              download
              style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "11px 22px", borderRadius: "6px", fontSize: "12px", textDecoration: "none", fontFamily: "'Geist Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em", background: "transparent", border: `1px solid ${amber}`, color: amber }}
            >
              <Download size={13} /> Download Vibe ADE
            </a>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {displayWorkspaces.map((ws) => (
              <div key={ws.id} style={{ ...card, padding: "20px 22px", borderLeft: `3px solid ${amber}`, transition: "box-shadow 0.18s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 20px -8px rgba(200,136,42,0.25)`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px", marginBottom: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Folder size={15} style={{ color: amber }} />
                    <span style={{ fontFamily: "'Geist', sans-serif", fontSize: "14px", fontWeight: 600, color: ink }}>{ws.name}</span>
                  </div>
                  <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 10px", borderRadius: "20px", flexShrink: 0, background: `rgba(200,136,42,0.1)`, color: amber, border: `1px solid rgba(200,136,42,0.3)` }}>
                    Synced
                  </span>
                </div>
                <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", color: muted, marginBottom: "3px" }}>
                  Last synced: {formatDateTime(ws.updatedAt)}
                </p>
                <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", color: muted }}>{ws.paneCount} pane{ws.paneCount !== 1 ? "s" : ""}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "14px", paddingTop: "12px", borderTop: `1px solid ${rule}` }}>
                  <button onClick={() => toast.info("Open Vibe ADE on your desktop.")} style={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: "'Geist Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: ink, background: "none", border: "none", cursor: "pointer" }}>
                    <ExternalLink size={11} /> Open in Vibe ADE
                  </button>
                  <button
                    onClick={() => { void handleDeleteWorkspace(ws); }}
                    disabled={deletingWorkspaceId === ws.id}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#ba1a1a"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = muted; }}
                    style={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: "'Geist Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: muted, background: "none", border: "none", cursor: "pointer", transition: "color 0.15s" }}>
                    <Trash2 size={11} /> {deletingWorkspaceId === ws.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info banner */}
      <div style={{ ...card, padding: "16px 20px", borderLeft: `3px solid ${amber}`, display: "flex", alignItems: "flex-start", gap: "12px" }}>
        <Info size={15} style={{ color: amber, flexShrink: 0, marginTop: "2px" }} />
        <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "13px", color: muted, lineHeight: 1.6, margin: 0 }}>
          Workspaces are automatically synced from the <strong style={{ color: ink }}>Vibe ADE</strong> desktop application. Changes may take a few moments to reflect.
        </p>
      </div>
    </div>
  );
}

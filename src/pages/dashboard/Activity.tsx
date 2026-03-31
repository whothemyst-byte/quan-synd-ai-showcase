import { useEffect, useMemo, useState } from "react";
import { Download } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboardTheme } from "@/components/dashboard/dashboardTheme";
import { formatDateTime, type DashboardActivity } from "@/components/dashboard/dashboardData";
import { loadDashboardActivity } from "@/components/dashboard/dashboardSupabase";

type FilterType = "all" | "billing" | "workspace" | "api" | "auth" | "settings" | "system";

const FILTER_LABELS: { key: FilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "billing", label: "Billing" },
  { key: "workspace", label: "Workspaces" },
  { key: "api", label: "API" },
  { key: "settings", label: "Profile" },
  { key: "system", label: "System" },
];

const ICON_COLORS: Record<string, string> = {
  billing: "#c8882a",
  workspace: "#6b7280",
  api: "#c8882a",
  auth: "#16a34a",
  settings: "#7c3aed",
  system: "#6b7280",
};

function groupByDate(entries: DashboardActivity[]) {
  const groups: Record<string, DashboardActivity[]> = {};
  for (const e of entries) {
    const day = new Date(e.timestamp).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    if (!groups[day]) groups[day] = [];
    groups[day].push(e);
  }
  return groups;
}

export default function DashboardActivity() {
  const { user } = useAuth();
  const theme = useDashboardTheme();
  const [filter, setFilter] = useState<FilterType>("all");
  const [activity, setActivity] = useState<DashboardActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const amber = theme === "dark" ? "#d79a3d" : "#c8882a";
  const ink = theme === "dark" ? "#f3eee5" : "var(--ink)";
  const muted = theme === "dark" ? "#b1a692" : "var(--muted-ui)";
  const rule = theme === "dark" ? "rgba(243,238,229,0.08)" : "var(--rule)";
  const cardBg = theme === "dark" ? "#161411" : "var(--card-bg)";
  const innerBg = theme === "dark" ? "#1a1815" : "#ede7d9";

  const card: React.CSSProperties = { background: cardBg, border: `1px solid ${rule}`, borderRadius: "10px", padding: "28px" };
  const eyebrow: React.CSSProperties = { fontFamily: "'Geist Mono', monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: amber, display: "block", marginBottom: "6px" };

  useEffect(() => {
    let cancelled = false;

    if (!user?.id) {
      setLoading(false);
      return () => {
        cancelled = true;
      };
    }

    const run = async () => {
      try {
        const data = await loadDashboardActivity(user.id);
        if (!cancelled) {
          setActivity(data);
          setError(null);
        }
      } catch (nextError) {
        if (!cancelled) {
          setError(nextError instanceof Error ? nextError.message : "Failed to load activity.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const filteredEntries = useMemo(
    () => (filter === "all" ? activity : activity.filter((entry) => entry.type === filter)),
    [activity, filter],
  );
  const grouped = useMemo(() => groupByDate(filteredEntries), [filteredEntries]);

  const iconColor = (type: string) => {
    if (theme === "dark") {
      if (type === "auth") return "#16a34a";
      if (type === "workspace") return "#6b7280";
      if (type === "settings") return "#8b5cf6";
      return "#d79a3d";
    }
    return ICON_COLORS[type] ?? "#c8882a";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <div>
        <span style={eyebrow}>Activity</span>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: "32px", letterSpacing: "-0.02em", color: ink, margin: 0 }}>
          Account Activity
        </h1>
        <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "15px", color: muted, marginTop: "8px" }}>
          A log of live account events from your Supabase profile, workspaces, and API keys.
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
          {FILTER_LABELS.map(({ key, label }) => {
            const isActive = filter === key;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                style={{
                  padding: "7px 16px",
                  borderRadius: "20px",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.09em",
                  background: isActive ? amber : "transparent",
                  color: isActive ? "#fff" : muted,
                  border: `1px solid ${isActive ? amber : rule}`,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 16px",
            borderRadius: "6px",
            fontFamily: "'Geist Mono', monospace",
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            background: "transparent",
            border: `1px solid ${rule}`,
            color: muted,
            cursor: "pointer",
            transition: "all 0.18s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = amber; (e.currentTarget as HTMLButtonElement).style.color = amber; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = rule; (e.currentTarget as HTMLButtonElement).style.color = muted; }}
        >
          <Download size={12} /> Export CSV
        </button>
      </div>

      <div style={card}>
        {loading ? (
          <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "13px", color: muted }}>Loading account activity…</p>
        ) : error ? (
          <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "13px", color: "#ba1a1a" }}>{error}</p>
        ) : filteredEntries.length === 0 ? (
          <div style={{ textAlign: "center", padding: "56px 24px" }}>
            <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: "22px", color: ink, marginBottom: "8px" }}>No activity recorded yet.</p>
            <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.09em", color: muted }}>
              Waiting for account events from Supabase.
            </p>
          </div>
        ) : (
          Object.entries(grouped).map(([date, entries], gi) => (
            <div key={date} style={{ marginBottom: gi < Object.keys(grouped).length - 1 ? "32px" : 0 }}>
              <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: amber, marginBottom: "16px" }}>
                {date}
              </p>

              <div style={{ position: "relative", paddingLeft: "32px" }}>
                <div style={{ position: "absolute", left: "11px", top: "10px", bottom: "10px", width: "1px", background: `rgba(200,136,42,0.2)` }} />

                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {entries.map((entry) => (
                    <div
                      key={entry.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "16px",
                        padding: "14px 16px",
                        borderRadius: "8px",
                        background: innerBg,
                        border: `1px solid ${rule}`,
                        position: "relative",
                        marginBottom: "8px",
                        transition: "border-color 0.15s ease",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(200,136,42,0.35)`; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = rule; }}
                    >
                      <div style={{
                        position: "absolute", left: "-26px", top: "50%", transform: "translateY(-50%)",
                        width: "22px", height: "22px", borderRadius: "50%",
                        background: `${iconColor(entry.type)}20`,
                        border: `1.5px solid ${iconColor(entry.type)}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: iconColor(entry.type) }} />
                      </div>

                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "14px", fontWeight: 500, color: ink, margin: 0 }}>{entry.title}</p>
                        <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "12px", color: muted, marginTop: "2px" }}>{entry.detail}</p>
                      </div>

                      <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.07em", color: muted, whiteSpace: "nowrap", flexShrink: 0 }}>
                        {formatDateTime(entry.timestamp)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

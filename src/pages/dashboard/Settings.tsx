import { useEffect, useState } from "react";
import { Save, AlertTriangle, Moon, Sun } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboardTheme } from "@/components/dashboard/dashboardTheme";
import { applyTheme } from "@/lib/theme";
import {
  loadDashboardSettings,
  saveDashboardSettings,
} from "@/components/dashboard/dashboardSupabase";
import type { DashboardSettings as DashboardSettingsModel } from "@/components/dashboard/dashboardData";

export default function DashboardSettings() {
  const { user } = useAuth();
  const theme = useDashboardTheme();

  const [displayName, setDisplayName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [timezone, setTimezone] = useState("");
  const [notifications, setNotifications] = useState({ email: false, usage: false, billing: false });
  const [profileTheme, setProfileTheme] = useState<DashboardSettingsModel["theme"]>("system");
  const [defaultWorkspaceId, setDefaultWorkspaceId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const amber = theme === "dark" ? "#d79a3d" : "#c8882a";
  const ink = theme === "dark" ? "#f3eee5" : "var(--ink)";
  const muted = theme === "dark" ? "#b1a692" : "var(--muted-ui)";
  const rule = theme === "dark" ? "rgba(243,238,229,0.08)" : "var(--rule)";
  const cardBg = theme === "dark" ? "#161411" : "var(--card-bg)";
  const innerBg = theme === "dark" ? "#1a1815" : "#ede7d9";
  const inputBg = theme === "dark" ? "#1a1815" : "#faf7f2";

  const card: React.CSSProperties = { background: cardBg, border: `1px solid ${rule}`, borderRadius: "10px", padding: "28px", marginBottom: "0" };
  const eyebrow: React.CSSProperties = { fontFamily: "'Geist Mono', monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: amber, display: "block", marginBottom: "6px" };
  const sectionRule: React.CSSProperties = { display: "block", width: "32px", height: "2px", background: amber, marginBottom: "12px" };
  const inputStyle: React.CSSProperties = {
    background: inputBg,
    border: `1px solid ${rule}`,
    borderRadius: "6px",
    padding: "10px 14px",
    fontFamily: "'Geist Mono', monospace",
    fontSize: "12px",
    color: ink,
    outline: "none",
    width: "100%",
    boxSizing: "border-box" as const,
    transition: "border-color 0.18s ease",
  };

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
        const settings = await loadDashboardSettings(user.id);
        if (cancelled) return;

        if (settings) {
          setDisplayName(settings.displayName);
          setCompany(settings.company);
          setRole(settings.role);
          setTimezone(settings.timezone);
          setNotifications({
            email: settings.notifications,
            usage: settings.notifications,
            billing: false,
          });
          setProfileTheme(settings.theme);
          setDefaultWorkspaceId(settings.defaultWorkspaceId);
        } else {
          setDisplayName("");
          setCompany("");
          setRole("");
          setTimezone("");
          setNotifications({ email: false, usage: false, billing: false });
          setProfileTheme("system");
          setDefaultWorkspaceId("");
        }
        setError(null);
      } catch (nextError) {
        if (!cancelled) {
          setError(nextError instanceof Error ? nextError.message : "Failed to load settings.");
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

  const handleSave = async () => {
    if (!user?.email || !user?.id) {
      toast.error("No authenticated user found.");
      return;
    }

    setSaving(true);
    try {
      await saveDashboardSettings(user.id, {
        displayName,
        company,
        role,
        email: user.email,
        timezone,
        notifications: notifications.email || notifications.usage || notifications.billing,
        theme: profileTheme,
        defaultWorkspaceId,
      });
      applyTheme(profileTheme === "system" ? theme : profileTheme);
      toast.success("Profile updated.");
    } catch (nextError) {
      toast.error(nextError instanceof Error ? nextError.message : "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      style={{
        width: "44px",
        height: "24px",
        borderRadius: "12px",
        background: on ? amber : theme === "dark" ? "rgba(243,238,229,0.12)" : "rgba(14,14,11,0.1)",
        border: "none",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.2s ease",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "3px",
          left: on ? "23px" : "3px",
          width: "18px",
          height: "18px",
          borderRadius: "50%",
          background: "#fff",
          transition: "left 0.2s ease",
        }}
      />
    </button>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "720px" }}>
      <div>
        <span style={eyebrow}>Settings</span>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: "32px", letterSpacing: "-0.02em", color: ink, margin: 0 }}>
          Account Preferences
        </h1>
        <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "15px", color: muted, marginTop: "8px" }}>
          Manage your profile, appearance, and notification settings.
        </p>
      </div>

      <div style={card}>
        <span style={sectionRule} />
        <span style={eyebrow}>Profile</span>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: "22px", color: ink, marginBottom: "24px" }}>
          Personal Information
        </h2>

        {loading ? (
          <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "13px", color: muted }}>Loading account settings…</p>
        ) : error ? (
          <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "13px", color: "#ba1a1a" }}>{error}</p>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "24px", marginBottom: "24px" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: `rgba(200,136,42,0.12)`,
                  border: `2px solid ${amber}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: "24px",
                  fontWeight: 600,
                  color: amber,
                }}
              >
                {(user?.email?.[0] ?? "U").toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: muted, marginBottom: "4px" }}>Account</p>
                <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "14px", fontWeight: 500, color: ink }}>{user?.email ?? "user@example.com"}</p>
                <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "11px", color: muted, marginTop: "2px" }}>Supabase-authenticated account</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: muted, display: "block", marginBottom: "6px" }}>Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  style={inputStyle}
                  placeholder="Your display name"
                  onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = amber; }}
                  onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = rule; }}
                />
              </div>
              <div>
                <label style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: muted, display: "block", marginBottom: "6px" }}>Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  style={inputStyle}
                  placeholder="Your company"
                  onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = amber; }}
                  onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = rule; }}
                />
              </div>
              <div>
                <label style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: muted, display: "block", marginBottom: "6px" }}>Role</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={inputStyle}
                  placeholder="Your role"
                  onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = amber; }}
                  onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = rule; }}
                />
              </div>
              <div>
                <label style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: muted, display: "block", marginBottom: "6px" }}>Timezone</label>
                <input
                  type="text"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  style={inputStyle}
                  placeholder="Asia/Calcutta"
                  onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = amber; }}
                  onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = rule; }}
                />
              </div>
              <div>
                <label style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: muted, display: "block", marginBottom: "6px" }}>Default Workspace Id</label>
                <input
                  type="text"
                  value={defaultWorkspaceId}
                  onChange={(e) => setDefaultWorkspaceId(e.target.value)}
                  style={inputStyle}
                  placeholder="Optional"
                  onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = amber; }}
                  onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = rule; }}
                />
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="amber-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  alignSelf: "flex-start",
                  padding: "10px 22px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  border: "none",
                  cursor: saving ? "not-allowed" : "pointer",
                  fontFamily: "'Geist Mono', monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  opacity: saving ? 0.7 : 1,
                }}
              >
                <Save size={13} /> {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </>
        )}
      </div>

      <div style={card}>
        <span style={sectionRule} />
        <span style={eyebrow}>Appearance</span>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: "22px", color: ink, marginBottom: "20px" }}>
          Theme
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {[
            { key: "light", label: "Light", icon: Sun, desc: "Warm paper — ideal for daytime" },
            { key: "dark", label: "Dark", icon: Moon, desc: "Deep ink — ideal for night work" },
          ].map(({ key, label, icon: Icon, desc }) => {
            const isActive = profileTheme === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setProfileTheme(key as "light" | "dark");
                  applyTheme(key as "light" | "dark");
                }}
                style={{
                  background: innerBg,
                  border: `2px solid ${isActive ? amber : rule}`,
                  borderRadius: "8px",
                  padding: "16px 20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  textAlign: "left",
                  transition: "border-color 0.18s ease",
                }}
              >
                <Icon size={18} style={{ color: isActive ? amber : muted, flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "14px", fontWeight: 500, color: ink, margin: 0 }}>{label}</p>
                  <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "12px", color: muted, marginTop: "2px" }}>{desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div style={card}>
        <span style={sectionRule} />
        <span style={eyebrow}>Notifications</span>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: "22px", color: ink, marginBottom: "20px" }}>
          Alert Preferences
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {[
            { key: "email" as const, label: "Email notifications", desc: "Receive updates about your account via email" },
            { key: "usage" as const, label: "Usage alerts", desc: "Get notified when you approach plan limits" },
            { key: "billing" as const, label: "Billing updates", desc: "Receive receipts and billing change notifications" },
          ].map(({ key, label, desc }) => (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                padding: "14px 16px",
                borderRadius: "8px",
                background: innerBg,
              }}
            >
              <div>
                <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "14px", fontWeight: 500, color: ink, margin: 0 }}>{label}</p>
                <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "12px", color: muted, marginTop: "2px" }}>{desc}</p>
              </div>
              <Toggle on={notifications[key]} onToggle={() => setNotifications((n) => ({ ...n, [key]: !n[key] }))} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...card, borderLeft: "3px solid #ba1a1a", padding: "24px 28px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "16px" }}>
          <AlertTriangle size={16} style={{ color: "#ba1a1a", flexShrink: 0, marginTop: "2px" }} />
          <div>
            <span style={{ ...eyebrow, color: "#ba1a1a" }}>Danger Zone</span>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: "20px", color: ink, margin: 0 }}>
              Delete Account
            </h2>
            <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "13px", color: muted, marginTop: "6px", lineHeight: 1.6 }}>
              This action is irreversible. All data — workspaces, API keys, billing history, and settings — will be permanently removed.
            </p>
          </div>
        </div>
        <button
          style={{
            background: "transparent",
            border: "1px solid #ba1a1a",
            color: "#ba1a1a",
            padding: "9px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontFamily: "'Geist Mono', monospace",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            transition: "all 0.18s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(186,26,26,0.07)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
          onClick={() => toast.error("Account deletion requires confirmation. Please contact support.", { duration: 5000 })}
        >
          Delete Account Permanently
        </button>
      </div>
    </div>
  );
}

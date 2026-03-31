import { useEffect, useState } from "react";
import { Copy, Trash2, ShieldCheck, AlertTriangle, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboardTheme } from "@/components/dashboard/dashboardTheme";
import {
  createDashboardApiKey,
  loadDashboardApiKeys,
  revokeDashboardApiKey,
} from "@/components/dashboard/dashboardSupabase";
import type { DashboardApiKey } from "@/components/dashboard/dashboardData";
import { formatDate, maskApiKey } from "@/components/dashboard/dashboardData";

export default function DashboardApiKeys() {
  const { user } = useAuth();
  const theme = useDashboardTheme();
  const [keys, setKeys] = useState<DashboardApiKey[]>([]);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyScope, setNewKeyScope] = useState("read-write");
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastGeneratedSecret, setLastGeneratedSecret] = useState<string | null>(null);

  const amber = theme === "dark" ? "#d79a3d" : "#c8882a";
  const ink = theme === "dark" ? "#f3eee5" : "var(--ink)";
  const muted = theme === "dark" ? "#b1a692" : "var(--muted-ui)";
  const rule = theme === "dark" ? "rgba(243,238,229,0.08)" : "var(--rule)";
  const cardBg = theme === "dark" ? "#161411" : "var(--card-bg)";
  const innerBg = theme === "dark" ? "#1a1815" : "#ede7d9";
  const inputBg = theme === "dark" ? "#1a1815" : "#faf7f2";

  const card: React.CSSProperties = { background: cardBg, border: `1px solid ${rule}`, borderRadius: "10px", padding: "28px" };
  const eyebrow: React.CSSProperties = { fontFamily: "'Geist Mono', monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: amber, display: "block", marginBottom: "6px" };
  const sectionRule: React.CSSProperties = { display: "block", width: "32px", height: "2px", background: amber, marginBottom: "12px" };

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
        const data = await loadDashboardApiKeys(user.id);
        if (!cancelled) {
          setKeys(data);
          setError(null);
        }
      } catch (nextError) {
        if (!cancelled) {
          setError(nextError instanceof Error ? nextError.message : "Failed to load API keys.");
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

  const handleGenerate = async () => {
    if (!user?.id) {
      toast.error("No authenticated user found.");
      return;
    }
    if (!newKeyName.trim()) {
      toast.error("Please enter a key name.");
      return;
    }

    setGenerating(true);
    try {
      const created = await createDashboardApiKey(newKeyName.trim(), [newKeyScope]);
      setKeys((prev) => [created, ...prev]);
      setLastGeneratedSecret(created.secret ?? null);
      setNewKeyName("");
      toast.success("API key generated. Copy it now — it will not be shown again.");
    } catch (nextError) {
      toast.error(nextError instanceof Error ? nextError.message : "Failed to generate API key.");
    } finally {
      setGenerating(false);
    }
  };

  const handleRevoke = async (id: string) => {
    try {
      await revokeDashboardApiKey(id);
      setKeys((prev) => prev.filter((k) => k.id !== id));
      toast.success("API key revoked.");
    } catch (nextError) {
      toast.error(nextError instanceof Error ? nextError.message : "Failed to revoke API key.");
    }
  };

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
    boxSizing: "border-box",
  };
  const selectStyle: React.CSSProperties = { ...inputStyle, cursor: "pointer" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <div>
        <span style={eyebrow}>API Keys</span>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: "32px", letterSpacing: "-0.02em", color: ink, margin: 0 }}>
          Manage Access Keys
        </h1>
        <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "15px", color: muted, marginTop: "8px" }}>
          Generate and manage API keys for the QuanSynd platform and Vibe ADE.
        </p>
      </div>

      <div style={{ ...card, padding: "16px 20px", borderLeft: `3px solid ${amber}`, display: "flex", alignItems: "flex-start", gap: "12px" }}>
        <ShieldCheck size={16} style={{ color: amber, flexShrink: 0, marginTop: "2px" }} />
        <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "13px", color: ink, lineHeight: 1.6, margin: 0 }}>
          Your API keys are scoped to this account only. New accounts start with no keys until one is created here.
        </p>
      </div>

      {lastGeneratedSecret && (
        <div style={{ ...card, borderLeft: `3px solid ${amber}` }}>
          <span style={eyebrow}>Newly Generated</span>
          <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "13px", color: muted, marginBottom: "10px" }}>
            Copy this secret now. It will not be shown again.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <code style={{ background: innerBg, color: ink, padding: "10px 12px", borderRadius: "6px", fontFamily: "'Geist Mono', monospace", fontSize: "12px" }}>
              {maskApiKey(lastGeneratedSecret)}
            </code>
            <button
              onClick={() => {
                void navigator.clipboard.writeText(lastGeneratedSecret);
                toast.success("Secret copied.");
              }}
              className="amber-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 16px",
                borderRadius: "6px",
                fontSize: "12px",
                fontFamily: "'Geist Mono', monospace",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                border: "none",
              }}
            >
              <Copy size={12} /> Copy Secret
            </button>
          </div>
        </div>
      )}

      <div style={card}>
        <span style={sectionRule} />
        <span style={eyebrow}>New Key</span>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: "22px", color: ink, marginBottom: "20px" }}>
          Generate New Key
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 200px auto", gap: "12px", alignItems: "flex-end" }}>
          <div>
            <label style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: muted, display: "block", marginBottom: "6px" }}>
              Key Name
            </label>
            <input
              type="text"
              placeholder="e.g. production-vibe-app"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && void handleGenerate()}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: muted, display: "block", marginBottom: "6px" }}>
              Scope
            </label>
            <select value={newKeyScope} onChange={(e) => setNewKeyScope(e.target.value)} style={selectStyle}>
              <option value="read-only">Read-only</option>
              <option value="read-write">Read-write</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            onClick={() => void handleGenerate()}
            disabled={generating}
            className="amber-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 20px",
              borderRadius: "6px",
              fontSize: "12px",
              fontFamily: "'Geist Mono', monospace",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              cursor: generating ? "not-allowed" : "pointer",
              border: "none",
              opacity: generating ? 0.7 : 1,
            }}
          >
            <PlusCircle size={13} /> {generating ? "Generating…" : "Generate Key"}
          </button>
        </div>
        <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", color: muted, marginTop: "10px", letterSpacing: "0.06em" }}>
          ⚠ Keys are shown only once upon creation. Copy and store it securely.
        </p>
      </div>

      <div style={card}>
        <span style={sectionRule} />
        <span style={eyebrow}>Active Keys</span>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: "22px", color: ink, marginBottom: "20px" }}>
          {keys.length} key{keys.length !== 1 ? "s" : ""} in use
        </h2>

        {loading ? (
          <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "13px", color: muted }}>Loading account keys…</p>
        ) : error ? (
          <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "13px", color: "#ba1a1a" }}>{error}</p>
        ) : keys.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 24px" }}>
            <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: "18px", color: muted }}>No API keys yet.</p>
            <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "11px", color: muted, marginTop: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Generate your first key above.
            </p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Name", "Prefix", "Scopes", "Created", "Last Used", "Actions"].map((h) => (
                  <th
                    key={h}
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: "9px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: muted,
                      textAlign: "left",
                      padding: "8px 12px",
                      borderBottom: `1px solid ${rule}`,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {keys.map((k) => (
                <tr
                  key={k.id}
                  style={{ transition: "background 0.15s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = `rgba(200,136,42,0.04)`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = "transparent"; }}
                >
                  <td style={{ fontFamily: "'Geist', sans-serif", fontSize: "13px", fontWeight: 500, color: ink, padding: "14px 12px" }}>{k.name}</td>
                  <td style={{ fontFamily: "'Geist Mono', monospace", fontSize: "12px", color: muted, padding: "14px 12px" }}>{maskApiKey(k.keyPrefix)}</td>
                  <td style={{ padding: "14px 12px" }}>
                    <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 10px", borderRadius: "20px", background: `rgba(200,136,42,0.1)`, color: amber, border: `1px solid rgba(200,136,42,0.25)` }}>
                      {k.scopes.join(", ") || "none"}
                    </span>
                  </td>
                  <td style={{ fontFamily: "'Geist Mono', monospace", fontSize: "11px", color: muted, padding: "14px 12px" }}>{formatDate(k.createdAt)}</td>
                  <td style={{ fontFamily: "'Geist Mono', monospace", fontSize: "11px", color: muted, padding: "14px 12px" }}>
                    {k.lastUsedAt ? formatDate(k.lastUsedAt) : "Never"}
                  </td>
                  <td style={{ padding: "14px 12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <button
                        onClick={() => {
                          void navigator.clipboard.writeText(k.keyPrefix);
                          toast.success("Prefix copied.");
                        }}
                        style={{ background: "none", border: "none", cursor: "pointer", color: muted, display: "flex", alignItems: "center", gap: "4px", fontFamily: "'Geist Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", transition: "color 0.15s" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = amber; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = muted; }}
                      >
                        <Copy size={12} /> Copy
                      </button>
                      <button
                        onClick={() => void handleRevoke(k.id)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#ba1a1a", display: "flex", alignItems: "center", gap: "4px", fontFamily: "'Geist Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}
                      >
                        <Trash2 size={12} /> Revoke
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ ...card, padding: "18px 22px", display: "flex", alignItems: "flex-start", gap: "12px", borderLeft: `3px solid ${theme === "dark" ? "rgba(215,154,61,0.5)" : "rgba(200,136,42,0.4)"}` }}>
        <AlertTriangle size={15} style={{ color: amber, flexShrink: 0, marginTop: "2px" }} />
        <div>
          <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: amber, marginBottom: "4px" }}>Security reminder</p>
          <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "13px", color: muted, lineHeight: 1.6 }}>
            Never expose API keys in client-side code, public repositories, or unencrypted storage. Rotate keys regularly and revoke any that may have been compromised.
          </p>
        </div>
      </div>
    </div>
  );
}

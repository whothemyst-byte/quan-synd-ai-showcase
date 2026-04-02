import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Download } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { formatCurrency, formatDateTime, type BillingInvoice } from "@/components/dashboard/dashboardData";
import { loadBillingInvoices } from "@/components/dashboard/dashboardSupabase";
import { useCloudDashboard } from "@/components/dashboard/cloudDashboard";
import { useDashboardTheme } from "@/components/dashboard/dashboardTheme";
import { VIBE_ADE_PRICING_PLANS } from "@/lib/vibeAdePricing";

export default function DashboardBilling() {
  const { user } = useAuth();
  const theme = useDashboardTheme();
  const { snapshot, plan, loading } = useCloudDashboard(user?.id);
  const currentTier = snapshot?.profile?.tier ?? "spark";
  const [billingInvoices, setBillingInvoices] = useState<BillingInvoice[]>([]);
  const [billingInvoiceLoading, setBillingInvoiceLoading] = useState(true);
  const [billingInvoiceError, setBillingInvoiceError] = useState<string | null>(null);

  const amber = theme === "dark" ? "#d79a3d" : "#c8882a";
  const ink = theme === "dark" ? "#f3eee5" : "var(--ink)";
  const muted = theme === "dark" ? "#b1a692" : "var(--muted-ui)";
  const rule = theme === "dark" ? "rgba(243,238,229,0.08)" : "var(--rule)";
  const cardBg = theme === "dark" ? "#161411" : "var(--card-bg)";
  const innerBg = theme === "dark" ? "#1a1815" : "#ede7d9";

  const card: React.CSSProperties = { background: cardBg, border: `1px solid ${rule}`, borderRadius: "10px", padding: "28px" };
  const eyebrow: React.CSSProperties = { fontFamily: "'Geist Mono', monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: amber, display: "block", marginBottom: "6px" };
  const sectionRule: React.CSSProperties = { display: "block", width: "32px", height: "2px", background: amber, marginBottom: "12px" };

  useEffect(() => {
    let cancelled = false;

    if (!user?.id) {
      setBillingInvoices([]);
      setBillingInvoiceLoading(false);
      setBillingInvoiceError(null);
      return () => {
        cancelled = true;
      };
    }

    const run = async () => {
      try {
        const data = await loadBillingInvoices(user.id);
        if (!cancelled) {
          setBillingInvoices(data);
          setBillingInvoiceError(null);
        }
      } catch (nextError) {
        if (!cancelled) {
          setBillingInvoiceError(nextError instanceof Error ? nextError.message : "Failed to load billing records.");
        }
      } finally {
        if (!cancelled) {
          setBillingInvoiceLoading(false);
        }
      }
    };

    setBillingInvoiceLoading(true);
    void run();

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <div>
        <span style={eyebrow}>Billing</span>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: "32px", letterSpacing: "-0.02em", color: ink, margin: 0 }}>
          Plan & Payments
        </h1>
        <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "15px", color: muted, marginTop: "8px" }}>
          Manage your subscription and view payment history.
        </p>
      </div>

      <div style={{ ...card, borderLeft: `3px solid ${amber}` }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: "22px", color: ink }}>
                {plan.label}
              </span>
              <span
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: "9px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "3px 10px",
                  borderRadius: "20px",
                  background: "rgba(200,136,42,0.12)",
                  color: amber,
                  border: `1px solid rgba(200,136,42,0.3)`,
                }}
              >
                {currentTier === "spark" ? "Free" : "Active"}
              </span>
            </div>
            <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "14px", color: muted, marginBottom: "16px", maxWidth: "440px" }}>
              Your subscription is currently on the <strong style={{ color: ink }}>{currentTier}</strong> plan.
              {currentTier === "spark" ? " Upgrade to unlock more workspaces, swarms, and priority support." : " All features are active for this billing cycle."}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              {plan.features.map((feature) => (
                <li key={feature} style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Geist', sans-serif", fontSize: "13px", color: ink }}>
                  <Check size={13} style={{ color: amber, flexShrink: 0 }} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-end" }}>
            <Link
              to="/products/vibe-ade/pricing"
              className="amber-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "11px 22px",
                borderRadius: "6px",
                fontSize: "13px",
                textDecoration: "none",
                fontFamily: "'Geist Mono', monospace",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Upgrade Plan <ArrowRight size={13} />
            </Link>
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", color: muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Renews {snapshot?.profile?.usage_month ?? "monthly"}
            </span>
          </div>
        </div>
      </div>

      <div style={card}>
        <span style={sectionRule} />
        <span style={eyebrow}>Payment History</span>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: "22px", color: ink, marginBottom: "20px" }}>
          Billing Invoices & Transactions
        </h2>

        {loading || billingInvoiceLoading ? (
          <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "13px", color: muted }}>Loading...</p>
        ) : billingInvoiceError ? (
          <div style={{ textAlign: "center", padding: "40px 24px" }}>
            <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: "18px", color: muted }}>{billingInvoiceError}</p>
          </div>
        ) : billingInvoices.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 24px" }}>
            <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: "18px", color: muted }}>No billing records yet.</p>
            <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "11px", color: muted, marginTop: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Your live billing history appears here after a checkout writes to Supabase.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {billingInvoices.map((invoice) => {
              const statusColor =
                invoice.status === "paid" ? "#2e7d32" : invoice.status === "pending" ? amber : invoice.status === "refunded" ? "#8b5cf6" : "#ba1a1a";
              return (
                <div
                  key={invoice.id}
                  style={{
                    background: innerBg,
                    border: `1px solid ${rule}`,
                    borderRadius: "8px",
                    padding: "14px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "16px",
                    alignItems: "center",
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "13px", fontWeight: 500, color: ink, margin: 0 }}>
                      {invoice.planTier.toUpperCase()} {invoice.billingInterval} invoice
                    </p>
                    <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "12px", color: muted, marginTop: "2px" }}>
                      {invoice.invoiceNumber} · {formatCurrency(invoice.amount, invoice.currency)}
                    </p>
                    <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "12px", color: muted, marginTop: "2px" }}>
                      Provider: {invoice.provider}
                      {invoice.paymentMethod ? ` · ${invoice.paymentMethod}` : ""}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", textTransform: "uppercase", color: statusColor, margin: 0 }}>
                        {invoice.status}
                      </p>
                      <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", textTransform: "uppercase", color: muted, marginTop: "4px" }}>
                        {formatDateTime(invoice.createdAt)}
                      </p>
                    </div>
                    {invoice.receiptUrl ? (
                      <a
                        href={invoice.receiptUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Download receipt ${invoice.invoiceNumber}`}
                        style={{ color: amber, display: "inline-flex" }}
                      >
                        <Download size={16} />
                      </a>
                    ) : (
                      <span style={{ color: muted, display: "inline-flex" }}>
                        <Download size={16} />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <span style={sectionRule} />
        <span style={eyebrow}>Available Plans</span>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: "22px", color: ink, marginBottom: "20px" }}>
          Compare & Upgrade
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {VIBE_ADE_PRICING_PLANS.map((p) => {
            const isCurrent = p.id === currentTier;
            const price = p.monthlyPrice === 0 ? "Free" : `$${p.monthlyPrice} / mo`;
            return (
              <div
                key={p.id}
                style={{
                  ...card,
                  border: isCurrent ? `2px solid ${amber}` : `1px solid ${rule}`,
                  position: "relative",
                  padding: "24px",
                  background: p.dark ? (theme === "dark" ? "#11100d" : "#f3ede2") : cardBg,
                }}
              >
                {p.badge && !isCurrent && (
                  <span
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: "9px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "3px 10px",
                      borderRadius: "20px",
                      background: amber,
                      color: "#fff",
                    }}
                  >
                    {p.badge}
                  </span>
                )}
                {isCurrent && (
                  <span
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: "9px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "3px 10px",
                      borderRadius: "20px",
                      background: "rgba(200,136,42,0.12)",
                      color: amber,
                      border: `1px solid rgba(200,136,42,0.3)`,
                    }}
                  >
                    Current
                  </span>
                )}
                <p style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: "22px", color: ink, marginBottom: "4px" }}>
                  {p.label}
                </p>
                <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: "28px", color: amber, margin: "8px 0 4px" }}>
                  {price}
                </p>
                <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "13px", color: muted, marginBottom: "16px" }}>
                  {p.tagline}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {p.features.map((feature) => (
                    <li key={feature} style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Geist', sans-serif", fontSize: "13px", color: ink }}>
                      <Check size={12} style={{ color: amber, flexShrink: 0 }} /> {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/products/vibe-ade/pricing"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "6px",
                    padding: "10px 16px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    textDecoration: "none",
                    fontFamily: "'Geist Mono', monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    background: isCurrent ? "transparent" : p.highlight ? amber : "transparent",
                    color: isCurrent ? amber : p.highlight ? "#fff" : ink,
                    border: isCurrent ? `1px solid ${rule}` : p.highlight ? "none" : `1px solid ${rule}`,
                    transition: "all 0.18s ease",
                  }}
                >
                  {isCurrent ? "Current plan" : p.cta} <ArrowRight size={12} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

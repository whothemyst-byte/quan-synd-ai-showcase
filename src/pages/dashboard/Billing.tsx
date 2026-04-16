import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Download } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { formatCurrency, formatDateTime, type BillingInvoice } from "@/components/dashboard/dashboardData";
import { loadBillingInvoices } from "@/components/dashboard/dashboardSupabase";
import { useCloudDashboard } from "@/components/dashboard/cloudDashboard";
import { useDashboardTheme } from "@/components/dashboard/dashboardTheme";
import { downloadInvoicePdf } from "@/lib/invoicePdf";

export default function DashboardBilling() {
  const { user } = useAuth();
  const theme = useDashboardTheme();
  const { snapshot, plan, loading } = useCloudDashboard(user?.id);
  const currentTier = snapshot?.planTier ?? snapshot?.profile?.tier ?? "spark";
  const planPerks = Array.isArray(plan.perks) ? plan.perks : [];
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
                  border: "1px solid rgba(200,136,42,0.3)",
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
              {planPerks.map((feature) => (
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
          <div style={{ overflowX: "auto", border: `1px solid ${rule}`, borderRadius: "8px", background: innerBg }}>
            <table style={{ width: "100%", minWidth: "820px", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "12px 14px", fontFamily: "'Geist Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: muted, borderBottom: `1px solid ${rule}` }}>Date</th>
                  <th style={{ textAlign: "left", padding: "12px 14px", fontFamily: "'Geist Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: muted, borderBottom: `1px solid ${rule}` }}>Invoice</th>
                  <th style={{ textAlign: "left", padding: "12px 14px", fontFamily: "'Geist Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: muted, borderBottom: `1px solid ${rule}` }}>Plan</th>
                  <th style={{ textAlign: "left", padding: "12px 14px", fontFamily: "'Geist Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: muted, borderBottom: `1px solid ${rule}` }}>Amount</th>
                  <th style={{ textAlign: "left", padding: "12px 14px", fontFamily: "'Geist Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: muted, borderBottom: `1px solid ${rule}` }}>Provider</th>
                  <th style={{ textAlign: "left", padding: "12px 14px", fontFamily: "'Geist Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: muted, borderBottom: `1px solid ${rule}` }}>Status</th>
                  <th style={{ textAlign: "center", padding: "12px 14px", fontFamily: "'Geist Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: muted, borderBottom: `1px solid ${rule}` }}>Download</th>
                </tr>
              </thead>
              <tbody>
                {billingInvoices.map((invoice) => {
                  const statusColor =
                    invoice.status === "paid" ? "#2e7d32" : invoice.status === "pending" ? amber : invoice.status === "refunded" ? "#8b5cf6" : "#ba1a1a";

                  return (
                    <tr key={invoice.id}>
                      <td style={{ padding: "12px 14px", borderBottom: `1px solid ${rule}`, fontFamily: "'Geist', sans-serif", fontSize: "12px", color: muted }}>
                        {formatDateTime(invoice.createdAt)}
                      </td>
                      <td style={{ padding: "12px 14px", borderBottom: `1px solid ${rule}`, fontFamily: "'Geist', sans-serif", fontSize: "13px", color: ink }}>
                        {invoice.invoiceNumber}
                      </td>
                      <td style={{ padding: "12px 14px", borderBottom: `1px solid ${rule}`, fontFamily: "'Geist', sans-serif", fontSize: "13px", color: ink }}>
                        {invoice.planTier.toUpperCase()} {invoice.billingInterval}
                      </td>
                      <td style={{ padding: "12px 14px", borderBottom: `1px solid ${rule}`, fontFamily: "'Geist', sans-serif", fontSize: "13px", color: ink }}>
                        {formatCurrency(invoice.amount, invoice.currency)}
                      </td>
                      <td style={{ padding: "12px 14px", borderBottom: `1px solid ${rule}`, fontFamily: "'Geist', sans-serif", fontSize: "12px", color: muted }}>
                        {invoice.provider}
                        {invoice.paymentMethod ? ` · ${invoice.paymentMethod}` : ""}
                      </td>
                      <td style={{ padding: "12px 14px", borderBottom: `1px solid ${rule}` }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "3px 8px",
                            borderRadius: "999px",
                            fontFamily: "'Geist Mono', monospace",
                            fontSize: "10px",
                            textTransform: "uppercase",
                            color: statusColor,
                            border: `1px solid ${statusColor}33`,
                            background: `${statusColor}14`,
                          }}
                        >
                          {invoice.status}
                        </span>
                      </td>
                      <td style={{ padding: "12px 14px", borderBottom: `1px solid ${rule}`, textAlign: "center" }}>
                        <button
                          type="button"
                          onClick={() => {
                            void downloadInvoicePdf(invoice);
                          }}
                          aria-label={`Download invoice PDF ${invoice.invoiceNumber}`}
                          style={{
                            color: amber,
                            display: "inline-flex",
                            background: "none",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                          }}
                        >
                          <Download size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

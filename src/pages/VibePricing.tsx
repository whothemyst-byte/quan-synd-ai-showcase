import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Minus, ArrowRight, Download, Zap, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/seo/Seo";

/* ─── DATA ─────────────────────────────────────────────────── */

const plans = [
  {
    id: "spark",
    label: "SPARK",
    tagline: "Strike the first spark",
    monthlyPrice: 0,
    annualPrice: 0,
    cta: "Get Started Free",
    ctaHref: "https://github.com/whothemyst-byte/Vibe_ADE/releases",
    ctaExternal: true,
    highlight: false,
    dark: false,
    badge: null,
    features: [
      "2 workspaces",
      "4 terminal panes per workspace",
      "Cloud sync (2 workspaces)",
      "Community support",
    ],
  },
  {
    id: "flux",
    label: "FLUX",
    tagline: "Stay in the flow",
    monthlyPrice: 12,
    annualPrice: 10,
    cta: "Start Flux",
    ctaHref: "#",
    ctaExternal: false,
    highlight: true,
    dark: false,
    badge: "MOST POPULAR",
    features: [
      "Everything in Spark",
      "Unlimited workspaces",
      "Unlimited terminal panes",
      "Cloud sync — unlimited",
      "Task board — 300 tasks/month",
      "20 QuanSwarm runs / month",
      "5 concurrent agents per swarm",
      "Email support — 48 hr response",
      "Live usage counter in dashboard",
    ],
  },
  {
    id: "forge",
    label: "FORGE",
    tagline: "Build without limits",
    monthlyPrice: 25,
    annualPrice: 20,
    cta: "Start Forge",
    ctaHref: "#",
    ctaExternal: false,
    highlight: false,
    dark: true,
    badge: null,
    features: [
      "Everything in Flux",
      "Unlimited task board",
      "Unlimited QuanSwarm runs",
      "Unlimited concurrent agents",
      "Priority email — 12 hr response",
      "Beta / early access builds",
      "Advanced analytics & agent logs",
      "All future Pro+ features auto-unlock",
    ],
  },
];

const comparisonRows: { label: string; spark: string | boolean; flux: string | boolean; forge: string | boolean }[] = [
  { label: "Price", spark: "Free", flux: "$12 / mo", forge: "$25 / mo" },
  { label: "Annual price", spark: "—", flux: "$10 / mo", forge: "$20 / mo" },
  { label: "Workspaces", spark: "2", flux: "Unlimited", forge: "Unlimited" },
  { label: "Terminal panes", spark: "4 per workspace", flux: "Unlimited", forge: "Unlimited" },
  { label: "Cloud sync", spark: "2 workspaces", flux: "Unlimited", forge: "Unlimited" },
  { label: "Task board", spark: false, flux: "300 tasks / mo", forge: "Unlimited" },
  { label: "Swarm runs", spark: false, flux: "20 / mo", forge: "Unlimited" },
  { label: "Concurrent agents", spark: false, flux: "5", forge: "Unlimited" },
  { label: "Email support", spark: false, flux: "48 hr response", forge: "12 hr (priority)" },
  { label: "Beta / early access", spark: false, flux: false, forge: true },
  { label: "Advanced analytics", spark: false, flux: false, forge: true },
  { label: "Future features auto-unlock", spark: false, flux: false, forge: true },
];

const faqs = [
  {
    q: "Can I switch plans anytime?",
    a: "Yes. Upgrade from Spark to Flux or Forge instantly. Downgrades take effect at the end of your billing period.",
  },
  {
    q: "What happens if I hit a monthly limit?",
    a: "Limits reset on the 1st of each calendar month. When you reach your limit, the feature simply pauses — you're never charged extra.",
  },
  {
    q: "Is annual billing cancellable?",
    a: "Annual plans offer no mid-term cancellation penalties. You can cancel before the next renewal date and retain access for the remainder of your paid year.",
  },
];

/* ─── AMBER / PALETTE ─────────────────────────────────────── */
const AMBER = "var(--amber)";
const INK = "var(--ink)";
const PAPER = "var(--paper)";
const MUTED = "var(--muted-ui)";
const RULE = "var(--rule)";

/* ─── SUB-COMPONENTS ─────────────────────────────────────── */

function CheckCell({ value }: { value: string | boolean }) {
  if (value === false) {
    return (
      <span style={{ color: "rgba(138,128,112,0.5)", fontFamily: "'Geist Mono', monospace", fontSize: "14px" }}>
        —
      </span>
    );
  }
  if (value === true) {
    return <Check size={16} style={{ color: AMBER }} />;
  }
  return (
    <span style={{ fontFamily: "'Geist', sans-serif", fontSize: "13px", color: INK }}>
      {value}
    </span>
  );
}

/* ─── PAGE ────────────────────────────────────────────────── */

const VibePricing = () => {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const price = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === 0) return "Free";
    return `$${annual ? plan.annualPrice : plan.monthlyPrice}`;
  };

  return (
    <div style={{ background: PAPER, minHeight: "100vh" }}>
      <Seo
        title="Pricing — Vibe ADE | QuanSynd"
        description="Choose your Vibe ADE plan. Spark is free forever. Flux at $12/mo covers 90% of developers. Forge at $25/mo is unlimited — built for power builders."
        canonicalPath="/products/vibe-ade/pricing"
        ogType="website"
      />
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className="dot-grid-bg hero-section"
        style={{
          paddingTop: "120px",
          paddingBottom: "64px",
          paddingLeft: "24px",
          paddingRight: "24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              borderLeft: `2px solid ${AMBER}`,
              paddingLeft: "12px",
              marginBottom: "24px",
            }}
          >
            <span className="amber-label">Products — Vibe ADE — Pricing</span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              letterSpacing: "-0.02em",
              lineHeight: "1.1",
              color: INK,
              marginBottom: "20px",
            }}
          >
            Simple pricing.{" "}
            <em style={{ fontStyle: "italic" }}>Unlimited possibility.</em>
          </h1>
          <p
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: "17px",
              lineHeight: "1.7",
              color: MUTED,
              marginBottom: "36px",
            }}
          >
            Choose the plan that matches your workflow.
            Upgrade or cancel anytime.
          </p>

          {/* Monthly / Annual toggle */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: !annual ? INK : MUTED,
                fontWeight: !annual ? 600 : 400,
                transition: "color 0.15s",
              }}
            >
              Monthly
            </span>
            <button
              onClick={() => setAnnual((a) => !a)}
              style={{
                width: "52px",
                height: "28px",
                borderRadius: "99px",
                background: annual ? AMBER : "var(--rule)",
                border: "none",
                cursor: "pointer",
                position: "relative",
                transition: "background 0.2s ease",
                flexShrink: 0,
              }}
              aria-label="Toggle annual billing"
            >
              <span
                style={{
                  position: "absolute",
                  top: "4px",
                  left: annual ? "28px" : "4px",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "#fff",
                  transition: "left 0.2s ease",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }}
              />
            </button>
            <span
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: annual ? INK : MUTED,
                fontWeight: annual ? 600 : 400,
                transition: "color 0.15s",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Annual
              {annual && (
                <span
                  style={{
                    background: AMBER,
                    color: "#fff",
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.06em",
                    padding: "2px 6px",
                    borderRadius: "3px",
                    fontWeight: 600,
                  }}
                >
                  SAVE 17–20%
                </span>
              )}
            </span>
          </div>
        </div>
      </section>

      {/* ── PRICING CARDS ─────────────────────────────────────── */}
      <section style={{ padding: "0 24px 96px", background: PAPER }}>
        <div
          className="vibe-pricing-cards"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {plans.map((plan) => {
            const cardBg = plan.dark ? "var(--ink-strong)" : plan.highlight ? "var(--cream)" : PAPER;
            const cardTextColor = plan.dark ? "var(--paper-strong)" : INK;
            const cardMuted = plan.dark ? "rgba(243,238,229,0.6)" : MUTED;
            const borderStyle = plan.highlight
              ? `1px solid ${AMBER}`
              : `1px solid ${RULE}`;

            return (
              <div
                key={plan.id}
                style={{
                  background: cardBg,
                  border: borderStyle,
                  borderTop: plan.highlight ? `3px solid ${AMBER}` : `1px solid ${RULE}`,
                  borderRadius: "8px",
                  padding: "32px 28px",
                  position: "relative",
                  boxShadow: plan.highlight ? "var(--shadow-card)" : "none",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Badge */}
                {plan.badge && (
                  <span
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: "9px",
                      letterSpacing: "0.1em",
                      background: AMBER,
                      color: "#fff",
                      padding: "3px 8px",
                      borderRadius: "3px",
                      fontWeight: 600,
                    }}
                  >
                    {plan.badge}
                  </span>
                )}

                {/* Tier label */}
                <p
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: AMBER,
                    marginBottom: "6px",
                  }}
                >
                  {plan.label}
                </p>

                {/* Tagline */}
                <p
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: "italic",
                    fontSize: "1.05rem",
                    color: cardMuted,
                    marginBottom: "20px",
                    lineHeight: "1.4",
                  }}
                >
                  {plan.tagline}
                </p>

                {/* Price */}
                <div style={{ marginBottom: "8px" }}>
                  <span
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: "3rem",
                      fontWeight: 400,
                      color: cardTextColor,
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                    }}
                  >
                    {price(plan)}
                  </span>
                  {plan.monthlyPrice > 0 && (
                    <span
                      style={{
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: "12px",
                        color: cardMuted,
                        marginLeft: "4px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      / month
                    </span>
                  )}
                </div>

                {/* Annual note */}
                {plan.monthlyPrice > 0 && !annual && (
                  <p
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: "10px",
                      color: cardMuted,
                      opacity: 0.7,
                      marginBottom: "20px",
                      letterSpacing: "0.03em",
                    }}
                  >
                    or ${plan.annualPrice}/mo billed annually
                  </p>
                )}
                {plan.monthlyPrice > 0 && annual && (
                  <p
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: "10px",
                      color: AMBER,
                      marginBottom: "20px",
                      letterSpacing: "0.03em",
                    }}
                  >
                    billed ${(plan.annualPrice * 12)} annually
                  </p>
                )}
                {plan.monthlyPrice === 0 && <div style={{ height: "24px", marginBottom: "20px" }} />}

                {/* CTA */}
                {plan.ctaExternal ? (
                  <a
                    href={plan.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="amber-btn"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      padding: "12px 20px",
                      borderRadius: "6px",
                      fontSize: "14px",
                      textDecoration: "none",
                      marginBottom: "24px",
                    }}
                  >
                    <Download size={14} /> {plan.cta}
                  </a>
                ) : (
                  <a
                    href={plan.ctaHref}
                    className="amber-btn"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      padding: "12px 20px",
                      borderRadius: "6px",
                      fontSize: "14px",
                      textDecoration: "none",
                      marginBottom: "24px",
                    }}
                  >
                    <Zap size={14} /> {plan.cta}
                  </a>
                )}

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    background: plan.dark ? "rgba(245,240,232,0.1)" : RULE,
                    marginBottom: "20px",
                  }}
                />

                {/* Features */}
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        fontFamily: "'Geist', sans-serif",
                        fontSize: "13px",
                        color: cardTextColor,
                        lineHeight: "1.5",
                      }}
                    >
                      <Check
                        size={14}
                        style={{ color: AMBER, flexShrink: 0, marginTop: "2px" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>


      </section>

      {/* ── FULL COMPARISON TABLE ─────────────────────────────── */}
      <section
        className="cream-section"
        style={{
          padding: "80px 24px",
          borderTop: `1px solid ${RULE}`,
          borderBottom: `1px solid ${RULE}`,
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <span className="section-rule" />
          <span className="amber-label" style={{ display: "block", marginBottom: "12px" }}>
            Full Comparison
          </span>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              letterSpacing: "-0.02em",
              color: INK,
              marginBottom: "40px",
            }}
          >
            Everything, side by side.
          </h2>

          {/* Table wrapper for horizontal scroll on mobile */}
          <div className="vibe-table-wrap" style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                minWidth: "560px",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: MUTED,
                      fontWeight: 500,
                      padding: "0 0 16px 0",
                      textAlign: "left",
                      borderBottom: `1px solid ${RULE}`,
                      width: "38%",
                    }}
                  >
                    Feature
                  </th>
                  {["Spark", "Flux", "Forge"].map((h) => (
                    <th
                      key={h}
                      style={{
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: h === "Forge" ? AMBER : INK,
                        fontWeight: 600,
                        padding: "0 0 16px 16px",
                        textAlign: "center",
                        borderBottom: `1px solid ${h === "Flux" ? AMBER : RULE}`,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.label}
                    style={{ background: i % 2 === 0 ? "transparent" : "rgba(200,136,42,0.03)" }}
                  >
                    <td
                      style={{
                        fontFamily: "'Geist', sans-serif",
                        fontSize: "13px",
                        color: INK,
                        padding: "14px 0",
                        borderBottom: `1px solid ${RULE}`,
                      }}
                    >
                      {row.label}
                    </td>
                    {(["spark", "flux", "forge"] as const).map((tier) => (
                      <td
                        key={tier}
                        style={{
                          padding: "14px 16px",
                          textAlign: "center",
                          borderBottom: `1px solid ${RULE}`,
                          borderLeft: tier === "flux" ? `1px solid rgba(200,136,42,0.25)` : `1px solid ${RULE}`,
                          borderRight: tier === "flux" ? `1px solid rgba(200,136,42,0.25)` : "none",
                          background: tier === "flux" ? "rgba(200,136,42,0.03)" : "transparent",
                        }}
                      >
                        <CheckCell value={row[tier]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>



      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section
        className="cream-section"
        style={{ padding: "80px 24px", borderBottom: `1px solid ${RULE}` }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <span className="amber-label" style={{ display: "block", marginBottom: "8px" }}>
            Common Questions
          </span>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              letterSpacing: "-0.02em",
              color: INK,
              marginBottom: "40px",
            }}
          >
            Frequently Asked
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderTop: `1px solid ${RULE}`,
                  paddingTop: "20px",
                  paddingBottom: "20px",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                    textAlign: "left",
                    padding: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Geist', sans-serif",
                      fontWeight: 600,
                      fontSize: "15px",
                      color: INK,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {faq.q}
                  </span>
                  <span style={{ color: AMBER, flexShrink: 0 }}>
                    {openFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>
                {openFaq === i && (
                  <p
                    style={{
                      fontFamily: "'Geist', sans-serif",
                      fontSize: "14px",
                      color: MUTED,
                      lineHeight: "1.75",
                      marginTop: "12px",
                    }}
                  >
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${RULE}` }} />
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ───────────────────────────────────────── */}
      <section
        className="ink-section"
        style={{ padding: "96px 24px", textAlign: "center" }}
      >
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <span className="amber-label" style={{ display: "block", marginBottom: "20px", color: AMBER }}>
            Get Started
          </span>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
              color: "var(--paper)",
              lineHeight: "1.15",
              marginBottom: "20px",
            }}
          >
            Ready to build with{" "}
            <em style={{ fontStyle: "italic" }}>intelligence?</em>
          </h2>
          <p
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: "16px",
              color: "rgba(245,240,232,0.6)",
              marginBottom: "36px",
              lineHeight: "1.7",
            }}
          >
            Spark is free — forever. Upgrade when you need more.
          </p>
          <div
            className="cta-buttons-row"
            style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}
          >
            <a
              href="https://github.com/whothemyst-byte/Vibe_ADE/releases/download/v0.3.6/Vibe-ADE-0.3.6-setup-x64.exe"
              target="_blank"
              rel="noopener noreferrer"
              className="amber-btn"
              style={{
                padding: "14px 28px",
                borderRadius: "6px",
                fontSize: "15px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
              }}
            >
              <Download size={15} /> Download Spark — Free
            </a>
            <Link
              to="/products/vibe-ade"
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "12px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(245,240,232,0.45)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 20px",
                transition: "color 0.18s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,240,232,0.9)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,240,232,0.45)")
              }
            >
              View full product <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VibePricing;

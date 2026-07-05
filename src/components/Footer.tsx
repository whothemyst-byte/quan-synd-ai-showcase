import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Youtube, Twitter } from "lucide-react";
import logoDark from "@/assets/logo-dark.png";

// Footer always uses the dark ink theme regardless of page light/dark mode
const FOOTER_BG = "#0e0e0b";
const FOOTER_TEXT = "#f5f0e8";
const FOOTER_MUTED = "rgba(245,240,232,0.55)";
const FOOTER_RULE = "rgba(245,240,232,0.1)";
const AMBER = "#c8882a";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: FOOTER_BG,
        color: FOOTER_TEXT,
        borderTop: `1px solid ${FOOTER_RULE}`,
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px 0" }}>
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1.2fr",
            gap: "48px",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ lineHeight: 0 }}>
              <img
                src={logoDark}
                alt="QuanSynd"
                style={{
                  height: "28px",
                  width: "auto",
                  maxWidth: "160px",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
            <p
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: "13px",
                color: FOOTER_MUTED,
                lineHeight: "1.7",
                maxWidth: "220px",
              }}
            >
              A Scube company pioneering AI-driven design, business solutions, and development globally.
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
              {[
                { Icon: Instagram, href: "https://www.instagram.com/quansynd/", label: "Instagram" },
                { Icon: Youtube, href: "https://www.youtube.com/@Quansynd", label: "YouTube" },
                { Icon: Twitter, href: "https://x.com/Quansyndai", label: "X" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "4px",
                    border: `1px solid ${FOOTER_RULE}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: FOOTER_MUTED,
                    transition: "all 0.18s ease",
                    textDecoration: "none",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = AMBER;
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = AMBER;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = FOOTER_MUTED;
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = FOOTER_RULE;
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: AMBER,
                fontWeight: 500,
                marginBottom: "20px",
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "About Us", path: "/about" },
                { label: "Services", path: "/services" },
                { label: "Blog", path: "/blog" },
                { label: "Contact", path: "/contact" },
                { label: "Pricing", path: "/products/vibe-ade/pricing" },
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    style={{
                      fontFamily: "'Geist', sans-serif",
                      fontSize: "13px",
                      color: FOOTER_MUTED,
                      textDecoration: "none",
                      transition: "color 0.15s ease",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = FOOTER_TEXT)}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = FOOTER_MUTED)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: AMBER,
                fontWeight: 500,
                marginBottom: "20px",
              }}
            >
              Products
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Vibe ADE", path: "/products/vibe-ade" },
                { label: "Quan Bench", path: "/quan-bench" },
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    style={{
                      fontFamily: "'Geist', sans-serif",
                      fontSize: "13px",
                      color: FOOTER_MUTED,
                      textDecoration: "none",
                      transition: "color 0.15s ease",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = FOOTER_TEXT)}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = FOOTER_MUTED)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: AMBER,
                fontWeight: 500,
                marginBottom: "20px",
              }}
            >
              Services
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Graphic Design", "AI-Powered Business Solutions", "Web & App Development"].map((s) => (
                <li key={s}>
                  <Link
                    to={`/services#${s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
                    style={{
                      fontFamily: "'Geist', sans-serif",
                      fontSize: "13px",
                      color: FOOTER_MUTED,
                      textDecoration: "none",
                      transition: "color 0.15s ease",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = FOOTER_TEXT)}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = FOOTER_MUTED)}
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: AMBER,
                fontWeight: 500,
                marginBottom: "20px",
              }}
            >
              Get in Touch
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { Icon: Mail, href: "mailto:info@quansynd.com", text: "info@quansynd.com" },
                { Icon: Phone, href: "tel:+919500594498", text: "+91 95005 94498" },
                { Icon: MapPin, href: "#", text: "Coimbatore, Tamil Nadu, India" },
              ].map(({ Icon, href, text }) => (
                <a
                  key={text}
                  href={href}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    fontFamily: "'Geist', sans-serif",
                    fontSize: "13px",
                    color: FOOTER_MUTED,
                    textDecoration: "none",
                    transition: "color 0.15s ease",
                    lineHeight: "1.5",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = FOOTER_TEXT)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = FOOTER_MUTED)}
                >
                  <Icon size={14} style={{ color: AMBER, flexShrink: 0, marginTop: "2px" }} />
                  <span>{text}</span>
                </a>
              ))}
              <p
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.05em",
                  color: "rgba(245,240,232,0.3)",
                  marginTop: "2px",
                }}
              >
                Mon-Fri · 9am-6pm IST
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: "48px",
            borderTop: `1px solid ${FOOTER_RULE}`,
            padding: "20px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: "11px",
              color: "rgba(245,240,232,0.3)",
              letterSpacing: "0.04em",
            }}
          >
            © {currentYear} QuanSynd - A Scube Company. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: "10px",
              color: AMBER,
              letterSpacing: "0.08em",
            }}
          >
            PART OF SCUBE GROUP
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


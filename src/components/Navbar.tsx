import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Clock3, Moon, Sun, Menu, X, ChevronDown } from "lucide-react";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";
import { useAuth } from "@/contexts/AuthContext";
import { VIBE_ADE_LAUNCH_LABEL, formatVibeAdeCountdown, getVibeAdeCountdown } from "@/lib/vibeAdeRelease";

// Products dropdown items
const productItems = [
  { name: "Vibe ADE", path: "/products/vibe-ade", desc: "AI-powered Windows IDE", badge: null },
  { name: "Quan Bench", path: "/quan-bench", desc: "AI model benchmark index", badge: "LIVE" },
];

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
  { name: "Pricing", path: "/products/vibe-ade/pricing" },
];

const Navbar = () => {
  const { session } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [now, setNow] = useState<number | null>(null);
  const [isCountdownMounted, setIsCountdownMounted] = useState(false);
  const location = useLocation();
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setIsCountdownMounted(true);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  // Close mobile menu on route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileProductsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        setIsProductsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const isActive = (path: string) => location.pathname === path;
  const isProductsActive = productItems.some((p) => isActive(p.path));
  const launchCountdown = useMemo(
    () => (isCountdownMounted && now !== null ? getVibeAdeCountdown(now) : null),
    [isCountdownMounted, now]
  );
  const launchLabel = launchCountdown ? (launchCountdown.isLive ? "Live now" : formatVibeAdeCountdown(launchCountdown)) : "--d --h --m --s";
  const topBarHeight = "40px";

  const paperBg = theme === "dark" ? "rgba(18,17,15,0.92)" : "rgba(245,240,232,0.92)";
  const dropdownBg = theme === "dark" ? "#1a1815" : "#faf7f2";
  const isNavSolid = isScrolled || isMobileMenuOpen;

  const linkStyle = (active: boolean) => ({
    fontFamily: "'Geist Mono', monospace",
    fontSize: "11px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.09em",
    padding: "6px 14px",
    borderRadius: "4px",
    display: "inline-flex" as const,
    alignItems: "center" as const,
    gap: "4px",
    fontWeight: 500,
    color: active ? "var(--amber)" : "var(--muted-ui)",
    borderBottom: active ? "2px solid var(--amber)" : "2px solid transparent",
    transition: "color 0.18s ease, border-color 0.18s ease",
    textDecoration: "none" as const,
    whiteSpace: "nowrap" as const,
    background: "transparent",
    borderStyle: "solid",
    borderWidth: 0,
    borderColor: "transparent",
    cursor: "pointer",
  });

  return (
    <>
      <style>{`
        .qs-nav-desktop { display: none; }
        .qs-hamburger { display: flex; }
        .qs-launch-strip { display: flex; }
        @media (min-width: 768px) {
          .qs-nav-desktop { display: flex; }
          .qs-hamburger { display: none; }
          .qs-mobile-menu { display: none !important; }
        }
        @media (max-width: 767px) {
          .qs-launch-strip-text { font-size: 9px !important; line-height: 1.1 !important; }
        }

        /* Products dropdown */
        .qs-products-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          min-width: 240px;
          border-radius: 8px;
          border: 1px solid var(--rule);
          box-shadow: var(--shadow-card);
          overflow: hidden;
          z-index: 100;
          animation: dropdownIn 0.16s ease;
        }

        @keyframes dropdownIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .qs-dropdown-item {
          display: block;
          padding: 14px 18px;
          text-decoration: none;
          border-left: 3px solid transparent;
          transition: all 0.15s ease;
        }
        .qs-dropdown-item:hover {
          border-left-color: var(--amber);
          background: rgba(200,136,42,0.06);
        }
        .qs-dropdown-item.active {
          border-left-color: var(--amber);
        }
      `}</style>

      <div
        className="qs-launch-strip"
          style={{
            position: "fixed",
            top: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          height: topBarHeight,
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid rgba(200,136,42,0.22)",
          background:
            theme === "dark"
              ? "linear-gradient(180deg, rgba(32,28,24,0.98), rgba(20,18,16,0.96))"
              : "linear-gradient(180deg, rgba(252,248,242,0.98), rgba(245,240,232,0.96))",
          backdropFilter: "blur(14px)",
          boxShadow: "0 10px 30px -24px rgba(0,0,0,0.4)",
          padding: "4px 16px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1280px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            flexWrap: "wrap",
            textAlign: "center",
          }}
        >
          <span
            className="qs-launch-strip-text"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'Geist Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink)",
              whiteSpace: "nowrap",
            }}
          >
            <Clock3 size={12} style={{ color: "var(--amber)" }} />
            Coming soon
          </span>
          <span
            className="qs-launch-strip-text"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'Geist Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted-ui)",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ color: "var(--amber)" }}>{launchLabel}</span>
            <span aria-hidden="true">•</span>
            <span>{VIBE_ADE_LAUNCH_LABEL}</span>
          </span>
          <Link
            to="/products/vibe-ade"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              fontFamily: "'Geist Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--amber)",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
            aria-label="Go to the Vibe ADE product page"
          >
            Vibe ADE
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      <nav
        style={{
          position: "fixed",
          top: topBarHeight,
          left: 0,
          right: 0,
          zIndex: 1190,
          transition: "all 0.3s ease",
          borderTop: isNavSolid ? "2px solid var(--amber)" : "2px solid transparent",
          borderBottom: isNavSolid ? "1px solid var(--rule)" : "1px solid transparent",
          backgroundColor: isNavSolid ? paperBg : "transparent",
          backdropFilter: isNavSolid ? "blur(16px)" : "none",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>

            {/* Logo */}
            <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <img
                src={theme === "light" ? logoLight : logoDark}
                alt="QuanSynd"
                style={{ height: "32px", width: "auto", transition: "opacity 0.2s" }}
              />
            </Link>

            {/* Desktop Nav */}
            <div className="qs-nav-desktop" style={{ alignItems: "center", gap: "2px" }}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.09em",
                    padding: "6px 14px",
                    borderRadius: "4px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontWeight: 500,
                    color: isActive(item.path) ? "var(--amber)" : "var(--muted-ui)",
                    borderBottom: isActive(item.path) ? "2px solid var(--amber)" : "2px solid transparent",
                    transition: "color 0.18s ease, border-color 0.18s ease",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path)) {
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path)) {
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted-ui)";
                    }
                  }}
                >
                  {item.name}
                </Link>
              ))}

              {/* Products dropdown trigger */}
              <div ref={productsRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setIsProductsDropdownOpen((o) => !o)}
                  style={{
                    ...linkStyle(isProductsActive),
                    borderBottom: isProductsActive
                      ? "2px solid var(--amber)"
                      : isProductsDropdownOpen
                      ? "2px solid var(--ink)"
                      : "2px solid transparent",
                    color: isProductsActive
                      ? "var(--amber)"
                      : isProductsDropdownOpen
                      ? "var(--ink)"
                      : "var(--muted-ui)",
                  }}
                  aria-haspopup="true"
                  aria-expanded={isProductsDropdownOpen}
                >
                  Products
                  <ChevronDown
                    size={12}
                    style={{
                      transition: "transform 0.2s ease",
                      transform: isProductsDropdownOpen ? "rotate(180deg)" : "rotate(0)",
                    }}
                  />
                </button>

                {isProductsDropdownOpen && (
                  <div
                    className="qs-products-dropdown"
                    style={{ background: dropdownBg }}
                  >
                    {productItems.map((p) => (
                      <Link
                        key={p.path}
                        to={p.path}
                        className={`qs-dropdown-item${isActive(p.path) ? " active" : ""}`}
                        onClick={() => setIsProductsDropdownOpen(false)}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                          <span
                            style={{
                              fontFamily: "'Geist', sans-serif",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "var(--ink)",
                              letterSpacing: "-0.01em",
                            }}
                          >
                            {p.name}
                          </span>
                          {p.badge && (
                            <span className="qb-live-pill" style={{ marginLeft: 0 }}>
                              {p.badge}
                            </span>
                          )}
                        </div>
                        <span
                          style={{
                            fontFamily: "'Geist Mono', monospace",
                            fontSize: "10px",
                            color: "var(--muted-ui)",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {p.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                onClick={toggleTheme}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid var(--rule)",
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--muted-ui)",
                  transition: "all 0.18s ease",
                }}
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
              </button>

              <div className="hidden md:block">
                {session ? (
                  <Link
                    to="/dashboard"
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.09em",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      background: "var(--amber)",
                      color: "#000",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "all 0.2s ease"
                    }}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/auth"
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.09em",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      border: "1px solid var(--rule)",
                      color: "var(--ink)",
                      fontWeight: 500,
                      textDecoration: "none",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLAnchorElement).style.borderColor = "var(--amber)";
                      (e.target as HTMLAnchorElement).style.color = "var(--amber)";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLAnchorElement).style.borderColor = "var(--rule)";
                      (e.target as HTMLAnchorElement).style.color = "var(--ink)";
                    }}
                  >
                    Login
                  </Link>
                )}
              </div>

              {/* Mobile hamburger */}
              <button
                className="qs-hamburger"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "4px",
                  border: "1px solid var(--rule)",
                  background: "transparent",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--muted-ui)",
                }}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div
              className="qs-mobile-menu"
              style={{
                borderTop: "1px solid var(--rule)",
                paddingTop: "12px",
                paddingBottom: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.09em",
                    padding: "10px 12px",
                    color: isActive(item.path) ? "var(--amber)" : "var(--muted-ui)",
                    borderLeft: isActive(item.path) ? "2px solid var(--amber)" : "2px solid transparent",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    textDecoration: "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Products accordion */}
              <div>
                <button
                  onClick={() => setIsMobileProductsOpen((o) => !o)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.09em",
                    padding: "10px 12px",
                    color: isProductsActive ? "var(--amber)" : "var(--muted-ui)",
                    borderLeft: isProductsActive ? "2px solid var(--amber)" : "2px solid transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  Products
                  <ChevronDown
                    size={12}
                    style={{
                      transition: "transform 0.2s ease",
                      transform: isMobileProductsOpen ? "rotate(180deg)" : "rotate(0)",
                    }}
                  />
                </button>

                {isMobileProductsOpen && (
                  <div
                    style={{
                      borderLeft: "2px solid var(--amber)",
                      marginLeft: "12px",
                      paddingLeft: "12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      background: "rgba(200,136,42,0.04)",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                    }}
                  >
                    {productItems.map((p) => (
                      <Link
                        key={p.path}
                        to={p.path}
                        style={{
                          fontFamily: "'Geist Mono', monospace",
                          fontSize: "11px",
                          textTransform: "uppercase",
                          letterSpacing: "0.09em",
                          padding: "8px 12px",
                          color: isActive(p.path) ? "var(--amber)" : "var(--muted-ui)",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          textDecoration: "none",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {p.name}
                        {p.badge && (
                          <span className="qb-live-pill" style={{ marginLeft: 0 }}>
                            {p.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Auth Button */}
              <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid var(--rule)" }}>
                {session ? (
                  <Link
                    to="/dashboard"
                    style={{
                      display: "block",
                      textAlign: "center",
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.09em",
                      padding: "12px",
                      borderRadius: "6px",
                      background: "var(--amber)",
                      color: "#000",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                ) : (
                   <Link
                    to="/auth"
                    style={{
                      display: "block",
                      textAlign: "center",
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.09em",
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid var(--rule)",
                      color: "var(--ink)",
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Moon, Sun, Menu, X, ChevronDown } from "lucide-react";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";
import { useAuth } from "@/contexts/AuthContext";

// Products dropdown items
const productItems = [
  { name: "Vibe ADE", path: "/products/vibe-ade", badge: null },
  { name: "Quan Bench", path: "/quan-bench", badge: "LIVE" },
];

const exploreItems = [
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Blog", path: "/blog" },
];

const navItems = [
  { name: "Home", path: "/" },
];

const secondaryNavItems = [
  { name: "Contact", path: "/contact" },
  { name: "Pricing", path: "/products/vibe-ade/pricing" },
];

const Navbar = () => {
  const { session } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileExploreOpen, setIsMobileExploreOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const location = useLocation();
  const exploreRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    setIsMobileExploreOpen(false);
    setIsMobileProductsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (exploreRef.current && !exploreRef.current.contains(e.target as Node)) {
        setIsExploreDropdownOpen(false);
      }
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
  const isExploreActive = exploreItems.some((p) => isActive(p.path));
  const isProductsActive = productItems.some((p) => isActive(p.path));
  const topBarHeight = "42px";

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
          .qs-launch-strip {
            padding-left: 12px !important;
            padding-right: 12px !important;
          }
          .qs-launch-label,
          .qs-launch-separator,
          .qs-launch-detail {
            display: none !important;
          }
          .qs-launch-message {
            font-size: 12px !important;
          }
          .qs-launch-action {
            font-size: 9px !important;
          }
          .qs-nav-desktop {
            position: static !important;
            transform: none !important;
          }
        }

        /* Products dropdown */
        .qs-nav-dropdown {
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
          padding: 13px 18px;
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

        .qs-dropdown-item:hover .qs-dropdown-label,
        .qs-dropdown-item.active .qs-dropdown-label {
          color: var(--amber) !important;
        }

        .qs-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #ff4d4d;
          box-shadow: 0 0 0 3px rgba(255,77,77,0.16);
          flex: 0 0 auto;
          animation: qsLivePulse 1.8s ease-out infinite;
        }

        .qs-launch-action:hover .qs-launch-arrow {
          transform: translateX(2px);
        }

        @keyframes qsLivePulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255,77,77,0.45), 0 0 10px rgba(255,77,77,0.4);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(255,77,77,0), 0 0 14px rgba(255,77,77,0.22);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255,77,77,0), 0 0 10px rgba(255,77,77,0.35);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .qs-live-dot {
            animation: none;
            box-shadow: 0 0 0 3px rgba(255,77,77,0.16), 0 0 10px rgba(255,77,77,0.35);
          }
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
          minHeight: topBarHeight,
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid rgba(245,240,232,0.12)",
          background: "linear-gradient(180deg, rgba(18,17,15,0.98), rgba(12,12,10,0.98))",
          backdropFilter: "blur(14px)",
          boxShadow: "0 12px 28px -24px rgba(0,0,0,0.65)",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "100%",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            justifyContent: "center",
            gap: "18px",
          }}
        >
          <span aria-hidden="true" />
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "18px",
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                minWidth: 0,
              }}
            >
              <span
                className="qs-launch-label"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#ff6b6b",
                  whiteSpace: "nowrap",
                  fontWeight: 700,
                }}
              >
                <span className="qs-live-dot" aria-hidden="true" />
                Live
              </span>
              <span
                className="qs-launch-separator"
                style={{ width: "1px", height: "16px", background: "rgba(245,240,232,0.16)" }}
                aria-hidden="true"
              />
              <span
                className="qs-launch-message"
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: "13px",
                  color: "#f5f0e8",
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Vibe ADE is live now
              </span>
              <span
                className="qs-launch-detail"
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.05em",
                  color: "rgba(245,240,232,0.52)",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                AI-powered Windows IDE
              </span>
            </div>
            <Link
              to="/products/vibe-ade"
              className="qs-launch-action"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "'Geist Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#d79a3d",
                textDecoration: "none",
                whiteSpace: "nowrap",
                fontWeight: 700,
              }}
              aria-label="View the Vibe ADE product page"
            >
              View product
              <ArrowRight className="qs-launch-arrow" size={12} style={{ transition: "transform 0.16s ease" }} />
            </Link>
          </div>
          <span aria-hidden="true" />
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px", position: "relative" }}>

            {/* Logo */}
            <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <img
                src={theme === "light" ? logoLight : logoDark}
                alt="QuanSynd"
                style={{ height: "32px", width: "auto", transition: "opacity 0.2s" }}
              />
            </Link>

            {/* Desktop Nav */}
            <div
              className="qs-nav-desktop"
              style={{
                alignItems: "center",
                gap: "2px",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
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

              {/* Explore dropdown trigger */}
              <div ref={exploreRef} style={{ position: "relative" }}>
                <button
                  onClick={() => {
                    setIsExploreDropdownOpen((o) => !o);
                    setIsProductsDropdownOpen(false);
                  }}
                  style={{
                    ...linkStyle(isExploreActive),
                    borderBottom: isExploreActive
                      ? "2px solid var(--amber)"
                      : isExploreDropdownOpen
                      ? "2px solid rgba(200,136,42,0.65)"
                      : "2px solid transparent",
                    color: isExploreActive
                      ? "var(--amber)"
                      : isExploreDropdownOpen
                      ? "var(--amber)"
                      : "var(--muted-ui)",
                  }}
                  aria-haspopup="true"
                  aria-expanded={isExploreDropdownOpen}
                >
                  Explore
                  <ChevronDown
                    size={12}
                    style={{
                      transition: "transform 0.2s ease",
                      transform: isExploreDropdownOpen ? "rotate(180deg)" : "rotate(0)",
                    }}
                  />
                </button>

                {isExploreDropdownOpen && (
                  <div
                    className="qs-nav-dropdown"
                    style={{ background: dropdownBg }}
                  >
                    {exploreItems.map((p) => (
                      <Link
                        key={p.path}
                        to={p.path}
                        className={`qs-dropdown-item${isActive(p.path) ? " active" : ""}`}
                        onClick={() => setIsExploreDropdownOpen(false)}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span
                            className="qs-dropdown-label"
                            style={{
                              fontFamily: "'Geist', sans-serif",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: isActive(p.path) ? "var(--amber)" : "var(--muted-ui)",
                              letterSpacing: "-0.01em",
                              transition: "color 0.15s ease",
                            }}
                          >
                            {p.name}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Products dropdown trigger */}
              <div ref={productsRef} style={{ position: "relative" }}>
                <button
                  onClick={() => {
                    setIsProductsDropdownOpen((o) => !o);
                    setIsExploreDropdownOpen(false);
                  }}
                  style={{
                    ...linkStyle(isProductsActive),
                    borderBottom: isProductsActive
                      ? "2px solid var(--amber)"
                      : isProductsDropdownOpen
                      ? "2px solid rgba(200,136,42,0.65)"
                      : "2px solid transparent",
                    color: isProductsActive
                      ? "var(--amber)"
                      : isProductsDropdownOpen
                      ? "var(--amber)"
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
                    className="qs-nav-dropdown"
                    style={{ background: dropdownBg }}
                  >
                    {productItems.map((p) => (
                      <Link
                        key={p.path}
                        to={p.path}
                        className={`qs-dropdown-item${isActive(p.path) ? " active" : ""}`}
                        onClick={() => setIsProductsDropdownOpen(false)}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span
                            className="qs-dropdown-label"
                            style={{
                              fontFamily: "'Geist', sans-serif",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: isActive(p.path) ? "var(--amber)" : "var(--muted-ui)",
                              letterSpacing: "-0.01em",
                              transition: "color 0.15s ease",
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
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {secondaryNavItems.map((item) => (
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

              {/* Mobile Explore accordion */}
              <div>
                <button
                  onClick={() => {
                    setIsMobileExploreOpen((o) => !o);
                    setIsMobileProductsOpen(false);
                  }}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.09em",
                    padding: "10px 12px",
                    color: isExploreActive ? "var(--amber)" : "var(--muted-ui)",
                    borderLeft: isExploreActive ? "2px solid var(--amber)" : "2px solid transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "transparent",
                    borderTop: "none",
                    borderRight: "none",
                    borderBottom: "none",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  Explore
                  <ChevronDown
                    size={12}
                    style={{
                      transition: "transform 0.2s ease",
                      transform: isMobileExploreOpen ? "rotate(180deg)" : "rotate(0)",
                    }}
                  />
                </button>

                {isMobileExploreOpen && (
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
                    {exploreItems.map((p) => (
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
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Products accordion */}
              <div>
                <button
                  onClick={() => {
                    setIsMobileProductsOpen((o) => !o);
                    setIsMobileExploreOpen(false);
                  }}
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
                    borderTop: "none",
                    borderRight: "none",
                    borderBottom: "none",
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

              {secondaryNavItems.map((item) => (
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

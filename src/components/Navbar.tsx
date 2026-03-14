import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
  { name: "Quan Bench", path: "/quan-bench", live: true },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const location = useLocation();

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const isActive = (path: string) => location.pathname === path;

  const paperBg = theme === "dark" ? "rgba(18,17,15,0.92)" : "rgba(245,240,232,0.92)";
  const isNavSolid = isScrolled || isMobileMenuOpen;

  return (
    <>
      {/* Inline responsive styles */}
      <style>{`
        .qs-nav-desktop { display: none; }
        .qs-hamburger { display: flex; }
        @media (min-width: 768px) {
          .qs-nav-desktop { display: flex; }
          .qs-hamburger { display: none; }
          .qs-mobile-menu { display: none !important; }
        }
      `}</style>

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
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

            {/* Desktop Nav — hidden below md via .qs-nav-desktop */}
            <div
              className="qs-nav-desktop"
              style={{ alignItems: "center", gap: "2px" }}
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
                  {item.live && <span className="qb-live-pill">LIVE</span>}
                </Link>
              ))}
            </div>

            {/* Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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

              {/* Mobile hamburger — hidden above md via .qs-hamburger */}
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
                  {item.live && <span className="qb-live-pill">LIVE</span>}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

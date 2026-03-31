import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  FolderKanban,
  KeyRound,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  X,
} from "lucide-react";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardThemeProvider } from "@/components/dashboard/dashboardTheme";
import {
  applyTheme,
  getStoredTheme,
  setThemeClass,
  subscribeThemeChange,
  type DashboardTheme,
} from "@/lib/theme";

const navItems = [
  { label: "Overview", to: "/dashboard", icon: LayoutDashboard, end: true },
  { label: "Workspaces", to: "/dashboard/workspaces", icon: FolderKanban },
  { label: "Billing", to: "/dashboard/billing", icon: BarChart3 },
  { label: "API Keys", to: "/dashboard/api-keys", icon: KeyRound },
  { label: "Activity", to: "/dashboard/activity", icon: CircleUserRound },
  { label: "Settings", to: "/dashboard/settings", icon: Settings },
] as const;

// ─── Styles by theme ──────────────────────────────────────────────────────────
const lightStyles = {
  shell: { background: "var(--paper)", color: "var(--ink)" },
  sidebar: { background: "#ede7d9", borderRight: "1px solid var(--rule)" },
  header: {
    background: "rgba(245,240,232,0.95)",
    borderBottom: "1px solid var(--rule)",
    borderTop: "2px solid var(--amber)",
  },
  divider: { borderColor: "var(--rule)" },
  userCard: { background: "var(--card-bg)", border: "1px solid var(--rule)" },
  navActive: {
    background: "rgba(200,136,42,0.08)",
    borderLeft: "3px solid var(--amber)",
    color: "var(--amber)",
  },
  navIdle: {
    borderLeft: "3px solid transparent",
    color: "var(--muted-ui)",
  },
  btn: {
    background: "transparent",
    border: "1px solid var(--rule)",
    color: "var(--ink)",
  },
  upgradeBtn: {
    background: "transparent",
    border: "1px solid var(--rule)",
    color: "var(--ink)",
  },
  collapseBtn: {
    background: "var(--card-bg)",
    border: "1px solid var(--rule)",
    color: "var(--muted-ui)",
  },
  logo: logoLight,
  inkText: { color: "var(--ink)" },
  mutedText: { color: "var(--muted-ui)" },
  amberText: { color: "var(--amber)" },
};

const darkStyles = {
  shell: { background: "#12110f", color: "#f3eee5" },
  sidebar: { background: "#1a1815", borderRight: "1px solid rgba(243,238,229,0.08)" },
  header: {
    background: "rgba(18,17,15,0.96)",
    borderBottom: "1px solid rgba(243,238,229,0.08)",
    borderTop: "2px solid #d79a3d",
  },
  divider: { borderColor: "rgba(243,238,229,0.08)" },
  userCard: { background: "#161411", border: "1px solid rgba(243,238,229,0.08)" },
  navActive: {
    background: "rgba(215,154,61,0.1)",
    borderLeft: "3px solid #d79a3d",
    color: "#d79a3d",
  },
  navIdle: {
    borderLeft: "3px solid transparent",
    color: "#b1a692",
  },
  btn: {
    background: "transparent",
    border: "1px solid rgba(243,238,229,0.12)",
    color: "#f3eee5",
  },
  upgradeBtn: {
    background: "transparent",
    border: "1px solid rgba(243,238,229,0.12)",
    color: "#f3eee5",
  },
  collapseBtn: {
    background: "#161411",
    border: "1px solid rgba(243,238,229,0.12)",
    color: "#b1a692",
  },
  logo: logoDark,
  inkText: { color: "#f3eee5" },
  mutedText: { color: "#b1a692" },
  amberText: { color: "#d79a3d" },
};

export default function DashboardLayout() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarContentVisible, setSidebarContentVisible] = useState(true);
  const [theme, setTheme] = useState<DashboardTheme>(() => getStoredTheme());
  const sidebarToggleTimer = useRef<number | null>(null);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);
  useEffect(() => { setThemeClass(theme); }, [theme]);
  useEffect(() => subscribeThemeChange(setTheme), []);
  useEffect(() => {
    return () => {
      if (sidebarToggleTimer.current !== null) {
        window.clearTimeout(sidebarToggleTimer.current);
      }
    };
  }, []);

  const S = theme === "dark" ? darkStyles : lightStyles;
  const amber = theme === "dark" ? "#d79a3d" : "#c8882a";

  const sidebarMotionStyle = {
    transitionDuration: "640ms",
    transitionTimingFunction: "ease-in-out",
  } as const;

  const toggleSidebar = () => {
    if (sidebarToggleTimer.current !== null) window.clearTimeout(sidebarToggleTimer.current);
    if (sidebarCollapsed) {
      setSidebarCollapsed(false);
      sidebarToggleTimer.current = window.setTimeout(() => {
        setSidebarContentVisible(true);
        sidebarToggleTimer.current = null;
      }, 220);
      return;
    }
    setSidebarContentVisible(false);
    sidebarToggleTimer.current = window.setTimeout(() => {
      setSidebarCollapsed(true);
      sidebarToggleTimer.current = null;
    }, 220);
  };

  const userInitial = (user?.email?.[0] ?? "U").toUpperCase();

  return (
    <DashboardThemeProvider theme={theme}>
      <div className="dashboard-shell" style={{ ...S.shell, minHeight: "100vh" }}>
        <div style={{ maxWidth: "1800px", margin: "0 auto", display: "flex", minHeight: "100vh" }}>

          {/* ── Sidebar ───────────────────────────────────────────────────── */}
          <aside
            style={{
              ...S.sidebar,
              ...sidebarMotionStyle,
              width: sidebarCollapsed ? "80px" : "280px",
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              position: "sticky",
              top: 0,
              height: "100vh",
            }}
            className="hidden lg:flex"
          >
            {/* Logo row */}
            <div
              style={{
                height: "72px",
                display: "flex",
                alignItems: "center",
                justifyContent: sidebarCollapsed ? "center" : "space-between",
                padding: sidebarCollapsed ? "0 12px" : "0 20px",
                borderBottom: `1px solid ${theme === "dark" ? "rgba(243,238,229,0.08)" : "var(--rule)"}`,
              }}
            >
              {!sidebarCollapsed && (
                <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                  <img src={S.logo} alt="QuanSynd" style={{ height: "28px", width: "auto" }} />
                </Link>
              )}
              <button
                onClick={toggleSidebar}
                style={{
                  ...S.collapseBtn,
                  ...sidebarMotionStyle,
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {sidebarCollapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
              </button>
            </div>

            {/* Nav items */}
            <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: sidebarCollapsed ? "8px" : "4px" }}>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    title={sidebarCollapsed ? item.label : undefined}
                    style={({ isActive }) => ({
                      ...sidebarMotionStyle,
                      ...(isActive ? S.navActive : S.navIdle),
                      display: "flex",
                      alignItems: "center",
                      height: "44px",
                      borderRadius: "6px",
                      textDecoration: "none",
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.09em",
                      fontWeight: 500,
                      overflow: "hidden",
                      paddingRight: sidebarCollapsed ? 0 : "12px",
                    })}
                  >
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "44px", flexShrink: 0 }}>
                      <Icon size={16} style={{ color: amber }} />
                    </span>
                    <span
                      style={{
                        transitionProperty: "opacity, max-width, margin-left",
                        transitionDuration: sidebarCollapsed ? "160ms" : "280ms",
                        transitionDelay: sidebarCollapsed ? "0ms" : sidebarContentVisible ? "90ms" : "0ms",
                        transitionTimingFunction: "ease-in-out",
                        maxWidth: sidebarCollapsed || !sidebarContentVisible ? "0px" : "200px",
                        opacity: sidebarCollapsed || !sidebarContentVisible ? 0 : 1,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.label}
                    </span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Bottom: user info + actions */}
            <div style={{ padding: "16px", borderTop: `1px solid ${theme === "dark" ? "rgba(243,238,229,0.08)" : "var(--rule)"}` }}>
              {!sidebarCollapsed && sidebarContentVisible ? (
                <>
                  <div style={{ ...S.userCard, borderRadius: "8px", padding: "16px", marginBottom: "12px" }}>
                    <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", ...S.mutedText, marginBottom: "8px" }}>
                      Signed in as
                    </p>
                    <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "13px", fontWeight: 500, ...S.inkText, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {user?.email ?? "user@example.com"}
                    </p>
                    <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "12px", ...S.mutedText, marginTop: "4px", lineHeight: 1.5 }}>
                      Manage your account surface.
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <Link
                      to="/contact"
                      style={{
                        ...S.btn,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        padding: "9px 14px",
                        borderRadius: "6px",
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        textDecoration: "none",
                        transition: "all 0.18s ease",
                      }}
                    >
                      Support <ArrowRight size={13} />
                    </Link>
                    <button
                      onClick={async () => { await signOut(); window.location.href = "/"; }}
                      style={{
                        ...S.btn,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        padding: "9px 14px",
                        borderRadius: "6px",
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        cursor: "pointer",
                        transition: "all 0.18s ease",
                        width: "100%",
                      }}
                    >
                      <LogOut size={13} /> Sign out
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <button
                    title="Support"
                    aria-label="Support"
                    onClick={() => { window.location.href = "/contact"; }}
                    style={{ ...S.collapseBtn, width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", ...sidebarMotionStyle }}
                  >
                    <LifeBuoy size={15} style={{ color: amber }} />
                  </button>
                  <button
                    title="Sign out"
                    aria-label="Sign out"
                    onClick={async () => { await signOut(); window.location.href = "/"; }}
                    style={{ ...S.collapseBtn, width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", ...sidebarMotionStyle }}
                  >
                    <LogOut size={15} style={{ color: amber }} />
                  </button>
                </div>
              )}
            </div>
          </aside>

          {/* ── Main area ─────────────────────────────────────────────────── */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>

            {/* Header */}
            <header
              style={{
                ...S.header,
                position: "sticky",
                top: 0,
                zIndex: 30,
                backdropFilter: "blur(16px)",
              }}
            >
              <div style={{ height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "0 24px" }}>
                {/* Left */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <button
                    onClick={() => setMobileOpen((c) => !c)}
                    className="lg:hidden"
                    style={{ ...S.btn, width: "40px", height: "40px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                    aria-label="Toggle navigation"
                  >
                    {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                  </button>
                  <div>
                    <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", ...S.amberText, marginBottom: "1px" }}>
                      Dashboard
                    </p>
                    <p style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: "18px", letterSpacing: "-0.01em", ...S.inkText }}>
                      Manage everything in one place
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Link
                    to="/products/vibe-ade/pricing"
                    className="hidden lg:inline-flex"
                    style={{
                      ...S.upgradeBtn,
                      padding: "8px 16px",
                      borderRadius: "6px",
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      textDecoration: "none",
                      transition: "all 0.18s ease",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = amber; (e.currentTarget as HTMLAnchorElement).style.color = amber; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = S.upgradeBtn.border.replace("1px solid ", ""); (e.currentTarget as HTMLAnchorElement).style.color = S.upgradeBtn.color; }}
                  >
                    Upgrade plan
                  </Link>
                  <button
                    onClick={() => applyTheme(theme === "dark" ? "light" : "dark")}
                    style={{ ...S.btn, width: "38px", height: "38px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.18s ease" }}
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                  </button>
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      border: `1px solid ${amber}`,
                      background: `rgba(200,136,42,0.1)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: amber,
                    }}
                  >
                    {userInitial}
                  </div>
                </div>
              </div>

              {/* Mobile nav */}
              {mobileOpen && (
                <nav
                  style={{
                    borderTop: `1px solid ${theme === "dark" ? "rgba(243,238,229,0.08)" : "var(--rule)"}`,
                    padding: "12px 16px 16px",
                    background: theme === "dark" ? "#1a1815" : "#ede7d9",
                  }}
                  className="lg:hidden"
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          end={item.end}
                          style={({ isActive }) => ({
                            ...(isActive ? S.navActive : S.navIdle),
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "10px 14px",
                            borderRadius: "6px",
                            textDecoration: "none",
                            fontFamily: "'Geist Mono', monospace",
                            fontSize: "11px",
                            textTransform: "uppercase",
                            letterSpacing: "0.09em",
                            fontWeight: 500,
                          })}
                        >
                          <Icon size={15} style={{ color: amber }} />
                          {item.label}
                        </NavLink>
                      );
                    })}
                    <button
                      onClick={async () => { await signOut(); window.location.href = "/"; }}
                      style={{
                        ...S.navIdle,
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 14px",
                        borderRadius: "6px",
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "0.09em",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        width: "100%",
                        marginTop: "8px",
                      }}
                    >
                      <LogOut size={15} style={{ color: amber }} /> Sign out
                    </button>
                  </div>
                </nav>
              )}
            </header>

            {/* Page content */}
            <main style={{ flex: 1, padding: "32px 24px 48px", maxWidth: "1400px", width: "100%", margin: "0 auto" }}>
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </DashboardThemeProvider>
  );
}

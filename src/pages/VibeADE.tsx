import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Download,
  FileText,
  Cpu,
  Terminal,
  RefreshCw,
  LayoutDashboard,
  Ghost,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/seo/Seo";
import {
  VIBE_ADE_DOWNLOAD_URL,
  VIBE_ADE_DOWNLOAD_VERSION as DOWNLOAD_VERSION,
} from "@/lib/vibeAdeRelease";

const stats = [
  "16 panes",
  "4 agent roles",
  "3 workspace modes",
  "100% local execution",
  "Windows-native",
];

const capabilities: [string, string][] = [
  ["Multi-agent swarms", "Coordinator, builder, scout and reviewer working in parallel."],
  ["PTY terminals", "Real shells, resizable panes and persistent session snapshots."],
  ["Workspace modes", "Environment, Swarm and Wall — one shell, three ways to work."],
  ["Browser panes", "Inspect live web apps alongside your terminals."],
  ["Task board", "A Kanban board tied to every workspace."],
  ["Cloud sync", "State preserved and synced across sessions."],
  ["Crash recovery", "Automatic detection and restore on restart."],
];

const pillars: {
  icon: typeof Cpu;
  label: string;
  heading: string;
  body: string;
  features: [string, string][];
}[] = [
  {
    icon: Cpu,
    label: "Orchestration",
    heading: "A swarm that ships beside you.",
    body:
      "Spin up coordinated agent roles — coordinator, builder, scout and reviewer — that reason, build and review on your codebase in parallel. File ownership keeps them from colliding; blocker detection keeps them from stalling.",
    features: [
      ["Agent roles", "Four specialist roles routed by the orchestrator."],
      ["File ownership", "Deterministic locks prevent agent conflicts."],
      ["Blocker detection", "Timeouts, crashes and backlogs escalate automatically."],
    ],
  },
  {
    icon: LayoutDashboard,
    label: "Workspaces",
    heading: "Three ways to hold a project.",
    body:
      "Every workspace opens in the mode that fits the work. Switch layouts per workspace, save presets, and spin up Node, Python, React or automation templates in one click.",
    features: [
      ["Workspace modes", "Environment, Swarm and Wall, switchable per workspace."],
      ["Layout presets", "Single, 2×2, 3×2 and 4×2 grids, remembered per workspace."],
      ["Templates", "Node, Python AI, React and automation, set up in one click."],
    ],
  },
  {
    icon: Terminal,
    label: "Terminal & browser",
    heading: "Real shells. Live web. One window.",
    body:
      "Full pseudo-terminal support through node-pty — multiple panes, xterm rendering and per-pane working directories. Open browser panes right beside them to inspect apps without leaving the shell.",
    features: [
      ["PTY terminals", "Real shells with persistent session snapshots."],
      ["Browser panes", "Inspect live web apps next to your terminals."],
      ["Command safety", "A guard flags rm -rf, force pushes and disk formats."],
    ],
  },
  {
    icon: RefreshCw,
    label: "Reliability & sync",
    heading: "Never lose your place.",
    body:
      "Cloud sync keeps every workspace consistent across sessions, crash recovery restores your environment exactly where you left it, and silent background updates ship features without manual steps.",
    features: [
      ["Cloud sync", "Last-write-wins keeps state consistent everywhere."],
      ["Crash recovery", "Your environment returns exactly as you left it."],
      ["Auto-updates", "Signed Windows installers, delivered silently."],
    ],
  },
];

const modes: [string, string][] = [
  ["Environment", "A focused terminal grid for everyday work — panes, tabs and presets."],
  ["Swarm", "A multi-agent command centre where the swarm ships alongside you."],
  ["Wall", "A free-form pan-and-zoom plane where terminals become cards."],
];

function TermLine({ prefix, text, color }: { prefix: string; text: string; color: string }) {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <span style={{ color, flexShrink: 0 }}>{prefix}</span>
      <span style={{ color: "rgba(243,238,229,0.78)" }}>{text}</span>
    </div>
  );
}

const VibeADE = () => {
  const [releaseOpen, setReleaseOpen] = useState(false);
  useEffect(() => {
    if (releaseOpen) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
    document.body.style.overflow = "";
    return undefined;
  }, [releaseOpen]);
  const releaseNotes = useMemo(
    () => ({
      version: `v${DOWNLOAD_VERSION}`,
      date: "June 1, 2026",
      intro: `Vibe ADE ${DOWNLOAD_VERSION} ships the current Windows installer and update channel.`,
      highlights: [
        "Windows-native AI development environment with multi-agent swarms, PTY terminals, and intelligent workspaces.",
        "Subscription-ready experience with Spark, Flux, and Forge tiers, usage tracking, and upgrade paths.",
        "Production-grade onboarding, environment management, cloud sync foundation, and browser panes.",
      ],
      whatsNew: [
        "Multi-agent QuanSwarm orchestration with coordinated roles and live state.",
        "Per-pane working directory awareness and terminal session persistence.",
        "Browser integration with live web app inspection alongside terminal panes.",
        "Task Board with filtering, archiving, and export for workflow continuity.",
        "Plan-aware UX controls, locking, and in-app upgrade prompts.",
      ],
      fixes: [
        "Improved terminal session stability, layout switching, and pane management.",
        "Refined UI consistency across themes, dialogs, and workspace controls.",
        "Streamlined update checks, release delivery, and download flows.",
      ],
      known: [
        "Windows only for this release; macOS support is planned.",
        "Auto-update delivery is limited to signed Windows installers.",
        "Some third-party LLM CLIs may require manual setup for advanced integrations.",
      ],
    }),
    []
  );

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <Seo
        title="Vibe ADE — AI-Powered Windows Development Environment | QuanSynd"
        description="Vibe ADE is a Windows-native agentic development environment with multi-agent AI swarms, PTY terminals, smart workspaces, and cloud sync. Build faster, with intelligence."
        canonicalPath="/products/vibe-ade"
        ogType="website"
      />
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="dot-grid-bg hero-section"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "140px 24px 80px",
          position: "relative",
        }}
      >
        <div className="vibe-hero-grid">
          {/* Left — copy */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "26px",
                borderLeft: "2px solid var(--amber)",
                paddingLeft: "12px",
              }}
            >
              <span className="amber-label">Products — Vibe ADE</span>
            </div>

            <h1
              className="hero-headline"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
                fontSize: "clamp(2.6rem, 5vw, 4.4rem)",
                lineHeight: "1.06",
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                marginBottom: "22px",
              }}
            >
              The agentic development environment for{" "}
              <em style={{ fontStyle: "italic" }}>Windows.</em>
            </h1>

            <p
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: "17px",
                lineHeight: "1.7",
                color: "var(--muted-ui)",
                maxWidth: "480px",
                marginBottom: "34px",
              }}
            >
              Multi-agent swarms, persistent PTY terminals, and intelligent
              workspaces in one native shell — where AI agents are first-class
              citizens of your workflow, not a plugin.
            </p>

            <div
              className="cta-buttons-row"
              style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}
            >
              <a
                href={VIBE_ADE_DOWNLOAD_URL}
                download
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
                <Download size={16} /> Download Free
              </a>
              <button
                type="button"
                onClick={() => setReleaseOpen(true)}
                className="outline-ink-btn"
                style={{
                  padding: "14px 28px",
                  borderRadius: "6px",
                  fontSize: "15px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  background: "transparent",
                }}
              >
                <FileText size={16} /> Release Notes
              </button>
            </div>

            <p
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.07em",
                color: "var(--muted-ui)",
                opacity: 0.65,
                marginTop: "22px",
                textTransform: "uppercase",
              }}
            >
              Windows · Subscription · v{DOWNLOAD_VERSION}
            </p>
          </div>

          {/* Right — app window mock */}
          <div className="vibe-app-mock">
            <div className="vibe-app-titlebar">
              {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                <span
                  key={c}
                  style={{
                    width: "11px",
                    height: "11px",
                    borderRadius: "50%",
                    background: c,
                    display: "inline-block",
                    opacity: 0.9,
                  }}
                />
              ))}
              <div style={{ display: "flex", gap: "6px", marginLeft: "12px" }}>
                {([
                  ["environment", false],
                  ["swarm", true],
                  ["wall", false],
                ] as [string, boolean][]).map(([name, active]) => (
                  <span
                    key={name}
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      padding: "3px 9px",
                      borderRadius: "4px",
                      color: active ? "#f3eee5" : "rgba(243,238,229,0.4)",
                      background: active ? "rgba(215,154,61,0.18)" : "transparent",
                      border: active
                        ? "1px solid rgba(215,154,61,0.45)"
                        : "1px solid transparent",
                    }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <div className="vibe-app-body">
              {/* Rail */}
              <div
                style={{
                  background: "#1a1714",
                  borderRight: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                  padding: "14px 0",
                }}
              >
                {[Cpu, Terminal, LayoutDashboard, RefreshCw].map((Icon, i) => (
                  <Icon
                    key={i}
                    size={15}
                    style={{ color: i === 0 ? "var(--amber)" : "rgba(243,238,229,0.3)" }}
                  />
                ))}
              </div>

              {/* Main pane */}
              <div className="vibe-app-pane">
                <TermLine prefix="❯" text="vibe swarm --goal 'Build REST API with auth'" color="#d79a3d" />
                <TermLine prefix="●" text="Coordinator  analysing codebase…" color="#22c55e" />
                <TermLine prefix="●" text="Builder      scaffolding /src/routes/auth.ts" color="#60a5fa" />
                <TermLine prefix="●" text="Scout        reading existing type defs…" color="#a78bfa" />
                <TermLine prefix="●" text="Reviewer     style validation → PASS" color="#34d399" />
                <TermLine prefix="❯" text="_" color="#d79a3d" />
              </div>

              {/* Task board */}
              <div
                className="vibe-app-board"
                style={{
                  background: "#1a1714",
                  borderLeft: "1px solid rgba(255,255,255,0.05)",
                  padding: "12px 10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(243,238,229,0.35)",
                  }}
                >
                  Task board
                </span>
                {[
                  ["Auth routes", "#34d399"],
                  ["Type defs", "#60a5fa"],
                  ["Tests", "#febc2e"],
                ].map(([t, c]) => (
                  <div
                    key={t}
                    style={{
                      background: "#13100d",
                      border: "1px solid rgba(255,255,255,0.05)",
                      borderRadius: "5px",
                      padding: "8px 9px",
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: "10px",
                      color: "rgba(243,238,229,0.7)",
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: c,
                        flexShrink: 0,
                      }}
                    />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STAT BAND ─────────────────────────────────────────── */}
      <section
        className="cream-section"
        style={{
          padding: "26px 24px",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="vibe-statband" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {stats.map((s, i) => {
            const [num, ...rest] = s.split(" ");
            return (
              <span key={i}>
                <b>{num}</b> {rest.join(" ")}
              </span>
            );
          })}
        </div>
      </section>

      {/* ── ADE THESIS — split ────────────────────────────────── */}
      <section className="vibe-thesis">
        {/* Left — dark */}
        <div
          className="ink-section"
          style={{
            padding: "88px 64px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <span className="section-rule" />
          <span
            className="amber-label"
            style={{ display: "block", marginBottom: "12px", color: "var(--amber)" }}
          >
            Not an IDE. An ADE.
          </span>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: "clamp(1.9rem, 3vw, 2.7rem)",
              letterSpacing: "-0.02em",
              color: "var(--paper)",
              lineHeight: "1.18",
              marginBottom: "20px",
            }}
          >
            A symphony of code and{" "}
            <em style={{ fontStyle: "italic" }}>machine intelligence.</em>
          </h2>
          <p
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: "15px",
              lineHeight: "1.75",
              color: "rgba(245,240,232,0.65)",
              marginBottom: "16px",
            }}
          >
            Traditional IDEs bolt AI on as an assistant. Vibe ADE is built the
            other way around — agents are first-class citizens of the workflow,
            orchestrated across real terminals, real workspaces and a live
            browser, natively on Windows.
          </p>
          <p
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: "15px",
              lineHeight: "1.75",
              color: "rgba(245,240,232,0.65)",
            }}
          >
            Powered by QuanSwarm, teams of specialist agents collaborate on your
            codebase in real time — reasoning, building, reviewing and iterating
            while you stay in control.
          </p>
        </div>

        {/* Right — light */}
        <div
          className="cream-section"
          style={{
            padding: "88px 64px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderLeft: "1px solid var(--rule)",
          }}
        >
          <span className="amber-label" style={{ display: "block", marginBottom: "24px" }}>
            Core capabilities
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {capabilities.map(([title, desc]) => (
              <div key={title} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <span
                  style={{
                    color: "var(--amber)",
                    flexShrink: 0,
                    fontSize: "13px",
                    lineHeight: "1.5",
                    marginTop: "1px",
                  }}
                  aria-hidden
                >
                  ✶
                </span>
                <div>
                  <span
                    style={{
                      fontFamily: "'Geist', sans-serif",
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "var(--ink)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {title}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Geist', sans-serif",
                      fontSize: "13px",
                      color: "var(--muted-ui)",
                      marginLeft: "8px",
                    }}
                  >
                    — {desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE PILLARS ───────────────────────────────────── */}
      <section style={{ padding: "96px 24px", background: "var(--paper)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ marginBottom: "72px", maxWidth: "560px" }}>
            <span className="section-rule" />
            <span className="amber-label" style={{ display: "block", marginBottom: "12px" }}>
              What's inside
            </span>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                lineHeight: "1.12",
              }}
            >
              Four pillars, one{" "}
              <em style={{ fontStyle: "italic" }}>coherent shell.</em>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "88px" }}>
            {pillars.map((p, i) => (
              <div key={p.label} className={`vibe-pillar${i % 2 === 1 ? " reverse" : ""}`}>
                {/* Text */}
                <div>
                  <span className="amber-label" style={{ display: "block", marginBottom: "14px" }}>
                    {String(i + 1).padStart(2, "0")} — {p.label}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontWeight: 400,
                      fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)",
                      letterSpacing: "-0.01em",
                      color: "var(--ink)",
                      lineHeight: "1.15",
                      marginBottom: "16px",
                    }}
                  >
                    {p.heading}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Geist', sans-serif",
                      fontSize: "15px",
                      lineHeight: "1.75",
                      color: "var(--muted-ui)",
                      marginBottom: "26px",
                    }}
                  >
                    {p.body}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {p.features.map(([t, d]) => (
                      <div key={t} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                        <span
                          style={{ color: "var(--amber)", flexShrink: 0, fontSize: "12px", marginTop: "2px" }}
                          aria-hidden
                        >
                          ✶
                        </span>
                        <div>
                          <span
                            style={{
                              fontFamily: "'Geist', sans-serif",
                              fontWeight: 600,
                              fontSize: "13.5px",
                              color: "var(--ink)",
                            }}
                          >
                            {t}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Geist', sans-serif",
                              fontSize: "13px",
                              color: "var(--muted-ui)",
                              marginLeft: "7px",
                            }}
                          >
                            — {d}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div
                  className="vibe-pillar-visual editorial-card"
                  style={{
                    minHeight: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "linear-gradient(155deg, var(--cream) 0%, var(--paper) 100%)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <p.icon size={120} strokeWidth={1} style={{ color: "var(--amber)", opacity: 0.18 }} />
                  <span
                    className="amber-label"
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      left: "24px",
                      color: "var(--amber-dim)",
                    }}
                  >
                    {p.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKSPACE MODES ───────────────────────────────────── */}
      <section
        className="cream-section"
        style={{
          padding: "96px 24px",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ marginBottom: "56px", maxWidth: "560px" }}>
            <span className="section-rule" />
            <span className="amber-label" style={{ display: "block", marginBottom: "12px" }}>
              Workspace modes
            </span>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                lineHeight: "1.12",
              }}
            >
              One shell.{" "}
              <em style={{ fontStyle: "italic" }}>Three ways to work.</em>
            </h2>
          </div>

          <div className="vibe-modes-grid">
            {modes.map(([name, desc], i) => (
              <div key={name} className="editorial-card" style={{ padding: "32px 28px" }}>
                <span
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    color: "var(--amber)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontWeight: 400,
                    fontSize: "1.5rem",
                    letterSpacing: "-0.01em",
                    color: "var(--ink)",
                    margin: "10px 0 10px",
                  }}
                >
                  {name}
                </h3>
                <p
                  style={{
                    fontFamily: "'Geist', sans-serif",
                    fontSize: "14px",
                    lineHeight: "1.7",
                    color: "var(--muted-ui)",
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIBE PET CALLOUT ──────────────────────────────────── */}
      <section
        className="cream-section"
        style={{ padding: "64px 24px", borderBottom: "1px solid var(--rule)" }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "32px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "88px",
              height: "88px",
              borderRadius: "50%",
              border: "1px solid var(--rule)",
              background: "var(--paper)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "var(--shadow-card)",
            }}
          >
            <Ghost size={40} style={{ color: "var(--amber)" }} />
          </div>
          <div style={{ flex: 1, minWidth: "280px" }}>
            <span className="amber-label" style={{ display: "block", marginBottom: "10px" }}>
              Meet the Vibe
            </span>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
                fontSize: "clamp(1.6rem, 3vw, 2.3rem)",
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                marginBottom: "12px",
                lineHeight: 1.2,
              }}
            >
              Your workspace has a <em style={{ fontStyle: "italic" }}>companion.</em>
            </h2>
            <p
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: "15px",
                lineHeight: 1.7,
                color: "var(--muted-ui)",
                maxWidth: "620px",
              }}
            >
              The Vibe is a small, draggable mascot that floats on your workspace
              — breathing softly, staying out of the way, and following along
              wherever you place it. Switch it on or off any time from Settings.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="ink-section" style={{ padding: "96px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <span
            className="amber-label"
            style={{ display: "block", marginBottom: "20px", color: "var(--amber)" }}
          >
            Get started
          </span>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              letterSpacing: "-0.02em",
              color: "var(--paper)",
              lineHeight: "1.15",
              marginBottom: "20px",
            }}
          >
            Start building with{" "}
            <em style={{ fontStyle: "italic" }}>intelligence.</em>
          </h2>
          <p
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: "16px",
              color: "rgba(245,240,232,0.6)",
              lineHeight: "1.7",
              marginBottom: "40px",
            }}
          >
            Download Vibe ADE for free and bring the power of multi-agent AI into
            your development environment today.
          </p>
          <div
            className="cta-buttons-row"
            style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}
          >
            <a
              href={VIBE_ADE_DOWNLOAD_URL}
              download
              className="amber-btn"
              style={{
                padding: "14px 32px",
                borderRadius: "6px",
                fontSize: "15px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
              }}
            >
              <Download size={16} /> Download Vibe ADE
            </a>
            <button
              type="button"
              onClick={() => setReleaseOpen(true)}
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "12px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(245,240,232,0.45)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 20px",
                transition: "color 0.18s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color = "rgba(245,240,232,0.9)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color = "rgba(245,240,232,0.45)")
              }
            >
              <FileText size={14} /> View Release Notes
            </button>
          </div>
          <p
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.06em",
              color: "rgba(245,240,232,0.25)",
              marginTop: "28px",
              textTransform: "uppercase",
            }}
          >
            Windows · Spark is free · Subscription available
          </p>
        </div>
      </section>

      {releaseOpen && (
        <div
          className="release-notes-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Release Notes"
          onClick={() => setReleaseOpen(false)}
        >
          <section className="release-notes-modal" onClick={(event) => event.stopPropagation()}>
            <header className="release-notes-header">
              <div>
                <span className="release-notes-kicker">Release Notes</span>
                <div className="release-notes-title-row">
                  <h2>Vibe ADE {releaseNotes.version}</h2>
                  <span className="release-notes-pill">{releaseNotes.version}</span>
                </div>
                <p>{releaseNotes.date}</p>
              </div>
              <div className="release-notes-header-actions">
                <a
                  href={VIBE_ADE_DOWNLOAD_URL}
                  download
                  className="amber-btn release-notes-download"
                  style={{ textDecoration: "none" }}
                >
                  <Download size={16} /> Download v{DOWNLOAD_VERSION}
                </a>
              </div>
            </header>

            <div className="release-notes-intro">
              <strong>{releaseNotes.intro}</strong>
              <p>
                Vibe ADE is now production-ready for Windows teams building with
                AI. This release focuses on stability, orchestration, and polished
                workflows for serious daily use.
              </p>
            </div>

            <div className="release-notes-grid">
              {[
                { title: "Highlights", items: releaseNotes.highlights },
                { title: "What’s New", items: releaseNotes.whatsNew },
                { title: "Fixes & Stability", items: releaseNotes.fixes },
                { title: "Known Limitations", items: releaseNotes.known },
              ].map((section) => (
                <div key={section.title} className="release-notes-section">
                  <h3>{section.title}</h3>
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <footer className="release-notes-footer">
              <button className="outline-ink-btn" onClick={() => setReleaseOpen(false)}>
                Close
              </button>
            </footer>
          </section>
        </div>
      )}

      {/* ── RELATED PRODUCTS BAND ─────────────────────────────── */}
      <section
        className="cream-section"
        style={{
          padding: "64px 24px",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            borderLeft: "3px solid var(--amber)",
            paddingLeft: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <span className="amber-label">Also from QuanSynd</span>
              <span className="qb-live-pill" style={{ marginLeft: 0 }}>
                LIVE
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                marginBottom: "10px",
              }}
            >
              Explore QuanBench
            </h2>
            <p
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: "15px",
                color: "var(--muted-ui)",
                maxWidth: "480px",
                lineHeight: "1.65",
              }}
            >
              Our open AI model intelligence index — benchmarking frontier models
              across reasoning, accuracy, creativity and more.
            </p>
          </div>
          <Link
            to="/quan-bench"
            className="amber-btn"
            style={{
              padding: "13px 26px",
              borderRadius: "6px",
              fontSize: "14px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            View Benchmarks <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VibeADE;

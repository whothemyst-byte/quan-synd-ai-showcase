import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Download,
  Github,
  X,
  Cpu,
  Globe,
  Terminal,
  FolderOpen,
  Cloud,
  Columns,
  ShieldCheck,
  RefreshCw,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NewsletterSignupModal } from "@/components/NewsletterSignupModal";
import { Seo } from "@/seo/Seo";

const DOWNLOAD_VERSION = "0.3.9";

const features = [
  {
    icon: Cpu,
    label: "Orchestration",
    heading: "Multi-Agent Swarms",
    body:
      "Spin up coordinated AI agent swarms — coordinator, builder, scout and reviewer — all working on your codebase in parallel. Powered by QuanSwarm.",
  },
  {
    icon: Terminal,
    label: "Terminal",
    heading: "PTY Terminals",
    body:
      "Full pseudo-terminal support via node-pty. Multiple panes, resizable layouts, xterm.js rendering, and persistent session snapshots.",
  },
  {
    icon: FolderOpen,
    label: "Environments",
    heading: "Smart Workspaces",
    body:
      "Create, save, clone and restore development environments in seconds. Cloud sync keeps every workspace in perfect state across sessions.",
  },
  {
    icon: Globe,
    label: "Browser",
    heading: "Browser Integration",
    body:
      "Open browser panes directly inside Vibe ADE to inspect web apps, test flows, and keep browser state alongside your terminals and workspaces.",
  },
];

const keyFeatures = [
  {
    icon: Cpu,
    title: "Agent Orchestration",
    desc: "Route messages between specialist agents intelligently. The SwarmOrchestrator assigns tasks, resolves conflicts and tracks progress.",
  },
  {
    icon: Cloud,
    title: "Cloud Sync",
    desc: "Every workspace is synced to Supabase. Last-write-wins conflict resolution keeps your state consistent across devices.",
  },
  {
    icon: Columns,
    title: "Task Board",
    desc: "A built-in Kanban board tied to each workspace. Create, move, archive and filter tasks without ever leaving your IDE.",
  },
  {
    icon: Globe,
    title: "Browser Integration",
    desc: "Run browser panes inside the workspace so you can inspect live apps, validate flows, and keep browser context next to your terminal sessions.",
  },
  {
    icon: ShieldCheck,
    title: "File Ownership",
    desc: "Prevent agent conflicts with a deterministic file ownership system. Agents request, hold and release file locks gracefully.",
  },
  {
    icon: RefreshCw,
    title: "Crash Recovery",
    desc: "Automatic crash detection and state recovery on restart. Your environment comes back exactly where you left it.",
  },
  {
    icon: Zap,
    title: "Auto-Updates",
    desc: "Silent background update checks via electron-updater. Ship features to your team without any manual distribution steps.",
  },
];

const techStack = [
  "Electron 34",
  "React 18",
  "TypeScript",
  "node-pty",
  "Zustand",
  "Supabase",
];

const VibeADE = () => {
  const [releaseOpen, setReleaseOpen] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);
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
      date: "March 20, 2026",
      intro: "Vibe ADE 0.3.9 adds browser integration to the workspace.",
      highlights: [
        "Windows-native AI development environment with multi-agent swarms, PTY terminals, and intelligent workspaces.",
        "Subscription-ready experience with Spark, Flux, and Forge tiers, usage tracking, and upgrade paths.",
        "Production-grade onboarding, environment management, cloud sync foundation, and browser panes."
      ],
      whatsNew: [
        "Multi-agent QuanSwarm orchestration with coordinated roles and live state.",
        "Per-pane working directory awareness and terminal session persistence.",
        "Browser integration with live web app inspection alongside terminal panes.",
        "Task Board with filtering, archiving, and export for workflow continuity.",
        "Plan-aware UX controls, locking, and in-app upgrade prompts."
      ],
      fixes: [
        "Improved terminal session stability, layout switching, and pane management.",
        "Refined UI consistency across themes, dialogs, and workspace controls.",
        "Streamlined update checks, release delivery, and download flows."
      ],
      known: [
        "Windows only for this release; macOS support is planned.",
        "Auto-update delivery is limited to signed Windows installers.",
        "Some third-party LLM CLIs may require manual setup for advanced integrations."
      ]
    }),
    []
  );
  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <Seo
        title="Vibe ADE — AI-Powered Windows Development Environment | QuanSynd"
        description="Vibe ADE is a Windows-native development environment with multi-agent AI swarms, PTY terminals, smart workspaces, and cloud sync. Build faster, with intelligence."
        canonicalPath="/products/vibe-ade"
        ogType="website"
      />
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <NewsletterSignupModal open={newsletterOpen} onClose={() => setNewsletterOpen(false)} />

      <section
        className="dot-grid-bg hero-section"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 0",
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            width: "100%",
            textAlign: "center",
            paddingBottom: "64px",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "28px",
              borderLeft: "2px solid var(--amber)",
              paddingLeft: "12px",
            }}
          >
            <span className="amber-label">Products — Vibe ADE</span>
          </div>

          {/* Headline */}
          <h1
            className="hero-headline"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              lineHeight: "1.08",
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              marginBottom: "24px",
            }}
          >
            Your AI Development Environment.{" "}
            <em style={{ fontStyle: "italic" }}>Amplified.</em>
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: "18px",
              lineHeight: "1.7",
              color: "var(--muted-ui)",
              maxWidth: "580px",
              margin: "0 auto 40px",
            }}
          >
            A Windows-native IDE with multi-agent AI swarms, persistent PTY
            terminals, and intelligent workspace management — all in one
            Electron-powered shell.
          </p>

          {/* CTAs */}
          <div
            className="cta-buttons-row"
            style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}
          >
            <button
              type="button"
              onClick={() => setNewsletterOpen(true)}
              className="amber-btn"
              style={{
                padding: "14px 28px",
                borderRadius: "6px",
                fontSize: "15px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Download size={16} /> Download Free
            </button>
            <a
              href="#release-notes"
              onClick={(event) => {
                event.preventDefault();
                setReleaseOpen(true);
              }}
              className="outline-ink-btn"
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
              <Github size={16} /> View Release Notes
            </a>
          </div>

          <p
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.07em",
              color: "var(--muted-ui)",
              opacity: 0.65,
              marginTop: "24px",
              textTransform: "uppercase",
            }}
          >
            Windows · Subscription · v{DOWNLOAD_VERSION}
          </p>
        </div>

        {/* Terminal mockup */}
        <div
          className="vibe-terminal-mockup"
          style={{
            width: "100%",
            maxWidth: "900px",
            margin: "0 auto",
            borderRadius: "10px 10px 0 0",
            overflow: "hidden",
            border: "1px solid var(--rule)",
            borderBottom: "none",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {/* Window chrome */}
          <div
            style={{
              background: "var(--ink)",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
              <span
                key={i}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: c,
                  display: "inline-block",
                  opacity: 0.85,
                }}
              />
            ))}
            <span
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "11px",
                color: "rgba(255,255,255,0.35)",
                marginLeft: "8px",
                letterSpacing: "0.04em",
              }}
            >
              Vibe ADE — my-project
            </span>
          </div>
          {/* Terminal lines */}
          <div
            style={{
              background: "#161411",
              padding: "20px 24px",
              fontFamily: "'Geist Mono', monospace",
              fontSize: "13px",
              lineHeight: "1.9",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            {[
              { prefix: "❯", text: "vibe swarm --goal 'Build REST API with auth'", color: "#d79a3d" },
              { prefix: "●", text: "Coordinator: Analysing codebase...", color: "#22c55e" },
              { prefix: "●", text: "Builder:     Scaffolding /src/routes/auth.ts", color: "#60a5fa" },
              { prefix: "●", text: "Scout:       Reading existing type defs...", color: "#a78bfa" },
              { prefix: "●", text: "Reviewer:    style validation → PASS", color: "#34d399" },
              { prefix: "❯", text: "_", color: "#d79a3d" },
            ].map((l, i) => (
              <div key={i} style={{ display: "flex", gap: "10px" }}>
                <span style={{ color: l.color, flexShrink: 0 }}>{l.prefix}</span>
                <span style={{ color: "rgba(243,238,229,0.8)" }}>{l.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3-FEATURE STRIP ──────────────────────────────────── */}
      <section
        className="cream-section"
        style={{
          padding: "80px 24px",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            className="vibe-features-strip"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "48px",
            }}
          >
            {features.map((f) => (
              <div
                key={f.label}
                style={f.label === "Browser" ? { gridColumn: "2 / 3" } : undefined}
              >
                <span className="section-rule" />
                <span className="amber-label" style={{ display: "block", marginBottom: "12px" }}>
                  {f.label}
                </span>
                <f.icon
                  size={22}
                  style={{ color: "var(--amber)", marginBottom: "14px" }}
                />
                <h3
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontWeight: 400,
                    fontSize: "clamp(1.3rem, 2.2vw, 1.6rem)",
                    letterSpacing: "-0.01em",
                    color: "var(--ink)",
                    marginBottom: "10px",
                  }}
                >
                  {f.heading}
                </h3>
                <p
                  style={{
                    fontFamily: "'Geist', sans-serif",
                    fontSize: "14px",
                    lineHeight: "1.7",
                    color: "var(--muted-ui)",
                  }}
                >
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IS VIBE ADE — split ──────────────────────────── */}
      <section
        className="vibe-split-section"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "520px",
        }}
      >
        {/* Left — dark */}
        <div
          className="ink-section"
          style={{
            padding: "80px 64px",
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
            What is Vibe ADE
          </span>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              letterSpacing: "-0.02em",
              color: "var(--paper)",
              lineHeight: "1.2",
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
            Vibe ADE is an Electron-based development environment built
            natively for Windows. Unlike traditional IDEs, Vibe ADE puts
            AI agents at the core — not as a plugin, but as first-class
            citizens of your workflow.
          </p>
          <p
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: "15px",
              lineHeight: "1.75",
              color: "rgba(245,240,232,0.65)",
            }}
          >
            Powered by QuanSwarm, teams of specialist AI agents collaborate on
            your codebase in real time — reasoning, building, reviewing and
            iterating while you stay in control.
          </p>
        </div>

        {/* Right — light */}
        <div
          className="cream-section"
          style={{
            padding: "80px 64px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderLeft: "1px solid var(--rule)",
          }}
        >
          <span className="amber-label" style={{ display: "block", marginBottom: "24px" }}>
            Core Capabilities
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              ["Agent Swarms", "Multiple AI roles coordinating on a single goal"],
              ["PTY Terminals", "Full shell access with persistent session snapshots"],
              ["Workspace Tabs", "Multiple dev environments open simultaneously"],
              ["Browser Integration", "Inspect live web apps in integrated browser panes"],
              ["Cloud Sync", "State preserved and synced via Supabase"],
              ["Task Board", "Built-in Kanban per workspace — no external tools"],
              ["Blocker Detection", "Automatic detection of stalled agents and recovery"],
            ].map(([title, desc]) => (
              <div
                key={title}
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--amber)",
                    flexShrink: 0,
                    marginTop: "7px",
                  }}
                />
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

      {/* ── KEY FEATURES GRID ─────────────────────────────────── */}
      <section style={{ padding: "96px 24px", background: "var(--paper)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ marginBottom: "64px" }}>
            <span className="section-rule" />
            <span className="amber-label" style={{ display: "block", marginBottom: "12px" }}>
              What's Inside
            </span>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                marginBottom: "12px",
              }}
            >
              Architected for power.{" "}
              <em style={{ fontStyle: "italic" }}>Built for developers.</em>
            </h2>
            <p
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: "16px",
                color: "var(--muted-ui)",
                maxWidth: "480px",
              }}
            >
              Every component of Vibe ADE is purpose-built to make AI-assisted
              development feel natural and reliable.
            </p>
          </div>

          <div
            className="vibe-features-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            {keyFeatures.map((feat) => (
              <div
                key={feat.title}
                className="editorial-card"
                style={{
                  padding: "32px 28px",
                  ...(feat.title === "Auto-Updates" ? { gridColumn: "2 / 3" } : null),
                }}
              >
                <feat.icon
                  size={20}
                  style={{ color: "var(--amber)", marginBottom: "16px" }}
                />
                <h3
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontWeight: 400,
                    fontSize: "1.2rem",
                    letterSpacing: "-0.01em",
                    color: "var(--ink)",
                    marginBottom: "10px",
                  }}
                >
                  {feat.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Geist', sans-serif",
                    fontSize: "13px",
                    lineHeight: "1.7",
                    color: "var(--muted-ui)",
                  }}
                >
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── CTA ───────────────────────────────────────────────── */}
      <section
        className="ink-section"
        style={{ padding: "96px 24px", textAlign: "center" }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <span className="amber-label" style={{ display: "block", marginBottom: "20px", color: "var(--amber)" }}>
            Get Started
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
            Download Vibe ADE for free and bring the power of multi-agent AI
            into your development environment today.
          </p>
          <div
            className="cta-buttons-row"
            style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}
          >
            <button
              type="button"
              onClick={() => setNewsletterOpen(true)}
              className="amber-btn"
              style={{
                padding: "14px 32px",
                borderRadius: "6px",
                fontSize: "15px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Download size={16} /> Download Vibe ADE
            </button>
            <a
              href="#release-notes"
              onClick={(event) => {
                event.preventDefault();
                setReleaseOpen(true);
              }}
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
              <Github size={14} /> View Release Notes
            </a>
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
          <section
            className="release-notes-modal"
            onClick={(event) => event.stopPropagation()}
          >
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
                <button
                  type="button"
                  onClick={() => setNewsletterOpen(true)}
                  className="amber-btn release-notes-download"
                  style={{ textDecoration: "none", border: "none", cursor: "pointer" }}
                >
                  <Download size={16} /> Download v{DOWNLOAD_VERSION}
                </button>
              </div>
            </header>

            <div className="release-notes-intro">
              <strong>{releaseNotes.intro}</strong>
              <p>
                Vibe ADE is now production-ready for Windows teams building with
                AI. This release focuses on stability, orchestration, and
                polished workflows for serious daily use.
              </p>
            </div>

            <div className="release-notes-grid">
              {[
                { title: "Highlights", items: releaseNotes.highlights },
                { title: "What’s New", items: releaseNotes.whatsNew },
                { title: "Fixes & Stability", items: releaseNotes.fixes },
                { title: "Known Limitations", items: releaseNotes.known }
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
              <span className="qb-live-pill" style={{ marginLeft: 0 }}>LIVE</span>
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

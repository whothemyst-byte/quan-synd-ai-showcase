import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Brain, Palette, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { Seo } from "@/seo/Seo";

const services = [
  {
    icon: Palette,
    title: "UI Design",
    category: "Design",
    description: "Craft beautiful, intuitive interfaces that users love and businesses trust.",
    features: [
      "Modern, responsive designs",
      "Design system creation",
      "Prototyping & wireframing",
      "Brand-aligned aesthetics",
    ],
  },
  {
    icon: Search,
    title: "UX Research",
    category: "Research",
    description: "Deep insights into user behavior and needs to drive informed decisions.",
    features: [
      "User interviews & testing",
      "Journey mapping",
      "Competitive analysis",
      "Data-driven recommendations",
    ],
  },
  {
    icon: Sparkles,
    title: "Graphic Design",
    category: "Creative",
    description: "Stunning visual content that captures attention and builds brand identity.",
    features: [
      "Brand identity design",
      "Marketing materials",
      "Illustration & iconography",
      "Print & digital assets",
    ],
  },
  {
    icon: Brain,
    title: "AI Consulting",
    category: "AI",
    description: "Strategic guidance for seamless AI integration and business transformation.",
    features: [
      "AI strategy development",
      "Technology assessment",
      "Implementation roadmap",
      "Risk mitigation",
    ],
  },
  {
    icon: Zap,
    title: "Agentic AI",
    category: "AI",
    description: "Next-generation autonomous AI systems that learn, adapt, and optimise.",
    features: [
      "Intelligent automation",
      "Autonomous decision-making",
      "Multi-agent systems",
      "Self-improving algorithms",
    ],
  },
];

const tools = ["Figma", "Adobe XD", "TensorFlow", "PyTorch", "OpenAI", "React", "Python", "AWS"];

const Index = () => {
  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <Seo
        title="QuanSynd - AI Design & Consulting | Pioneering the Future"
        description="QuanSynd pioneers cutting-edge AI solutions and design excellence. Expert services in UI Design, UX Research, Graphic Design, AI Consulting, and Agentic AI."
        canonicalPath="/"
        ogType="website"
      />
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="dot-grid-bg"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 80px",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "760px", width: "100%", textAlign: "center" }}>
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "32px",
              borderLeft: "2px solid var(--amber)",
              paddingLeft: "12px",
            }}
          >
            <span className="amber-label">A Scube Company</span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: "clamp(3rem, 6vw, 5rem)",
              lineHeight: "1.1",
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              marginBottom: "24px",
            }}
          >
            Designing Intelligence.{" "}
            <em style={{ fontStyle: "italic" }}>Building the Future.</em>
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
            QuanSynd pioneers cutting-edge AI consulting, design systems, and agentic solutions
            that transform how organisations think, work, and grow.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to="/contact"
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
              Start a Project <ArrowRight size={16} />
            </Link>
            <Link
              to="/services"
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
              Explore Services
            </Link>
          </div>

          {/* Trust line */}
          <p
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.06em",
              color: "var(--muted-ui)",
              marginTop: "28px",
              textTransform: "uppercase",
            }}
          >
            Trusted by forward-thinking teams globally
          </p>
        </div>

        {/* Scroll cue */}
        <div
          style={{
            position: "absolute",
            bottom: "36px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            animation: "bounce 2s infinite",
            opacity: 0.4,
          }}
        >
          <div
            style={{
              width: "20px",
              height: "32px",
              border: "1.5px solid var(--muted-ui)",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              paddingTop: "4px",
            }}
          >
            <div
              style={{
                width: "3px",
                height: "6px",
                background: "var(--muted-ui)",
                borderRadius: "2px",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── TOOLS STRIP ──────────────────────────────────────── */}
      <section
        className="cream-section"
        style={{
          padding: "40px 24px",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <p className="amber-label" style={{ textAlign: "center", marginBottom: "24px" }}>
            Powered by industry-leading tools
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "32px 48px",
              opacity: 0.55,
            }}
          >
            {tools.map((tool) => (
              <span
                key={tool}
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "var(--ink)",
                  letterSpacing: "-0.01em",
                  transition: "opacity 0.15s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLSpanElement).style.opacity = "1")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLSpanElement).style.opacity = "0.55")}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section style={{ padding: "96px 24px", background: "var(--paper)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {/* Section header */}
          <div style={{ marginBottom: "64px" }}>
            <span className="section-rule" />
            <span className="amber-label" style={{ display: "block", marginBottom: "12px" }}>
              What We Do
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
              Comprehensive AI &amp; design solutions
            </h2>
            <p
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: "16px",
                color: "var(--muted-ui)",
                maxWidth: "480px",
              }}
            >
              Tailored to your business needs — from strategy to execution.
            </p>
          </div>

          {/* Row 1 — 3 cards */}
          <div
            className="svc-grid-top"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            {services.slice(0, 3).map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>

          {/* Row 2 — 2 cards centered */}
          <div
            className="svc-grid-bot"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, calc((100% - 24px) / 3)))",
              gap: "24px",
              justifyContent: "center",
              marginTop: "24px",
            }}
          >
            {services.slice(3).map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>

          {/* CTA link */}
          <div style={{ marginTop: "48px" }}>
            <Link
              to="/services"
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "12px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--amber)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                borderBottom: "1px solid var(--amber)",
                paddingBottom: "2px",
              }}
            >
              View All Services <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── QUAN BENCH CTA BAND ───────────────────────────────── */}
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
              <span className="amber-label">Quan Bench</span>
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
              Quan Bench is Live
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
              Our open AI model intelligence index — benchmarking frontier, capable and efficient
              models across reasoning, accuracy, creativity and more.
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

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section style={{ padding: "96px 24px", background: "var(--paper)" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              marginBottom: "16px",
            }}
          >
            Ready to transform your business?
          </h2>
          <p
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: "16px",
              color: "var(--muted-ui)",
              marginBottom: "36px",
              lineHeight: "1.7",
            }}
          >
            Let's build the future together with cutting-edge AI and design solutions.
          </p>
          <Link
            to="/contact"
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
            Get Started Today <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

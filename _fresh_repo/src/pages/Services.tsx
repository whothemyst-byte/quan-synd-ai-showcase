import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Brain, Palette, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";

const services = [
  {
    icon: Palette,
    title: "UI Design",
    category: "Design",
    description: "Create stunning, user-friendly interfaces that captivate and convert",
    features: [
      "Modern, responsive web and mobile designs",
      "Comprehensive design system development",
      "Interactive prototyping and wireframing",
      "Brand-aligned visual aesthetics",
      "Accessibility-first approach",
      "Component library creation",
    ],
  },
  {
    icon: Search,
    title: "UX Research",
    category: "Research",
    description: "Gain deep insights into user behavior to drive informed design decisions",
    features: [
      "User interviews and usability testing",
      "Customer journey mapping",
      "Competitive analysis and benchmarking",
      "Persona development",
      "A/B testing and analytics",
      "Data-driven design recommendations",
    ],
  },
  {
    icon: Sparkles,
    title: "Graphic Design",
    category: "Creative",
    description: "Eye-catching visual content that strengthens your brand identity",
    features: [
      "Logo and brand identity design",
      "Marketing collateral and campaigns",
      "Custom illustrations and iconography",
      "Print and digital asset creation",
      "Motion graphics and animations",
      "Brand guidelines development",
    ],
  },
  {
    icon: Brain,
    title: "AI Consulting",
    category: "AI",
    description: "Strategic guidance for successful AI integration and implementation",
    features: [
      "AI strategy and roadmap development",
      "Technology stack assessment",
      "Use case identification and validation",
      "Implementation planning",
      "Risk assessment and mitigation",
      "Team training and workshops",
    ],
  },
  {
    icon: Zap,
    title: "Agentic AI",
    category: "AI",
    description: "Build autonomous AI systems that learn and adapt intelligently",
    features: [
      "Intelligent process automation",
      "Autonomous decision-making systems",
      "Multi-agent coordination",
      "Self-improving algorithms",
      "Adaptive learning models",
      "Real-time optimisation",
    ],
  },
];

const processSteps = [
  { number: "01", title: "Discover", desc: "Understanding your goals, constraints, and opportunities" },
  { number: "02", title: "Design", desc: "Creating innovative, evidence-based solutions" },
  { number: "03", title: "Develop", desc: "Building with precision and quality" },
  { number: "04", title: "Deploy", desc: "Launching, iterating, and optimising" },
];



const Services = () => {
  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="cream-section"
        style={{
          paddingTop: "120px",
          paddingBottom: "72px",
          borderBottom: "1px solid var(--rule)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <span className="amber-label" style={{ display: "block", marginBottom: "16px" }}>
            What We Do
          </span>
          <h1
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              lineHeight: "1.1",
              marginBottom: "16px",
            }}
          >
            End-to-end AI and Design{" "}
            <em style={{ fontStyle: "italic" }}>built for transformation.</em>
          </h1>
          <p
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: "18px",
              color: "var(--muted-ui)",
              maxWidth: "540px",
              margin: "0 auto",
              lineHeight: "1.7",
            }}
          >
            Comprehensive solutions tailored to your business needs — from strategy to launch.
          </p>
        </div>
      </section>

      {/* ── SERVICES GRID ────────────────────────────────────── */}
      <section style={{ padding: "96px 24px", background: "var(--paper)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
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
              <div key={s.title} id={s.title.toLowerCase().replace(/\s+/g, "-")}>
                <ServiceCard {...s} />
              </div>
            ))}
          </div>

          {/* Row 2 — 2 cards centered below */}
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
              <div key={s.title} id={s.title.toLowerCase().replace(/\s+/g, "-")}>
                <ServiceCard {...s} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────── */}
      <section
        className="cream-section"
        style={{
          padding: "96px 24px",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ marginBottom: "64px" }}>
            <span className="section-rule" />
            <span className="amber-label" style={{ display: "block", marginBottom: "12px" }}>
              Our Methodology
            </span>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
                fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                letterSpacing: "-0.02em",
                color: "var(--ink)",
              }}
            >
              A proven process that{" "}
              <em>delivers results.</em>
            </h2>
          </div>

          {/* Steps */}
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }}
            className="grid-cols-2 md:grid-cols-4"
          >
            {processSteps.map((step, i) => (
              <div
                key={i}
                style={{
                  borderLeft: i === 0 ? "none" : "1px solid var(--rule)",
                  paddingLeft: i === 0 ? "0" : "40px",
                  paddingRight: i < processSteps.length - 1 ? "40px" : "0",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: "italic",
                    fontSize: "3.5rem",
                    color: "var(--amber)",
                    lineHeight: 1,
                    marginBottom: "16px",
                    opacity: 0.8,
                  }}
                >
                  {step.number}
                </div>
                <h3
                  style={{
                    fontFamily: "'Geist', sans-serif",
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "var(--ink)",
                    marginBottom: "10px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Geist', sans-serif",
                    fontSize: "13px",
                    color: "var(--muted-ui)",
                    lineHeight: "1.65",
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── CTA ──────────────────────────────────────────────── */}
      <section
        className="cream-section"
        style={{
          padding: "96px 24px",
          borderTop: "1px solid var(--rule)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
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
            Need help with any of these services?
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
            Our experts are ready to discuss your project and provide tailored solutions.
          </p>
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
              Start Your Project <ArrowRight size={16} />
            </Link>
            <Link
              to="/about"
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
              About Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;

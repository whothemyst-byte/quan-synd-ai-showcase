import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Brain } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { Seo } from "@/seo/Seo";

const services = [
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
      <Seo
        title="Services | QuanSynd — AI Consulting, Graphic Design & Agentic AI"
        description="Explore QuanSynd services: Graphic Design, AI Consulting, and Agentic AI—end-to-end delivery for business transformation."
        canonicalPath="/services"
        ogType="website"
      />
      <Navbar />

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
            End-to-end AI and Design <em style={{ fontStyle: "italic" }}>built for transformation.</em>
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

      <section style={{ padding: "96px 24px", background: "var(--paper)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            className="svc-grid-top"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            {services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

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
              A proven process that <em>delivers results.</em>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }} className="grid-cols-2 md:grid-cols-4">
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

      <section className="cream-section" style={{ padding: "96px 24px", borderTop: "1px solid var(--rule)", textAlign: "center" }}>
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
          <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "16px", color: "var(--muted-ui)", marginBottom: "36px", lineHeight: "1.7" }}>
            Our experts are ready to discuss your project and provide tailored solutions.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" className="amber-btn" style={{ padding: "14px 28px", borderRadius: "6px", fontSize: "15px", display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
              Start Your Project <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="outline-ink-btn" style={{ padding: "14px 28px", borderRadius: "6px", fontSize: "15px", display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
              About Us
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: "72px 24px", background: "var(--paper)", borderTop: "1px solid var(--rule)" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", textAlign: "center" }}>
          <span className="amber-label" style={{ display: "block", marginBottom: "16px" }}>
            Insights
          </span>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)",
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              marginBottom: "12px",
            }}
          >
            Learn what we’re building and why it works.
          </h2>
          <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "16px", color: "var(--muted-ui)", lineHeight: "1.7", marginBottom: "28px" }}>
            Explore our writing on agentic AI, ethical implementation, and scalable design systems.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/blog" className="outline-ink-btn" style={{ padding: "12px 22px", borderRadius: "6px", textDecoration: "none" }}>
              Read the Blog
            </Link>
            <Link to="/blog/rise-of-agentic-ai" className="outline-ink-btn" style={{ padding: "12px 22px", borderRadius: "6px", textDecoration: "none" }}>
              Agentic AI
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;

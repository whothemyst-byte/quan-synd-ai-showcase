import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight, Bot, Code2, Sparkles } from "lucide-react";
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
    icon: Bot,
    title: "AI-Powered Business Solutions",
    category: "AI Solutions",
    description: "Intelligent tools that automate, engage, and grow your business - powered by AI",
    features: [
      "AI chatbots for websites and customer support",
      "Mini CRMs with AI-driven insights and automation",
      "AI-powered lead capture and qualification systems",
      "Smart email automation and follow-up workflows",
      "Business dashboards with AI analytics",
      "Document processing and summarisation tools",
      "AI form builders and intelligent data collection",
    ],
  },
  {
    icon: Code2,
    title: "Web & App Development",
    category: "Development",
    description: "From pixel-perfect websites to powerful web applications - built for performance and scale",
    features: [
      "Custom website design and development",
      "Web application development with React, Next.js, and modern stacks",
      "Landing pages and marketing sites",
      "E-commerce development",
      "Progressive Web Apps (PWA)",
      "API development and third-party integrations",
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
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Small delay to let the page render before scrolling
      const timer = setTimeout(() => {
        const el = document.getElementById(hash.replace("#", ""));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [hash]);

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <Seo
        title="Services | QuanSynd - AI-Powered Business Solutions, Web & App Development"
        description="Explore QuanSynd services: Graphic Design, AI-powered business solutions, and web and app development - end-to-end delivery for business transformation."
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
            End-to-end AI, Design, and Development <em style={{ fontStyle: "italic" }}>built for transformation.</em>
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
              <div key={s.title} id={s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}>
                <ServiceCard {...s} />
              </div>
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }} className="process-grid">
            {processSteps.map((step, i) => (
              <div
                key={i}
                className="process-step-card"
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
            Explore our writing on AI implementation, product engineering, and scalable design systems.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/blog" className="outline-ink-btn" style={{ padding: "12px 22px", borderRadius: "6px", textDecoration: "none" }}>
              Read the Blog
            </Link>
            <Link to="/contact" className="outline-ink-btn" style={{ padding: "12px 22px", borderRadius: "6px", textDecoration: "none" }}>
              Discuss a Build
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;

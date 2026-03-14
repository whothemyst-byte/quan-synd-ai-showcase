import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Heart, Rocket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/seo/Seo";

const About = () => {
  const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "3+", label: "Years of Expertise" },
    { value: "∞", label: "Global Clients" },
    { value: "1", label: "Scube Group" },
  ];

  const values = [
    "Innovation with purpose",
    "User-centric design",
    "Ethical AI practices",
    "Continuous learning",
  ];

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <Seo
        title="About QuanSynd | AI Design & Consulting"
        description="Learn about QuanSynd, a Scube Company bridging AI innovation and design excellence—our story, mission, values, and what drives our work."
        canonicalPath="/about"
        ogType="website"
      />
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="cream-section"
        style={{
          paddingTop: "120px",
          paddingBottom: "64px",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <p
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted-ui)",
              marginBottom: "20px",
            }}
          >
            QuanSynd / About
          </p>
          <h1
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              marginBottom: "16px",
            }}
          >
            About <em>QuanSynd</em>
          </h1>
          <p
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: "18px",
              color: "var(--muted-ui)",
              maxWidth: "560px",
              lineHeight: "1.7",
            }}
          >
            A Scube Company at the forefront of AI innovation and design excellence.
          </p>
        </div>
      </section>

      {/* ── OUR JOURNEY ───────────────────────────────────────── */}
      <section style={{ padding: "96px 24px", background: "var(--paper)" }}>
        <div
          className="about-story-grid"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.8fr",
            gap: "80px",
            alignItems: "start",
          }}
        >
          {/* Left */}
          <div
            style={{
              borderLeft: "3px solid var(--amber)",
              paddingLeft: "24px",
            }}
          >
            <span className="amber-label" style={{ display: "block", marginBottom: "16px" }}>
              Our Story
            </span>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
                fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                lineHeight: "1.2",
              }}
            >
              Built to bridge AI and design.
            </h2>
          </div>

          {/* Right */}
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                marginBottom: "48px",
              }}
            >
              {[
                "QuanSynd was founded with a singular vision: to bridge the gap between cutting-edge artificial intelligence and exceptional design. As a proud member of the Scube Group, we bring together decades of combined expertise in technology, design, and business strategy.",
                "Our journey began with a simple observation — while AI was advancing at an unprecedented pace, many organisations struggled to harness its potential effectively. We saw an opportunity to reimagine how technology and design could work together to create truly transformative experiences.",
                "Today, we serve clients globally, from innovative startups to established enterprises, helping them navigate the complex landscape of AI integration while maintaining the human-centered design principles that make technology accessible and valuable.",
              ].map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "'Geist', sans-serif",
                    fontSize: "15px",
                    color: "var(--muted-ui)",
                    lineHeight: "1.75",
                  }}
                >
                  {para}
                </p>
              ))}
            </div>


          </div>
        </div>
      </section>

      {/* ── MISSION / VISION / VALUES ─────────────────────────── */}
      <section
        className="cream-section"
        style={{
          padding: "96px 24px",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="grid-cols-1 md:grid-cols-3">
            {/* Mission */}
            <div style={{ background: "var(--card-bg)", border: "1px solid var(--rule)", borderRadius: "8px", padding: "40px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "8px",
                  background: "var(--amber)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "24px",
                }}
              >
                <Target size={22} color="#fff" />
              </div>
              <h3
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  color: "var(--ink)",
                  marginBottom: "14px",
                  letterSpacing: "-0.01em",
                }}
              >
                Our Mission
              </h3>
              <p
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: "14px",
                  color: "var(--muted-ui)",
                  lineHeight: "1.75",
                }}
              >
                To democratise AI and design excellence, making cutting-edge technology accessible
                to organisations of all sizes while maintaining the highest standards of innovation and quality.
              </p>
            </div>

            {/* Vision */}
            <div style={{ background: "var(--card-bg)", border: "1px solid var(--rule)", borderRadius: "8px", padding: "40px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "8px",
                  background: "var(--amber)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "24px",
                }}
              >
                <Eye size={22} color="#fff" />
              </div>
              <h3
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  color: "var(--ink)",
                  marginBottom: "14px",
                  letterSpacing: "-0.01em",
                }}
              >
                Our Vision
              </h3>
              <p
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: "14px",
                  color: "var(--muted-ui)",
                  lineHeight: "1.75",
                }}
              >
                A future where AI seamlessly enhances human creativity and decision-making, powered
                by intuitive design that puts users first — technology that adapts to people, not the other way around.
              </p>
            </div>

            {/* Values */}
            <div style={{ background: "var(--card-bg)", border: "1px solid var(--rule)", borderRadius: "8px", padding: "40px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "8px",
                  background: "var(--amber)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "24px",
                }}
              >
                <Heart size={22} color="#fff" />
              </div>
              <h3
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  color: "var(--ink)",
                  marginBottom: "14px",
                  letterSpacing: "-0.01em",
                }}
              >
                Our Values
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {values.map((v) => (
                  <li
                    key={v}
                    style={{
                      fontFamily: "'Geist', sans-serif",
                      fontSize: "14px",
                      color: "var(--muted-ui)",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ color: "var(--amber)", fontWeight: 700 }}>✦</span>
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FUTURE VISION (DARK) ──────────────────────────────── */}
      <section
        style={{
          background: "#1a1815",
          padding: "96px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle dot grid on dark */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(243,238,229,0.045) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "10px",
              border: "1px solid rgba(215,154,61,0.3)",
              background: "rgba(215,154,61,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 28px",
            }}
          >
            <Rocket size={24} color="#d79a3d" />
          </div>
          <span
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#d79a3d",
              display: "block",
              marginBottom: "20px",
            }}
          >
            Our Vision
          </span>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
              color: "#f3eee5",
              marginBottom: "24px",
              lineHeight: "1.15",
            }}
          >
            The Future We're Building
          </h2>
          <p
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: "16px",
              color: "#b1a692",
              lineHeight: "1.8",
              marginBottom: "40px",
            }}
          >
            We're not just adapting to the AI revolution — we're actively shaping it. Our work in
            Agentic AI and autonomous systems is paving the way for the next generation of intelligent
            technology that augments human capabilities, creates new opportunities, and solves real-world
            problems with elegance and efficiency.
          </p>
          <Link
            to="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "13px 28px",
              borderRadius: "6px",
              background: "#d79a3d",
              color: "#fff",
              fontFamily: "'Geist', sans-serif",
              fontWeight: 500,
              fontSize: "15px",
              textDecoration: "none",
              transition: "opacity 0.18s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.88")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            Talk to Us <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section style={{ padding: "96px 24px", background: "var(--paper)", textAlign: "center" }}>
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
            Join Hands with QuanSynd
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
            Let's collaborate to bring your vision to life with AI-powered innovation.
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
              Reach Out Today <ArrowRight size={16} />
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
              Our Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

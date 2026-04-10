import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Send, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Seo } from "@/seo/Seo";

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Project timelines vary based on scope and complexity. A focused discovery sprint can take 2–4 weeks, while a full AI consulting engagement typically runs 6–12 weeks. We provide detailed timelines during our discovery call.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes, absolutely. We work with clients globally and have served teams across Europe, the Middle East, Southeast Asia, and North America. All communications and deliverables are in English.",
  },
  {
    q: "Can we start with a smaller engagement first?",
    a: "Definitely. Many of our long-term clients started with a focused audit or a pilot project. We're happy to scope a smaller discovery engagement before committing to a full partnership.",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", company: "", service: "", budget: "", message: "" });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "6px",
    border: "1px solid var(--rule)",
    background: "var(--card-bg)",
    color: "var(--ink)",
    fontFamily: "'Geist', sans-serif",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.18s ease",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Geist Mono', monospace",
    fontSize: "10px",
    letterSpacing: "0.09em",
    textTransform: "uppercase" as const,
    color: "var(--muted-ui)",
    display: "block",
    marginBottom: "6px",
    fontWeight: 500,
  };

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <Seo
        title="Contact | QuanSynd â€” Letâ€™s Work Together"
        description="Get in touch with QuanSynd to discuss AI consulting, agentic AI, and graphic design services. Share your goals and weâ€™ll respond within 24 hours."
        canonicalPath="/contact"
        ogType="website"
      />
      <Navbar />

      {/* â”€â”€ HERO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        className="cream-section"
        style={{
          paddingTop: "120px",
          paddingBottom: "64px",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted-ui)", marginBottom: "20px" }}>
            QuanSynd / Contact
          </p>
          <h1
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              marginBottom: "16px",
              lineHeight: 1.1,
            }}
          >
            Let's work <em>together.</em>
          </h1>
          <p
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: "18px",
              color: "var(--muted-ui)",
              maxWidth: "480px",
              lineHeight: "1.7",
            }}
          >
            Tell us about your project and let's explore how QuanSynd can help.
          </p>
        </div>
      </section>

      {/* â”€â”€ MAIN CONTENT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{ padding: "80px 24px", background: "var(--paper)" }}>
        <div
          className="contact-split"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: "64px",
            alignItems: "start",
          }}
        >
          {/* Left â€” Form */}
          <div>
            <span className="amber-label" style={{ display: "block", marginBottom: "28px" }}>
              Send a Message
            </span>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="contact-name-email" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Smith"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "var(--amber)")}
                    onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "var(--rule)")}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "var(--amber)")}
                    onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "var(--rule)")}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Company / Organisation</label>
                <input
                  type="text"
                  placeholder="Your Company Inc."
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "var(--amber)")}
                  onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "var(--rule)")}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Service of Interest *</label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => handleChange("service", e.target.value)}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => ((e.target as HTMLSelectElement).style.borderColor = "var(--amber)")}
                    onBlur={(e) => ((e.target as HTMLSelectElement).style.borderColor = "var(--rule)")}
                  >
                    <option value="">Select a serviceâ€¦</option><option value="graphic-design">Graphic Design</option>
                    <option value="ai-consulting">AI Consulting</option>
                    <option value="agentic-ai">Agentic AI</option>
                    <option value="quan-bench">Quan Bench</option>
                    <option value="multiple">Multiple Services</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Project Budget</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => handleChange("budget", e.target.value)}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => ((e.target as HTMLSelectElement).style.borderColor = "var(--amber)")}
                    onBlur={(e) => ((e.target as HTMLSelectElement).style.borderColor = "var(--rule)")}
                  >
                    <option value="">Select budget rangeâ€¦</option>
                    <option value="under-5l">Under â‚¹5L</option>
                    <option value="5l-20l">â‚¹5L â€“ â‚¹20L</option>
                    <option value="20l-50l">â‚¹20L â€“ â‚¹50L</option>
                    <option value="50l-plus">â‚¹50L+</option>
                    <option value="discuss">Let's discuss</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Tell us about your project *</label>
                <textarea
                  required
                  placeholder="Describe your project, goals, timeline, and any specific requirementsâ€¦"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  style={{
                    ...inputStyle,
                    minHeight: "160px",
                    resize: "vertical",
                    fontFamily: "'Geist', sans-serif",
                  }}
                  onFocus={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "var(--amber)")}
                  onBlur={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "var(--rule)")}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="amber-btn"
                  style={{
                    width: "100%",
                    padding: "14px 24px",
                    borderRadius: "6px",
                    fontSize: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                >
                  Send Message <Send size={15} />
                </button>
                <p
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.05em",
                    color: "var(--muted-ui)",
                    textAlign: "center",
                    marginTop: "12px",
                  }}
                >
                  We respond within 24 business hours
                </p>
              </div>
            </form>
          </div>

          {/* Right â€” Info Card */}
          <div>
            <div
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--rule)",
                borderRadius: "8px",
                padding: "40px",
              }}
            >
              <span className="amber-label" style={{ display: "block", marginBottom: "16px" }}>
                Get in Touch
              </span>
              <h2
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontWeight: 400,
                  fontSize: "1.75rem",
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                  marginBottom: "20px",
                  lineHeight: 1.2,
                }}
              >
                We'd love to hear from you.
              </h2>

              <div style={{ width: "36px", height: "2px", background: "var(--amber)", marginBottom: "28px" }} />

              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "28px" }}>
                {[
                  { Icon: Mail, href: "mailto:info@quansynd.com", text: "info@quansynd.com" },
                  { Icon: Phone, href: "tel:+919500594498", text: "+91 95005 94498" },
                  {
                    Icon: MapPin,
                    href: "#",
                    text: "Coimbatore, Tamil Nadu â€” Global Operations",
                  },
                ].map(({ Icon, href, text }) => (
                  <a
                    key={text}
                    href={href}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      fontFamily: "'Geist', sans-serif",
                      fontSize: "14px",
                      color: "var(--muted-ui)",
                      textDecoration: "none",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--muted-ui)")}
                  >
                    <Icon size={15} style={{ color: "var(--amber)", flexShrink: 0, marginTop: "2px" }} />
                    {text}
                  </a>
                ))}
              </div>

              <div style={{ borderTop: "1px solid var(--rule)", paddingTop: "24px", marginBottom: "24px" }}>
                <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted-ui)", marginBottom: "12px" }}>
                  Follow Us
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                  {[
                    { Icon: Linkedin, href: "#" },
                    { Icon: Twitter, href: "#" },
                    { Icon: Github, href: "#" },
                  ].map(({ Icon, href }, i) => (
                    <a
                      key={i}
                      href={href}
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "6px",
                        border: "1px solid var(--rule)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--muted-ui)",
                        transition: "all 0.15s",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--amber)";
                        (e.currentTarget as HTMLAnchorElement).style.color = "var(--amber)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--rule)";
                        (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted-ui)";
                      }}
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--rule)", paddingTop: "20px" }}>
                <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: "10px", letterSpacing: "0.06em", color: "var(--muted-ui)", marginBottom: "6px", textTransform: "uppercase" }}>
                  Office Hours
                </p>
                <p style={{ fontFamily: "'Geist', sans-serif", fontSize: "13px", color: "var(--muted-ui)", lineHeight: "1.6" }}>
                  Monâ€“Fri Â· 9amâ€“6pm IST<br />
                  Sat Â· 10amâ€“4pm IST<br />
                  <span style={{ fontSize: "12px", opacity: 0.7 }}>* We operate across multiple time zones.</span>
                </p>
                <div style={{ marginTop: "16px" }}>
                  <span
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: "9px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--amber)",
                      border: "1px solid var(--amber)",
                      padding: "3px 8px",
                      borderRadius: "3px",
                    }}
                  >
                    Part of Scube Group
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ FAQ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        className="cream-section"
        style={{ padding: "80px 24px", borderTop: "1px solid var(--rule)" }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <span className="amber-label" style={{ display: "block", marginBottom: "8px" }}>
            Common Questions
          </span>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              marginBottom: "40px",
            }}
          >
            Frequently Asked
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderTop: "1px solid var(--rule)",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                    textAlign: "left",
                    padding: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Geist', sans-serif",
                      fontWeight: 600,
                      fontSize: "15px",
                      color: "var(--ink)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {faq.q}
                  </span>
                  <span style={{ color: "var(--amber)", flexShrink: 0 }}>
                    {openFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>
                {openFaq === i && (
                  <p
                    style={{
                      fontFamily: "'Geist', sans-serif",
                      fontSize: "14px",
                      color: "var(--muted-ui)",
                      lineHeight: "1.75",
                      marginTop: "12px",
                    }}
                  >
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--rule)" }} />
          </div>
        </div>
      </section>

      {/* â”€â”€ DISCOVERY CALL CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        className="paper-section"
        style={{
          padding: "64px 24px",
          borderTop: "1px solid var(--rule)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontWeight: 400,
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            marginBottom: "20px",
          }}
        >
          Prefer to schedule a call?
        </p>
        <a
          href="mailto:info@quansynd.com?subject=Discovery Call Request"
          className="outline-ink-btn"
          style={{
            padding: "13px 28px",
            borderRadius: "6px",
            fontSize: "14px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
          }}
        >
          Book a Discovery Call â†’
        </a>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;


import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/seo/Seo";
import featuredImage from "@/assets/blog-agentic-ai.jpg";
import designSystemsImage from "@/assets/blog-design-systems.jpg";
import ethicalAiImage from "@/assets/blog-ethical-ai.jpg";
import generativeAiImage from "@/assets/blog-generative-ai.jpg";
import multiAgentImage from "@/assets/blog-multi-agent.jpg";
import companyExpansionImage from "@/assets/blog-company-expansion.jpg";

const featuredPost = {
  slug: "rise-of-agentic-ai",
  title: "The Rise of Agentic AI: Autonomous Systems Reshaping Business",
  excerpt:
    "Explore how autonomous AI agents are revolutionising decision-making processes and creating new possibilities for business automation and intelligence.",
  category: "AI Innovation",
  date: "October 5, 2025",
  readTime: "8 min read",
  image: featuredImage,
};

const blogPosts = [
  { slug: "design-systems-age-of-ai", title: "Design Systems in the Age of AI", excerpt: "How AI is transforming the way we build and maintain design systems at scale.", category: "Design", date: "Oct 2, 2025", readTime: "6 min read", image: designSystemsImage },
  { slug: "ethical-ai-responsible-systems", title: "Ethical AI: Building Responsible Systems", excerpt: "Best practices for ensuring your AI implementations are ethical, transparent, and fair.", category: "AI Ethics", date: "Sep 28, 2025", readTime: "10 min read", image: ethicalAiImage },  { slug: "future-generative-ai-design", title: "The Future of Generative AI in Design", excerpt: "How generative AI tools are empowering designers and transforming creative workflows.", category: "AI Innovation", date: "Sep 20, 2025", readTime: "9 min read", image: generativeAiImage },
  { slug: "building-multi-agent-ai-systems", title: "Building Multi-Agent AI Systems", excerpt: "Technical deep-dive into coordinating multiple AI agents for complex problem-solving.", category: "Technology", date: "Sep 15, 2025", readTime: "12 min read", image: multiAgentImage },
  { slug: "company-expanding-global-reach", title: "Company Update: Expanding Our Global Reach", excerpt: "QuanSynd announces new partnerships and office locations across three continents.", category: "Company", date: "Sep 10, 2025", readTime: "4 min read", image: companyExpansionImage },
];

const categories = ["All", "AI Innovation", "Design", "Technology", "Company", "AI Ethics"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === selectedCategory);

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <Seo
        title="Blog | QuanSynd - Insights on AI, Design & Technology"
        description="Read QuanSynd perspectives on agentic AI, design systems, ethical AI, and emerging technology-ideas worth exploring."
        canonicalPath="/blog"
        ogType="website"
      />
      <Navbar />

      {/* -- HERO ----------------------------------------------- */}
      <section
        className="cream-section"
        style={{
          paddingTop: "120px",
          paddingBottom: "64px",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <span className="amber-label" style={{ display: "block", marginBottom: "16px" }}>
            Insights &amp; Perspectives
          </span>
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
            <em>Ideas</em> worth exploring.
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
            Expert perspectives on AI, design, and the future of technology.
          </p>
        </div>
      </section>

      {/* -- CATEGORY FILTER ------------------------------------ */}
      <section
        style={{
          padding: "28px 24px",
          background: "var(--paper)",
          borderBottom: "1px solid var(--rule)",
          position: "sticky",
          top: "64px",
          zIndex: 30,
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                padding: "6px 14px",
                borderRadius: "100px",
                border: "1px solid",
                cursor: "pointer",
                transition: "all 0.15s ease",
                background: selectedCategory === cat ? "var(--amber)" : "transparent",
                borderColor: selectedCategory === cat ? "var(--amber)" : "var(--rule)",
                color: selectedCategory === cat ? "#fff" : "var(--muted-ui)",
                fontWeight: 500,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* -- FEATURED ARTICLE ----------------------------------- */}
      <section style={{ padding: "64px 24px", background: "var(--paper)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Link
            to={`/blog/${featuredPost.slug}`}
            style={{ textDecoration: "none", display: "block" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                border: "1px solid var(--rule)",
                borderRadius: "8px",
                overflow: "hidden",
                transition: "border-color 0.2s ease",
              }}
              className="grid-cols-1 md:grid-cols-2"
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,136,42,0.4)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--rule)")
              }
            >
              {/* Image */}
              <div style={{ position: "relative", minHeight: "300px", overflow: "hidden" }}>
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  decoding="async"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                />
              </div>

              {/* Content */}
              <div
                style={{
                  padding: "48px",
                  background: "var(--card-bg)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--amber)",
                      border: "1px solid var(--amber)",
                      padding: "3px 8px",
                      borderRadius: "3px",
                    }}
                  >
                    {featuredPost.category}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: "10px",
                      color: "var(--muted-ui)",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Calendar size={11} /> {featuredPost.date}
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontWeight: 400,
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    letterSpacing: "-0.02em",
                    color: "var(--ink)",
                    lineHeight: 1.2,
                  }}
                >
                  {featuredPost.title}
                </h2>
                <p
                  style={{
                    fontFamily: "'Geist', sans-serif",
                    fontSize: "14px",
                    color: "var(--muted-ui)",
                    lineHeight: "1.7",
                  }}
                >
                  {featuredPost.excerpt}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid var(--rule)",
                    paddingTop: "16px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "0.06em",
                      color: "var(--muted-ui)",
                    }}
                  >
                    {featuredPost.readTime}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: "11px",
                      letterSpacing: "0.06em",
                      color: "var(--amber)",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    Read Article <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* -- ARTICLES GRID -------------------------------------- */}
      <section style={{ padding: "0 24px 96px", background: "var(--paper)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            className="blog-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}
          >
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--rule)",
                    borderRadius: "8px",
                    overflow: "hidden",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "border-color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(200,136,42,0.4)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--rule)")
                  }
                >
                  {/* Image */}
                  <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      padding: "24px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      flex: 1,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span
                        style={{
                          fontFamily: "'Geist Mono', monospace",
                          fontSize: "9px",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--amber)",
                        }}
                      >
                        {post.category}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Geist Mono', monospace",
                          fontSize: "9px",
                          color: "var(--muted-ui)",
                        }}
                      >
                        {post.readTime}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontWeight: 400,
                        fontSize: "1.1rem",
                        letterSpacing: "-0.01em",
                        color: "var(--ink)",
                        lineHeight: 1.3,
                        flex: 1,
                      }}
                    >
                      {post.title}
                    </h3>

                    <p
                      style={{
                        fontFamily: "'Geist', sans-serif",
                        fontSize: "13px",
                        color: "var(--muted-ui)",
                        lineHeight: "1.65",
                      }}
                    >
                      {post.excerpt}
                    </p>

                    <div
                      style={{
                        borderTop: "1px solid var(--rule)",
                        paddingTop: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Geist Mono', monospace",
                          fontSize: "9px",
                          color: "var(--muted-ui)",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Calendar size={10} /> {post.date}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Geist Mono', monospace",
                          fontSize: "10px",
                          color: "var(--amber)",
                          letterSpacing: "0.05em",
                        }}
                      >
                          Read {"->"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <p
              style={{
                textAlign: "center",
                fontFamily: "'Geist Mono', monospace",
                fontSize: "13px",
                color: "var(--muted-ui)",
                padding: "64px 0",
              }}
            >
              No articles in this category yet.
            </p>
          )}
        </div>
      </section>

      {/* -- NEWSLETTER ----------------------------------------- */}
      <section
        className="cream-section"
        style={{
          padding: "80px 24px",
          borderTop: "1px solid var(--rule)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              marginBottom: "12px",
            }}
          >
            Stay informed.
          </h2>
          <p
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: "15px",
              color: "var(--muted-ui)",
              marginBottom: "28px",
              lineHeight: "1.65",
            }}
          >
            Get the latest AI and design insights delivered to your inbox.
          </p>
          <div style={{ display: "flex", gap: "0", maxWidth: "400px", margin: "0 auto 12px" }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                flex: 1,
                padding: "12px 16px",
                borderRadius: "6px 0 0 6px",
                border: "1px solid var(--rule)",
                borderRight: "none",
                background: "var(--card-bg)",
                color: "var(--ink)",
                fontFamily: "'Geist', sans-serif",
                fontSize: "14px",
                outline: "none",
              }}
            />
            <button
              className="amber-btn"
              style={{
                padding: "12px 20px",
                borderRadius: "0 6px 6px 0",
                fontSize: "14px",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Subscribe {"->"}
            </button>
          </div>
          <p
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.05em",
              color: "var(--muted-ui)",
            }}
          >
            No spam. Unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;


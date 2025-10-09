import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Calendar, Tag, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Blog = () => {
  const featuredPost = {
    title: "The Rise of Agentic AI: Autonomous Systems Reshaping Business",
    excerpt: "Explore how autonomous AI agents are revolutionizing decision-making processes and creating new possibilities for business automation.",
    category: "AI Innovation",
    date: "October 5, 2025",
    readTime: "8 min read",
    image: "🤖",
  };

  const blogPosts = [
    {
      title: "Design Systems in the Age of AI",
      excerpt: "How AI is transforming the way we build and maintain design systems at scale.",
      category: "Design",
      date: "October 2, 2025",
      readTime: "6 min read",
      image: "🎨",
    },
    {
      title: "Ethical AI: Building Responsible Systems",
      excerpt: "Best practices for ensuring your AI implementations are ethical, transparent, and fair.",
      category: "AI Ethics",
      date: "September 28, 2025",
      readTime: "10 min read",
      image: "⚖️",
    },
    {
      title: "UX Research Methods for AI Products",
      excerpt: "Adapting traditional UX research methodologies for AI-powered applications.",
      category: "UX Research",
      date: "September 25, 2025",
      readTime: "7 min read",
      image: "🔍",
    },
    {
      title: "The Future of Generative AI in Design",
      excerpt: "How generative AI tools are empowering designers and transforming creative workflows.",
      category: "AI Innovation",
      date: "September 20, 2025",
      readTime: "9 min read",
      image: "✨",
    },
    {
      title: "Building Multi-Agent AI Systems",
      excerpt: "Technical deep-dive into coordinating multiple AI agents for complex problem-solving.",
      category: "Technology",
      date: "September 15, 2025",
      readTime: "12 min read",
      image: "🔧",
    },
    {
      title: "Company Update: Expanding Our Global Reach",
      excerpt: "QuanSynd announces new partnerships and office locations across three continents.",
      category: "Company",
      date: "September 10, 2025",
      readTime: "4 min read",
      image: "🌍",
    },
  ];

  const categories = ["All", "AI Innovation", "Design", "UX Research", "Technology", "Company"];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="gradient-text">Blog</span> & Insights
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Thought leadership on AI, design, and digital innovation
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <Card className="glass-card overflow-hidden max-w-5xl mx-auto hover-scale glow-effect">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="bg-gradient-ai flex items-center justify-center p-12">
                <div className="text-9xl">{featuredPost.image}</div>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center space-x-4 mb-4 text-sm">
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full font-medium">
                    Featured
                  </span>
                  <span className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {featuredPost.date}
                  </span>
                </div>
                <CardTitle className="text-3xl mb-4">{featuredPost.title}</CardTitle>
                <CardDescription className="text-base mb-6">
                  {featuredPost.excerpt}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{featuredPost.readTime}</span>
                  <Button variant="default" className="bg-gradient-ai">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-12 bg-muted/30">
        <div className="container mx-auto px-4 pt-12">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card
                key={index}
                className="glass-card overflow-hidden hover-scale glow-effect group cursor-pointer"
              >
                <div className="bg-gradient-ai flex items-center justify-center h-48">
                  <div className="text-6xl">{post.image}</div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center text-xs text-accent">
                      <Tag className="h-3 w-3 mr-1" />
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl group-hover:gradient-text transition-all">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {post.date}
                    </span>
                    <Button variant="ghost" size="sm" className="group-hover:text-accent">
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
              <TrendingUp className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Stay Ahead with AI & Design
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Get the latest insights, trends, and updates delivered to your inbox
          </p>
          <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            <Link to="/contact">
              Talk to Our Experts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;

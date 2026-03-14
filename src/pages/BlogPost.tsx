import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/seo/Seo";
import { blogPostingJsonLd } from "@/seo/schema";
import featuredImage from "@/assets/blog-agentic-ai.jpg";
import designSystemsImage from "@/assets/blog-design-systems.jpg";
import ethicalAiImage from "@/assets/blog-ethical-ai.jpg";
import uxResearchImage from "@/assets/blog-ux-research.jpg";
import generativeAiImage from "@/assets/blog-generative-ai.jpg";
import multiAgentImage from "@/assets/blog-multi-agent.jpg";
import companyExpansionImage from "@/assets/blog-company-expansion.jpg";

// Blog posts data with full content
const allBlogPosts = [
  {
    slug: "rise-of-agentic-ai",
    title: "The Rise of Agentic AI: Autonomous Systems Reshaping Business",
    excerpt: "Explore how autonomous AI agents are revolutionizing decision-making processes and creating new possibilities for business automation.",
    category: "AI Innovation",
    date: "October 5, 2025",
    readTime: "8 min read",
    author: "QuanSynd Team",
    image: featuredImage,
    content: `
      <p>The landscape of artificial intelligence is undergoing a profound transformation. Agentic AI represents a paradigm shift from traditional AI systems that respond to commands, to autonomous agents capable of independent decision-making and action.</p>
      
      <h2>What is Agentic AI?</h2>
      <p>Agentic AI refers to artificial intelligence systems that can operate autonomously, making decisions and taking actions without constant human oversight. These systems are designed to understand goals, plan strategies, and execute tasks independently.</p>
      
      <h2>Key Characteristics of Agentic Systems</h2>
      <p>Unlike traditional AI models that process inputs and generate outputs, agentic systems exhibit several distinctive characteristics:</p>
      <ul>
        <li><strong>Goal-oriented behavior:</strong> They understand objectives and work toward achieving them</li>
        <li><strong>Adaptive learning:</strong> They learn from experiences and adjust their approaches</li>
        <li><strong>Multi-step reasoning:</strong> They can break down complex problems into manageable steps</li>
        <li><strong>Tool usage:</strong> They can leverage external tools and APIs to accomplish tasks</li>
      </ul>
      
      <h2>Business Applications</h2>
      <p>Organizations across industries are discovering transformative applications for agentic AI:</p>
      <ul>
        <li>Automated customer service with intelligent escalation</li>
        <li>Supply chain optimization and predictive logistics</li>
        <li>Financial analysis and trading strategies</li>
        <li>Research and development acceleration</li>
      </ul>
      
      <h2>The Future of Autonomous Systems</h2>
      <p>As agentic AI continues to evolve, we anticipate even greater integration into business processes. The key to success lies in thoughtful implementation that combines AI capabilities with human oversight and ethical considerations.</p>
      
      <p>At QuanSynd, we're at the forefront of helping businesses harness the power of agentic AI while maintaining the human-centered approach that ensures sustainable, responsible innovation.</p>
    `,
  },
  {
    slug: "design-systems-age-of-ai",
    title: "Design Systems in the Age of AI",
    excerpt: "How AI is transforming the way we build and maintain design systems at scale.",
    category: "Design",
    date: "October 2, 2025",
    readTime: "6 min read",
    author: "QuanSynd Design Team",
    image: designSystemsImage,
    content: `
      <p>Design systems have long been the backbone of consistent, scalable digital products. Now, artificial intelligence is revolutionizing how we create, maintain, and evolve these crucial frameworks.</p>
      
      <h2>The Evolution of Design Systems</h2>
      <p>Traditional design systems required extensive manual effort to create and maintain. Teams spent countless hours documenting components, ensuring consistency, and updating guidelines across platforms.</p>
      
      <h2>AI-Powered Design Automation</h2>
      <p>Modern AI tools are transforming this landscape:</p>
      <ul>
        <li><strong>Automated component generation:</strong> AI can analyze existing designs and generate new components that maintain consistency</li>
        <li><strong>Intelligent documentation:</strong> Natural language processing helps create and update documentation automatically</li>
        <li><strong>Accessibility compliance:</strong> AI-driven tools can audit and fix accessibility issues in real-time</li>
        <li><strong>Cross-platform adaptation:</strong> Intelligent systems can adapt designs across web, mobile, and other platforms</li>
      </ul>
      
      <h2>Maintaining Human Creativity</h2>
      <p>While AI handles repetitive tasks, designers are freed to focus on what matters most: creative problem-solving and user experience innovation. The combination of human creativity and AI efficiency creates design systems that are both beautiful and functional.</p>
      
      <h2>Looking Ahead</h2>
      <p>The future of design systems lies in intelligent, adaptive frameworks that evolve with user needs while maintaining brand consistency. At QuanSynd, we're helping organizations build design systems that leverage AI without losing the human touch.</p>
    `,
  },
  {
    slug: "ethical-ai-responsible-systems",
    title: "Ethical AI: Building Responsible Systems",
    excerpt: "Best practices for ensuring your AI implementations are ethical, transparent, and fair.",
    category: "AI Ethics",
    date: "September 28, 2025",
    readTime: "10 min read",
    author: "QuanSynd Ethics Board",
    image: ethicalAiImage,
    content: `
      <p>As AI becomes increasingly integrated into critical business processes and everyday life, the importance of ethical AI development cannot be overstated. Building responsible AI systems is not just a moral imperative—it's essential for long-term business success.</p>
      
      <h2>The Pillars of Ethical AI</h2>
      <p>Responsible AI development rests on several foundational principles:</p>
      <ul>
        <li><strong>Transparency:</strong> Users should understand how AI systems make decisions</li>
        <li><strong>Fairness:</strong> AI must not discriminate against protected groups</li>
        <li><strong>Privacy:</strong> Personal data must be handled with the utmost care</li>
        <li><strong>Accountability:</strong> Clear ownership of AI decisions and outcomes</li>
      </ul>
      
      <h2>Bias Detection and Mitigation</h2>
      <p>One of the greatest challenges in AI ethics is addressing bias. This requires:</p>
      <ul>
        <li>Diverse and representative training data</li>
        <li>Regular auditing of model outputs</li>
        <li>Cross-functional review teams</li>
        <li>Continuous monitoring and adjustment</li>
      </ul>
      
      <h2>Implementing Ethical Frameworks</h2>
      <p>Organizations must establish clear guidelines and governance structures for AI development. This includes ethics review boards, impact assessments, and regular training for development teams.</p>
      
      <h2>The Business Case for Ethics</h2>
      <p>Ethical AI isn't just about avoiding harm—it's about building trust. Companies that prioritize responsible AI development enjoy stronger customer relationships, reduced regulatory risk, and more sustainable growth.</p>
    `,
  },
  {
    slug: "ux-research-ai-products",
    title: "UX Research Methods for AI Products",
    excerpt: "Adapting traditional UX research methodologies for AI-powered applications.",
    category: "UX Research",
    date: "September 25, 2025",
    readTime: "7 min read",
    author: "QuanSynd Research Team",
    image: uxResearchImage,
    content: `
      <p>User experience research for AI products presents unique challenges that require adapted methodologies. Traditional UX research methods need evolution to capture the nuances of human-AI interaction.</p>
      
      <h2>Understanding AI-Specific UX Challenges</h2>
      <p>AI products introduce complexities that traditional software doesn't have:</p>
      <ul>
        <li>Unpredictable outputs that may vary between sessions</li>
        <li>The need to set and manage user expectations</li>
        <li>Trust and transparency considerations</li>
        <li>Learning curves unique to AI interactions</li>
      </ul>
      
      <h2>Adapted Research Methods</h2>
      <p>Effective AI UX research incorporates several specialized approaches:</p>
      <ul>
        <li><strong>Longitudinal studies:</strong> Understanding how user perception evolves over time</li>
        <li><strong>Trust measurement:</strong> Assessing user confidence in AI decisions</li>
        <li><strong>Error tolerance testing:</strong> How users respond when AI makes mistakes</li>
        <li><strong>Explanation testing:</strong> Evaluating the effectiveness of AI explanations</li>
      </ul>
      
      <h2>Metrics That Matter</h2>
      <p>Beyond traditional UX metrics, AI products require measurement of trust scores, comprehension levels, and correction frequency. These metrics help teams understand the true quality of the user experience.</p>
      
      <h2>Building Better AI Experiences</h2>
      <p>At QuanSynd, we've developed specialized frameworks for AI UX research that help our clients create products users trust and love.</p>
    `,
  },
  {
    slug: "future-generative-ai-design",
    title: "The Future of Generative AI in Design",
    excerpt: "How generative AI tools are empowering designers and transforming creative workflows.",
    category: "AI Innovation",
    date: "September 20, 2025",
    readTime: "9 min read",
    author: "QuanSynd Creative Team",
    image: generativeAiImage,
    content: `
      <p>Generative AI is reshaping the creative landscape, offering designers unprecedented tools for ideation, iteration, and execution. Far from replacing human creativity, these technologies are amplifying it.</p>
      
      <h2>The Generative AI Revolution</h2>
      <p>From image generation to layout suggestions, generative AI is transforming every aspect of the design process:</p>
      <ul>
        <li><strong>Rapid prototyping:</strong> Generate multiple design concepts in seconds</li>
        <li><strong>Asset creation:</strong> Create custom illustrations, icons, and imagery on demand</li>
        <li><strong>Layout optimization:</strong> AI-suggested arrangements based on design principles</li>
        <li><strong>Brand consistency:</strong> Automated checks and suggestions for brand alignment</li>
      </ul>
      
      <h2>Human-AI Collaboration</h2>
      <p>The most effective use of generative AI is as a creative partner. Designers bring vision, context, and judgment; AI brings speed, variation, and technical execution. Together, they create better work faster.</p>
      
      <h2>Practical Applications</h2>
      <p>Leading organizations are using generative AI for:</p>
      <ul>
        <li>Campaign ideation and A/B testing</li>
        <li>Personalized content at scale</li>
        <li>Accessibility improvements</li>
        <li>Localization and cultural adaptation</li>
      </ul>
      
      <h2>Preparing for the Future</h2>
      <p>Designers who embrace generative AI as a tool—not a threat—will find themselves more productive and creative than ever before. The future belongs to those who can effectively collaborate with AI.</p>
    `,
  },
  {
    slug: "building-multi-agent-ai-systems",
    title: "Building Multi-Agent AI Systems",
    excerpt: "Technical deep-dive into coordinating multiple AI agents for complex problem-solving.",
    category: "Technology",
    date: "September 15, 2025",
    readTime: "12 min read",
    author: "QuanSynd Engineering",
    image: multiAgentImage,
    content: `
      <p>Multi-agent AI systems represent the cutting edge of artificial intelligence architecture. By coordinating multiple specialized agents, organizations can tackle complex problems that single-agent systems cannot solve effectively.</p>
      
      <h2>What Are Multi-Agent Systems?</h2>
      <p>Multi-agent AI involves multiple autonomous agents working together, each with specialized capabilities. These agents communicate, coordinate, and sometimes compete to achieve shared objectives.</p>
      
      <h2>Architecture Patterns</h2>
      <p>Common patterns for multi-agent systems include:</p>
      <ul>
        <li><strong>Hierarchical:</strong> A supervisor agent coordinates specialized worker agents</li>
        <li><strong>Peer-to-peer:</strong> Agents communicate directly and reach consensus</li>
        <li><strong>Hybrid:</strong> Combining hierarchical and peer elements for flexibility</li>
        <li><strong>Competitive:</strong> Agents propose solutions and the best one wins</li>
      </ul>
      
      <h2>Coordination Challenges</h2>
      <p>Building effective multi-agent systems requires solving several technical challenges:</p>
      <ul>
        <li>Communication protocols between agents</li>
        <li>Conflict resolution when agents disagree</li>
        <li>Resource allocation and task distribution</li>
        <li>Error handling and system resilience</li>
      </ul>
      
      <h2>Real-World Applications</h2>
      <p>Multi-agent systems excel in scenarios requiring diverse expertise: complex research tasks, strategic planning, creative projects, and system operations. At QuanSynd, we've deployed multi-agent architectures that significantly outperform traditional approaches.</p>
    `,
  },
  {
    slug: "company-expanding-global-reach",
    title: "Company Update: Expanding Our Global Reach",
    excerpt: "QuanSynd announces new partnerships and office locations across three continents.",
    category: "Company",
    date: "September 10, 2025",
    readTime: "4 min read",
    author: "QuanSynd Leadership",
    image: companyExpansionImage,
    content: `
      <p>We're thrilled to announce a major milestone in QuanSynd's journey: the expansion of our operations to three new continents. This growth reflects our commitment to bringing world-class AI and design solutions to organizations worldwide.</p>
      
      <h2>New Office Locations</h2>
      <p>QuanSynd is now operating from:</p>
      <ul>
        <li><strong>London, UK:</strong> Serving European clients with local expertise</li>
        <li><strong>Singapore:</strong> Our hub for Asia-Pacific operations</li>
        <li><strong>São Paulo, Brazil:</strong> Bringing AI innovation to Latin America</li>
      </ul>
      
      <h2>Strategic Partnerships</h2>
      <p>Alongside our geographic expansion, we've established partnerships with leading technology providers and academic institutions. These collaborations enhance our capability to deliver cutting-edge solutions.</p>
      
      <h2>Our Growing Team</h2>
      <p>With this expansion comes growth in our team. We're actively hiring talented professionals across all locations who share our passion for AI and human-centered design.</p>
      
      <h2>Commitment to Excellence</h2>
      <p>Despite our growth, our commitment remains unchanged: delivering exceptional AI and design solutions that make a real difference for our clients. We're excited about the opportunities ahead and grateful for the trust our clients place in us.</p>
      
      <p>If you're interested in joining our team or exploring partnership opportunities, please reach out at info@quansynd.com.</p>
    `,
  },
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = allBlogPosts.find((p) => p.slug === slug);

  const canonicalPath = (slug ? (`/blog/${slug}` as const) : "/blog") as `/${string}`;
  const title = post ? `${post.title} | QuanSynd` : "Post Not Found | QuanSynd";
  const description = post
    ? post.excerpt
    : "The blog post you’re looking for doesn’t exist. Browse the latest posts from QuanSynd.";
  const jsonLd = post
    ? blogPostingJsonLd({
        slug: post.slug,
        title: post.title,
        description: post.excerpt,
        datePublished: post.date,
        authorName: post.author,
      })
    : undefined;

  if (!post) {
    return (
      <div className="min-h-screen">
        <Seo
          title={title}
          description={description}
          canonicalPath={canonicalPath}
          ogType="website"
          noIndex
        />
        <Navbar />
        <div className="pt-32 pb-20 container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Seo
        title={title}
        description={description}
        canonicalPath={canonicalPath}
        ogType="article"
        jsonLd={jsonLd}
      />
      <Navbar />

      {/* Hero with Featured Image */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
            
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full font-medium flex items-center">
                <Tag className="h-3 w-3 mr-1" />
                {post.category}
              </span>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {post.date}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime}
              </span>
              <span className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {post.author}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <img
                src={post.image}
                alt={post.title}
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-ai opacity-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <article className="max-w-4xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-accent">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Learn More?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our team of experts is ready to help you implement cutting-edge solutions for your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="gradient" className="text-white dark:text-white">
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/services">View Services</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/blog">Read More Articles</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Brain, Palette, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import AIBackground from "@/components/AIBackground";
import AnimatedCounter from "@/components/AnimatedCounter";

const Index = () => {
  const services = [
    {
      icon: Palette,
      title: "UI Design",
      description: "Craft beautiful, intuitive interfaces that users love",
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
      description: "Deep insights into user behavior and needs",
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
      description: "Stunning visual content that captures attention",
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
      description: "Strategic guidance for AI integration",
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
      description: "Next-generation autonomous AI systems",
      features: [
        "Intelligent automation",
        "Autonomous decision-making",
        "Multi-agent systems",
        "Self-improving algorithms",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AIBackground />
        <div className="absolute inset-0 bg-gradient-glow opacity-30" />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block animate-pulse-glow">
              <span className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium">
                Pioneering the Future of AI
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Welcome to the Future of{" "}
              <span className="gradient-text">AI Innovation</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              QuanSynd pioneers cutting-edge artificial intelligence solutions that transform 
              businesses and shape tomorrow's technology landscape.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="bg-gradient-ai hover:shadow-ai transition-all group">
                <Link to="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive AI and design solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={
                  index < 3 
                    ? "lg:col-span-2" 
                    : index === 3 
                      ? "lg:col-span-2 lg:col-start-2" 
                      : "lg:col-span-2 lg:col-start-4"
                }
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/services">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <AnimatedCounter end={500} suffix="+" />
              <p className="text-lg mt-2 opacity-90">Projects Delivered</p>
            </div>
            <div className="text-center">
              <AnimatedCounter end={98} suffix="%" />
              <p className="text-lg mt-2 opacity-90">Client Satisfaction</p>
            </div>
            <div className="text-center">
              <AnimatedCounter end={50} suffix="+" />
              <p className="text-lg mt-2 opacity-90">AI Solutions Deployed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Software/Tools Stripe */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground mb-8">
            POWERED BY INDUSTRY-LEADING TOOLS
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            {["Figma", "Adobe XD", "TensorFlow", "PyTorch", "OpenAI", "React", "Python", "AWS"].map((tool) => (
              <div key={tool} className="text-lg md:text-xl font-semibold hover:opacity-100 transition-opacity">
                {tool}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-ai opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's build the future together with cutting-edge AI solutions
          </p>
          <Button asChild size="lg" className="bg-gradient-ai hover:shadow-ai transition-all">
            <Link to="/contact">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Search, Sparkles, Brain, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";

const Services = () => {
  const services = [
    {
      icon: Palette,
      title: "UI Design",
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
      description: "Build autonomous AI systems that learn and adapt intelligently",
      features: [
        "Intelligent process automation",
        "Autonomous decision-making systems",
        "Multi-agent coordination",
        "Self-improving algorithms",
        "Adaptive learning models",
        "Real-time optimization",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              End-to-end AI and design solutions that drive business transformation
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
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
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that delivers results
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: "01", title: "Discover", desc: "Understanding your needs and goals" },
                { number: "02", title: "Design", desc: "Creating innovative solutions" },
                { number: "03", title: "Develop", desc: "Building with precision" },
                { number: "04", title: "Deploy", desc: "Launching and optimizing" },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl font-bold gradient-text mb-4">{step.number}</div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Need help with any of these services?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Our experts are ready to discuss your project and provide tailored solutions
          </p>
          <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            <Link to="/contact">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Users, Zap, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedCounter from "@/components/AnimatedCounter";

const CaseStudies = () => {
  const caseStudies = [
    {
      title: "E-Commerce AI Transformation",
      client: "TechRetail Inc.",
      challenge: "Manual product recommendations leading to low conversion rates and customer dissatisfaction.",
      solution: "Implemented an AI-driven recommendation engine with real-time personalization, integrated with existing e-commerce platform.",
      results: [
        { label: "Conversion Rate Increase", value: 156, suffix: "%" },
        { label: "Revenue Growth", value: 2.3, prefix: "$", suffix: "M" },
        { label: "Customer Satisfaction", value: 94, suffix: "%" },
      ],
      tags: ["AI Consulting", "Agentic AI"],
    },
    {
      title: "Healthcare Portal Redesign",
      client: "MediCare Solutions",
      challenge: "Complex patient portal with poor usability, resulting in high support costs and low adoption.",
      solution: "Complete UX research and UI redesign focused on accessibility and simplification of key patient workflows.",
      results: [
        { label: "User Adoption", value: 287, suffix: "%" },
        { label: "Support Tickets Reduced", value: 64, suffix: "%" },
        { label: "Task Completion Rate", value: 92, suffix: "%" },
      ],
      tags: ["UI Design", "UX Research"],
    },
    {
      title: "FinTech Brand Evolution",
      client: "PayFlow Technologies",
      challenge: "Outdated brand identity failing to resonate with modern, tech-savvy audience.",
      solution: "Complete brand refresh including logo, design system, and marketing collateral aligned with cutting-edge fintech positioning.",
      results: [
        { label: "Brand Recognition", value: 178, suffix: "%" },
        { label: "User Sign-ups", value: 342, suffix: "%" },
        { label: "Market Share Growth", value: 23, suffix: "%" },
      ],
      tags: ["Graphic Design", "UI Design"],
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
              Case <span className="gradient-text">Studies</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Real results from real projects showcasing our expertise
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {caseStudies.map((study, index) => (
              <div key={index} className="max-w-6xl mx-auto">
                <Card className="glass-card overflow-hidden">
                  <CardHeader className="bg-gradient-ai p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-white/20 rounded-full text-sm text-white dark:text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <CardTitle className="text-3xl md:text-4xl text-white dark:text-white">
                      {study.title}
                    </CardTitle>
                    <p className="text-white/90 dark:text-white/90 text-lg mt-2">
                      Client: {study.client}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <div className="flex items-center space-x-2 mb-4">
                          <Award className="h-6 w-6 text-destructive" />
                          <h3 className="text-xl font-bold">Challenge</h3>
                        </div>
                        <p className="text-muted-foreground">{study.challenge}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2 mb-4">
                          <Zap className="h-6 w-6 text-accent" />
                          <h3 className="text-xl font-bold">Solution</h3>
                        </div>
                        <p className="text-muted-foreground">{study.solution}</p>
                      </div>
                    </div>

                    <div className="border-t border-border pt-8">
                      <div className="flex items-center space-x-2 mb-6">
                        <TrendingUp className="h-6 w-6 text-secondary" />
                        <h3 className="text-xl font-bold">Results</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {study.results.map((result, resultIndex) => (
                          <div key={resultIndex} className="text-center p-6 rounded-lg bg-muted/50">
                            <AnimatedCounter
                              end={result.value}
                              suffix={result.suffix}
                              prefix={result.prefix}
                            />
                            <p className="text-sm text-muted-foreground mt-2">
                              {result.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Impact</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Across all projects, we consistently deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Users, value: 500, suffix: "+", label: "Happy Clients" },
              { icon: TrendingUp, value: 185, suffix: "%", label: "Avg. ROI Increase" },
              { icon: Award, value: 98, suffix: "%", label: "Success Rate" },
              { icon: Zap, value: 50, suffix: "+", label: "AI Projects" },
            ].map((stat, index) => (
              <div key={index} className="text-center glass-card p-6 hover-scale">
                <stat.icon className="h-12 w-12 mx-auto mb-4 text-accent" />
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Want results like this?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help transform your business with AI and design
          </p>
          <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            <Link to="/contact">
              Get a Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudies;

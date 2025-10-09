import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Eye, Heart, Rocket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              About <span className="gradient-text">QuanSynd</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              A Scube Company at the forefront of AI innovation and design excellence
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="glass-card p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  QuanSynd was founded with a singular vision: to bridge the gap between cutting-edge 
                  artificial intelligence and exceptional design. As a proud member of the Scube Group, 
                  we bring together decades of combined expertise in technology, design, and business 
                  strategy.
                </p>
                <p>
                  Our journey began with a simple observation – while AI was advancing at an unprecedented 
                  pace, many organizations struggled to harness its potential effectively. We saw an 
                  opportunity to not just implement AI solutions, but to reimagine how technology and 
                  design could work together to create truly transformative experiences.
                </p>
                <p>
                  Today, we serve clients globally, from innovative startups to established enterprises, 
                  helping them navigate the complex landscape of AI integration while maintaining the 
                  human-centered design principles that make technology accessible and valuable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 hover-scale glow-effect">
              <div className="inline-flex p-3 rounded-xl bg-gradient-ai mb-6">
                <Target className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To democratize AI and design excellence, making cutting-edge technology accessible 
                to organizations of all sizes while maintaining the highest standards of innovation 
                and quality.
              </p>
            </div>

            <div className="glass-card p-8 hover-scale glow-effect">
              <div className="inline-flex p-3 rounded-xl bg-gradient-ai mb-6">
                <Eye className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                A future where AI seamlessly enhances human creativity and decision-making, powered 
                by intuitive design that puts users first. We envision technology that adapts to 
                people, not the other way around.
              </p>
            </div>

            <div className="glass-card p-8 hover-scale glow-effect">
              <div className="inline-flex p-3 rounded-xl bg-gradient-ai mb-6">
                <Heart className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Values</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-accent mr-2">✦</span>
                  Innovation with purpose
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✦</span>
                  User-centric design
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✦</span>
                  Ethical AI practices
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✦</span>
                  Continuous learning
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex p-4 rounded-2xl bg-primary-foreground/10 mb-4">
              <Rocket className="h-12 w-12" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">The Future We're Building</h2>
            <p className="text-xl opacity-90">
              We're not just adapting to the AI revolution – we're actively shaping it. Our work in 
              Agentic AI and autonomous systems is paving the way for the next generation of 
              intelligent technology. We believe in AI that augments human capabilities, creates new 
              opportunities, and solves real-world problems with elegance and efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Hands with QuanSynd
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's collaborate to bring your vision to life with AI-powered innovation
          </p>
          <Button asChild size="lg" className="bg-gradient-ai hover:shadow-ai transition-all">
            <Link to="/contact">
              Reach Out Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

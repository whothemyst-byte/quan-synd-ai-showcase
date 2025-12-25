import { Link } from "react-router-dom";
import { Mail, Phone, Linkedin, Twitter, Github } from "lucide-react";
import { useState, useEffect } from "react";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="bg-[hsl(263,70%,20%)] text-white dark:bg-[hsl(263,70%,20%)] dark:text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img 
              src={logoDark} 
              alt="QuanSynd Logo" 
              className="h-8 w-auto"
            />
            <p className="text-sm opacity-90">
              A Scube company pioneering AI-driven design and consulting solutions globally.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="opacity-90 hover:opacity-100 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="opacity-90 hover:opacity-100 transition-opacity">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="opacity-90 hover:opacity-100 transition-opacity">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="opacity-90">UI Design</li>
              <li className="opacity-90">UX Research</li>
              <li className="opacity-90">Graphic Design</li>
              <li className="opacity-90">AI Consulting</li>
              <li className="opacity-90">Agentic AI</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:info@quansynd.com"
                className="flex items-center space-x-2 opacity-90 hover:opacity-100 transition-opacity"
              >
                <Mail className="h-4 w-4" />
                <span>info@quansynd.com</span>
              </a>
              <a
                href="tel:+919500594498"
                className="flex items-center space-x-2 opacity-90 hover:opacity-100 transition-opacity"
              >
                <Phone className="h-4 w-4" />
                <span>+91 95005 94498</span>
              </a>
              <div className="flex space-x-4 pt-2">
                <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-90">
          <p>© {currentYear} QuanSynd - A Scube Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ArrowRight,
  MessageSquare,
  Mail,
  Activity,
  ArrowUp,
  Bell,
  Zap,
  Trophy,
} from "lucide-react";
import { Button } from "./Button";

// --- New Component: Scroll Progress Bar ---
export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (windowHeight === 0) return;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(Number(scroll));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </div>
  );
};

// --- New Component: Scroll To Top Button ---
export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 500px
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 transition-all duration-500 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-lg shadow-indigo-500/10 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:scale-110 transition-all duration-300"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
};

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 120; // Adjusted for banner + nav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* Top Banner - Updates & Trends */}
      <div className="bg-slate-900 text-slate-300 text-[10px] md:text-xs relative overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-9 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 shrink-0">
              <Zap className="w-3 h-3 text-indigo-400 fill-indigo-400" />
              <span className="font-bold text-indigo-300 uppercase tracking-wider text-[9px]">
                Trending
              </span>
            </div>
            <span className="truncate">
              <span className="hidden sm:inline text-slate-500 mr-2">|</span>
              <span className="font-medium text-slate-200">
                Bulk SMS open rates hit 98% in Uganda this month.
              </span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="flex items-center gap-1.5 hover:text-white transition-colors group"
            >
              <Bell className="w-3 h-3" />
              <span>System Updates</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-1 hover:text-white transition-colors group font-medium text-indigo-300"
            >
              Read Report{" "}
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled ? "glass-nav py-3 shadow-sm" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={(e) => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="w-9 h-9 bg-indigo-100 border border-indigo-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
                <img
                  src="/logo-dark.png"
                  alt="LUCOSMS Logo"
                  className="w-5 h-5 object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 font-display">
                LUCOSMS
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                onClick={(e) => scrollToSection(e, "features")}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#code"
                onClick={(e) => scrollToSection(e, "code")}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                Developers
              </a>
              <a
                href="#pricing"
                onClick={(e) => scrollToSection(e, "pricing")}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#customers"
                onClick={(e) => scrollToSection(e, "customers")}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                Customers
              </a>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {/* Status Indicator */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                <span className="text-xs font-medium text-emerald-700">
                  Systems Normal
                </span>
              </div>

              <div className="h-6 w-px bg-slate-200"></div>
              <div className="flex items-center border border-slate-300 px-3 py-1 rounded-full ">
                <Button size="sm" variant="none">
                <a
                  href="https://mintossms.vercel.app/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Started
                </a>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-4 md:hidden flex flex-col gap-4 shadow-lg animate-fade-in-up">
            <a
              href="#features"
              onClick={(e) => scrollToSection(e, "features")}
              className="text-sm font-medium text-slate-600 py-2 px-2 hover:bg-slate-50 rounded-lg"
            >
              Features
            </a>
            <a
              href="#code"
              onClick={(e) => scrollToSection(e, "code")}
              className="text-sm font-medium text-slate-600 py-2 px-2 hover:bg-slate-50 rounded-lg"
            >
              Developers
            </a>
            <a
              href="#pricing"
              onClick={(e) => scrollToSection(e, "pricing")}
              className="text-sm font-medium text-slate-600 py-2 px-2 hover:bg-slate-50 rounded-lg"
            >
              Pricing
            </a>
            <a
              href="#customers"
              onClick={(e) => scrollToSection(e, "customers")}
              className="text-sm font-medium text-slate-600 py-2 px-2 hover:bg-slate-50 rounded-lg"
            >
              Customers
            </a>
            <div className="h-px bg-slate-100 my-2"></div>
            <div className="flex items-center justify-between px-2 py-2">
              <span className="text-sm text-slate-500">Status</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-medium text-emerald-600">
                  All Systems Normal
                </span>
              </div>
            </div>
            <Button className="w-full justify-center mt-2">
              <a
                href="https://mintossms.vercel.app/signin"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started
              </a>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export const NewsletterSection: React.FC = () => {
  return (
    <section
      className="py-24 bg-slate-900 relative overflow-hidden"
      id="newsletter"
    >
      {/* Abstract Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl mix-blend-overlay filter animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl mix-blend-overlay filter animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display tracking-tight">
          Stay ahead of the curve
        </h2>
        <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Join 25,000+ developers and product managers getting the latest
          updates on SMS trends, API features, and deliverability tips.
        </p>

        <form
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-6 py-4 rounded-md bg-white/10 border border-white/10 text-white placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/20 backdrop-blur-md transition-all"
          />
          <button className="bg-white text-slate-900 px-8 py-4 rounded-md font-bold hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:-translate-y-0.5">
            Subscribe
          </button>
        </form>
        <p className="text-slate-400 text-xs mt-6 font-medium">
          No spam, unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 lg:col-span-2 pr-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-indigo-100 border border-indigo-900 rounded-lg flex items-center justify-center text-white">
                 <img src="/logo-dark.png" alt="LUCOSMS Logo" className="w-3 h-3 object-contain"/>
              </div>
              <span className="text-lg font-bold text-slate-900">LUCOSMS</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              The reliable, scalable, and developer-friendly SMS infrastructure
              for modern businesses. Built for speed and deliverability.
            </p>

            {/* Award Widget */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-amber-50 to-transparent border border-amber-100/50 rounded-xl mb-6">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 border-2 border-white shadow-sm">
                <Trophy className="w-4 h-4 text-amber-600 fill-amber-600" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider leading-none mb-1">
                  Excellence Award
                </div>
                <div className="text-xs font-bold text-slate-900 leading-none">
                  #1 Best SMS Sender 2025
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {["Twitter", "GitHub", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="https://x.com/abaasa_alb44871"
                  className="text-slate-400 hover:text-indigo-600 text-sm font-medium transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li>
                <a href="#" className="hover:text-indigo-600">
                  SMS Messaging
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600">
                  AI Voice Agents
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600">
                Msisdn  Verify
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600">
                  Payment Gateway
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li>
                <a href="#" className="hover:text-indigo-600">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600">
                  Guides
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600">
                  System Status
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li>
                <a href="#" className="hover:text-indigo-600">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600">
                  Issues
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © 2025 LUCOSMS Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-slate-600">
              Privacy
            </a>
            <a href="#" className="hover:text-slate-600">
              Terms
            </a>
            <a href="#" className="hover:text-slate-600">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

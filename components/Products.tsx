import React, { useState, useEffect } from "react";
import {
  Receipt,
  MessageCircle,
  Smartphone,
  Wifi,
  ArrowRight,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const products = [
  {
    title: "Auto Bills",
    description:
      "Automate utility payments, invoices, and recurring billing cycles with simple SMS triggers and API webhooks.",
    icon: Receipt,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "group-hover:border-blue-100",
    shadow: "group-hover:shadow-blue-500/10",
  },
  {
    title: "WhatsApp Connect",
    description:
      "Engage customers where they live. Official WhatsApp Business API integration for two-way support and sales.",
    icon: MessageCircle,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "group-hover:border-emerald-100",
    shadow: "group-hover:shadow-emerald-500/10",
  },
  {
    title: "Mobile Pay",
    description:
      "Instantly disburse funds to mobile money wallets across 180+ countries. Perfect for payroll and rewards.",
    icon: CreditCard,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "group-hover:border-purple-100",
    shadow: "group-hover:shadow-purple-500/10",
  },
  {
    title: "Airtime & Data",
    description:
      "Programmatically send airtime top-ups and data bundles to employees or customers on any network globally.",
    icon: Wifi,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "group-hover:border-amber-100",
    shadow: "group-hover:shadow-amber-500/10",
  },
];

export const Products: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsToShow(3);
      } else if (window.innerWidth >= 768) {
        setItemsToShow(2);
      } else {
        setItemsToShow(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset index if it goes out of bounds after resize
  useEffect(() => {
    const maxIndex = Math.max(0, products.length - itemsToShow);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsToShow, currentIndex]);

  const next = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, products.length - itemsToShow);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prev = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, products.length - itemsToShow);
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  return (
    <section className="relative pb-48 lg:pb-64 pt-0 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20">
      {/* Section Header */}

      <div className="flex  flex-col mx-auto mb-16 sm:flex-row justify-between items-end mb-12 px-4 gap-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-display tracking-tight mb-4">
          The Complete{" "}
          <span className="text-indigo-600">Messaging Ecosystem</span>
        </h2>
        <p className="text-slate-500 text-lg">
          Beyond basic SMS. Everything you need to build modern communication
          flows.
        </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          <button
            onClick={prev}
            className="p-3 rounded-full border border-slate-200 text-slate-600 bg-white hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 active:scale-95"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="p-3 rounded-full border border-slate-200 text-slate-600 bg-white hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 active:scale-95"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className={`group relative bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-2 overflow-hidden ${product.border} ${product.shadow} animate-fade-in-up`}
            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
          >
            {/* Subtle Hover Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10 flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div
                  className={`w-14 h-14 rounded-2xl ${product.bg} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}
                >
                  <product.icon className={`w-7 h-7 ${product.color}`} />
                </div>
                <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center bg-white group-hover:bg-slate-50 transition-colors">
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-all duration-300 -rotate-45 group-hover:rotate-0" />
                </div>
              </div>

              {/* Content */}
              <div className="mt-auto">
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-display tracking-tight">
                  {product.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 group-hover:text-slate-600 transition-colors">
                  {product.description}
                </p>
              </div>

              {/* Decorative bottom line */}
              <div
                className={`absolute bottom-0 left-0 h-1.5 w-0 bg-current opacity-20 transition-all duration-700 group-hover:w-full ${product.color}`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial, Stat } from '../types';

// Using CDN for brand logos. Color set to slate-400 for grayscale effect (64748b)
const brandLogos = [
  { name: "Shopify", url: "https://cdn.simpleicons.org/shopify/64748b" },
  { name: "HubSpot", url: "https://cdn.simpleicons.org/hubspot/64748b" },
  { name: "Zapier", url: "https://cdn.simpleicons.org/zapier/64748b" },
  { name: "Linear", url: "https://cdn.simpleicons.org/linear/64748b" },
  { name: "Notion", url: "https://cdn.simpleicons.org/notion/64748b" },
  { name: "Intercom", url: "https://cdn.simpleicons.org/intercom/64748b" },
  { name: "Stripe", url: "https://cdn.simpleicons.org/stripe/64748b" },
  { name: "Vercel", url: "https://cdn.simpleicons.org/vercel/64748b" },
];

const stats: Stat[] = [
  { value: "1M+", label: "Messages Sent" },
  { value: "100%", label: "Uganda Coverage" },
  { value: "50+", label: "Happy Clients" },
  { value: "10+", label: "Partner Schools" },
];

const testimonials: Testimonial[] = [
  {
    quote: "LUCOSMS transformed our customer engagement. The API is a dream to work with, and the delivery rates are unmatched.",
    author: "Brian Trends",
    role: "Developer",
    company: "TechFlow",
    image: "https://picsum.photos/100/100?random=1"
  },
  {
    quote: "We switched from Twilio and saved 40% while getting better support. The dashboard is incredibly intuitive.",
    author: "Npp Secondary School",
    role: "Head Master",
    company: "Npp SS",
    image: "https://picsum.photos/100/100?random=2"
  },
  {
    quote: "The segmentation features helped us double our conversion rates for abandoned cart recovery SMS.",
    author: "Ben Nakimanya",
    role: "Marketing Director",
    company: "Wax Tech",
    image: "https://picsum.photos/100/100?random=3"
  },
  {
    quote: "Documentation is world-class. I was able to integrate the 2FA service into our auth flow in under an hour.",
    author: "David Park",
    role: "Senior Engineer",
    company: "SecurePay",
    image: "https://picsum.photos/100/100?random=4"
  },
  {
    quote: "Finally, a messaging platform that doesn't feel like it's from 2010. Beautiful UI and reliable delivery.",
    author: "Jessica Wu",
    role: "Founder",
    company: "Appify",
    image: "https://picsum.photos/100/100?random=5"
  }
];

export const SocialProof: React.FC = () => {
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
    const maxIndex = Math.max(0, testimonials.length - itemsToShow);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsToShow, currentIndex]);

  const next = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, testimonials.length - itemsToShow);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prev = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, testimonials.length - itemsToShow);
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  return (
    <section className="py-24 bg-slate-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Bar - Infinite Marquee */}
        <div className="mb-24">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-10">Trusted by forward-thinking companies</p>
          
          <div className="relative flex overflow-hidden group select-none mask-gradient">
            {/* Gradient Masks for smooth fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10"></div>

            <div className="flex items-center gap-16 animate-marquee whitespace-nowrap py-4">
              {/* First Set */}
              {brandLogos.map((logo, i) => (
                <div key={`logo-1-${i}`} className="flex items-center justify-center min-w-[120px]">
                  <img 
                    src={logo.url} 
                    alt={logo.name} 
                    className="h-8 w-auto  grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110"
                  />
                </div>
              ))}
              {/* Duplicate Set for seamless loop */}
              {brandLogos.map((logo, i) => (
                <div key={`logo-2-${i}`} className="flex items-center justify-center min-w-[120px]">
                  <img 
                    src={logo.url} 
                    alt={logo.name} 
                    className="h-8 w-auto opacity-60 grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110"
                  />
                </div>
              ))}
              {/* Triplicate Set to ensure no gaps on wide screens */}
              {brandLogos.map((logo, i) => (
                <div key={`logo-3-${i}`} className="flex items-center justify-center min-w-[120px]">
                  <img 
                    src={logo.url} 
                    alt={logo.name} 
                    className="h-8 w-auto  hover:grayscale-0 transition-all duration-300 transform hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 divide-x divide-slate-200/50 border-y border-slate-100 py-12 bg-white/50 backdrop-blur-sm rounded-2xl">
            {stats.map((stat, i) => (
                <div key={i} className="text-center px-4">
                    <div className="text-4xl lg:text-5xl font-bold text-slate-900 mb-2 tracking-tight">{stat.value}</div>
                    <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">{stat.label}</div>
                </div>
            ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
            <div className="flex flex-col sm:flex-row justify-between items-end mb-12 px-4 gap-6">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 font-display">Loved by developers & marketers</h2>
                  <p className="text-slate-500 mt-2 max-w-xl">See what our customers have to say about the delivery speeds and API experience.</p>
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

            <div className="overflow-hidden -mx-4 p-4">
                <div 
                    className="flex transition-transform duration-500 ease-out will-change-transform"
                    style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
                >
                    {testimonials.map((t, i) => (
                        <div 
                            key={i} 
                            className="min-w-full md:min-w-[50%] lg:min-w-[33.333%] px-4"
                        >
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-110 transition-transform"></div>
                                <div className="flex gap-1 text-amber-400 mb-6">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                </div>
                                <p className="text-slate-600 mb-6 leading-relaxed relative z-10 flex-grow">"{t.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm bg-slate-100" />
                                    <div>
                                        <div className="font-semibold text-slate-900">{t.author}</div>
                                        <div className="text-sm text-slate-500">{t.role}, {t.company}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
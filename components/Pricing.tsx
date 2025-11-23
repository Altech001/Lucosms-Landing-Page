import React, { useState } from 'react';
import { Check, Phone, Mail, X, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { PricingTier } from '../types';

const tiers: PricingTier[] = [
  {
    name: "Basic",
    price: "35 UGX",
    period: "sms",
    description: "Pay-as-you-go for startups and small campaigns.",
    features: ["Standard Delivery Speed", "Web Dashboard Access", "Basic Analytics", "HTTP API Access", "No Monthly Fees"],
    cta: "Get Started"
  },
  {
    name: "Standard",
    price: "32 UGX",
    period: "sms",
    description: "For growing businesses sending regular updates.",
    features: ["Priority Delivery Routes", "2 Sender ID", "Advanced Reporting", "Sub-account Management", "Email Support"],
    cta: "Get Started",
    popular: true
  },
  {
    name: "Enterprise",
    price: "30 UGX",
    period: "sms",
    description: "High volume throughput with dedicated support.",
    features: ["Highest Priority Routes", "Dedicated Account Manager", "SMPP Connectivity", "24/7 Phone Support", "Custom SLA guarantees"],
    cta: "Contact Admin"
  }
];

export const Pricing: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <section className="py-24 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-display mb-4">
                Simple, transparent pricing
            </h2>
            <p className="text-lg text-slate-500">
                Best rates in Uganda. Pay only for what you use with zero hidden fees.
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
            {tiers.map((tier, index) => (
                <div 
                    key={index}
                    className={`relative rounded-3xl p-8 transition-all duration-300 ${
                        tier.popular 
                        ? 'bg-slate-900 text-white shadow-2xl scale-105 z-10 ring-1 ring-slate-900' 
                        : 'bg-white text-slate-900 border border-slate-200 hover:border-indigo-200 hover:shadow-xl'
                    }`}
                >
                    {tier.popular && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 border bg-slate-900 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                            Recommended
                        </div>
                    )}

                    <div className="mb-8">
                        <h3 className={`text-lg font-semibold ${tier.popular ? 'text-slate-200' : 'text-slate-600'}`}>
                            {tier.name}
                        </h3>
                        <div className="mt-4 flex items-baseline">
                            <span className="text-5xl font-bold tracking-tight">
                                {tier.price}
                            </span>
                            {tier.period && (
                                <span className={`ml-1 text-sm font-semibold ${tier.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                                    /{tier.period}
                                </span>
                            )}
                        </div>
                        <p className={`mt-4 text-sm ${tier.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                            {tier.description}
                        </p>
                    </div>

                    <ul className="space-y-4 mb-8">
                        {tier.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center gap-3">
                                <Check className={`w-5 h-5 ${tier.popular ? 'text-indigo-400' : 'text-indigo-600'}`} />
                                <span className={`text-sm ${tier.popular ? 'text-slate-300' : 'text-slate-600'}`}>
                                    {feature}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <Button 
                        onClick={handleOpenModal}
                        variant={tier.popular ? 'primary' : 'outline'} 
                        className={`w-full ${tier.popular ? 'bg-indigo-500 hover:bg-indigo-400 text-white border-transparent' : ''}`}
                    >
                        {tier.cta}
                    </Button>
                </div>
            ))}
        </div>
      </div>

      {/* Sleek Contact Admin Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up ring-1 ring-slate-900/5">
           
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 border  rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-4">
                   <Phone className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">Contact US</h3>
                <p className="text-slate-500 mt-2 leading-relaxed">
                  To activate your account or upgrade your plan, please contact our sales team.
                </p>
              </div>

              <div className="space-y-4">
                {/* Phone Card */}
                <a 
                  href="tel:+256 708 215 205" 
                  className="group flex items-center p-4 rounded-2xl border border-slate-200 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 bg-white"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <div className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-0.5">Call Now</div>
                    <div className="text-lg font-bold text-slate-900">+256 708 215 205</div>
                    <div className="text-sm text-slate-400">+256 769 030 0882</div>
                  </div>
                  <ArrowRight className="w-5 h-5 ml-auto text-slate-300 group-hover:text-indigo-600 transition-colors" />
                </a>

                {/* Email Card */}
                <a 
                  href="mailto:albertabaasa07@gmail.com" 
                  className="group truncate flex items-center p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 bg-white"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="ml-4 truncate">
                    <div className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-0.5">Send Email</div>
                    <div className="text-lg font-bold text-slate-900 text-ellipsis truncate">albertabaasa07@gmail.com</div>
                    <div className="text-sm text-slate-400">Typical reply in 1 hour</div>
                  </div>
                  <ArrowRight className="w-5 h-5 ml-auto text-slate-300 group-hover:text-emerald-600 transition-colors" />
                </a>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-xs text-slate-400">
                   Available Monday - Saturday, 8am - 6pm EAT.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
import React from 'react';
import { Zap, BarChart3, Users, Shield, Code2, Lock } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    title: "Lightning Delivery",
    description: "Direct carrier connections ensure your messages land in seconds, not minutes. Optimized for time-sensitive OTPs.",
    icon: Zap,
    color: "text-amber-500",
  },
  {
    title: "Advanced Analytics",
    description: "Real-time delivery reports, open rates, and click-through tracking visualization. Know exactly how your campaigns perform.",
    icon: BarChart3,
    color: "text-indigo-500",
  },
  {
    title: "Smart Segmentation",
    description: "Target customers based on behavior, location, and purchase history. AI-driven grouping for maximum engagement.",
    icon: Users,
    color: "text-pink-500",
  },
  {
    title: "Developer API",
    description: "Restful API with comprehensive documentation. SDKs for Node, Python, PHP, and Go. Get up and running in minutes.",
    icon: Code2,
    color: "text-blue-500",
  },
  {
    title: "99.99% Uptime SLA",
    description: "Enterprise-grade infrastructure with redundant pathways. We guarantee availability so your business never stops.",
    icon: Shield,
    color: "text-emerald-500",
  },
  {
    title: "Bank-Grade Security",
    description: "SOC 2 Type II certified. End-to-end encryption for sensitive data. Two-factor authentication enforcement.",
    icon: Lock,
    color: "text-slate-500",
  },
];

export const Features: React.FC = () => {
  return (
    <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-display mb-4">
                    Everything you need to <span className="text-indigo-600">scale messaging</span>
                </h2>
                <p className="text-lg text-slate-500">
                    Powerful features built for modern product teams. Whether you are sending one message or one million.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div 
                        key={index} 
                        className="group p-8 rounded-3xl  border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className={`w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                            <feature.icon className={`w-6 h-6 ${feature.color}`} />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                        <p className="text-slate-500 leading-relaxed">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};
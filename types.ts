import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
}
import React from 'react';
import { Navbar, NewsletterSection, Footer, ScrollProgress, ScrollToTop } from './components/Layout';
import { Hero } from './components/Hero';
import { Products } from './components/Products';
import { Features } from './components/Features';
import { SocialProof } from './components/SocialProof';
import { Pricing } from './components/Pricing';
import { SmsDemo } from './components/SmsDemo';
import { AiAgent } from './components/AiAgent';
import { Coverage } from './components/Coverage';
import { FAQ } from './components/FAQ';

// Styled SVG Divider
const WaveDivider: React.FC<{ flip?: boolean, color?: string }> = ({ flip, color = "fill-white" }) => (
  <div className={`w-full overflow-hidden leading-[0] transform ${flip ? 'rotate-180' : ''}`}>
    <svg className={`relative block w-[calc(132%+1.3px)] h-[50px] lg:h-[80px] ${color}`} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
    </svg>
  </div>
);

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section & Products Ecosystem */}
        <div id="hero" className="relative z-10 bg-[#FAFAFA]">
          <Hero />
          {/* Overlap/Extension of Hero */}
          <Products />
          
          {/* Divider Transition to Social Proof */}
          <div className="absolute bottom-0 w-full text-slate-50/50">
            <WaveDivider color="fill-slate-50/50" />
          </div>
        </div>
        
        {/* Customers / Social Proof */}
        <div id="customers" className="relative bg-slate-50/50 z-0">
           <SocialProof />
           {/* Transition to Dark Code Section */}
           <div className="absolute bottom-0 w-full text-slate-900">
             <WaveDivider color="fill-slate-900" />
           </div>
        </div>

        {/* Code Demo Section */}
        <div id="code" className="bg-slate-900 relative">
           <SmsDemo />
           <div className="absolute bottom-0 w-full text-white">
             <WaveDivider color="fill-white" />
           </div>
        </div>

        {/* Features */}
        <div id="features" className="bg-white relative">
           <Features />
           {/* No divider here, blending into Coverage which is dark */}
        </div>

        {/* Coverage Section (Dark) */}
        <Coverage />

        {/* Pricing */}
        <div id="pricing" className=" relative pb-20 pt-10">
           <Pricing />
           <div className="absolute bottom-0 w-full text-slate-900">
             <WaveDivider color="fill-slate-900" />
           </div>
        </div>

        {/* FAQ Section */}
        <FAQ />


        {/* Newsletter */}
        <NewsletterSection />
      </main>
      <Footer />
      <ScrollToTop />
      <AiAgent />
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import { ChevronDown, Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "How do I pay for SMS credits?",
    answer: "We accept all major payment methods including Mobile Money (MTN MoMo, Airtel Money) and Bank Transfers. Payments are processed instantly via the dashboard, and credits are added to your account immediately."
  },
  {
    question: "Do my SMS credits expire?",
    answer: "No, never. At LUCOSMS, your credits have lifetime validity. You can buy in bulk today and use them over the next few years without any worry of expiration."
  },
  {
    question: "Can I use a custom Sender ID?",
    answer: "Yes! We support custom alphanumeric Sender IDs (e.g., 'YOURBRAND'). Sender ID registration is of charge and typically takes 24-48 hours for telecom approval."
  },
  {
    question: "Is there a setup fee or monthly subscription?",
    answer: "There are zero setup fees and no monthly subscriptions for our Basic and Standard plans. You simply pay for the SMS credits you need. Enterprise plans may have specific SLA costs depending on requirements."
  },
  {
    question: "Do you support API integration?",
    answer: "Absolutely. We provide a developer-friendly REST API, SMPP connectivity, and ready-made SDKs for Node.js, PHP, Python, and Java. You can integrate SMS capabilities into your app in under 10 minutes."
  },
  {
    question: "What is the delivery rate?",
    answer: "We maintain a 99.9% delivery rate thanks to our direct Tier 1 carrier connections. We provide real-time delivery reports so you can verify the status of every single message sent."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="faq">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -translate-x-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl translate-x-1/3"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-display mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-500">
            Everything you need to know about getting started with LUCOSMS.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`group rounded-2xl border transition-all duration-300 ${
                openIndex === index 
                  ? 'bg-white border-indigo-200 shadow-lg shadow-indigo-500/5' 
                  : 'bg-slate-50 border-transparent hover:bg-white hover:border-slate-200'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`text-lg font-semibold transition-colors ${
                  openIndex === index ? 'text-indigo-900' : 'text-slate-700 group-hover:text-slate-900'
                }`}>
                  {faq.question}
                </span>
                <span className={`ml-4 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                  openIndex === index ? 'bg-indigo-100 text-indigo-600 rotate-180' : 'bg-white border border-slate-200 text-slate-400 group-hover:border-indigo-200 group-hover:text-indigo-500'
                }`}>
                   <ChevronDown className="w-5 h-5" />
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-slate-500 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center p-8 rounded-3xl border border-slate-200">
           <p className="text-slate-600 font-medium mb-4">Still have questions?</p>
           <a href="mailto:albertabaasa07@gmail.com" className="inline-flex items-center text-indigo-600 font-bold hover:text-indigo-700 hover:underline">
             Contact our support team
             <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
             </svg>
           </a>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Check, Copy, Terminal, Play, Loader2 } from 'lucide-react';

export const SmsDemo: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('+15550109988');
  const [messageBody, setMessageBody] = useState('Your one-time code is: 4829');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRun = () => {
    setIsSending(true);
    setShowSuccess(false);
    
    // Simulate API latency
    setTimeout(() => {
      setIsSending(false);
      setShowSuccess(true);
      
      // Hide success message after a few seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden" id="code">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      <div className="absolute top-1/3 right-0 w-1/2 h-1/2 bg-indigo-500/20 rounded-full blur-[120px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div>
             <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-6">
              <Terminal className="w-3 h-3 mr-2" />
              Developer Experience
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white font-display mb-6">
              Send your first SMS in <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                3 lines of code
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Our API is designed by developers for developers. Use our native SDKs for Node.js, Python, Go, and Java to get started in minutes, not days.
            </p>

            <div className="space-y-4">
              {[
                "Automatic retries and fallback logic",
                "Real-time webhooks for delivery status",
                "Global compliance handling included"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Code Window */}
          <div className="relative group">
             {/* Window Header */}
            <div className="bg-slate-800 rounded-t-xl border border-slate-700 p-3 sm:p-4 flex items-center justify-between gap-2 sm:gap-4">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="text-xs text-slate-500 font-mono hidden sm:block">send-sms.ts</div>
                <button 
                  onClick={handleRun}
                  disabled={isSending}
                  className="flex items-center gap-2 px-2 sm:px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white text-xs font-medium rounded-md transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/20 whitespace-nowrap"
                >
                  {isSending ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Play className="w-3 h-3 fill-current" />
                  )}
                  <span className="hidden sm:inline">{isSending ? 'Sending...' : 'Try it Live'}</span>
                  <span className="sm:hidden">{isSending ? '...' : 'Try'}</span>
                </button>
              </div>
            </div>

            {/* Code Content */}
            <div className="bg-[#0f172a] border-x border-b border-slate-700 p-6 rounded-b-xl overflow-x-auto shadow-2xl relative">
              {/* Success Toast */}
              <div className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs transition-all duration-300 ${showSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                <Check className="w-3 h-3" />
                <span>Message sent successfully!</span>
              </div>

              <pre className="font-mono text-sm leading-relaxed">
                <code className="text-slate-300">
                  <span className="text-purple-400">import</span> {`{ LucoSMS }`} <span className="text-purple-400">from</span> <span className="text-green-400">'@lucosms/sdk'</span>;<br/>
                  <br/>
                  <span className="text-purple-400">const</span> client = <span className="text-purple-400">new</span> <span className="text-yellow-300">LucoSMS</span>(process.env.API_KEY);<br/>
                  <br/>
                  <span className="text-purple-400">await</span> client.messages.<span className="text-blue-400">send</span>({`{`}<br/>
                  &nbsp;&nbsp;to: <span className="text-green-400 relative">
                    '
                    <input 
                      type="text" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="bg-transparent border-b border-dashed border-slate-600 hover:border-slate-400 focus:border-indigo-500 text-green-400 focus:outline-none p-0 m-0 h-5 transition-colors"
                      style={{ width: `${Math.max(12, phoneNumber.length)}ch` }}
                      spellCheck={false}
                    />
                    '
                  </span>,<br/>
                  &nbsp;&nbsp;from: <span className="text-green-400">'LUCO'</span>,<br/>
                  &nbsp;&nbsp;text: <span className="text-green-400 relative">
                    '
                    <input 
                      type="text" 
                      value={messageBody}
                      onChange={(e) => setMessageBody(e.target.value)}
                      className="bg-transparent border-b border-dashed border-slate-600 hover:border-slate-400 focus:border-indigo-500 text-green-400 focus:outline-none p-0 m-0 h-5 transition-colors"
                      style={{ width: `${Math.max(15, messageBody.length)}ch` }}
                      spellCheck={false}
                    />
                    '
                  </span><br/>
                  {`}`});
                </code>
              </pre>
              
              <div className="mt-4 text-xs text-slate-500 italic">
                * Try editing the values above
              </div>
            </div>
            
            {/* Phone Preview Overlay */}
            <div className="absolute -bottom-10 -right-4 w-64 bg-white rounded-[2rem] border-[6px] border-slate-800 shadow-2xl transform rotate-3 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105 hover:!rotate-0 z-20 hidden xl:block">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-800 rounded-b-xl z-10"></div>
                
                <div className="bg-slate-100 px-4 py-6 rounded-[1.5rem] h-full min-h-[160px] pt-12">
                   <div className="flex items-end gap-2 animate-fade-in-up">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700 shrink-0 mb-1">
                        LC
                      </div>
                      <div className="flex flex-col gap-1 max-w-[85%]">
                         <div className={`bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-xs text-slate-600 break-words border border-slate-100 transition-all duration-300 ${isSending ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                            {messageBody}
                         </div>
                         <div className="text-[9px] text-slate-400 pl-1 font-medium">
                            {isSending ? 'Sending...' : showSuccess ? 'Just now' : '12:42 PM'}
                         </div>
                      </div>
                   </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
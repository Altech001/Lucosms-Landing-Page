import React, { useState, useEffect } from 'react';
import { Wifi, Signal, Globe, Zap, CheckCircle2, Server, ShieldCheck, Radio } from 'lucide-react';

// Abstract World Map Dots (Simplified for visual aesthetics) - Adjusted for light mode
const WORLD_DOTS = [
  // Americas
  { cx: 100, cy: 150 }, { cx: 120, cy: 140 }, { cx: 110, cy: 170 }, { cx: 140, cy: 160 },
  { cx: 130, cy: 220 }, { cx: 150, cy: 250 },
  // Europe
  { cx: 260, cy: 130 }, { cx: 280, cy: 120 }, { cx: 270, cy: 150 }, { cx: 290, cy: 140 },
  // Africa (Uganda approximate center relative to others for this view)
  { cx: 280, cy: 200 }, { cx: 300, cy: 220 }, { cx: 270, cy: 250 }, { cx: 320, cy: 260 },
  // Asia
  { cx: 360, cy: 140 }, { cx: 380, cy: 130 }, { cx: 400, cy: 160 }, { cx: 420, cy: 150 },
  { cx: 370, cy: 180 }, { cx: 410, cy: 190 },
  // Australia
  { cx: 450, cy: 280 }, { cx: 470, cy: 290 },
];

export const Coverage: React.FC = () => {
  const [trafficSimulated, setTrafficSimulated] = useState(0);

  // Simulate traffic numbers
  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficSimulated(prev => prev + Math.floor(Math.random() * 15));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden text-slate-900" id="coverage">
      {/* Background Gradients - Light Mode */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-indigo-200/50 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[0%] w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-semibold uppercase tracking-wide mb-4">
              <Signal className="w-3 h-3" />
              <span>Live Network Status</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-slate-900">
              Unmatched coverage in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600">Uganda & Beyond</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              We prioritize local connectivity with direct SMPP binds to all major Ugandan telecom operators, ensuring your message reaches every corner of the country instantly.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="flex gap-4">
            <div className="border border-slate-200 p-4 rounded-xl">
               <div className="text-slate-500 text-xs uppercase font-semibold mb-1">Success Rate</div>
               <div className="text-2xl font-bold text-indigo-500">99.9%</div>
            </div>
            <div className="border border-slate-200 p-4 rounded-xl">
               <div className="text-slate-500 text-xs uppercase font-semibold mb-1">Avg. Net Latency</div>
               <div className="text-2xl font-bold text-indigo-500">~12ms</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Content / Infrastructure Details (Replacing Map) */}
          <div className="space-y-6">
             {/* Network Operators */}
             <div className=" p-6 rounded-2xl  border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Wifi className="w-5 h-5 text-indigo-600" />
                  Direct Carrier Connections
                </h3>
                <div className="grid grid-cols-3 gap-4">
                   {['MTN Uganda', 'Airtel Uganda', 'Lyca Mobile'].map(carrier => (
                     <div key={carrier} className="flex flex-col items-center p-3 bg-slate-50 rounded-xl border border-slate-300">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 mb-2"></div>
                        <span className="text-sm font-semibold text-slate-700">{carrier}</span>
                        <span className="text-[10px] text-emerald-600 font-medium">Connected</span>
                     </div>
                   ))}
                </div>
             </div>

             {/* Key Regions */}
             <div className="p-6 rounded-2xl  border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Radio className="w-5 h-5 text-indigo-600" />
                  Key Coverage Districts
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Kampala', 'Wakiso', 'Entebbe', 'Jinja', 'Mbarara', 'Gulu', 'Mbale', 'Arua', 'Fort Portal', 'Masaka', 'Mukono', 'Lira', 'Soroti', 'Kabale'].map(city => (
                    <span key={city} className="px-3 py-1 bg-slate-50 text-slate-600 text-sm rounded-full border border-slate-200">
                      {city}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-4">
                  * Including all rural sub-counties and remote islands via 2G/3G/4G fallback.
                </p>
             </div>

             {/* Reliability Promise */}
              <div className="flex items-start gap-4 p-4 rounded-2xl  border border-indigo-100">
                 <ShieldCheck className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
                 <div>
                    <h4 className="font-bold text-indigo-900 text-sm">Enterprise-Grade Redundancy</h4>
                    <p className="text-indigo-700 text-sm leading-relaxed mt-1">
                       Our infrastructure is geo-redundant across data centers in Kampala and Nairobi, ensuring 100% uptime even during localized network outages.
                    </p>
                 </div>
              </div>
          </div>

          {/* Global Connectivity / Use Case (Light Mode) */}
          <div className="flex flex-col gap-6 h-full">
             {/* Map Section */}
             <div className=" border border-slate-200 rounded-3xl p-6 flex-1 relative overflow-hidden shadow-lg shadow-indigo-500/5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-indigo-600" />
                    </div>
                    Traffic Flow
                  </h3>
                  <div className="text-xs font-mono text-slate-500">
                     <span className="w-2 h-2 inline-block rounded-full bg-emerald-500 mr-2 border"></span>
                     Live: {12450 + trafficSimulated} msg/s
                  </div>
                </div>

                <div className="relative h-64 w-full flex items-center justify-center bg-slate-50 rounded-2xl border border-slate-100">
                   <svg viewBox="0 0 600 300" className="w-full h-full opacity-80">
                      {/* World Dots - Darker for light mode */}
                      {WORLD_DOTS.map((dot, i) => (
                        <circle key={i} cx={dot.cx} cy={dot.cy} r="2" fill="#94a3b8" />
                      ))}
                      
                      {/* Active Traffic Arcs from Kampala */}
                      {[
                        { tx: 130, ty: 140, delay: '0s' }, // To US
                        { tx: 280, ty: 120, delay: '1.2s' }, // To Europe
                        { tx: 380, ty: 150, delay: '0.5s' }, // To Asia
                        { tx: 270, ty: 250, delay: '2s' }, // To South Africa
                      ].map((target, i) => (
                        <g key={i}>
                          {/* Arc Line - Darker */}
                          <path 
                            d={`M280,200 Q${(280 + target.tx)/2},${Math.min(200, target.ty) - 50} ${target.tx},${target.ty}`}
                            fill="none"
                            stroke="url(#gradLine)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          {/* Moving Particle - Colored */}
                          <circle r="3" fill="#4f46e5">
                            <animateMotion 
                              dur="3s" 
                              repeatCount="indefinite"
                              begin={target.delay}
                              path={`M280,200 Q${(280 + target.tx)/2},${Math.min(200, target.ty) - 50} ${target.tx},${target.ty}`}
                            />
                          </circle>
                        </g>
                      ))}

                      <defs>
                        <linearGradient id="gradLine" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="rgba(99, 102, 241, 0)" />
                          <stop offset="50%" stopColor="rgba(99, 102, 241, 0.3)" />
                          <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
                        </linearGradient>
                      </defs>
                   </svg>

                   {/* Central Hub Marker */}
                   <div className="absolute top-[60%] left-[46%] w-4 h-4 bg-indigo-600 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)] animate-pulse border-2 border-white"></div>
                </div>

                {/* Use Case Scenarios */}
                <div className="space-y-3 mt-6">
                  {[
                    { icon: Zap, label: "Instant OTPs", dest: "Global", speed: "<5s" },
                    { icon: Server, label: "Bank Alerts", dest: "Pan-Africa", speed: "<2s" },
                    { icon: CheckCircle2, label: "Marketing", dest: "Local", speed: "Instant" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl  border border-slate-200 text-sm hover:shadow-xs transition-shadow">
                       <div className="flex items-center gap-3 text-slate-600">
                          <div className="p-1.5 bg-indigo-50 rounded-lg">
                             <item.icon className="w-3.5 h-3.5 text-indigo-600" />
                          </div>
                          <span className="font-medium">{item.label}</span>
                       </div>
                       <div className="flex gap-4 text-xs text-slate-500 font-medium">
                          <span>{item.dest}</span>
                          <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{item.speed}</span>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
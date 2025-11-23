import React, { useRef, useEffect, useState } from "react";
import { ArrowRight, Play, Sparkles, Command } from "lucide-react";
import { Button } from "./Button";

// --- Utility: Random Number ---
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// --- Component: Background Beams with Collision (Light Mode) ---
const BackgroundBeamsWithCollision = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let beams: Beam[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Configuration for Light Mode
    const config = {
      beamColor: "rgba(99, 102, 241, 0.15)", // Indigo-500 low opacity
      beamActiveColor: "rgba(99, 102, 241, 0.8)", // Indigo-500 high opacity
      particleColor: "rgba(16, 185, 129, 0.8)", // Emerald-500
      beamSpeed: 3,
      spawnRate: 0.02,
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);
    resize();

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        const angle = random(0, Math.PI * 2);
        const speed = random(0.5, 2);
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.life = 0;
        this.maxLife = random(30, 60);
        this.size = random(1, 3);
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        this.size *= 0.95; // Shrink
      }

      draw(ctx: CanvasRenderingContext2D) {
        const opacity = 1 - this.life / this.maxLife;
        ctx.fillStyle = config.particleColor.replace("0.8", `${opacity}`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Beam {
      x: number;
      y: number;
      length: number;
      angle: number; // 0 (horizontal) or Math.PI/2 (vertical)
      speed: number;
      active: boolean;
      progress: number;

      constructor() {
        // Snap to grid-ish positions
        const gridSize = 100;
        const isVertical = Math.random() > 0.5;

        if (isVertical) {
          this.x = Math.floor(random(0, width) / gridSize) * gridSize;
          this.y = -100;
          this.angle = Math.PI / 2;
        } else {
          this.x = -100;
          this.y = Math.floor(random(0, height) / gridSize) * gridSize;
          this.angle = 0;
        }

        this.length = random(100, 300);
        this.speed = random(2, 5);
        this.active = true;
        this.progress = 0;
      }

      update() {
        if (this.angle === 0) {
          this.x += this.speed;
        } else {
          this.y += this.speed;
        }

        // Check bounds
        if (this.x > width + 100 || this.y > height + 100) {
          this.active = false;
        }

        // Random collision/explosion
        if (Math.random() < 0.005) {
          // Spawn particles at current head
          const headX = this.angle === 0 ? this.x + this.length : this.x;
          const headY = this.angle === 0 ? this.y : this.y + this.length;
          for (let i = 0; i < 5; i++)
            particles.push(new Particle(headX, headY));
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createLinearGradient(
          this.x,
          this.y,
          this.angle === 0 ? this.x + this.length : this.x,
          this.angle === 0 ? this.y : this.y + this.length
        );

        gradient.addColorStop(0, "rgba(99, 102, 241, 0)");
        gradient.addColorStop(0.5, config.beamActiveColor);
        gradient.addColorStop(1, "rgba(99, 102, 241, 0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";

        ctx.beginPath();
        if (this.angle === 0) {
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x + this.length, this.y);
        } else {
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x, this.y + this.length);
        }
        ctx.stroke();
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint grid
      ctx.strokeStyle = "rgba(200, 200, 200, 0.15)"; // Very subtle grid
      ctx.lineWidth = 1;
      const gridSize = 100;

      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Spawn beams
      if (Math.random() < config.spawnRate) {
        beams.push(new Beam());
      }

      // Update and draw beams
      beams.forEach((beam, index) => {
        beam.update();
        beam.draw(ctx);
        if (!beam.active) beams.splice(index, 1);
      });

      // Update and draw particles
      particles.forEach((p, index) => {
        p.update();
        p.draw(ctx);
        if (p.life > p.maxLife) particles.splice(index, 1);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-60 mix-blend-multiply"
    />
  );
};

// --- Component: Text Hover Effect (SVG) ---
const TextHoverEffect = ({
  text,
  subtext,
}: {
  text: string;
  subtext: string;
}) => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center mb-12 group cursor-default select-none">
      {/* Main Text SVG */}
      <div className="relative">
        <h1 className="text-7xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter font-display text-slate-900 relative z-10 mix-blend-overlay opacity-0 group-hover:opacity-0 transition-opacity duration-500 hidden">
          {/* Hidden accessible text */}
          {text}
        </h1>

        <svg
          className="w-full h-[120px] md:h-[160px] lg:h-[200px] overflow-visible"
          viewBox="0 0 1000 200"
        >
          <defs>
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>

            <mask id="textMask">
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-bold font-display tracking-tighter text-[4rem] md:text-[6rem] lg:text-[7.5rem]"
                fill="white"
              >
                {text}
              </text>
            </mask>
          </defs>

          {/* Base Text (Stroke) */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-bold font-display tracking-tighter text-[4rem] md:text-[6rem] lg:text-[7.5rem] fill-slate-900 stroke-slate-900 stroke-[2px] transition-all duration-700 ease-out group-hover:fill-transparent group-hover:stroke-indigo-500"
          >
            {text}
          </text>

          {/* Hover Effect - Gradient Stroke & Glow */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-bold font-display tracking-tighter text-[4rem] md:text-[6rem] lg:text-[7.5rem] fill-transparent stroke-[url(#textGradient)] stroke-[3px] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out translate-y-2 group-hover:translate-y-0"
            mask="url(#textMask)"
          >
            {text}
          </text>
        </svg>
      </div>

      {/* Subtext / Second Line */}
      <h2 className="text-5xl md:text-6xl lg:text-6xl font-bold tracking-tight text-slate-300 group-hover:text-slate-900 transition-colors duration-700 -mt-4 md:-mt-8 relative z-20">
        {subtext}
      </h2>
    </div>
  );
};

export const Hero: React.FC = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-48 overflow-hidden min-h-[90vh] flex items-center justify-center bg-[#FAFAFA]">
      <BackgroundBeamsWithCollision />

      {/* Ambient Light Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-300/20 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-emerald-300/20 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center">
          {/* Top Badge */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="inline-flex items-center px-3 py-1.5 rounded-full  border border-slate-200 shadow-sm mb-8 hover:border-indigo-300 transition-colors cursor-pointer group">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 mr-2" />
              <span className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
                Lucosms 2.0
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Ultra-Modern Text Effect */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <TextHoverEffect
              text="SEND BULK SMS"
              subtext="That Actually Get Opened"
            />
          </div>

          {/* Description */}
          <p
            className="mt-6 text-lg md:text-xl text-slate-500 max-w-2xl text-center leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            Deliver millions of messages instantly with 99.9% uptime.{" "}
            <br className="hidden md:block" />
            The developer-friendly platform trusted by 10,000+ growing
            businesses.
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              size="lg"
              className="shadow-xl shadow-indigo-500/20 h-14 px-8 text-base"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              <a
                href="https://mintossms.vercel.app/signin"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start Sending
              </a>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="h-14 px-8 text-base bg-white/80 backdrop-blur-md border-slate-200"
              icon={<Play className="w-4 h-4 fill-slate-900" />}
              onClick={() => setIsDemoOpen(true)}
            >
              Watch Demo
            </Button>
          </div>

          {/* Keyboard shortcut hint */}
          <div
            className="mt-8 flex items-center gap-2 text-xs text-slate-400 animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded border border-slate-200 font-mono">
              <Command className="w-3 h-3" />
              <span>A</span>
            </div>
            <span>Great minds are Limitless</span>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isDemoOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-md transition-opacity"
            onClick={() => setIsDemoOpen(false)}
          ></div>
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up ring-1 ring-white/10">
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button
                className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-sm"
                onClick={() => setIsDemoOpen(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <iframe
              width="912"
              height="513"
              src="https://www.youtube.com/embed/x304s-peJIA"
              title="Sending Bulky , Single Messages On LUCOSMS, Using Promo Codes to SMS Cost CutOffs"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

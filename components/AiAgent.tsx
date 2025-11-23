import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  Sparkles,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";

// --- Site Context Data ---
// This provides the "Knowledge Base" for the AI
const SITE_CONTEXT = `
You are the AI Support Agent for LUCOSMS, a premium bulk SMS platform in Uganda.
Your tone is professional, helpful, and enthusiastic.

WEBSITE CONTENT:
1. STATS & PARTNERS:
   - 1M+ Messages Sent.
   - 100% Uganda Coverage.
   - 50+ Happy Clients (including top companies like Shopify, HubSpot, Linear).
   - 10+ Partner Schools.
   - Trusted by 10,000+ growing businesses globally.

2. PRICING (UGX per SMS):
   - Basic: 35 UGX (Pay-as-you-go, Web Dashboard, Basic Analytics).
   - Standard: 32 UGX (Priority Routes, Sender ID, Sub-accounts). *Popular*
   - Enterprise: 30 UGX (Dedicated Support, SMPP, Custom SLA).

3. CONTACT DETAILS:
   - Phone: +256 772 123 456 or +256 701 987 654
   - Email: admin@lucosms.ug
   - Location: Uganda

4. FEATURES:
   - Lightning Delivery (Direct carrier connections).
   - Advanced Analytics (Delivery reports, open rates).
   - Smart Segmentation (AI-driven grouping).
   - Developer API (Node, Python, Go SDKs).
   - 99.99% Uptime SLA.

5. PRODUCTS:
   - Auto Bills (Utility payments).
   - WhatsApp Connect (Business API).
   - Mobile Pay (Disbursements).
   - Airtime & Data (Top-ups).

INSTRUCTIONS:
- If the user asks for pricing, give the specific UGX rates.
- If the user wants to see a specific section (Pricing, Features, Code/Developers, Customers, Newsletter), CALL the 'navigate_to_section' tool.
- If the user asks to contact support, provide the phone numbers and email.
- Keep responses concise (under 3 sentences when possible).
`;

// --- Tool Definition ---
const navigationTool: FunctionDeclaration = {
  name: "navigate_to_section",
  description:
    "Scrolls the website to a specific section when the user asks to see it.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      sectionId: {
        type: Type.STRING,
        description: "The HTML ID of the section to scroll to.",
        enum: [
          "hero",
          "features",
          "code",
          "pricing",
          "customers",
          "newsletter",
        ],
      },
    },
    required: ["sectionId"],
  },
};

interface Message {
  role: "user" | "model";
  text: string;
  isToolCall?: boolean;
}

export const AiAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hello! I can help you with pricing, features, or navigation. How can I assist you today?",
    },
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<any>(null);

  const API_KEY = "AIzaSyA40V2cRy4tlD2G1cN8iN4ruusN5V6xMc8";

  // Initialize Chat Session
  useEffect(() => {
    if (!process.env.API_KEY) return;

    const ai = new GoogleGenAI({ apiKey: API_KEY });

    chatSessionRef.current = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SITE_CONTEXT,
        tools: [{ functionDeclarations: [navigationTool] }],
      },
    });
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      return true;
    }
    return false;
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading || !chatSessionRef.current) return;

    const userText = inputValue;
    setInputValue("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setIsLoading(true);

    try {
      const response = await chatSessionRef.current.sendMessage({
        message: userText,
      });

      // Check for Tool Calls (Navigation)
      const functionCalls = response.functionCalls;
      let toolResponseText = "";

      if (functionCalls && functionCalls.length > 0) {
        const call = functionCalls[0];
        if (call.name === "navigate_to_section") {
          const sectionId = call.args.sectionId as string;
          const success = handleScrollToSection(sectionId);

          // Construct the FunctionResponse part
          // The API requires the response to be wrapped in a specific structure
          const functionResponsePart = {
            functionResponse: {
              name: call.name,
              response: {
                result: success
                  ? `User was scrolled to section: ${sectionId}`
                  : `Section ${sectionId} not found`,
              },
              id: call.id, // Vital for correlating the response to the call
            },
          };

          // Send tool response back to model to get final text
          // We pass it as an array because it's a content part
          const finalResponse = await chatSessionRef.current.sendMessage([
            functionResponsePart,
          ]);
          toolResponseText = finalResponse.text;
        }
      } else {
        toolResponseText = response.text;
      }

      setMessages((prev) => [
        ...prev,
        { role: "model", text: toolResponseText },
      ]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I'm having trouble connecting right now. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <div
        className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ${
          isOpen
            ? "opacity-0 translate-y-10 pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-slate-900 text-white shadow-xl shadow-indigo-500/30 hover:bg-indigo-600 hover:scale-110 transition-all duration-300"
        >
          {/* Ping Animation */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500 border-2 border-white"></span>
          </span>
          <Bot className="w-7 h-7" />
        </button>
      </div>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[400px] h-[600px] max-h-[80vh] flex flex-col rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200 shadow-2xl transition-all duration-500 origin-bottom-right ${
          isOpen
            ? "scale-100 opacity-100"
            : "scale-75 opacity-0 pointer-events-none translate-y-10"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Lucosms AI</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs text-slate-500 font-medium">
                  Online
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 scroll-smooth"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-500/10"
                    : "bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex gap-1">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.1s]"></span>
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSendMessage}
          className="p-4 bg-white border-t border-slate-100 rounded-b-3xl"
        >
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about pricing, features..."
              className="w-full pl-4 pr-12 py-3 rounded-full bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none text-sm text-slate-800 placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="absolute right-2 p-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className="mt-2 text-center">
            <span className="text-[10px] text-slate-400">
              AI can make mistakes. Please verify info.
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

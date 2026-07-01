import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, Sparkles } from "lucide-react";
import { FAQS_DATA } from "../data";

export default function FAQCollapse() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-8 space-y-8 font-sans text-xs">
      <div className="space-y-2 text-center max-w-md mx-auto">
        <span className="text-[10px] tracking-widest font-black uppercase text-emerald-400 font-mono">FAQ REFERENCE</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
          Frequently Asked <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">Questions</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Shedding light on the core operations, compilation parameters, and licensing limits of Nep AI.
        </p>
      </div>

      <div className="space-y-4 pt-4">
        {FAQS_DATA.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-[#0a101d] border border-slate-900 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full p-5 text-left flex items-center justify-between hover:bg-slate-900/10 focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 font-bold font-mono">
                    {index + 1}
                  </span>
                  <span className="text-sm font-bold text-slate-100 tracking-tight leading-relaxed">
                    {faq.q}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {isOpen && (
                <div className="p-5 pt-0 border-t border-slate-900/60 text-xs text-slate-400 leading-relaxed space-y-2 bg-[#080d17]/40">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Suggestion prompt card */}
      <div className="bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 border border-emerald-500/10 rounded-2xl p-6 text-center space-y-4 max-w-xl mx-auto">
        <MessageSquare className="w-8 h-8 text-emerald-400 mx-auto animate-pulse" />
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-white">Still have question marks?</h4>
          <p className="text-[10px] text-slate-500">
            Communicate directly with our general AI Research assistants to get citation-based academic answers.
          </p>
        </div>
        <button
          onClick={() => alert("Please navigate to the Agents tab and select core agent AI Research Assistant (#11).")}
          className="px-4 py-2 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 text-[10px] uppercase font-bold tracking-wider rounded-xl transition-colors cursor-pointer"
        >
          Select specialized advisor
        </button>
      </div>
    </div>
  );
}

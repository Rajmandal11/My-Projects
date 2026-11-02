import React from 'react';
import { TESTIMONIALS } from '../data/portfolioData';
import { AccentColor } from '../types';
import { Quote, Star } from 'lucide-react';

interface TestimonialsSectionProps {
  accentColor: AccentColor;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ accentColor }) => {
  return (
    <section data-reveal id="testimonials-section" className="py-24 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-600 mb-3">
            <span className="w-6 h-px bg-emerald-400" />
            <span>Endorsements</span>
            <span className="w-6 h-px bg-emerald-400" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Peer & Mentor <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400">Reviews</span>
          </h2>
        </div>

        {/* 3 Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-3xl bg-[#ffffff]/90 border border-slate-200/40 hover:border-emerald-500/50 transition-all shadow-xl flex flex-col justify-between group"
            >
              <div>
                <Quote className="w-10 h-10 text-emerald-500/30 mb-4 group-hover:text-emerald-600/50 transition-colors" />
                <p className="text-sm text-slate-600 font-sans leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200/80 flex items-center justify-between font-mono">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-black font-bold text-xs flex items-center justify-center shadow-md">
                    {item.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                    <p className="text-[10px] text-slate-500">{item.role}</p>
                  </div>
                </div>

                <div className="flex text-amber-600 text-xs">
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

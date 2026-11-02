import React from 'react';
import { EXPERIENCE } from '../data/portfolioData';
import { AccentColor } from '../types';
import { Briefcase, Calendar, CheckCircle2, Circle } from 'lucide-react';

interface TimelineSectionProps {
  accentColor: AccentColor;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ accentColor }) => {
  return (
    <section data-reveal id="timeline-section" className="py-24 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-600 mb-3">
            <span className="w-6 h-px bg-emerald-400" />
            <span>Career & Development</span>
            <span className="w-6 h-px bg-emerald-400" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400">Timeline</span>
          </h2>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Connecting Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-500/50 to-transparent -translate-x-1/2" />

          <div className="space-y-12">
            {EXPERIENCE.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={item.id} className="relative flex flex-col md:flex-row items-start md:items-center">
                  
                  {/* Timeline Dot Indicator */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-[#f8fafc] border-2 border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  {/* Content Box */}
                  <div
                    className={`w-full md:w-[calc(50%-2.5rem)] pl-12 md:pl-0 ${
                      isEven ? 'md:pr-8 md:text-right' : 'md:ml-auto md:pl-8 md:text-left'
                    }`}
                  >
                    <div className="p-6 rounded-3xl bg-[#ffffff]/90 border border-slate-200/40 hover:border-emerald-500/50 transition-all shadow-xl group">
                      <span className="inline-block px-3 py-1 rounded-full bg-emerald-50/80 border border-emerald-500/30 text-[10px] font-mono text-emerald-600 mb-2 uppercase tracking-widest">
                        {item.date}
                      </span>
                      <h3 className="text-xl font-bold font-mono text-slate-900 group-hover:text-emerald-600 transition-colors">
                        {item.role}
                      </h3>
                      <p className="text-xs font-mono text-emerald-600/80 mt-1">
                        {item.company}
                      </p>
                      <p className="text-xs text-slate-500 mt-3 font-sans leading-relaxed">
                        {item.desc}
                      </p>

                      {item.tags && (
                        <div className={`flex flex-wrap gap-1.5 mt-4 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                          {item.tags.map((t) => (
                            <span key={t} className="px-2.5 py-1 rounded-md bg-emerald-50/40 border border-slate-200/30 text-[10px] font-mono text-emerald-600">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

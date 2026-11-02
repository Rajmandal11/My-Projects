import React from 'react';
import { BLOG_ARTICLES } from '../data/portfolioData';
import { AccentColor } from '../types';
import { BookOpen, Clock, ArrowUpRight, Sparkles } from 'lucide-react';

interface BlogSectionProps {
  accentColor: AccentColor;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ accentColor }) => {
  return (
    <section data-reveal id="blog-section" className="py-24 relative overflow-hidden bg-transparent border-t border-slate-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-600 mb-3">
            <span className="w-6 h-px bg-emerald-400" />
            <span>Articles & Tutorials</span>
            <span className="w-6 h-px bg-emerald-400" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400">Publications</span>
          </h2>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_ARTICLES.map((article) => (
            <article
              key={article.id}
              className="group p-8 rounded-3xl bg-[#ffffff]/90 border border-slate-200/40 hover:border-emerald-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between hover:-translate-y-1.5 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl group-hover:scale-110 transition-transform">{article.emoji}</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-50/80 border border-emerald-500/30 text-[10px] font-mono text-emerald-600 uppercase tracking-widest">
                    {article.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-mono text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-500 mt-3 font-sans leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono text-slate-500">
                <div className="flex items-center gap-3">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime} read</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

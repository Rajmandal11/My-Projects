import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { AccentColor } from '../types';
import { ArrowUp, Download, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  accentColor: AccentColor;
}

export const Footer: React.FC<FooterProps> = ({ accentColor }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadPortfolio = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(PERSONAL_INFO, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "raj-mandal-portfolio.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <footer className="bg-transparent border-t border-slate-200/60 py-12 text-xs font-mono text-slate-500 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-200/60 pb-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50/80 border border-emerald-500/40 flex items-center justify-center text-emerald-600 font-black text-sm">
              RM
            </div>
            <span className="font-bold tracking-tight text-slate-900 text-base font-mono">
              RAJ MANDAL<span className="text-emerald-600">.</span>AI
            </span>
          </div>

          {/* System Status Badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50/30 border border-slate-200/40 text-emerald-600">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AI Systems & 3D WebGL Status: Operational</span>
          </div>

          {/* Back to top & Download button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPortfolio}
              className="px-4 py-2.5 rounded-xl bg-emerald-50/60 border border-emerald-500/30 text-emerald-600 hover:bg-emerald-500 hover:text-black transition-all flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Portfolio</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-100 border border-slate-200/40 text-slate-500 hover:text-slate-900 hover:border-emerald-500/40 transition-all flex items-center gap-1.5"
            >
              <span>Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Navigation Links & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p className="flex items-center gap-1.5">
            <span>© 2026 Raj Mandal. Built with</span>
            <Heart className="w-3.5 h-3.5 text-emerald-600 inline fill-emerald-400" />
            <span>& AI 3D Architecture.</span>
          </p>
          <div className="flex flex-wrap gap-4 text-[11px] text-slate-500">
            <a href="#about-section" className="hover:text-emerald-600 transition-colors">About</a>
            <a href="#skills-section" className="hover:text-emerald-600 transition-colors">Skills</a>
            <a href="#projects-section" className="hover:text-emerald-600 transition-colors">Projects</a>
            <a href="#achievements-section" className="hover:text-emerald-600 transition-colors">Awards</a>
            <a href="#timeline-section" className="hover:text-emerald-600 transition-colors">Timeline</a>
            <a href="#education-section" className="hover:text-emerald-600 transition-colors">Education</a>
            <a href="#blog-section" className="hover:text-emerald-600 transition-colors">Blog</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

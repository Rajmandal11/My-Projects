import React, { useEffect } from 'react';
import { Project, AccentColor } from '../types';
import { X, ExternalLink, CheckCircle, Sparkles, Code, Terminal, Github, Play } from 'lucide-react';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  accentColor: AccentColor;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  accentColor
}) => {
  // Close on Escape and lock body scroll while the drawer is open
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xl flex justify-end overflow-hidden"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      
      {/* Slide-over Drawer Container */}
      <div
        className="w-full max-w-3xl bg-white border-l border-emerald-500/30 h-full overflow-y-auto p-6 sm:p-10 flex flex-col justify-between space-y-8 animate-in slide-in-from-right duration-300 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-500/30 text-xs font-mono text-emerald-600 uppercase">
                {project.category}
              </span>
              <span className="text-xs font-mono text-slate-500">
                STATUS: {project.status.toUpperCase()} • {project.year}
              </span>
            </div>

            <button
              id="case-study-close-btn"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-emerald-500/40 transition-colors flex items-center gap-1.5 text-xs font-mono"
            >
              <X className="w-4 h-4" />
              <span>[ESC]</span>
            </button>
          </div>

          {/* Cover Image */}
          {project.image && (
            <div className="relative rounded-2xl overflow-hidden mb-6 border border-slate-200 shadow-lg aspect-[21/9] bg-slate-100">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent" />
            </div>
          )}

          {/* Title & Emoji Header */}
          <div className="flex items-center gap-4">
            <span className="text-5xl">{project.emoji}</span>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold font-mono text-slate-900 tracking-tight">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-600 font-mono mt-1">
                {project.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Project Body Overview */}
        <div className="space-y-6">
          {/* Summary Box */}
          <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200/40 space-y-2">
            <span className="text-xs font-mono text-emerald-600 uppercase tracking-wider block">
              Project Architecture Overview
            </span>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              {project.summary}
            </p>
          </div>

          {/* Impact Metrics Banner */}
          <div className="grid grid-cols-3 gap-4 bg-emerald-50/20 p-6 rounded-2xl border border-emerald-500/30 text-center font-mono">
            {project.impactMetrics.map((m, idx) => (
              <div key={idx}>
                <p className="text-xl sm:text-2xl font-bold text-emerald-600">{m.value}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#ffffff] border border-slate-200 space-y-2">
              <span className="text-[10px] font-mono text-amber-600 uppercase tracking-wider block">
                Challenge
              </span>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#ffffff] border border-slate-200 space-y-2">
              <span className="text-[10px] font-mono text-emerald-600 uppercase tracking-wider block">
                Solution
              </span>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-2">
              Technologies & Libraries
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-xl bg-emerald-50/60 border border-slate-200/40 text-xs font-mono text-emerald-600">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Terminal Console Block from AURA.DESIGN */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-2 text-slate-300 shadow-xl">
            <div className="flex items-center gap-1.5 pb-2 border-b border-slate-200">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-[10px] text-slate-500 ml-2">terminal — bash</span>
            </div>
            <p><span className="text-emerald-400">$</span> inspect project --id "{project.id}"</p>
            <p className="text-slate-400">✓ Loaded model weights & API routes</p>
            <p><span className="text-emerald-400">$</span> status: <span className="text-emerald-300 font-bold">{project.status.toUpperCase()}</span></p>
            <p><span className="text-emerald-400">$</span> github: <span className="text-cyan-400">{project.github}</span></p>
          </div>
        </div>

        {/* Bottom CTA Action Links */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 font-mono">
          <div className="flex items-center gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs uppercase flex items-center gap-2 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Demo</span>
            </a>

            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 font-bold text-xs uppercase flex items-center gap-2 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-500/30 text-emerald-600 font-bold text-xs uppercase hover:bg-emerald-100 transition-colors"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};

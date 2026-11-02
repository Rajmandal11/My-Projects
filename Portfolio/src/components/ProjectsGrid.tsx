import React, { useState } from 'react';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/portfolioData';
import { Project, AccentColor } from '../types';
import { ArrowUpRight, Sparkles, Filter, Code2, ExternalLink, Plus, Github, HelpCircle, Camera } from 'lucide-react';

interface ProjectsGridProps {
  accentColor: AccentColor;
  projects?: Project[];
  onOpenProject: (project: Project) => void;
  onAddNewProject?: () => void;
  onOpenHowToGuide?: () => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  accentColor,
  projects = DEFAULT_PROJECTS,
  onOpenProject,
  onAddNewProject,
  onOpenHowToGuide
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'NLP', 'Vision', 'ML/Data', '3D & Motion'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const themeAccent = {
    cyan: {
      text: 'text-sky-600',
      line: 'bg-sky-400',
      gradient: 'from-sky-400 via-cyan-500 to-blue-400',
      activeTab: 'bg-sky-400 text-black font-bold shadow-sky-500/20',
      border: 'border-sky-500/30',
      hoverBorder: 'hover:border-sky-400',
      btn: 'bg-sky-400 text-black hover:bg-sky-300'
    },
    emerald: {
      text: 'text-emerald-600',
      line: 'bg-emerald-400',
      gradient: 'from-emerald-400 via-teal-500 to-cyan-400',
      activeTab: 'bg-emerald-500 text-black font-bold shadow-emerald-500/20',
      border: 'border-emerald-500/30',
      hoverBorder: 'hover:border-emerald-400',
      btn: 'bg-emerald-400 text-black hover:bg-emerald-300'
    },
    violet: {
      text: 'text-violet-600',
      line: 'bg-violet-400',
      gradient: 'from-violet-400 via-purple-500 to-indigo-400',
      activeTab: 'bg-violet-500 text-white font-bold shadow-violet-500/20',
      border: 'border-violet-500/30',
      hoverBorder: 'hover:border-violet-400',
      btn: 'bg-violet-500 text-white hover:bg-violet-400'
    },
    gold: {
      text: 'text-amber-600',
      line: 'bg-amber-400',
      gradient: 'from-amber-400 via-yellow-300 to-orange-400',
      activeTab: 'bg-amber-500 text-black font-bold shadow-amber-500/20',
      border: 'border-amber-500/30',
      hoverBorder: 'hover:border-amber-400',
      btn: 'bg-amber-400 text-black hover:bg-amber-300'
    }
  }[accentColor];

  return (
    <section data-reveal id="projects-section" className="py-24 relative bg-transparent border-t border-slate-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-slate-200 pb-8">
          <div>
            <div className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest ${themeAccent.text} mb-2`}>
              <span className={`w-6 h-px ${themeAccent.line}`} />
              <span>Portfolio Showcase</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Featured <span className={`text-transparent bg-clip-text bg-gradient-to-r ${themeAccent.gradient}`}>Works</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Action Buttons */}
            {onAddNewProject && (
              <button
                onClick={onAddNewProject}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg ${themeAccent.btn}`}
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Project</span>
              </button>
            )}

            {onOpenHowToGuide && (
              <button
                onClick={onOpenHowToGuide}
                className="px-4 py-2.5 rounded-xl bg-white/90 border border-sky-500/30 text-sky-600 hover:text-slate-900 hover:border-sky-400 font-mono text-xs flex items-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4 text-sky-600" />
                <span>How to Add / Edit</span>
              </button>
            )}

            {/* Filter Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`filter-btn-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? themeAccent.activeTab
                      : 'bg-slate-100 border border-slate-200/60 text-slate-500 hover:text-slate-900 hover:border-sky-700/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Informational Help Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-sky-50/30 border border-sky-500/30 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-600 border border-sky-400/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-slate-900 font-bold">Need to add new projects or change profile images?</p>
              <p className="text-[11px] text-slate-500">Click <strong className="text-sky-600">+ Add Project</strong> above or use the camera icon on any photo frame!</p>
            </div>
          </div>
          {onOpenHowToGuide && (
            <button
              onClick={onOpenHowToGuide}
              className="px-3.5 py-1.5 rounded-xl bg-sky-500/20 text-sky-600 hover:bg-sky-400 hover:text-black font-bold uppercase tracking-wider text-[10px] transition-all whitespace-nowrap"
            >
              View Instructions →
            </button>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className={`group relative rounded-3xl bg-[#f8fafc]/90 border border-slate-200/40 ${themeAccent.hoverBorder} transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between shadow-2xl hover:-translate-y-2`}
            >
              {/* Card Top Banner / Image or Emoji */}
              <div
                onClick={() => onOpenProject(project)}
                className="relative aspect-[16/10] overflow-hidden flex items-center justify-center border-b border-slate-200 bg-slate-100"
                style={{ background: project.image ? undefined : `radial-gradient(circle at center, ${project.color}30, #f8fafc)` }}
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <span className="text-7xl group-hover:scale-125 transition-transform duration-500 drop-shadow-2xl">
                    {project.emoji}
                  </span>
                )}

                {/* Category & Status Pill */}
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                  <span className="px-3 py-1 rounded-full bg-white/90 border border-sky-500/30 text-[10px] font-mono text-sky-600 backdrop-blur-md uppercase">
                    {project.category}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase backdrop-blur-md flex items-center gap-1.5 ${
                      project.status === 'running'
                        ? 'bg-emerald-500/20 text-emerald-600 border border-emerald-500/40'
                        : project.status === 'offline'
                        ? 'bg-orange-500/20 text-orange-600 border border-orange-500/40'
                        : 'bg-sky-500/20 text-sky-600 border border-sky-500/40'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {project.status}
                  </span>
                </div>

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 border border-slate-200 text-slate-900 flex items-center justify-center group-hover:bg-sky-400 group-hover:text-black transition-all backdrop-blur-md z-10">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Card Main Body */}
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div onClick={() => onOpenProject(project)}>
                  <h3 className="project-card-title text-xl font-bold font-mono text-slate-900 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 font-sans leading-relaxed">
                    {project.tagline}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 py-2">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-sky-50/50 border border-slate-200/40 text-[10px] font-mono text-slate-500">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-slate-200/80 flex items-center gap-2">
                  <button
                    onClick={() => onOpenProject(project)}
                    className="flex-1 py-2 px-3 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-600 hover:bg-sky-400 hover:text-black font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </button>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="py-2 px-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-sky-400 font-mono text-xs flex items-center gap-1.5 transition-all"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* "+ Add New Project" Interactive Card */}
          <div
            onClick={onAddNewProject}
            id="add-project-card"
            className="group rounded-3xl border-2 border-dashed border-sky-500/30 hover:border-sky-400 bg-sky-50/10 hover:bg-sky-50/20 transition-all duration-300 p-8 flex flex-col items-center justify-center text-center cursor-pointer min-h-[360px]"
          >
            <div className="w-14 h-14 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-600 group-hover:scale-110 group-hover:bg-sky-400 group-hover:text-black transition-all mb-4">
              <Plus className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-mono text-slate-900 group-hover:text-sky-600 transition-colors">
              + Add New Project
            </h3>
            <p className="text-xs font-mono text-slate-500 max-w-xs mt-2">
              Click to open admin panel and launch your custom ML, Web or AI project into this portfolio grid.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

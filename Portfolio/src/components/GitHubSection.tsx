import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { AccentColor } from '../types';
import { Github, GitCommit, GitPullRequest, Star, FolderGit2 } from 'lucide-react';

interface GitHubSectionProps {
  accentColor: AccentColor;
}

export const GitHubSection: React.FC<GitHubSectionProps> = ({ accentColor }) => {
  const { githubStats, github } = PERSONAL_INFO;

  // Generate 12 weeks of contribution heatmap matrix matching AURA.DESIGN
  const weeks = 12;
  const levels = [
    0, 0, 1, 2, 3, 4, 3, 2, 1, 0, 1, 2, 3, 4, 4, 3, 2, 1, 0, 1, 2, 3, 2, 1, 0,
    1, 2, 3, 4, 3, 2, 1, 0, 0, 1, 2, 3, 4, 4, 3, 2, 1, 0, 1, 2, 3, 2, 1, 0, 1,
    2, 3, 4, 3, 2, 1, 0, 1, 2, 3, 4, 3, 2, 1, 0, 1, 2, 3, 4, 3, 2, 1, 0, 0, 1,
    2, 3, 4, 3, 2, 1, 0
  ];

  const levelBg = [
    'bg-slate-100 border border-slate-200/40',
    'bg-emerald-50/80 border border-slate-200/40',
    'bg-emerald-800/80 border border-emerald-600/50',
    'bg-emerald-600 border border-emerald-400/60',
    'bg-emerald-400 border border-emerald-300 shadow-sm shadow-emerald-400/50'
  ];

  return (
    <section data-reveal id="github-section" className="py-24 relative overflow-hidden bg-transparent border-t border-slate-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-600 mb-3">
            <span className="w-6 h-px bg-emerald-400" />
            <span>Open Source & Telemetry</span>
            <span className="w-6 h-px bg-emerald-400" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            GitHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400">Activity</span>
          </h2>
        </div>

        {/* 4 Key Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-3xl bg-[#ffffff]/90 border border-slate-200/40 text-center shadow-xl">
            <FolderGit2 className="w-7 h-7 text-emerald-600 mx-auto mb-3" />
            <p className="text-3xl font-black font-mono text-slate-900">{githubStats.repositories}</p>
            <p className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mt-1">Repositories</p>
          </div>

          <div className="p-6 rounded-3xl bg-[#ffffff]/90 border border-slate-200/40 text-center shadow-xl">
            <Star className="w-7 h-7 text-amber-600 mx-auto mb-3" />
            <p className="text-3xl font-black font-mono text-slate-900">{githubStats.stars}</p>
            <p className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mt-1">Stars Earned</p>
          </div>

          <div className="p-6 rounded-3xl bg-[#ffffff]/90 border border-slate-200/40 text-center shadow-xl">
            <GitCommit className="w-7 h-7 text-teal-600 mx-auto mb-3" />
            <p className="text-3xl font-black font-mono text-slate-900">{githubStats.commits}</p>
            <p className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mt-1">Commits Logged</p>
          </div>

          <div className="p-6 rounded-3xl bg-[#ffffff]/90 border border-slate-200/40 text-center shadow-xl">
            <GitPullRequest className="w-7 h-7 text-cyan-600 mx-auto mb-3" />
            <p className="text-3xl font-black font-mono text-slate-900">{githubStats.pullRequests}</p>
            <p className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mt-1">Pull Requests</p>
          </div>
        </div>

        {/* Bottom Split: Top Languages & Contribution Heatmap Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Top Languages Progress Bars */}
          <div className="p-8 rounded-3xl bg-[#ffffff]/90 border border-slate-200/40 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-600 mb-6 flex items-center gap-2">
                <Github className="w-4 h-4" />
                <span>Top Languages Distribution</span>
              </h3>
              
              <div className="space-y-4">
                {githubStats.languages.map((lang) => (
                  <div key={lang.name} className="space-y-1.5 font-mono">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">{lang.name}</span>
                      <span className="text-emerald-600 font-bold">{lang.pct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${lang.pct}%`, backgroundColor: lang.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200/80 text-right">
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-emerald-600 hover:underline"
              >
                <span>View Full Profile @Rajmandal11</span>
                <Github className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 12-Week Contribution Matrix Grid */}
          <div className="p-8 rounded-3xl bg-[#ffffff]/90 border border-slate-200/40 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-600 mb-6 flex items-center justify-between">
                <span>Contribution Matrix (Last 12 Weeks)</span>
                <span className="text-[10px] text-slate-500">Continuous Integration</span>
              </h3>

              <div className="flex gap-1.5 overflow-x-auto pb-4">
                {Array.from({ length: weeks }).map((_, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1.5 flex-shrink-0">
                    {Array.from({ length: 7 }).map((_, dIdx) => {
                      const lvl = levels[(wIdx * 7 + dIdx) % levels.length];
                      return (
                        <div
                          key={dIdx}
                          title={`Contributions: Level ${lvl}`}
                          className={`w-3.5 h-3.5 rounded-sm transition-all hover:scale-125 ${levelBg[lvl]}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Heatmap Intensity Legend */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 text-xs font-mono text-slate-500">
              <span>Less Active</span>
              <div className="flex items-center gap-1.5">
                {levelBg.map((bg, idx) => (
                  <div key={idx} className={`w-3 h-3 rounded-sm ${bg}`} />
                ))}
              </div>
              <span>More Active</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

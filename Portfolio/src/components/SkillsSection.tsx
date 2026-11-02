import React, { useState } from 'react';
import { AccentColor } from '../types';
import { Cpu, Database, Code, Wrench, Sparkles, Layers } from 'lucide-react';

interface SkillsSectionProps {
  accentColor: AccentColor;
}

type TabType = 'ml' | 'dev' | 'frameworks' | 'tools';

export const SkillsSection: React.FC<SkillsSectionProps> = ({ accentColor }) => {
  const [activeTab, setActiveTab] = useState<TabType>('ml');

  const themeStyles = {
    cyan: {
      accentText: 'text-sky-600',
      lineBg: 'bg-sky-400',
      headlineGradient: 'from-sky-400 via-cyan-500 to-blue-400',
      tabActive: 'bg-sky-400 text-black font-bold shadow-lg shadow-sky-500/25',
      badgeClass: 'bg-sky-50/60 border-sky-500/30 text-sky-600',
      cardHover: 'hover:border-sky-500/50',
      progressGradient: 'from-sky-400 via-cyan-400 to-blue-500'
    },
    emerald: {
      accentText: 'text-emerald-600',
      lineBg: 'bg-emerald-400',
      headlineGradient: 'from-emerald-400 via-teal-500 to-cyan-400',
      tabActive: 'bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/20',
      badgeClass: 'bg-emerald-50/60 border-emerald-500/30 text-emerald-600',
      cardHover: 'hover:border-emerald-500/50',
      progressGradient: 'from-emerald-500 via-teal-400 to-cyan-400'
    },
    violet: {
      accentText: 'text-violet-600',
      lineBg: 'bg-violet-400',
      headlineGradient: 'from-violet-400 via-purple-500 to-indigo-400',
      tabActive: 'bg-violet-500 text-white font-bold shadow-lg shadow-violet-500/25',
      badgeClass: 'bg-violet-50/60 border-violet-500/30 text-violet-600',
      cardHover: 'hover:border-violet-500/50',
      progressGradient: 'from-violet-500 via-purple-400 to-indigo-400'
    },
    gold: {
      accentText: 'text-amber-600',
      lineBg: 'bg-amber-400',
      headlineGradient: 'from-amber-400 via-yellow-300 to-orange-400',
      tabActive: 'bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/25',
      badgeClass: 'bg-amber-50/60 border-amber-500/30 text-amber-600',
      cardHover: 'hover:border-amber-500/50',
      progressGradient: 'from-amber-500 via-yellow-400 to-orange-400'
    }
  }[accentColor];

  const skillData: Record<TabType, { name: string; level: string; pct: number; icon: string }[]> = {
    ml: [
      { name: 'Deep Learning', level: 'Advanced', pct: 88, icon: '🧠' },
      { name: 'NLP & Transformers', level: 'Intermediate', pct: 78, icon: '💬' },
      { name: 'Computer Vision', level: 'Intermediate', pct: 75, icon: '👁️' },
      { name: 'Reinforcement Learning', level: 'Intermediate', pct: 70, icon: '🎲' },
      { name: 'Supervised & Unsupervised', level: 'Advanced', pct: 90, icon: '📈' },
      { name: 'Transfer Learning', level: 'Intermediate', pct: 80, icon: '🔗' }
    ],
    dev: [
      { name: 'Python 3.12', level: 'Expert', pct: 95, icon: '🐍' },
      { name: 'Pandas & NumPy', level: 'Expert', pct: 92, icon: '📊' },
      { name: 'SQL & Database Design', level: 'Advanced', pct: 85, icon: '🗄️' },
      { name: 'Matplotlib & Seaborn', level: 'Expert', pct: 90, icon: '📉' },
      { name: 'Java Programming', level: 'Intermediate', pct: 68, icon: '☕' },
      { name: 'JavaScript & TypeScript', level: 'Intermediate', pct: 72, icon: '🟨' }
    ],
    frameworks: [
      { name: 'TensorFlow & Keras', level: 'Advanced', pct: 88, icon: '🔶' },
      { name: 'PyTorch Architecture', level: 'Intermediate', pct: 78, icon: '🔥' },
      { name: 'Hugging Face Transformers', level: 'Intermediate', pct: 75, icon: '🤗' },
      { name: 'Scikit-learn ML', level: 'Expert', pct: 92, icon: '⚙️' },
      { name: 'FastAPI Microservices', level: 'Advanced', pct: 82, icon: '⚡' },
      { name: 'OpenCV Vision Processing', level: 'Intermediate', pct: 74, icon: '🌊' }
    ],
    tools: [
      { name: 'Git & GitHub Workflows', level: 'Expert', pct: 95, icon: '🐙' },
      { name: 'Docker Containerization', level: 'Intermediate', pct: 72, icon: '🐳' },
      { name: 'Linux / Bash Terminal', level: 'Advanced', pct: 82, icon: '🐧' },
      { name: 'Jupyter & Google Colab', level: 'Expert', pct: 95, icon: '📒' },
      { name: 'AWS Cloud & EC2', level: 'Intermediate', pct: 65, icon: '☁️' },
      { name: 'Excel & Data Sheets', level: 'Advanced', pct: 88, icon: '📊' }
    ]
  };

  return (
    <section data-reveal id="skills-section" className="py-24 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest ${themeStyles.accentText} mb-3`}>
            <span className={`w-6 h-px ${themeStyles.lineBg}`} />
            <span>Skills & Technologies</span>
            <span className={`w-6 h-px ${themeStyles.lineBg}`} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            My Engineering <span className={`text-transparent bg-clip-text bg-gradient-to-r ${themeStyles.headlineGradient}`}>Arsenal</span>
          </h2>
        </div>

        {/* Tab Buttons Pill */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/90 border border-slate-200/50 backdrop-blur-md font-mono text-xs">
            <button
              onClick={() => setActiveTab('ml')}
              className={`px-5 py-2.5 rounded-xl transition-all ${
                activeTab === 'ml'
                  ? themeStyles.tabActive
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              ML / DL Core
            </button>
            <button
              onClick={() => setActiveTab('dev')}
              className={`px-5 py-2.5 rounded-xl transition-all ${
                activeTab === 'dev'
                  ? themeStyles.tabActive
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Dev & Data
            </button>
            <button
              onClick={() => setActiveTab('frameworks')}
              className={`px-5 py-2.5 rounded-xl transition-all ${
                activeTab === 'frameworks'
                  ? themeStyles.tabActive
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Frameworks
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`px-5 py-2.5 rounded-xl transition-all ${
                activeTab === 'tools'
                  ? themeStyles.tabActive
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              MLOps & Tools
            </button>
          </div>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillData[activeTab].map((skill) => (
            <div
              key={skill.name}
              className={`p-6 rounded-2xl bg-[#f8fafc]/90 border border-slate-200/40 ${themeStyles.cardHover} transition-all duration-300 group hover:-translate-y-1 shadow-xl flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{skill.icon}</span>
                  <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md border ${themeStyles.badgeClass}`}>
                    {skill.level}
                  </span>
                </div>
                <h3 className={`text-lg font-bold font-mono text-slate-900 group-hover:${themeStyles.accentText} transition-colors`}>
                  {skill.name}
                </h3>
              </div>

              <div className="mt-6">
                <div className="flex justify-between items-center text-xs font-mono text-slate-500 mb-2">
                  <span>Proficiency</span>
                  <span className={`${themeStyles.accentText} font-bold`}>{skill.pct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                  <div
                    className={`h-full bg-gradient-to-r ${themeStyles.progressGradient} rounded-full transition-all duration-1000`}
                    style={{ width: `${skill.pct}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

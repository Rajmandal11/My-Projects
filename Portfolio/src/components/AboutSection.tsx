import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { AccentColor } from '../types';
import { MapPin, CheckCircle, Clock, Target, Cpu, Brain, Database, ShieldCheck, Camera } from 'lucide-react';

interface AboutSectionProps {
  accentColor: AccentColor;
  profileImage?: string;
  onOpenChangeImage?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  accentColor,
  profileImage = '/src/assets/images/r.jpeg',
  onOpenChangeImage
}) => {
  const tags = [
    'TensorFlow', 'Python', 'PyTorch', 'Scikit-learn', 'Pandas', 'Keras', 
    'SQL', 'NumPy', 'Matplotlib', 'Seaborn', 'Reinforcement Learning', 
    'FastAPI', 'Docker', 'Java', 'JavaScript', 'Git / GitHub'
  ];

  const themeStyles = {
    cyan: {
      cardBg: 'from-sky-950/60 via-blue-900/20 to-black',
      cardBorder: 'border-sky-500/30',
      textAccent: 'text-sky-600',
      badgeBg: 'bg-sky-500/20 text-sky-600',
      avatarBg: 'from-sky-400 via-cyan-400 to-blue-500 text-black shadow-sky-500/30',
      lineGradient: 'from-sky-400 via-cyan-500 to-transparent',
      headlineGradient: 'from-sky-400 via-cyan-500 to-blue-400',
      lineBg: 'bg-sky-400',
      tagBg: 'bg-sky-50/40 border-slate-200/40 hover:border-sky-400 hover:text-sky-600',
      boxBorder: 'border-slate-200/40'
    },
    emerald: {
      cardBg: 'from-emerald-950/60 via-emerald-900/20 to-black',
      cardBorder: 'border-emerald-500/30',
      textAccent: 'text-emerald-600',
      badgeBg: 'bg-emerald-500/20 text-emerald-600',
      avatarBg: 'from-emerald-500 via-teal-400 to-emerald-500 text-black shadow-emerald-500/30',
      lineGradient: 'from-emerald-500 via-teal-400 to-transparent',
      headlineGradient: 'from-emerald-400 via-teal-500 to-cyan-400',
      lineBg: 'bg-emerald-400',
      tagBg: 'bg-emerald-50/40 border-slate-200/40 hover:border-emerald-400 hover:text-emerald-600',
      boxBorder: 'border-slate-200/40'
    },
    violet: {
      cardBg: 'from-violet-950/60 via-purple-900/20 to-black',
      cardBorder: 'border-violet-500/30',
      textAccent: 'text-violet-600',
      badgeBg: 'bg-violet-500/20 text-violet-600',
      avatarBg: 'from-violet-500 via-purple-400 to-indigo-500 text-slate-900 shadow-violet-500/30',
      lineGradient: 'from-violet-500 via-purple-400 to-transparent',
      headlineGradient: 'from-violet-400 via-purple-500 to-indigo-400',
      lineBg: 'bg-violet-400',
      tagBg: 'bg-violet-50/40 border-slate-200/40 hover:border-violet-400 hover:text-violet-600',
      boxBorder: 'border-slate-200/40'
    },
    gold: {
      cardBg: 'from-amber-950/60 via-orange-900/20 to-black',
      cardBorder: 'border-amber-500/30',
      textAccent: 'text-amber-600',
      badgeBg: 'bg-amber-500/20 text-amber-600',
      avatarBg: 'from-amber-500 via-yellow-400 to-amber-500 text-black shadow-amber-500/30',
      lineGradient: 'from-amber-500 via-yellow-400 to-transparent',
      headlineGradient: 'from-amber-400 via-yellow-300 to-orange-400',
      lineBg: 'bg-amber-400',
      tagBg: 'bg-amber-50/40 border-slate-200/40 hover:border-amber-400 hover:text-amber-600',
      boxBorder: 'border-slate-200/40'
    }
  }[accentColor];

  return (
    <section data-reveal id="about-section" className="py-24 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Avatar Card */}
          <div className="lg:col-span-5 relative">
            <div className={`relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br ${themeStyles.cardBg} border ${themeStyles.cardBorder} p-8 shadow-2xl flex flex-col justify-between group`}>
              {/* Top Bar */}
              <div className="flex items-center justify-between border-b border-slate-200/50 pb-4">
                <span className={`text-xs font-mono ${themeStyles.textAccent} font-semibold tracking-wider`}>ENGINEER_PROFILE</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${themeStyles.badgeBg}`}>VERIFIED</span>
              </div>

              {/* Avatar Center Developer Photo */}
              <div
                onClick={() => onOpenChangeImage?.()}
                className="my-auto text-center flex flex-col items-center cursor-pointer group/avatar"
              >
                <div className={`relative w-36 h-36 rounded-full overflow-hidden p-1 bg-gradient-to-tr ${themeStyles.avatarBg} shadow-2xl group-hover/avatar:scale-105 transition-transform duration-500`}>
                  <img
                    src={profileImage}
                    alt="Raj Mandal"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-slate-100 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex flex-col items-center justify-center text-slate-900 rounded-full">
                    <Camera className="w-6 h-6 text-sky-600 mb-1 animate-bounce" />
                    <span className="text-[10px] font-mono text-sky-600 font-bold">Edit Photo</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold font-mono text-slate-900 mt-5">Raj Mandal</h3>
                <p className={`text-xs font-mono ${themeStyles.textAccent} mt-1`}>AI & Machine Learning Engineer</p>
              </div>

              {/* Bottom Info Bar */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200/50 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className={`w-4 h-4 ${themeStyles.textAccent} flex-shrink-0`} />
                  <span className="truncate">MMDU, Ambala</span>
                </div>
                <div className={`flex items-center gap-2 ${themeStyles.textAccent}`}>
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Open for Hire ✓</span>
                </div>
              </div>

              {/* Glowing Accent Border Line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${themeStyles.lineGradient}`} />
            </div>
          </div>

          {/* Right Text Content */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest ${themeStyles.textAccent} mb-3`}>
                <span className={`w-6 h-px ${themeStyles.lineBg}`} />
                <span>About Me</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Turning <span className={`text-transparent bg-clip-text bg-gradient-to-r ${themeStyles.headlineGradient}`}>Data</span> into Intelligence
              </h2>
            </div>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-sans">
              I am an <strong className="text-slate-900 font-semibold">AI & Machine Learning Engineer</strong> passionate about building scalable, data-driven solutions. My primary focus centers on designing end-to-end ML pipelines — from raw data ingestion and exploratory analysis to training, fine-tuning, and deploying production-ready models.
            </p>

            <p className="text-slate-500 text-base leading-relaxed font-sans">
              I specialize in deep learning, natural language processing (NLP), computer vision, and predictive analytics. Whether it's fine-tuning transformer models (BERT), constructing custom CNNs for crop health, or engineering robust MLOps workflows with FastAPI and Docker, I bridge the gap between AI research and real-world software impact.
            </p>

            {/* Tech Tags Pill Cloud */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">Technical Toolkit</h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono text-slate-600 border transition-colors ${themeStyles.tagBg}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Metadata Box Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 font-mono">
              <div className={`p-4 rounded-2xl bg-slate-100 border ${themeStyles.boxBorder}`}>
                <p className="text-[10px] uppercase text-slate-500 tracking-wider">Location</p>
                <p className="text-xs font-bold text-slate-900 mt-1 truncate">MMDU Ambala, IN</p>
              </div>
              <div className={`p-4 rounded-2xl bg-slate-100 border ${themeStyles.boxBorder}`}>
                <p className="text-[10px] uppercase text-slate-500 tracking-wider">Freelance / Job</p>
                <p className={`text-xs font-bold ${themeStyles.textAccent} mt-1`}>Open ✓</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200/40">
                <p className="text-[10px] uppercase text-slate-500 tracking-wider">Core Focus</p>
                <p className="text-xs font-bold text-slate-900 mt-1">AI/ML & Deep Learning</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200/40">
                <p className="text-[10px] uppercase text-slate-500 tracking-wider">Response</p>
                <p className="text-xs font-bold text-slate-900 mt-1">Within 24 Hours</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

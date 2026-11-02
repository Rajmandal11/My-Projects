import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { AccentColor } from '../types';
import { ArrowDown, Sparkles, FileText, Send, Code2, Terminal, ChevronRight, Layers, Camera, HelpCircle, Plus } from 'lucide-react';

interface HeroProps {
  accentColor: AccentColor;
  onExploreLab: () => void;
  onOpenContact: () => void;
  profileImage?: string;
  onOpenChangeImage?: () => void;
  onOpenHowToGuide?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  accentColor,
  onExploreLab,
  onOpenContact,
  profileImage = '/src/assets/images/r.jpeg',
  onOpenChangeImage,
  onOpenHowToGuide
}) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Typewriter effect logic matching AURA.DESIGN reference
  useEffect(() => {
    const roles = PERSONAL_INFO.roles;
    const fullText = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && currentText === fullText) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      const speed = isDeleting ? 40 : 80;
      timeout = setTimeout(() => {
        setCurrentText(
          isDeleting
            ? fullText.substring(0, currentText.length - 1)
            : fullText.substring(0, currentText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, roleIndex]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  const primaryBtnBg = {
    cyan: 'bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 text-black hover:brightness-110 shadow-sky-500/30',
    emerald: 'bg-gradient-to-r from-emerald-500 to-teal-400 text-black hover:brightness-110 shadow-emerald-500/25',
    violet: 'bg-gradient-to-r from-violet-500 to-purple-400 text-white hover:brightness-110 shadow-violet-500/25',
    gold: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black hover:brightness-110 shadow-amber-500/25'
  }[accentColor];

  const accentColorClasses = {
    cyan: {
      text: 'text-sky-600',
      pillBg: 'bg-sky-50/60 border-sky-500/40 text-sky-600',
      pingDot: 'bg-sky-400',
      metrics: 'from-sky-400 to-cyan-400',
      cardBorder: 'border-sky-500/40',
      cardGlow: 'from-sky-500/30 via-cyan-400/20 to-blue-600/20',
      btnBorder: 'hover:border-sky-400',
      btnText: 'text-sky-600'
    },
    emerald: {
      text: 'text-emerald-600',
      pillBg: 'bg-emerald-50/50 border-emerald-500/40 text-emerald-600',
      pingDot: 'bg-emerald-400',
      metrics: 'from-emerald-400 to-teal-400',
      cardBorder: 'border-emerald-500/30',
      cardGlow: 'from-emerald-500/30 via-teal-400/20 to-purple-500/20',
      btnBorder: 'hover:border-emerald-400',
      btnText: 'text-emerald-600'
    },
    violet: {
      text: 'text-violet-600',
      pillBg: 'bg-violet-50/50 border-violet-500/40 text-violet-600',
      pingDot: 'bg-violet-400',
      metrics: 'from-violet-400 to-purple-400',
      cardBorder: 'border-violet-500/30',
      cardGlow: 'from-violet-500/30 via-purple-400/20 to-pink-500/20',
      btnBorder: 'hover:border-violet-400',
      btnText: 'text-violet-600'
    },
    gold: {
      text: 'text-amber-600',
      pillBg: 'bg-amber-50/50 border-amber-500/40 text-amber-600',
      pingDot: 'bg-amber-400',
      metrics: 'from-amber-400 to-yellow-200',
      cardBorder: 'border-amber-500/30',
      cardGlow: 'from-amber-500/30 via-yellow-400/20 to-orange-500/20',
      btnBorder: 'hover:border-amber-400',
      btnText: 'text-amber-600'
    }
  }[accentColor];

  return (
    <section data-reveal id="hero" className="relative min-h-screen pt-32 pb-20 flex flex-col justify-between overflow-hidden">
      {/* Background Radial Light Blue Atmosphere */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-8">
            {/* Availability Pill */}
            <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg border ${accentColorClasses.pillBg}`}>
              <span className={`w-2 h-2 rounded-full animate-ping ${accentColorClasses.pingDot}`} />
              <span className="text-xs font-mono tracking-widest uppercase">
                Available for Projects & Research
              </span>
            </div>

            {/* Headline with Outline Typography from AURA.DESIGN */}
            <h1 className="text-6xl sm:text-7xl xl:text-8xl font-black text-slate-900 tracking-tighter leading-[0.92] font-mono select-none">
              RAJ<br />
              <span className="text-transparent border-text stroke-white drop-shadow-2xl" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.8)', color: 'transparent' }}>
                MANDAL
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-sans">
              Building intelligent systems at the intersection of data, algorithms, and real-world impact. Specializing in end-to-end ML pipelines, deep learning, NLP, and computer vision.
            </p>

            {/* Typewriter Role Line */}
            <div className={`flex items-center gap-2 font-mono text-base sm:text-xl ${accentColorClasses.text} bg-slate-100 px-4 py-2 rounded-xl border border-sky-500/30 shadow-inner`}>
              <Terminal className={`w-5 h-5 ${accentColorClasses.text}`} />
              <span>{currentText}</span>
              <span className={`animate-pulse ${accentColorClasses.text} font-bold`}>|</span>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-view-projects-btn"
                onClick={() => {
                  document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-7 py-3.5 rounded-xl font-mono text-xs font-bold tracking-wider uppercase shadow-xl transition-all duration-300 flex items-center gap-2.5 ${primaryBtnBg}`}
              >
                <Sparkles className="w-4 h-4" />
                <span>View Projects</span>
              </button>

              <button
                id="hero-lets-talk-btn"
                onClick={onOpenContact}
                className={`px-6 py-3.5 rounded-xl bg-slate-100/90 border border-zinc-700/80 text-slate-700 hover:text-slate-900 ${accentColorClasses.btnBorder} transition-all font-mono text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg`}
              >
                <Send className={`w-3.5 h-3.5 ${accentColorClasses.text}`} />
                <span>Let's Talk</span>
              </button>

              <a
                id="hero-resume-btn"
                href="#contact-section"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenContact();
                }}
                className={`px-5 py-3.5 rounded-xl bg-sky-50/40 border border-sky-500/30 text-sky-600 hover:bg-sky-100/50 ${accentColorClasses.btnBorder} transition-all font-mono text-xs tracking-wider uppercase flex items-center gap-2`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>

              {onOpenHowToGuide && (
                <button
                  onClick={onOpenHowToGuide}
                  className="px-4 py-3.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-600 hover:bg-sky-500 hover:text-black transition-all font-mono text-xs tracking-wider uppercase flex items-center gap-2"
                  title="How to add projects and change photos"
                >
                  <HelpCircle className="w-4 h-4 text-sky-600" />
                  <span>How-To Guide</span>
                </button>
              )}
            </div>

            {/* Key Micro Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200/80 w-full max-w-xl">
              <div>
                <p className={`text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r ${accentColorClasses.metrics}`}>12+</p>
                <p className="text-[11px] text-slate-500 uppercase tracking-widest font-mono mt-1">ML Projects</p>
              </div>
              <div>
                <p className={`text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r ${accentColorClasses.metrics}`}>94%</p>
                <p className="text-[11px] text-slate-500 uppercase tracking-widest font-mono mt-1">Best Accuracy</p>
              </div>
              <div>
                <p className={`text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r ${accentColorClasses.metrics}`}>Top 20%</p>
                <p className="text-[11px] text-slate-500 uppercase tracking-widest font-mono mt-1">Kaggle Global</p>
              </div>
            </div>
          </div>

          {/* Right Floating 3D Graphic & Interactive Developer Photo Card */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div
              className={`relative w-full max-w-md aspect-square rounded-3xl overflow-hidden bg-[#f8fafc]/90 border ${accentColorClasses.cardBorder} shadow-2xl group cursor-pointer p-6 backdrop-blur-xl flex flex-col justify-between`}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                transition: 'transform 0.15s ease-out'
              }}
            >
              {/* Top Status Bar */}
              <div className="relative z-10 flex items-center justify-between border-b border-slate-200/50 pb-4">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${accentColorClasses.pingDot} animate-pulse`} />
                  <span className={`text-xs font-mono ${accentColorClasses.text} font-semibold tracking-wider`}>ENGINEER_PROFILE_PORTRAIT</span>
                </div>
                {onOpenChangeImage && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenChangeImage();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-sky-500/20 border border-sky-500/40 text-[10px] font-mono text-sky-600 hover:bg-sky-400 hover:text-black transition-all flex items-center gap-1.5"
                    title="Change Profile Photo"
                  >
                    <Camera className="w-3 h-3" />
                    <span>Change Photo</span>
                  </button>
                )}
              </div>

              {/* Central Developer Photo Frame */}
              <div
                onClick={() => onOpenChangeImage?.()}
                className="my-auto py-4 text-center flex flex-col items-center justify-center relative group/photo"
              >
                <div className={`relative w-40 h-40 rounded-full overflow-hidden p-1 bg-gradient-to-tr ${accentColorClasses.cardGlow} border-2 border-sky-400/80 shadow-2xl group-hover/photo:scale-105 transition-transform duration-300`}>
                  <img
                    src={profileImage}
                    alt="Raj Mandal - AI & ML Engineer"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  {/* Camera Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-100 opacity-0 group-hover/photo:opacity-100 transition-opacity flex flex-col items-center justify-center text-slate-900 rounded-full">
                    <Camera className="w-6 h-6 text-sky-600 mb-1 animate-bounce" />
                    <span className="text-[10px] font-mono text-sky-600 font-bold">Edit Photo</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-base font-mono font-black text-slate-900 tracking-wide">Raj Mandal</p>
                  <p className={`text-xs font-mono ${accentColorClasses.text} opacity-90 mt-1`}>AI & ML Engineer • MMDU Ambala</p>
                </div>
              </div>

              {/* Badges Floating Around */}
              <div className="flex items-center justify-between bg-white/90 border border-sky-500/20 rounded-2xl p-3 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-sky-400" />
                  <span className="text-xs font-mono text-slate-600">PyTorch</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-xs font-mono text-slate-600">TensorFlow</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-xs font-mono text-slate-600">FastAPI</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 flex justify-center mt-10">
        <a
          href="#about-section"
          className={`flex flex-col items-center gap-2 text-xs text-slate-500 hover:${accentColorClasses.text} transition-colors font-mono tracking-widest uppercase`}
        >
          <span>Scroll To Explore</span>
          <ArrowDown className={`w-4 h-4 animate-bounce ${accentColorClasses.text}`} />
        </a>
      </div>
    </section>
  );
};

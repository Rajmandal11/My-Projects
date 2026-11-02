import React, { useEffect, useState } from 'react';
import { AccentColor } from '../types';
import { Terminal, Cpu, Sparkles, CheckCircle, ShieldCheck, Zap } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
  accentColor: AccentColor;
}

const BOOT_STEPS = [
  'Initialising AI Neural Core v4.2...',
  'Connecting WebGL 3D Geometry Pipeline...',
  'Loading PyTorch & TensorFlow Model Weights...',
  'Syncing High-Precision Matrix Shaders...',
  'Raj Mandal AI Studio Ready.'
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, accentColor }) => {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Progress interval animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              onComplete();
            }, 600); // match transition duration
          }, 400);
          return 100;
        }

        // Variable increments for authentic boot feel
        const step = Math.floor(Math.random() * 10) + 7;
        const next = Math.min(prev + step, 100);

        // Update boot status text based on progress thresholds
        if (next < 25) setCurrentStepIndex(0);
        else if (next < 50) setCurrentStepIndex(1);
        else if (next < 75) setCurrentStepIndex(2);
        else if (next < 95) setCurrentStepIndex(3);
        else setCurrentStepIndex(4);

        return next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  const accentColorClasses = {
    cyan: {
      barGradient: 'from-sky-400 via-cyan-400 to-blue-500',
      glow: 'shadow-[0_0_30px_rgba(56,189,248,0.4)]',
      text: 'text-sky-600',
      badgeBg: 'bg-sky-500/10 border-sky-500/30 text-sky-600',
      pingDot: 'bg-sky-400'
    },
    emerald: {
      barGradient: 'from-emerald-500 via-teal-400 to-cyan-400',
      glow: 'shadow-[0_0_30px_rgba(16,185,129,0.4)]',
      text: 'text-emerald-600',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600',
      pingDot: 'bg-emerald-400'
    },
    violet: {
      barGradient: 'from-violet-500 via-purple-400 to-indigo-400',
      glow: 'shadow-[0_0_30px_rgba(139,92,246,0.4)]',
      text: 'text-violet-600',
      badgeBg: 'bg-violet-500/10 border-violet-500/30 text-violet-600',
      pingDot: 'bg-violet-400'
    },
    gold: {
      barGradient: 'from-amber-500 via-yellow-400 to-orange-400',
      glow: 'shadow-[0_0_30px_rgba(245,158,11,0.4)]',
      text: 'text-amber-600',
      badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-600',
      pingDot: 'bg-amber-400'
    }
  }[accentColor];

  return (
    <div
      onClick={onComplete}
      title="Click to skip"
      className={`fixed inset-0 z-[100] bg-aura flex flex-col items-center justify-center p-6 transition-all duration-700 cursor-pointer ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient Grid & Glow Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none animate-pulse" />

      <div className="w-full max-w-lg relative z-10 flex flex-col items-center text-center space-y-8 font-mono">
        
        {/* Animated Brand Emblem */}
        <div className="relative group">
          <div className="w-20 h-20 rounded-3xl bg-[#f8fafc] border-2 border-sky-400/60 flex items-center justify-center shadow-2xl relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-tr ${accentColorClasses.barGradient} opacity-20 animate-pulse`} />
            <Cpu className={`w-10 h-10 ${accentColorClasses.text} animate-bounce`} />
          </div>
          {/* Orbiting Spinner Ring */}
          <div className="absolute -inset-3 rounded-full border border-sky-400/30 border-t-sky-400 animate-spin-slow pointer-events-none" />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] uppercase tracking-widest ${accentColorClasses.badgeBg}`}>
            <span className={`w-2 h-2 rounded-full ${accentColorClasses.pingDot} animate-ping`} />
            <span>AI Boot Sequence Active</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-wider font-mono pt-3">
            RAJ MANDAL<span className={accentColorClasses.text}>.AI</span>
          </h1>
          <p className="text-xs text-slate-500 font-mono tracking-widest uppercase">
            Machine Learning Engineer Portfolio
          </p>
        </div>

        {/* Boot Progress Gauge Box */}
        <div className="w-full bg-[#f8fafc]/90 border border-slate-200/60 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-2">
              <Terminal className={`w-4 h-4 ${accentColorClasses.text}`} />
              <span className="font-bold">SYSTEM_BOOT</span>
            </span>
            <span className={`font-black text-sm font-mono ${accentColorClasses.text}`}>
              {progress}%
            </span>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-3 rounded-full bg-slate-200 border border-slate-200 p-0.5 overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${accentColorClasses.barGradient} ${accentColorClasses.glow} transition-all duration-150`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Terminal Boot Log Output */}
          <div className="h-8 flex items-center justify-between px-3 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-500 font-mono">
            <span className="truncate flex items-center gap-2">
              <span className="text-sky-600">›</span>
              <span>{BOOT_STEPS[currentStepIndex]}</span>
            </span>
            {progress === 100 ? (
              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 animate-bounce" />
            ) : (
              <Zap className="w-3.5 h-3.5 text-sky-600 animate-pulse flex-shrink-0" />
            )}
          </div>
        </div>

        {/* Footer info */}
        <p className="text-[10px] text-slate-500 uppercase tracking-widest">
          PyTorch • TensorFlow • WebGL 3D • MLOps
        </p>

      </div>
    </div>
  );
};

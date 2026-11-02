import React, { useState } from 'react';
import { AccentColor } from '../types';
import { ShieldCheck, Download, ExternalLink, Code2, Sparkles, Check } from 'lucide-react';

interface TransparencySectionProps {
  accentColor: AccentColor;
  onExploreLab: () => void;
}

export const TransparencySection: React.FC<TransparencySectionProps> = ({
  accentColor,
  onExploreLab
}) => {
  const [downloaded, setDownloaded] = useState(false);
  const [activeMetricTab, setActiveMetricTab] = useState<'latency' | 'accessibility' | 'uptime'>('latency');

  const handleDownloadTokens = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section data-reveal id="transparency-section" className="py-24 relative bg-transparent border-t border-slate-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: 3D Dark Emerald Coins / Visual Art inspired by Frax reference */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl glass-panel p-8 border border-emerald-500/20 shadow-2xl flex flex-col justify-between overflow-hidden group">
              
              {/* Top Bar */}
              <div className="flex items-center justify-between border-b border-slate-200/40 pb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-mono text-slate-900 tracking-widest uppercase">
                    Verification Node
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600">
                  LIVE STATUS
                </span>
              </div>

              {/* Center 3D Simulated Graphic */}
              <div className="my-8 relative flex items-center justify-center">
                <div className="w-44 h-44 rounded-full bg-gradient-to-tr from-emerald-950 via-emerald-900/60 to-emerald-500/20 border-4 border-emerald-500/30 flex items-center justify-center shadow-2xl shadow-emerald-500/20 group-hover:rotate-12 transition-transform duration-700">
                  <div className="w-28 h-28 rounded-full bg-white/90 border border-emerald-400/50 flex flex-col items-center justify-center text-center p-2 backdrop-blur-md">
                    <span className="text-2xl font-bold font-mono text-emerald-600">100%</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">Verified UX</span>
                  </div>
                </div>

                {/* Satellite Nodes */}
                <div className="absolute top-0 right-4 px-3 py-1.5 rounded-lg bg-white/90 border border-emerald-500/30 text-[11px] font-mono text-emerald-600">
                  WCAG AA: Pass
                </div>
                <div className="absolute bottom-2 left-4 px-3 py-1.5 rounded-lg bg-white/90 border border-emerald-500/30 text-[11px] font-mono text-emerald-600">
                  60 FPS Smooth
                </div>
              </div>

              {/* Bottom Token Stats */}
              <div className="grid grid-cols-2 gap-4 bg-slate-100 p-4 rounded-xl border border-slate-200/40">
                <div>
                  <span className="text-[10px] text-slate-500 font-mono uppercase">System Audit</span>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">CertiK & Hacken</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-mono uppercase">Token Standard</span>
                  <p className="text-sm font-semibold text-emerald-600 mt-0.5">W3C Design Token</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Text & Interactive Metrics */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-500">
                TRUST THROUGH
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                Transparency
              </h2>
              <p className="text-base text-slate-500 font-light leading-relaxed">
                Experience the future of digital dollars and enterprise product design. Every layout, animation curve, and color token is fully documented, benchmarked, and open to audit.
              </p>
            </div>

            {/* Interactive Metric Switcher */}
            <div className="space-y-4 pt-2">
              <div className="flex gap-2 border-b border-slate-200 pb-2">
                <button
                  onClick={() => setActiveMetricTab('latency')}
                  className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeMetricTab === 'latency'
                      ? 'bg-emerald-500/20 text-emerald-600 border border-emerald-500/40'
                      : 'text-slate-500 hover:text-slate-600'
                  }`}
                >
                  Latency
                </button>
                <button
                  onClick={() => setActiveMetricTab('accessibility')}
                  className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeMetricTab === 'accessibility'
                      ? 'bg-emerald-500/20 text-emerald-600 border border-emerald-500/40'
                      : 'text-slate-500 hover:text-slate-600'
                  }`}
                >
                  Accessibility
                </button>
                <button
                  onClick={() => setActiveMetricTab('uptime')}
                  className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeMetricTab === 'uptime'
                      ? 'bg-emerald-500/20 text-emerald-600 border border-emerald-500/40'
                      : 'text-slate-500 hover:text-slate-600'
                  }`}
                >
                  System Uptime
                </button>
              </div>

              {/* Active Metric Card */}
              <div className="p-6 rounded-xl bg-emerald-50/20 border border-slate-200/40 flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono text-emerald-600 uppercase tracking-widest">
                    {activeMetricTab === 'latency' && 'Interaction Latency'}
                    {activeMetricTab === 'accessibility' && 'WCAG 2.1 Compliance'}
                    {activeMetricTab === 'uptime' && 'Production Uptime'}
                  </p>
                  <p className="text-3xl font-bold font-mono text-slate-900 mt-1">
                    {activeMetricTab === 'latency' && '< 12ms Input Lag'}
                    {activeMetricTab === 'accessibility' && '100% Score'}
                    {activeMetricTab === 'uptime' && '99.99% Reliability'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Benchmark</span>
                  <p className="text-xs text-slate-600 mt-0.5">Tested across 50+ devices</p>
                </div>
              </div>
            </div>

            {/* Action Buttons matching Frax reference "Learn more" & "Transparency" */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreLab}
                className="px-6 py-3.5 rounded-xl bg-emerald-500 text-black font-semibold text-xs tracking-wider uppercase hover:bg-emerald-400 transition-colors flex items-center gap-2"
              >
                <span>Learn More</span>
                <Sparkles className="w-4 h-4" />
              </button>

              <button
                onClick={handleDownloadTokens}
                className="px-6 py-3.5 rounded-xl bg-slate-100 border border-slate-200/40 text-slate-600 font-mono text-xs tracking-wider uppercase hover:text-slate-900 hover:border-emerald-500/50 transition-all flex items-center gap-2"
              >
                {downloaded ? <Check className="w-4 h-4 text-emerald-600" /> : <Download className="w-4 h-4" />}
                <span>{downloaded ? 'Tokens Exported!' : 'Export Design Tokens'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

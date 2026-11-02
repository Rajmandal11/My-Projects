import React from 'react';
import { X, Plus, Camera, Settings, Sparkles, FolderPlus, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AccentColor } from '../types';

interface HowToGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAddProject: () => void;
  onOpenChangeImage: () => void;
  accentColor: AccentColor;
}

export const HowToGuideModal: React.FC<HowToGuideModalProps> = ({
  isOpen,
  onClose,
  onOpenAddProject,
  onOpenChangeImage,
  accentColor
}) => {
  if (!isOpen) return null;

  const accentBadge = {
    cyan: 'bg-sky-500/10 border-sky-500/30 text-sky-600',
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600',
    violet: 'bg-violet-500/10 border-violet-500/30 text-violet-600',
    gold: 'bg-amber-500/10 border-amber-500/30 text-amber-600'
  }[accentColor];

  const primaryBtn = {
    cyan: 'bg-sky-400 text-black hover:bg-sky-300',
    emerald: 'bg-emerald-400 text-black hover:bg-emerald-300',
    violet: 'bg-violet-500 text-white hover:bg-violet-400',
    gold: 'bg-amber-400 text-black hover:bg-amber-300'
  }[accentColor];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/55 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#f8fafc] border border-sky-500/40 rounded-3xl p-6 sm:p-8 font-mono text-xs shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200/50 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-sky-500/20 border border-sky-400/40 text-sky-600">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Portfolio Quick Guide</h3>
              <p className="text-[11px] text-sky-600 font-mono">How to add new projects & update profile images</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6 text-slate-600">
          {/* Section 1: How to Add Projects */}
          <div className="p-5 rounded-2xl bg-white/85 border border-slate-200/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-400 text-black font-bold flex items-center justify-center text-xs">
                  1
                </span>
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FolderPlus className="w-4 h-4 text-sky-600" />
                  <span>How & Where to Add New Projects</span>
                </h4>
              </div>
              <span className={`px-2.5 py-0.5 rounded-md border text-[10px] ${accentBadge}`}>
                Interactive Form
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-500 font-mono pl-8">
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">Option A — Portfolio Grid Card:</strong> Scroll down to the <strong className="text-sky-600">"Featured Works"</strong> section and click the <strong className="text-sky-600">"+ Add New Project"</strong> card at the end of the grid.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">Option B — Admin Floating Dock:</strong> Click the <strong className="text-sky-600">⚙️ Settings Gear Button</strong> located at the bottom-left of the screen to slide open the Admin Drawer.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 flex-shrink-0 mt-0.5" />
                <span>
                  Fill in your project title, category (NLP, Vision, ML/Data, 3D), tagline, tech stack tags, and links, then click <strong className="text-emerald-600">+ Add Project To Grid</strong>!
                </span>
              </p>
            </div>

            <div className="pt-2 pl-8">
              <button
                onClick={() => {
                  onClose();
                  onOpenAddProject();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${primaryBtn}`}
              >
                <Plus className="w-4 h-4" />
                <span>Open Project Form Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Section 2: How to Change Images */}
          <div className="p-5 rounded-2xl bg-white/85 border border-slate-200/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-400 text-black font-bold flex items-center justify-center text-xs">
                  2
                </span>
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-sky-600" />
                  <span>How & Where to Change Profile / Hero Image</span>
                </h4>
              </div>
              <span className={`px-2.5 py-0.5 rounded-md border text-[10px] ${accentBadge}`}>
                Instant Photo Sync
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-500 font-mono pl-8">
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 flex-shrink-0 mt-0.5" />
                <span>
                  Hover over the <strong className="text-slate-900">Hero Card</strong> on the right side of the main header or the <strong className="text-slate-900">About Me</strong> section avatar.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 flex-shrink-0 mt-0.5" />
                <span>
                  Click the <strong className="text-sky-600">📷 Camera / Edit Photo Button</strong> or open the Admin Panel at bottom-left.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 flex-shrink-0 mt-0.5" />
                <span>
                  Paste any image URL (Unsplash, GitHub profile picture, or custom image link) or pick from built-in high-tech developer presets!
                </span>
              </p>
            </div>

            <div className="pt-2 pl-8">
              <button
                onClick={() => {
                  onClose();
                  onOpenChangeImage();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${primaryBtn}`}
              >
                <Camera className="w-4 h-4" />
                <span>Change Photo Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-200/50 flex items-center justify-between">
          <p className="text-[10px] text-slate-500 font-mono">
            Raj Mandal Portfolio System • Real-Time Local State
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 font-mono text-xs font-bold"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
};

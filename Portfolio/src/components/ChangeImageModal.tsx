import React, { useState } from 'react';
import { X, Camera, Check, Link, Sparkles, RefreshCw } from 'lucide-react';
import { AccentColor } from '../types';

interface ChangeImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage: string;
  onSaveImage: (newUrl: string) => void;
  accentColor: AccentColor;
}

const PRESET_AVATARS = [
  {
    name: 'Raj Mandal Portrait',
    url: '/src/assets/images/r.jpeg',
    badge: 'Current / Default'
  },
  {
    name: 'Futuristic Cyberpunk Developer',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    badge: 'High Tech Studio'
  },
  {
    name: 'Tech Specialist (Abstract Neon)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    badge: 'Professional'
  },
  {
    name: 'Deep Learning Researcher',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    badge: 'Dark Theme'
  }
];

export const ChangeImageModal: React.FC<ChangeImageModalProps> = ({
  isOpen,
  onClose,
  currentImage,
  onSaveImage,
  accentColor
}) => {
  const [customUrl, setCustomUrl] = useState(currentImage);
  const [previewUrl, setPreviewUrl] = useState(currentImage);

  if (!isOpen) return null;

  const handleApplyPreset = (url: string) => {
    setCustomUrl(url);
    setPreviewUrl(url);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim()) {
      onSaveImage(customUrl.trim());
      onClose();
    }
  };

  const accentBtn = {
    cyan: 'bg-sky-400 text-black hover:bg-sky-300 shadow-sky-500/20',
    emerald: 'bg-emerald-400 text-black hover:bg-emerald-300 shadow-emerald-500/20',
    violet: 'bg-violet-500 text-white hover:bg-violet-400 shadow-violet-500/20',
    gold: 'bg-amber-400 text-black hover:bg-amber-300 shadow-amber-500/20'
  }[accentColor];

  const borderAccent = {
    cyan: 'border-sky-500/40',
    emerald: 'border-emerald-500/40',
    violet: 'border-violet-500/40',
    gold: 'border-amber-500/40'
  }[accentColor];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className={`w-full max-w-xl bg-[#f8fafc] border ${borderAccent} rounded-3xl p-6 sm:p-8 font-mono text-xs shadow-2xl relative`}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200/50 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-600">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Change Profile & Hero Photo</h3>
              <p className="text-[10px] text-slate-500">Update image URL or choose a high-tech preset avatar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Preview */}
        <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-100 border border-slate-200 mb-6">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-sky-400/60 shadow-xl flex-shrink-0 bg-slate-100">
            <img
              src={previewUrl || currentImage}
              alt="Profile Preview"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={() => setPreviewUrl('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-slate-900 font-bold text-sm">Active Photo Preview</p>
            <p className="text-[10px] text-sky-600 font-mono break-all line-clamp-2">
              {previewUrl}
            </p>
            <p className="text-[10px] text-slate-500">
              This photo will appear in your Hero 3D Card, About Me Section, and Navbar!
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Custom URL Input */}
          <div>
            <label className="text-slate-600 block mb-2 font-bold flex items-center gap-1.5">
              <Link className="w-3.5 h-3.5 text-sky-600" />
              <span>Paste Custom Image URL</span>
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                required
                value={customUrl}
                onChange={(e) => {
                  setCustomUrl(e.target.value);
                  setPreviewUrl(e.target.value);
                }}
                placeholder="https://images.unsplash.com/photo-... or https://github.com/yourusername.png"
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/90 border border-slate-200/60 text-slate-900 focus:outline-none focus:border-sky-400 text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => setPreviewUrl(customUrl)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-100 border border-zinc-700 text-slate-600 hover:text-slate-900 flex items-center gap-1"
                title="Refresh Preview"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Preset Avatars */}
          <div>
            <label className="text-slate-600 block mb-2 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Or Choose Presets</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {PRESET_AVATARS.map((avatar, idx) => (
                <div
                  key={idx}
                  onClick={() => handleApplyPreset(avatar.url)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                    customUrl === avatar.url
                      ? 'bg-sky-50/80 border-sky-400 text-slate-900 shadow-lg'
                      : 'bg-slate-100 border-slate-200 text-slate-500 hover:border-sky-500/50 hover:text-slate-900'
                  }`}
                >
                  <img
                    src={avatar.url}
                    alt={avatar.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-slate-200"
                  />
                  <div className="truncate">
                    <p className="text-[11px] font-bold text-slate-900 truncate">{avatar.name}</p>
                    <p className="text-[9px] text-sky-600 font-mono truncate">{avatar.badge}</p>
                  </div>
                  {customUrl === avatar.url && (
                    <Check className="w-4 h-4 text-sky-600 ml-auto flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200/50">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 font-mono text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg ${accentBtn}`}
            >
              <Check className="w-4 h-4" />
              <span>Save & Update Photo</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

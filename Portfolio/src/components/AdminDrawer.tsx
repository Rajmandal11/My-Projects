import React, { useState } from 'react';
import { Project } from '../types';
import { Settings, X, Plus, Download, RefreshCw, Camera, Image, HelpCircle } from 'lucide-react';

interface AdminDrawerProps {
  onAddProject: (newProj: Project) => void;
  isOpen: boolean;
  onToggle: () => void;
  profileImage?: string;
  onUpdateProfileImage?: (newUrl: string) => void;
  onOpenHowToGuide?: () => void;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({
  onAddProject,
  isOpen,
  onToggle,
  profileImage = '/src/assets/images/r.jpeg',
  onUpdateProfileImage,
  onOpenHowToGuide
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'NLP' | 'Vision' | 'ML/Data' | '3D & Motion'>('ML/Data');
  const [tagline, setTagline] = useState('');
  const [tech, setTech] = useState('');
  const [emoji, setEmoji] = useState('🤖');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [github, setGithub] = useState('');
  const [newAvatarUrl, setNewAvatarUrl] = useState(profileImage);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title,
      subtitle: 'Custom Portfolio Project',
      category,
      tagline: tagline || 'Custom deployed project.',
      year: '2026',
      client: 'Personal Project',
      role: 'Lead AI Engineer',
      emoji: emoji || '🚀',
      image: image.trim() || undefined,
      color: '#00d4ff',
      status: 'ready',
      summary: tagline || 'A custom machine learning project.',
      challenge: 'Engineering end-to-end data pipeline.',
      solution: 'Custom model architecture and containerization.',
      tech: tech ? tech.split(',').map(t => t.trim()) : ['Python', 'ML'],
      url: url || 'https://github.com/Rajmandal11',
      github: github || 'https://github.com/Rajmandal11',
      impactMetrics: [
        { label: 'Accuracy', value: '95%' },
        { label: 'Status', value: 'Deployed' }
      ],
      deliverables: ['Custom Codebase', 'API Microservice']
    };

    onAddProject(newProject);
    setTitle('');
    setTagline('');
    setTech('');
    setImage('');
    setUrl('');
    setGithub('');
    onToggle();
  };

  const handleSaveAvatar = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAvatarUrl.trim() && onUpdateProfileImage) {
      onUpdateProfileImage(newAvatarUrl.trim());
    }
  };

  return (
    <>
      {/* Admin Toggle Gear Button (Bottom Left) */}
      <button
        id="admin-panel-toggle-btn"
        onClick={onToggle}
        className="fixed bottom-[5.75rem] left-6 z-40 p-3.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-emerald-600 hover:text-emerald-700 hover:border-emerald-400 hover:-translate-y-0.5 shadow-xl shadow-slate-900/10 transition-all"
        title="Admin Panel & Add Project"
      >
        <Settings className="w-5 h-5 hover:rotate-90 transition-transform duration-500" />
      </button>

      {/* Slide-over Drawer Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex justify-end">
          <div className="w-full max-w-md bg-[#ffffff] border-l border-emerald-500/40 p-6 sm:p-8 h-full overflow-y-auto font-mono text-xs flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200/50 pb-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Admin Panel</h3>
                  <p className="text-[10px] text-emerald-600">Manage Portfolio & Add Projects</p>
                </div>
                <button
                  onClick={onToggle}
                  className="p-2 text-slate-500 hover:text-slate-900 rounded-lg bg-slate-100 border border-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Add Project Form */}
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-200 pb-1">
                  1. Add New Project
                </div>

                <div>
                  <label className="text-slate-500 block mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. LLM Code Assistant"
                    className="w-full px-3 py-2.5 rounded-xl bg-white/90 border border-slate-200/50 text-slate-900 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-500 block mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/90 border border-slate-200/50 text-slate-900 focus:outline-none focus:border-emerald-400"
                    >
                      <option value="NLP">NLP</option>
                      <option value="Vision">Vision</option>
                      <option value="ML/Data">ML/Data</option>
                      <option value="3D & Motion">3D & Motion</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-500 block mb-1">Emoji</label>
                    <input
                      type="text"
                      value={emoji}
                      onChange={(e) => setEmoji(e.target.value)}
                      placeholder="🧠"
                      className="w-full px-3 py-2.5 rounded-xl bg-white/90 border border-slate-200/50 text-slate-900 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-500 block mb-1">Short Description</label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="Brief summary of what model or pipeline does..."
                    className="w-full px-3 py-2.5 rounded-xl bg-white/90 border border-slate-200/50 text-slate-900 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-slate-500 block mb-1">Project Image URL (Optional)</label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3 py-2.5 rounded-xl bg-white/90 border border-slate-200/50 text-slate-900 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-slate-500 block mb-1">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => setTech(e.target.value)}
                    placeholder="Python, PyTorch, FastAPI"
                    className="w-full px-3 py-2.5 rounded-xl bg-white/90 border border-slate-200/50 text-slate-900 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-slate-500 block mb-1">GitHub Repo URL</label>
                  <input
                    type="url"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="https://github.com/Rajmandal11/..."
                    className="w-full px-3 py-2.5 rounded-xl bg-white/90 border border-slate-200/50 text-slate-900 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-500 text-black font-bold uppercase tracking-wider hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Project To Grid</span>
                </button>
              </form>

              {/* Profile Photo Editor Form */}
              <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-200 pb-1 flex items-center gap-2">
                  <Camera className="w-3.5 h-3.5 text-sky-600" />
                  <span>2. Developer Profile Photo URL</span>
                </div>

                <form onSubmit={handleSaveAvatar} className="space-y-3">
                  <div>
                    <input
                      type="url"
                      value={newAvatarUrl}
                      onChange={(e) => setNewAvatarUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-xl bg-white/90 border border-slate-200/50 text-slate-900 focus:outline-none focus:border-sky-400 text-xs"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-600 hover:bg-sky-400 hover:text-black font-bold uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Update Profile Photo</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Quick Export & Actions */}
            <div className="pt-6 border-t border-slate-200 space-y-2">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Portfolio Quick Actions</p>
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Local Session</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

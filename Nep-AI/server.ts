import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini client lazily
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY" && key.trim() !== "") {
      try {
        aiClient = new GoogleGenAI({
          apiKey: key,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });
      } catch (e) {
        console.error("Failed to initialize Gemini Client", e);
      }
    }
  }
  return aiClient;
}

// ----------------------------------------------------
// Hardcoded fallback data in case Gemini is unavailable
// ----------------------------------------------------
function getDeterministicFallback(prompt: string, category: string) {
  const query = prompt.toLowerCase();
  
  if (query.includes("todo") || query.includes("task") || query.includes("checklist")) {
    return {
      appName: "TaskGlow Planner",
      description: "A seamless, high-performance task management application built in React and Tailwind. Features interactive checklists, group filtering, and dynamic progress trackers.",
      suggestedWidgetType: "todo",
      widgetConfig: {
        initialTasks: [
          { id: "1", text: "Design sleek dark grid onboarding card", completed: true, priority: "high" },
          { id: "2", text: "Integrate specialized AI multi-agent channels", completed: false, priority: "high" },
          { id: "3", text: "Add smooth spring-physics entrance transitions", completed: false, priority: "medium" },
          { id: "4", text: "Refine touch gestures for iOS and Android devices", completed: false, priority: "low" }
        ],
        categories: ["Work", "Personal", "Aesthetics", "Core Engine"]
      },
      files: [
        {
          name: "src/App.tsx",
          language: "tsx",
          code: `import React, { useState } from 'react';
import { Plus, Check, Trash2, Tag, Calendar, Sparkles } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Design sleek dark grid onboarding card", completed: true, priority: "high", category: "Work" },
    { id: "2", text: "Integrate specialized AI multi-agent channels", completed: false, priority: "high", category: "Core Engine" },
    { id: "3", text: "Add smooth spring-physics entrance transitions", completed: false, priority: "medium", category: "Aesthetics" }
  ]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [category, setCategory] = useState("Work");

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks([...tasks, {
      id: Math.random().toString(),
      text: input,
      completed: false,
      priority,
      category
    }]);
    setInput("");
  };

  const toggleToggle = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6">
      <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2 text-emerald-400">
              <Sparkles className="w-6 h-6 animate-pulse" /> TaskGlow
            </h1>
            <p className="text-sm text-slate-400">Crafting high-level productivity structures</p>
          </div>
          <div className="text-right">
            <span className="text-xl font-bold text-emerald-400 font-mono">{completedCount}/{tasks.length}</span>
            <p className="text-xs text-slate-400">tasks achieved</p>
          </div>
        </header>

        <form onSubmit={addTask} className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Introduce a new task requirement..."
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-100 transition-colors"
          />
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-2">
              {(['high', 'medium', 'low'] as const).map(p => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPriority(p)}
                  className={\`px-3 py-1 text-xs rounded-lg capitalize border \${priority === p ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'}\`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 text-sm font-semibold hover:bg-emerald-400 transition-colors cursor-pointer">
              Forge Task
            </button>
          </div>
        </form>

        <ul className="space-y-3">
          {tasks.map(task => (
            <li key={task.id} className="group flex items-center justify-between p-4 bg-slate-950 border border-slate-800/80 rounded-xl hover:border-slate-700 transition-all">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button onClick={() => toggleToggle(task.id)} className={\`w-6 h-6 flex items-center justify-center rounded-lg border transition-all \${task.completed ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-700 hover:border-emerald-500'}\`}>
                  {task.completed && <Check className="w-4 h-4 text-slate-950 stroke-[3]" />}
                </button>
                <span className={\`text-sm truncate \${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}\`}>
                  {task.text}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={\`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold font-mono \${task.priority === 'high' ? 'bg-rose-500/10 text-rose-400' : task.priority === 'medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'}\`}>
                  {task.priority}
                </span>
                <button onClick={() => deleteTask(task.id)} className="text-slate-500 hover:text-rose-400 p-1 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}`
        }
      ]
    };
  }

  if (query.includes("calc") || query.includes("math") || query.includes("finance") || query.includes("currency")) {
    return {
      appName: "VectorCalc Studio",
      description: "An elegant, math-focused vector and standard algebraic calculator loaded with responsive grids, historical logs, and live trigonometric capabilities.",
      suggestedWidgetType: "calculator",
      widgetConfig: {
        supportedOperations: ["+", "-", "*", "/", "sin", "cos", "tan", "sqrt"]
      },
      files: [
        {
          name: "src/App.tsx",
          language: "tsx",
          code: `import React, { useState } from 'react';
import { HelpCircle, RefreshCw, Delete, Percent } from 'lucide-react';

export default function App() {
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState<string[]>([]);
  
  const handleNum = (num: string) => {
    if (display === "0") {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOp = (op: string) => {
    setDisplay(display + " " + op + " ");
  };

  const handleClear = () => {
    setDisplay("0");
  };

  const calculate = () => {
    try {
      // Simple evaluator
      const cleanExpr = display.replace(/×/g, '*').replace(/÷/g, '/');
      const result = eval(cleanExpr);
      setHistory(prev => [display + " = " + result, ...prev.slice(0, 4)]);
      setDisplay(String(result));
    } catch {
      setDisplay("Expression Error");
    }
  };

  return (
    <div className="min-h-screen bg-[#04060b] text-[#cbd5e1] font-sans flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-[#090d16] border border-slate-900 rounded-3xl p-5 shadow-2xl">
        <div className="p-4 mb-4 bg-slate-950/80 rounded-2xl flex flex-col items-end min-h-[96px] justify-between">
          <div className="text-xs text-slate-500 font-mono tracking-wider truncate max-w-full">
            {history[0] || "No operations logged"}
          </div>
          <div className="text-3xl font-light text-white font-mono tracking-tight break-all">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <button onClick={handleClear} className="col-span-2 py-3.5 rounded-xl bg-slate-900 text-rose-400 font-semibold text-sm hover:bg-slate-800">Clear</button>
          <button onClick={() => setDisplay(display.slice(0, -1) || "0")} className="py-3.5 rounded-xl bg-slate-900 text-slate-400 text-sm hover:bg-slate-800 flex items-center justify-center">DEL</button>
          <button onClick={() => handleOp("/")} className="py-3.5 rounded-xl bg-teal-500/10 text-teal-400 font-semibold hover:bg-teal-500/20">÷</button>

          {['7', '8', '9'].map(n => (
            <button key={n} onClick={() => handleNum(n)} className="py-4 rounded-xl bg-slate-900/50 hover:bg-slate-900 text-white font-mono">{n}</button>
          ))}
          <button onClick={() => handleOp("*")} className="py-4 rounded-xl bg-teal-500/10 text-teal-400 font-semibold hover:bg-teal-500/20">×</button>

          {['4', '5', '6'].map(n => (
            <button key={n} onClick={() => handleNum(n)} className="py-4 rounded-xl bg-slate-900/50 hover:bg-slate-900 text-white font-mono">{n}</button>
          ))}
          <button onClick={() => handleOp("-")} className="py-4 rounded-xl bg-teal-500/10 text-teal-400 font-semibold hover:bg-teal-500/20">-</button>

          {['1', '2', '3'].map(n => (
            <button key={n} onClick={() => handleNum(n)} className="py-4 rounded-xl bg-slate-900/50 hover:bg-slate-900 text-white font-mono">{n}</button>
          ))}
          <button onClick={() => handleOp("+")} className="py-4 rounded-xl bg-teal-500/10 text-teal-400 font-semibold hover:bg-teal-500/20">+</button>

          <button onClick={() => handleNum("0")} className="col-span-2 py-4 rounded-xl bg-slate-900/50 hover:bg-slate-900 text-white font-mono">0</button>
          <button onClick={() => handleNum(".")} className="py-4 rounded-xl bg-slate-900/50 hover:bg-slate-900 text-white font-mono">.</button>
          <button onClick={calculate} className="py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold hover:brightness-110">=</button>
        </div>
      </div>
    </div>
  );
}`
        }
      ]
    };
  }

  if (query.includes("short") || query.includes("url") || query.includes("link") || query.includes("shrink") || query.includes("simple")) {
    return {
      appName: "ZipLink Core",
      description: "A premium, modular URL shortener and click-analytics dashboard. Features custom back-half aliases, dynamic QR code rendering, and real-time device tracker metrics.",
      suggestedWidgetType: "shortener",
      widgetConfig: {
        domain: "zip.lnk",
        initialLinks: [
          { id: "1", original: "https://ai.studio/build/forge-runtimes", shortened: "zip.lnk/forge-rt", clicks: 1242, created: "2 hours ago" },
          { id: "2", original: "https://github.com/google-deepmind/antigravity", shortened: "zip.lnk/deep-anti", clicks: 840, created: "1 day ago" }
        ]
      },
      files: [
        {
          name: "src/App.tsx",
          language: "tsx",
          code: `import React, { useState } from 'react';
import { Link2, Sparkles, Copy, Check, BarChart3, Globe, Shield, RefreshCw, QrCode, ArrowRight, Trash2 } from 'lucide-react';

interface ShortLink {
  id: string;
  original: string;
  shortened: string;
  clicks: number;
  created: string;
  alias?: string;
}

export default function App() {
  const [links, setLinks] = useState<ShortLink[]>([
    { id: "1", original: "https://ai.studio/build/forge-runtimes", shortened: "zip.lnk/forge-rt", clicks: 1242, created: "2 hours ago", alias: "forge-rt" },
    { id: "2", original: "https://github.com/google-deepmind/antigravity", shortened: "zip.lnk/deep-anti", clicks: 840, created: "1 day ago", alias: "deep-anti" }
  ]);
  const [inputUrl, setInputUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeLinkId, setActiveLinkId] = useState<string>("1");

  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    // Standardize URL protocol
    let fullUrl = inputUrl;
    if (!/^https?:\/\//i.test(fullUrl)) {
      fullUrl = 'https://' + fullUrl;
    }

    const alias = customAlias.trim() || Math.random().toString(36).substring(2, 7);
    const newLink: ShortLink = {
      id: Date.now().toString(),
      original: fullUrl,
      shortened: \`zip.lnk/\${alias}\`,
      clicks: 0,
      created: "Just now",
      alias
    };

    setLinks([newLink, ...links]);
    setActiveLinkId(newLink.id);
    setInputUrl("");
    setCustomAlias("");
  };

  const copyToClipboard = (link: ShortLink) => {
    navigator.clipboard.writeText(link.shortened);
    setCopiedId(link.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter(l => l.id !== id));
    if (activeLinkId === id) {
      setActiveLinkId(links[0]?.id || "");
    }
  };

  const activeLink = links.find(l => l.id === activeLinkId) || links[0];

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 font-sans p-4 md:p-8 selection:bg-emerald-500/30 selection:text-emerald-300">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950 font-bold">
              <Link2 className="w-5.5 h-5.5 text-slate-950" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                ZipLink Core <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-mono px-2 py-0.5 rounded-full uppercase">Stable</span>
              </h1>
              <p className="text-xs text-slate-400">Premium Link Shortening & Device Analytics Engine</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-900">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Node Gateway Active</span>
          </div>
        </header>

        {/* Shortening action form */}
        <div className="bg-[#0a101d] border border-slate-900 rounded-3xl p-5 md:p-6 shadow-xl">
          <form onSubmit={handleShorten} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Destination URL</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="https://ai.studio/build/workspace/deep-links/sandbox"
                    value={inputUrl}
                    onChange={e => setInputUrl(e.target.value)}
                    className="w-full bg-[#05080e] border border-slate-800 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-emerald-500 text-slate-100 transition-all text-xs"
                  />
                  <div className="absolute right-3.5 top-3 text-slate-600">
                    <Link2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Custom Slug (Optional)</label>
                <div className="flex bg-[#05080e] border border-slate-800 rounded-xl overflow-hidden focus-within:border-emerald-500 transition-all">
                  <span className="bg-[#0d121f] text-slate-500 px-3 py-3 font-mono text-xs select-none border-r border-slate-900">zip.lnk/</span>
                  <input
                    type="text"
                    placeholder="alias"
                    value={customAlias}
                    onChange={e => setCustomAlias(e.target.value)}
                    className="w-full bg-transparent border-none focus:outline-none text-slate-100 px-3 py-3 text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-500" /> Auto-secured behind HTTPS protocols
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black rounded-xl text-xs hover:brightness-110 flex items-center gap-1.5 transition-all shadow-lg shadow-emerald-500/10 cursor-pointer"
              >
                Shorten Link <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>

        {/* Dashboard split */}
        {links.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Link List (Left 7 cols) */}
            <div className="lg:col-span-7 bg-[#0a101d] border border-slate-900 rounded-3xl p-5 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-black text-slate-500 tracking-widest uppercase block border-b border-slate-900 pb-2">
                  SAVED Blueprints ({links.length})
                </span>

                <div className="space-y-2.5 overflow-y-auto max-h-[380px] pr-1">
                  {links.map(link => {
                    const isActive = activeLinkId === link.id;
                    return (
                      <div
                        key={link.id}
                        onClick={() => setActiveLinkId(link.id)}
                        className={\`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 \${
                          isActive 
                            ? "bg-[#111c2f]/40 border-emerald-500/35" 
                            : "bg-[#05080e]/60 border-slate-900/60 hover:border-slate-800"
                        }\`}
                      >
                        <div className="space-y-1.5 min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-white font-mono">{link.shortened}</span>
                            <span className="text-[9px] text-[#475569] font-mono">{link.created}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 truncate font-mono">{link.original}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); copyToClipboard(link); }}
                            className="bg-[#070b13] border border-slate-800 hover:border-slate-700 p-2 rounded-xl text-slate-300 hover:text-emerald-400 transition-colors"
                          >
                            {copiedId === link.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); deleteLink(link.id); }}
                            className="bg-[#070b13] border border-slate-800 hover:border-rose-500/25 p-2 rounded-xl text-slate-500 hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-900 text-[10px] text-slate-500 font-mono flex items-center justify-between">
                <span>Select row to inspect high DPI telemetry assets</span>
                <span className="text-emerald-400">🟢 Live Tracker</span>
              </div>
            </div>

            {/* Link Preview & QR Asset Panel (Right 5 cols) */}
            <div className="lg:col-span-5 bg-[#0a101d] border border-slate-900 rounded-3xl p-5 flex flex-col justify-between">
              {activeLink ? (
                <div className="space-y-6 flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono font-black text-slate-500 tracking-widest uppercase block border-b border-slate-900 pb-2">
                      LINK TELEMETRY DETAILS
                    </span>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 text-center space-y-4">
                      {/* Simulated QR Code using elegant CSS representation */}
                      <div className="w-28 h-28 bg-white p-2.5 rounded-xl mx-auto flex items-center justify-center relative shadow-lg">
                        <div className="grid grid-cols-5 gap-1.5 w-full h-full text-slate-950">
                          {Array.from({ length: 25 }).map((_, rIdx) => {
                            const isFilled = (rIdx % 2 === 0 && rIdx % 3 !== 0) || rIdx < 5 || rIdx > 20 || rIdx % 5 === 0;
                            return (
                              <div
                                key={rIdx}
                                className={\`rounded-sm \${isFilled ? 'bg-slate-950' : 'bg-transparent'}\`}
                              />
                            );
                          })}
                        </div>
                        <div className="absolute inset-0 bg-transparent flex items-center justify-center">
                          <div className="w-7 h-7 rounded-lg bg-emerald-500 border-2 border-white flex items-center justify-center">
                            <Link2 className="w-3.5 h-3.5 text-slate-950" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-0.5">
                        <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold tracking-widest">DYNAMIC SHORTENED ADDRESS</span>
                        <span className="text-xs font-bold text-emerald-400 font-mono block select-all">{activeLink.shortened}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 font-mono text-[10px]">
                      <div className="bg-[#05080e] p-3 rounded-xl border border-slate-900 space-y-0.5">
                        <span className="text-slate-500 block">TOTAL CLICKS</span>
                        <span className="text-base font-bold text-emerald-400">{activeLink.clicks}</span>
                      </div>
                      <div className="bg-[#05080e] p-3 rounded-xl border border-slate-900 space-y-0.5">
                        <span className="text-slate-500 block">QR TRANSFERS</span>
                        <span className="text-base font-bold text-cyan-400">{Math.round(activeLink.clicks * 0.15)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#05080e] p-3 rounded-xl border border-separate border-slate-900 text-[10px] font-mono leading-relaxed space-y-1 text-slate-400">
                    <span className="text-[9px] text-slate-500 block font-bold font-mono">PROXY TELEMETRY RESOLVER</span>
                    <p className="truncate">🎯 Target: {activeLink.original}</p>
                    <p>🌐 Geo Resolution: US, IN, DE Clusters loadbalanced</p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 font-mono text-center py-12">
                  <BarChart3 className="w-8 h-8 opacity-45 animate-pulse" />
                  <p className="text-[10px] mt-2">Introduce a destination link to resolve core assets.</p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
`
        }
      ]
    };
  }

  // Default Fallback
  return {
    appName: "Nova Landing UI",
    description: `A custom-scaffolding based on your prompt: "${prompt}". Responsive landing interface centered around interactive card grids, dynamic hero spaces, and beautiful typography choices.`,
    suggestedWidgetType: "portfolio",
    widgetConfig: {
      tagline: "Unlocking structural limits",
      features: ["Real-time state binding", "Interactive layouts", "Pure clean modular CSS"]
    },
    files: [
      {
        name: "src/App.tsx",
        language: "tsx",
        code: `import React, { useState } from 'react';
import { Sparkles, Terminal, Cpu, ArrowRight, ShieldCheck, Mail } from 'lucide-react';

export default function App() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-200 p-6 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto py-12 space-y-16">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Launching Blueprint Core
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white max-w-2xl mx-auto font-sans leading-tight">
            The future of <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent bg-clip-text">dynamic architecture</span> is here.
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto">
            Scaffolded precisely for: "${prompt.replace(/"/g, '\\"')}"
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl space-y-3 hover:border-slate-700 transition-colors">
            <Terminal className="w-8 h-8 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">Full-Stack Core</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Bundled with server-side proxy routers, secure runtime environments, and lightning fast HMR setups.</p>
          </div>
          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl space-y-3 hover:border-slate-700 transition-colors">
            <Cpu className="w-8 h-8 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">15 AI Classrooms</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Integrated directly via specialized neural routes and high-context agent directives.</p>
          </div>
          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl space-y-3 hover:border-slate-700 transition-colors">
            <ShieldCheck className="w-8 h-8 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Responsive Fabric</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Composed for premium visuals on high dpi displays, iOS touchscreens, and Android devices.</p>
          </div>
        </div>

        <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-white">Join the private beta</h4>
            <p className="text-xs text-slate-400">Claim your 212 daily free builds instantly.</p>
          </div>
          {!isSubmitted ? (
            <div className="flex w-full sm:w-auto max-w-sm bg-slate-950 border border-slate-800 p-1 rounded-2xl">
              <input 
                type="email" 
                placeholder="Enter email address" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="bg-transparent text-sm px-3 focus:outline-none flex-1 text-slate-100 placeholder-slate-600"
              />
              <button onClick={() => { if(email) setIsSubmitted(true); }} className="px-4 py-2 text-xs bg-cyan-400 text-slate-950 font-semibold rounded-xl flex items-center gap-1.5 hover:bg-cyan-300">
                Join <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="text-cyan-400 text-sm font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-5 h-5 animate-bounce" /> Successfully enrolled in Core Beta!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}`
      }
    ]
  };
}

// ----------------------------------------------------
// API Route: Forge Prompt
// ----------------------------------------------------
app.post("/api/forge", async (req, res) => {
  const { prompt, category } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "No prompt supplied" });
  }

  const ai = getGeminiClient();

  if (!ai) {
    console.log("No Gemini API key or configuration found. Serving premium deterministic mock template.");
    const fallback = getDeterministicFallback(prompt, category || "");
    return res.json(fallback);
  }

  try {
    const formattedPrompt = `You are a professional software engineering blueprint generator.
    The customer wants us to build the following developer workspace prompt: "${prompt}" in the category of "${category || 'Website'}".
    
    You MUST return a JSON structure matching the following response specification exactly:
    {
      "appName": "A short, humbler, beautifully direct name of the app",
      "description": "A single compact paragraph summarizing what this application layout achieves, styled in highly technical but human phrasing",
      "suggestedWidgetType": "One of: 'todo' | 'calculator' | 'portfolio' | 'ecommerce' | 'analytics' | 'chat' | 'general-app'",
      "widgetConfig": {
         "initialState": "Any structured JSON object to pre-populate custom preview dashboard elements"
      },
      "files": [
        {
          "name": "src/App.tsx",
          "language": "tsx",
          "code": "Write a fully functional, self-contained interactive React UI file. Make sure it imports lucide-react icons, uses standard Tailwind classes for styling (with elegant off-white backgrounds, deep charcoal cards, slate accents, or highly customized tech elements matching the theme). Ensure full state management with useState, custom helper buttons, and dynamic micro-animations or conditional displays so that users can interact with it deeply. Do NOT mock layout: make it work!"
        }
      ]
    }
    
    Ensure all files compile flawlessly. Do not include mock files or unreadable snippets.`;

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            appName: { type: Type.STRING },
            description: { type: Type.STRING },
            suggestedWidgetType: { type: Type.STRING },
            widgetConfig: { type: Type.OBJECT },
            files: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  language: { type: Type.STRING },
                  code: { type: Type.STRING }
                },
                required: ["name", "language", "code"]
              }
            }
          },
          required: ["appName", "description", "suggestedWidgetType", "files"]
        }
      }
    });

    const parsed = JSON.parse(result.text || "{}");
    return res.json(parsed);
  } catch (err: any) {
    console.error("Gemini forge generation failed: ", err);
    // Return standard premium fallback on error
    const fallback = getDeterministicFallback(prompt, category || "");
    return res.json(fallback);
  }
});

// ----------------------------------------------------
// API Route: Specialized Agent Conversation Chat
// ----------------------------------------------------
app.post("/api/agent-chat", async (req, res) => {
  const { agentId, agentName, messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid message array" });
  }

  const ai = getGeminiClient();
  const lastUserMsg = messages[messages.length - 1]?.content || "";

  if (!ai) {
    // Generate high quality diagnostic mock answer
    const answers: { [key: string]: string } = {
      "AI Website Builder": `I am the **AI Website Builder** agent (Code 01). Based on your requirement: "${lastUserMsg}", I recommend scaffolding an elegant React template using our "Space Grotesk" typography setup. I've initiated structural blueprints to prioritize touch constraints for iOS and Android context. Type 'forge template' to export directly.`,
      "AI App Generator": `Deploying full-stack app configurations! I've loaded a Dockerized NodeJS + Express scaffold featuring secure PostgreSQL bridges. I've mapped port 3000 to bind securely with Docker workspace configurations, securing client credentials behind standard HTTP headers.`,
      "AI Code Assistant": `Pair programmer reading context... To implement: "${lastUserMsg}", I suggest wrapping key state updates inside standard React batch callbacks. Minimize dependency noise by caching primitive state hooks directly.`,
      "AI Bug Fixer": `I've analyzed the prospective workspace logs. Let's ensure any file path references use relative selectors (\`./\`) rather than absolute mount root paths (\`/\`). This prevents runtime filesystem conflicts on sandbox environments.`
    };
    const ans = answers[agentName] || `Hello, I am the **${agentName || 'Nep AI Agent'}**. I am here to help you design, scaffold, and review perfect technical configurations for "${lastUserMsg}". Let me know if you want me to write code snippets, construct SQL chains, or resolve structural layouts!`;

    // Wait a brief simulated moment to make the chat feel alive and responsive
    await new Promise(resolve => setTimeout(resolve, 600));
    return res.json({ text: ans });
  }

  try {
    // Convert client messages structure to Gemini's expected contents structure
    const systemPrompt = `You are the specialized agent named "${agentName}" inside Nep AI (a premium, cutting-edge software development agentic suite).
    Your specific expertise matches the title of "${agentName}". Be extremely helpful, write precise code blocks if asked, keep explanations technical but humble, objective and scannable. Avoid sales-pitch vocabulary or hyper-creative slogans. Address the user's latest query directly.`;

    const chatMessages = messages.map(m => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }]
    }));

    // Use chats API or direct generator with simple instructions
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: chatMessages.length > 0 ? chatMessages : [{ role: "user", parts: [{ text: lastUserMsg }] }],
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7
      }
    });

    return res.json({ text: response.text });
  } catch (err: any) {
    console.error("Gemini agent chat failed: ", err);
    return res.status(500).json({ error: err.message || "Internal generation failure" });
  }
});

// ----------------------------------------------------
// Setup Vite and Static Paths
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Nep AI server booting on port ${PORT}`);
  });
}

startServer();

import React, { useState, useEffect } from "react";
import { 
  File, Folder, Play, Check, Copy, ExternalLink, Terminal, Laptop, 
  Settings, RefreshCw, Send, CheckCircle, Database, Layout, Eye,
  CloudLightning, AlertCircle, Sparkles, Plus, Trash2, ArrowRight,
  Link2, BarChart3
} from "lucide-react";
import { WorkspaceState, GeneratedFile, SystemLog } from "../types";

interface CodeWorkspaceProps {
  state: WorkspaceState | null;
  onRefresh: () => void;
  logs: SystemLog[];
  setLogs: React.Dispatch<React.SetStateAction<SystemLog[]>>;
}

export default function CodeWorkspace({
  state,
  onRefresh,
  logs,
  setLogs
}: CodeWorkspaceProps) {
  const [selectedFileName, setSelectedFileName] = useState("src/App.tsx");
  const [copied, setCopied] = useState(false);
  const [previewTab, setPreviewTab] = useState<"preview" | "logs">("preview");
  const [deploying, setDeploying] = useState(false);
  const [deploySuccess, setDeploySuccess] = useState(false);
  
  // Simulated Interactive States for previewed widget
  // (Todo states)
  const [todoList, setTodoList] = useState<{ id: string; text: string; done: boolean }[]>([
    { id: "1", text: "Configure cross-platform CSS bindings", done: false },
    { id: "2", text: "Map Express endpoint variables", done: true },
    { id: "3", text: "Validate React hydration sequences", done: false }
  ]);
  const [todoInput, setTodoInput] = useState("");

  // (Calc states)
  const [calcDisplay, setCalcDisplay] = useState("0");

  // (Ecom states)
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  // (Analytics states)
  const [analyticsViews, setAnalyticsViews] = useState(2542);
  const [analyticsConvs, setAnalyticsConvs] = useState(4.2);

  // Sync file list adjustments when state updates
  useEffect(() => {
    if (state && state.files && state.files.length > 0) {
      // Find default code or first file
      const match = state.files.find(f => f.name.includes("App.tsx")) || state.files[0];
      setSelectedFileName(match.name);
    }
  }, [state]);

  if (!state) {
    return (
      <div className="flex flex-col items-center justify-center p-16 h-[70vh] text-center gap-4 bg-[#070b13]">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center animate-pulse">
          <Laptop className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white">No active workspace scaffolding.</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
            Browse our especializados agents, templates marketplace, or write a custom prompt on the dashboard to build standard react components.
          </p>
        </div>
      </div>
    );
  }

  const activeFile = state.files.find(f => f.name === selectedFileName) || state.files[0];

  const handleCopyCode = () => {
    if (activeFile) {
      navigator.clipboard.writeText(activeFile.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      const newLog: SystemLog = {
        timestamp: new Date().toLocaleTimeString(),
        level: "info",
        message: `Code from file "${activeFile.name}" copied directly to clipboard.`
      };
      setLogs(prev => [newLog, ...prev]);
    }
  };

  const handleDeploySimulator = () => {
    setDeploying(true);
    setDeploySuccess(false);

    // Staggered mock log deployment output
    const milestones = [
      "Contacting ingress gateway on server runtimes...",
      "Analyzing project dependencies in system configs...",
      "Pruning bundle sizes and static artifacts (Vite build)...",
      "Deploying container ecosystem successfully to Google Cloud Run!"
    ];

    milestones.forEach((m, idx) => {
      setTimeout(() => {
        const dLog: SystemLog = {
          timestamp: new Date().toLocaleTimeString(),
          level: idx === milestones.length - 1 ? "success" : "info",
          message: `[deploy] ${m}`
        };
        setLogs(prev => [dLog, ...prev]);

        if (idx === milestones.length - 1) {
          setDeploying(false);
          setDeploySuccess(true);
        }
      }, (idx + 1) * 900);
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6 font-sans text-xs">
      {/* Workspace Header */}
      <div className="bg-[#0a101d] border border-slate-900 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-sm font-black text-white hover:text-emerald-400 cursor-pointer">{state.appName}</h1>
            <span className="text-[10px] bg-slate-900 text-slate-400 border border-slate-800 px-2 py-0.5 rounded uppercase font-mono tracking-wider">
              {state.suggestedWidgetType}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed max-w-2xl">{state.description}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onRefresh}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-800/80 bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-900 font-semibold cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Re-Build
          </button>
          <button
            onClick={handleDeploySimulator}
            disabled={deploying}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 text-[#070b13] font-bold hover:bg-emerald-400 disabled:opacity-45 cursor-pointer transition-colors"
          >
            {deploying ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CloudLightning className="w-3.5 h-3.5" />}
            {deploying ? "Deploying..." : "Deploy to Cloud Run"}
          </button>
        </div>
      </div>

      {/* Deploy Success Message bar */}
      {deploySuccess && (
        <div className="bg-emerald-950/25 border border-emerald-500/25 p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="font-bold text-slate-100 block text-xs">Container Deployed Successfully!</span>
              <p className="text-[10px] text-slate-400">Live preview environment deployed stably onto Google Cloud Run clusters.</p>
            </div>
          </div>
          <a
            href={`https://nep-ai.run/${state.appName.toLowerCase().replace(/ /g, "-")}`}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 rounded-lg hover:bg-emerald-500/20 flex items-center gap-1.5 cursor-pointer"
          >
            Open in new tab <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      {/* Main IDE Grid (Three panels: sidebar tree, code center, preview right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[580px] items-stretch">
        
        {/* Sidebar explorer panel (Left 2 cols) */}
        <div className="lg:col-span-2 bg-[#090e1a]/95 border border-slate-900 rounded-2xl p-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-slate-400 font-mono font-bold text-[9px] uppercase tracking-wider pb-2 border-b border-slate-900">
              <span>EXPLORER</span>
              <span className="text-[8px] bg-slate-950 text-emerald-400 px-1 rounded">Vite SPA</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-400 font-bold select-none">
                <Folder className="w-3.5 h-3.5 text-indigo-400" /> <span>src</span>
              </div>
              <ul className="pl-4 space-y-1.5 text-slate-300">
                {state.files.map((file) => (
                  <li key={file.name}>
                    <button
                      onClick={() => setSelectedFileName(file.name)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                        selectedFileName === file.name
                          ? "bg-slate-900 text-emerald-400 font-semibold"
                          : "hover:bg-slate-900/40 text-slate-400"
                      }`}
                    >
                      <File className="w-3 h-3 text-emerald-400/80" />
                      <span className="truncate block max-w-full">{file.name.replace("src/", "")}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="pt-3 border-t border-slate-900 space-y-1.5">
                <div className="flex items-center gap-2 text-slate-500 select-none">
                  <Folder className="w-3.5 h-3.5" /> <span>public</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 pl-4 select-none">
                  <File className="w-3 h-3" /> <span className="opacity-70">favicon.ico</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl space-y-1.5 border border-slate-900 mt-4">
            <span className="text-[8px] text-slate-500 block uppercase font-mono font-bold">WORKSPACE URL</span>
            <span className="font-mono text-[9px] text-slate-300 truncate block">https://nep-ai.run/{state.appName.toLowerCase().replace(/ /g, "-")}</span>
          </div>
        </div>

        {/* Code Center Panel (Center 5 cols) */}
        <div className="lg:col-span-5 bg-[#080c15] border border-slate-900 rounded-2xl overflow-hidden flex flex-col justify-between">
          {/* Editor Header */}
          <div className="bg-[#090e1a]/80 py-2.5 px-4 border-b border-slate-900 flex items-center justify-between font-mono">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded bg-orange-400" />
              <span className="text-slate-300 font-semibold">{selectedFileName.replace("src/", "")}</span>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 text-slate-400 hover:text-white text-[10px] py-1 px-2.5 bg-slate-950 border border-slate-900 rounded-lg"
            >
              <Copy className="w-3 h-3" />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Lines and Text body */}
          <div className="flex-1 p-4 font-mono text-[11px] overflow-auto max-h-[460px] leading-relaxed bg-[#0a0d16] flex items-stretch">
            {/* mock editor layout with lines numbers */}
            <div className="w-8 select-none text-slate-600 text-right pr-3 border-r border-[#151c2f] flex flex-col gap-0.5">
              {Array.from({ length: 45 }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <pre className="pl-4 text-emerald-400/95 overflow-x-auto whitespace-pre block w-full">
              <code>{activeFile?.code || "// Empty code block"}</code>
            </pre>
          </div>

          <div className="bg-[#090e1a] border-t border-slate-900/60 py-2 px-4 flex items-center justify-between text-slate-500 text-[10px]">
            <span>UTF-8 • JSX Syntax Highlighted</span>
            <span>Lines: {activeFile?.code.split("\n").length || 0}</span>
          </div>
        </div>

        {/* Live Preview / Logs Panel (Right 5 cols) */}
        <div className="lg:col-span-5 bg-[#05080e] border border-emerald-950/20 rounded-2xl overflow-hidden flex flex-col justify-between">
          {/* Tab bar header */}
          <div className="bg-[#090e1a]/80 p-1 flex border-b border-slate-900 items-center justify-between">
            <div className="flex gap-1.5">
              <button
                onClick={() => setPreviewTab("preview")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1 ${
                  previewTab === "preview" 
                    ? "bg-[#111c2f] text-emerald-400 border border-emerald-800/30" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Eye className="w-3.5 h-3.5" /> Live Preview
              </button>
              <button
                onClick={() => setPreviewTab("logs")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1 ${
                  previewTab === "logs" 
                    ? "bg-[#111c2f] text-emerald-400 border border-emerald-800/30" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Terminal className="w-3.5 h-3.5" /> Sandbox Logs
              </button>
            </div>
            <span className="text-[9px] font-mono font-bold uppercase text-slate-500 pr-3">Interactive Engine</span>
          </div>

          {/* Display Frame */}
          <div className="flex-1 bg-slate-950 relative min-h-[400px]">
            {previewTab === "preview" ? (
              <div className="absolute inset-0 overflow-auto p-4 flex flex-col items-center justify-center">
                {/* 
                  ----------------- LIVE RENDERING OF SIMULATOR WIDGETS ----------------- 
                */}

                {state.suggestedWidgetType === "todo" && (
                  <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 text-slate-200">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div>
                        <h4 className="font-bold text-white text-xs">TaskGlow Simulator</h4>
                        <p className="text-[10px] text-slate-500">Live test interactive states</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded">
                        {todoList.filter(t => t.done).length} / {todoList.length} done
                      </span>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); if (todoInput.trim()) { setTodoList([...todoList, { id: Date.now().toString(), text: todoInput, done: false }]); setTodoInput(""); } }} className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Add mock task..." 
                        value={todoInput}
                        onChange={e => setTodoInput(e.target.value)}
                        className="flex-1 bg-slate-950 text-xs border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                      <button type="submit" className="px-3 bg-emerald-500 text-[#070b13] font-bold rounded-xl text-xs flex items-center justify-center">
                        <Plus className="w-4 h-4" />
                      </button>
                    </form>

                    <ul className="space-y-2">
                      {todoList.map(item => (
                        <li key={item.id} className="flex items-center justify-between p-2.5 bg-slate-950 border border-slate-800/60 rounded-xl">
                          <button onClick={() => setTodoList(todoList.map(t => t.id === item.id ? { ...t, done: !t.done } : t))} className={`flex items-center gap-2.5 text-xs ${item.done ? 'line-through text-slate-500' : 'text-slate-300'}`}>
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${item.done ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-800'}`}>
                              {item.done && <Check className="w-3 h-3 text-slate-950 stroke-[3]" />}
                            </div>
                            <span className="truncate max-w-[200px]">{item.text}</span>
                          </button>
                          <button onClick={() => setTodoList(todoList.filter(t => t.id !== item.id))} className="text-slate-500 hover:text-rose-400 p-0.5 rounded">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {state.suggestedWidgetType === "calculator" && (
                  <div className="w-full max-w-xs bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4 text-slate-200">
                    <div className="p-3 bg-slate-950 rounded-xl flex flex-col items-end min-h-[64px] justify-center">
                      <span className="text-xs text-slate-400 font-mono">Algebraic Simulator</span>
                      <div className="text-xl font-bold font-mono text-white mt-1">{calcDisplay}</div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-xs">
                      {["7", "8", "9", "/"].map(k => (
                        <button key={k} onClick={() => setCalcDisplay(calcDisplay === "0" ? k : calcDisplay + k)} className="py-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 font-mono font-bold text-slate-300">{k}</button>
                      ))}
                      {["4", "5", "6", "*"].map(k => (
                        <button key={k} onClick={() => setCalcDisplay(calcDisplay === "0" ? k : calcDisplay + k)} className="py-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 font-mono font-bold text-slate-300">{k}</button>
                      ))}
                      {["1", "2", "3", "-"].map(k => (
                        <button key={k} onClick={() => setCalcDisplay(calcDisplay === "0" ? k : calcDisplay + k)} className="py-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 font-mono font-bold text-slate-300">{k}</button>
                      ))}
                      <button onClick={() => setCalcDisplay("0")} className="py-2.5 rounded-lg bg-[#ef4444]/10 text-rose-400 font-bold">C</button>
                      <button onClick={() => setCalcDisplay(calcDisplay + "0")} className="py-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 font-mono font-bold text-slate-300">0</button>
                      <button onClick={() => { try { setCalcDisplay(String(eval(calcDisplay))); } catch { setCalcDisplay("Error"); } }} className="py-2.5 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400">=</button>
                      <button onClick={() => setCalcDisplay(calcDisplay + "+")} className="py-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 font-mono font-bold text-slate-300">+</button>
                    </div>
                  </div>
                )}

                {state.suggestedWidgetType === "shortener" && (
                  <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 text-slate-200">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div>
                        <h4 className="font-bold text-white text-xs">ZipLink Simulator</h4>
                        <p className="text-[10px] text-slate-500">Live shortening pipeline active</p>
                      </div>
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-mono px-2 py-0.5 rounded uppercase">
                        2 Links active
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/40 text-[10px] space-y-1">
                        <div className="flex items-center justify-between text-[9px] font-mono font-bold text-slate-500">
                          <span>DYNAMIC LINK GENERATOR</span>
                          <span className="text-emerald-400">STATUS.OK</span>
                        </div>
                        <p className="text-white font-mono break-all font-semibold">https://zip.lnk/raj-mandal-06</p>
                        <p className="text-slate-500 truncate leading-tight">Redirects to: landingpage.fintech.saas/pricing/rajmandal</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                        <div className="p-2 bg-slate-950 rounded-xl border border-slate-900/60 text-center">
                          <span className="text-slate-500 block">TOTAL CLICKS</span>
                          <span className="text-xs font-bold text-emerald-400">1,242 clicks</span>
                        </div>
                        <div className="p-2 bg-slate-950 rounded-xl border border-slate-900/60 text-center">
                          <span className="text-slate-500 block">DEVICES ALIGNED</span>
                          <span className="text-xs font-bold text-cyan-400">iOS & Android</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#05080e] p-2.5 rounded-xl border border-slate-900">
                      {/* CSS QR Code Frame representation */}
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white p-1 rounded-lg flex-shrink-0 grid grid-cols-4 gap-0.5">
                          {Array.from({ length: 16 }).map((_, i) => (
                            <div key={i} className={`w-full h-full rounded-[1px] ${i % 3 === 0 || i % 4 === 1 ? 'bg-slate-950' : 'bg-white'}`} />
                          ))}
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[8px] font-mono text-slate-500 uppercase block font-bold">QR DEEP ROUTE RESOURCE</span>
                          <p className="text-[10px] text-slate-300">Scan to emulate instant telemetry response payload</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => alert("Redirect simulator triggered successfully! Redirecting via ZipLink endpoint protocols.")}
                      className="w-full py-2 bg-emerald-500 text-[#070b13] hover:bg-emerald-400 font-bold rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                    >
                      Test Redirect Pipeline <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {state.suggestedWidgetType === "analytics" && (
                  <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 text-slate-200">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div>
                        <h4 className="font-bold text-white text-xs">Vector Analytics</h4>
                        <p className="text-[10px] text-slate-500 font-mono">Updates automatically on tap</p>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-950 border border-slate-800/40 p-3 rounded-xl space-y-1">
                        <span className="text-[9px] text-[#94a3b8] block uppercase font-mono tracking-wider font-bold">PAGEVIEWS</span>
                        <div className="font-mono text-base font-bold text-emerald-400">{analyticsViews}</div>
                        <button onClick={() => setAnalyticsViews(analyticsViews + 351)} className="text-[8px] font-semibold text-sky-400 block mt-1 underline">Simulate Pageview</button>
                      </div>
                      <div className="bg-slate-950 border border-slate-800/40 p-3 rounded-xl space-y-1">
                        <span className="text-[9px] text-[#94a3b8] block uppercase font-mono tracking-wider font-bold">CONVERSIONS</span>
                        <div className="font-mono text-base font-bold text-cyan-400">{analyticsConvs}%</div>
                        <button onClick={() => setAnalyticsConvs(parseFloat((analyticsConvs + 0.3).toFixed(1)))} className="text-[8px] font-semibold text-emerald-400 block mt-1 underline">Simulate Signup</button>
                      </div>
                    </div>

                    <div className="bg-slate-950 border border-[#0d1523] p-3 rounded-2xl">
                      <div className="flex justify-between text-[9px] text-slate-500 font-mono pb-1 mb-2 border-b border-slate-900">
                        <span>SUGGESTED PATHWAY</span>
                        <span>SCORE</span>
                      </div>
                      <ul className="space-y-1.5 font-mono text-[10px]">
                        <li className="flex justify-between items-center bg-slate-900/50 p-1 rounded">
                          <span className="text-slate-300">✓ Onboarding grid</span>
                          <span className="text-green-400 font-bold">98/100</span>
                        </li>
                        <li className="flex justify-between items-center bg-slate-900/50 p-1 rounded">
                          <span className="text-slate-300">✓ Touch gestures speed</span>
                          <span className="text-cyan-400 font-bold">4.2ms</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {state.suggestedWidgetType === "ecommerce" && (
                  <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3.5 text-slate-200">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                      <div>
                        <h4 className="font-bold text-white text-xs">Aura Storefront</h4>
                        <p className="text-[9px] text-emerald-400 font-mono">Functional Checkout simulator</p>
                      </div>
                      <div className="bg-slate-950 border border-slate-800 px-2 py-1 rounded-xl text-[10px] flex items-center gap-1.5">
                        <span>Cart:</span>
                        <span className="font-bold text-emerald-400 font-mono">{cartCount}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { id: 1, name: "Vector T-Shirt", price: "$29" },
                        { id: 2, name: "Grid Tech Cap", price: "$18" },
                        { id: 3, name: "SaaS Wire Cup", price: "$15" },
                        { id: 4, name: "Neon Lamp", price: "$45" }
                      ].map(prod => (
                        <div key={prod.id} className="bg-slate-950 border border-[#0e1726]/80 p-2.5 rounded-xl flex flex-col justify-between h-28">
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-bold text-slate-100 block truncate">{prod.name}</span>
                            <span className="font-mono text-[9px] text-emerald-400">{prod.price}</span>
                          </div>
                          <button onClick={() => setCartCount(cartCount + 1)} className="w-full text-center py-1 rounded bg-emerald-500 text-slate-950 text-[10px] font-bold cursor-pointer">
                            Add to Cart
                          </button>
                        </div>
                      ))}
                    </div>

                    <button onClick={() => { if(cartCount > 0) { alert(`Purchase Simulated! checking out ${cartCount} items.`); setCartCount(0); } }} className="w-full py-2.5 text-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-bold cursor-pointer hover:brightness-110">
                      Checkout Process
                    </button>
                  </div>
                )}

                {/* general fallback or custom display */}
                {["portfolio", "chat", "general-app"].includes(state.suggestedWidgetType) && (
                  <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 text-slate-200">
                    <div className="text-center space-y-1">
                      <Sparkles className="w-7 h-7 text-emerald-400 mx-auto animate-spin" style={{ animationDuration: "12s" }} />
                      <h4 className="font-extrabold text-white text-xs">{state.appName} Live Preview</h4>
                      <p className="text-[9px] text-slate-500 leading-relaxed max-w-xs mx-auto">
                        Scaffolded successfully and currently listening on Node port 3000 container runtimes.
                      </p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl space-y-2 border border-slate-800/40 text-center">
                      <span className="text-[10px] font-semibold text-emerald-400 block">Deploy Status: LIVE</span>
                      <p className="text-[9px] text-slate-400">
                        This custom application logic binds dynamically in standard TypeScript environments. 100% responsive for both Android and iOS devices.
                      </p>
                    </div>

                    <button
                      onClick={() => alert(`Subscribed to simulated Beta notifications for ${state.appName}!`)}
                      className="w-full py-2 bg-emerald-400 text-[#070b13] hover:bg-emerald-300 transition-colors text-xs font-semibold rounded-xl flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Trigger Subscribe Node <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* iOS & Android Device Frames mock badge */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-slate-900/90 border border-slate-800/85 px-3 py-1.5 rounded-full text-[9px] tracking-wide font-medium text-slate-400 select-none">
                  <span className="flex items-center gap-1 text-slate-200 font-semibold"><Check className="w-3 h-3 text-emerald-400 stroke-[3]" /> Apple iOS Compatible</span>
                  <span className="text-slate-700">|</span>
                  <span className="flex items-center gap-1 text-slate-200 font-semibold"><Check className="w-3 h-3 text-emerald-400 stroke-[3]" /> Android OS Verified</span>
                </div>
              </div>
            ) : (
              /* System Logs list */
              <div className="absolute inset-0 p-5 font-mono text-[9.5px] leading-relaxed text-slate-400 overflow-y-auto space-y-1.5 bg-[#03060a]">
                {logs.length > 0 ? (
                  logs.map((log, lIdx) => (
                    <div key={lIdx} className="flex gap-2.5 items-start">
                      <span className="text-slate-600 shrink-0 select-none">[{log.timestamp}]</span>
                      <span className={`shrink-0 uppercase tracking-wider font-bold ${
                        log.level === "success" ? "text-emerald-400" :
                        log.level === "warn" ? "text-amber-400" :
                        log.level === "error" ? "text-rose-400" : "text-sky-500"
                      }`}>{log.level}</span>
                      <span className="text-slate-300 break-all">{log.message}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-600 text-center py-12">No console messages logged.</p>
                )}
              </div>
            )}
          </div>

          {/* footer stat */}
          <div className="bg-[#090e1a] px-4 py-2 border-t border-slate-900 text-slate-500 text-[10px] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" /> Sandboxed: Node & Express Engine
            </span>
            <span>Memory: 42.1 MB / 512 MB</span>
          </div>
        </div>

      </div>
    </div>
  );
}

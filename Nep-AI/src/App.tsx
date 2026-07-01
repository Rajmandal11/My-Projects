import React, { useState } from "react";
import { 
  Sparkles, Shield, LogOut, Coins, HelpCircle, Laptop, 
  Terminal, ArrowUp, Compass, Library, MessageSquare, 
  Settings, CheckCircle, RefreshCw, Paperclip, ChevronRight, Cpu 
} from "lucide-react";
import Header from "./components/Header";
import AgentWorkspace from "./components/AgentWorkspace";
import CodeWorkspace from "./components/CodeWorkspace";
import AdminConsole from "./components/AdminConsole";
import PricingGrid from "./components/PricingGrid";
import FAQCollapse from "./components/FAQCollapse";
import TemplateMarket from "./components/TemplateMarket";
import { WorkspaceState, SystemLog, Template } from "./types";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("prompt");
  const [credits, setCredits] = useState<number>(212);
  const [userEmail, setUserEmail] = useState<string>("rajmandal0000006@gmail.com");
  const [activeTier, setActiveTier] = useState<string>("Free");
  
  // Prompt & Workspace states
  const [promptInput, setPromptInput] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("Website");
  const [forging, setForging] = useState<boolean>(false);
  const [workspace, setWorkspace] = useState<WorkspaceState | null>(null);
  
  // Staggered Compilation Logs state
  const [logs, setLogs] = useState<SystemLog[]>([
    { timestamp: new Date().toLocaleTimeString(), level: "info", message: "System sandbox initialized successfully. Connected client payload metrics stable." }
  ]);

  // Handle charging credits
  const handleChargeCredits = (amount: number): boolean => {
    if (credits < amount) return false;
    setCredits(prev => prev - amount);
    return true;
  };

  // Quick Action category capsule buttons
  const capsules = [
    { id: "Website", label: "Website" },
    { id: "Fullstack", label: "Full-stack app" },
    { id: "Document", label: "Document" },
    { id: "Presentation", label: "Presentation" },
    { id: "Analyze", label: "Analyze data" },
    { id: "Read", label: "Read an image" },
    { id: "Assistant", label: "Code assistant" },
    { id: "SQL", label: "SQL query" },
    { id: "Bug", label: "Fix a bug" }
  ];

  // Clickable prompt options from Screenshot 1 "START FROM A PROMPT"
  const promptPrompts = [
    { text: "Landing page for a fintech SaaS with hero, pricing and...", category: "Website" },
    { text: "Notion-style team wiki with workspaces and roles", category: "Fullstack" },
    { text: "12-slide seed pitch deck for a vertical AI SaaS", category: "Presentation" },
    { text: "ATS-friendly resume tailored to a senior frontend role", category: "Assistant" },
    { text: "Booking app for a yoga studio with class schedules and...", category: "Website" },
    { text: "Postgres schema for a multi-tenant CRM with RLS", category: "SQL" }
  ];

  // Call the core Express + Gemini forge service
  const handleForge = async (customPrompt?: string, customCategory?: string) => {
    const targetPrompt = customPrompt || promptInput;
    const targetCategory = customCategory || activeCategory;

    if (!targetPrompt.trim()) return;

    // Deduct 5 credits for forging a new app
    const canCharge = handleChargeCredits(5);
    if (!canCharge) {
      alert("⚠️ Insufficient Wallet Credits: Please visit the ADMIN tab or Upgrade to Premium in the Pricing section to claim more free sandbox credits!");
      return;
    }

    setForging(true);
    setPromptInput("");

    // Push initial status logs
    const initialLog: SystemLog = {
      timestamp: new Date().toLocaleTimeString(),
      level: "info",
      message: `[forge] Initializing new component layout generation for prompt: "${targetPrompt}"`
    };
    setLogs(prev => [initialLog, ...prev]);

    try {
      const response = await fetch("/api/forge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: targetPrompt, category: targetCategory })
      });

      if (!response.ok) throw new Error("Sandbox compiling error.");
      
      const data = await response.json();
      
      // Simulate build metrics latency for UX craft
      setTimeout(() => {
        setWorkspace(data);
        const successLog: SystemLog = {
          timestamp: new Date().toLocaleTimeString(),
          level: "success",
          message: `[forge] Successfully compiled React component. Hosted sandbox active.`
        };
        setLogs(prev => [successLog, ...prev]);
        setForging(false);
        setCurrentTab("workspace");
      }, 1500);

    } catch (err: any) {
      const errorLog: SystemLog = {
        timestamp: new Date().toLocaleTimeString(),
        level: "error",
        message: `[forge] Compiler broke down: ${err.message || "Bypassed execution pipeline."}`
      };
      setLogs(prev => [errorLog, ...prev]);
      setForging(false);
    }
  };

  const handleSelectTemplate = (template: Template) => {
    // Scaffold template prompt instantly
    handleForge(`Modular styled ${template.title}: ${template.description}`, template.category);
  };

  const handleUpgradeTier = (tierName: string) => {
    setActiveTier(tierName);
    setCredits(prev => prev + 10000); // give them massive bonus credits on upgrade!
    const log: SystemLog = {
      timestamp: new Date().toLocaleTimeString(),
      level: "success",
      message: `[system] User successfully upgraded to ${tierName} tier balance (+10,000 bonus credits)`
    };
    setLogs(prev => [log, ...prev]);
  };

  const handleLogout = () => {
    // Reset defaults
    setCredits(212);
    setActiveTier("Free");
    setWorkspace(null);
    setCurrentTab("prompt");
    setLogs([
      { timestamp: new Date().toLocaleTimeString(), level: "info", message: "Environment safely reset. New session established." }
    ]);
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* Shared Header Component */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        credits={credits}
        userEmail={userEmail}
        hasOpenWorkspace={!!workspace}
        onLogout={handleLogout}
      />

      {/* Main tab content views switcher */}
      <main className="flex-1">
        {forging && (
          <div className="fixed inset-0 z-50 bg-[#070b13]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 gap-6 text-center select-none">
            <div className="relative">
              <div className="w-16 h-16 rounded-3xl border-4 border-slate-900 border-t-emerald-500 animate-spin" />
              <Sparkles className="w-6 h-6 text-emerald-400 absolute inset-0 m-auto animate-pulse" />
            </div>
            <div className="space-y-2 max-w-sm">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-widest font-mono flex items-center justify-center gap-1.5">
                <SpinnerIcon className="w-4 h-4 animate-spin text-emerald-400" /> FORGING SYSTEM LAYER
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Assembling dependency trees, mounting standard compilers, and deploying code modules on isolated container gateway clusters.
              </p>
            </div>
          </div>
        )}

        {/* 1. FRONT SCREEN PROMPT TOOL VIEW (Screenshot 1) */}
        {currentTab === "prompt" && (
          <div className="w-full max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20 flex flex-col items-center justify-center gap-12 relative overflow-hidden">
            {/* Dark green-blue background grid glow lines */}
            <div className="absolute inset-0 bg-grid-[#10b981]/[0.015] bg-[size:32px_32px] pointer-events-none select-none" />
            
            {/* Middle glowing element background sphere */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none select-none" />

            <div className="text-center space-y-4">
              {/* Build Pills */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold shadow-[0_0_15px_rgba(16,185,129,0.05)] select-none">
                <Coins className="w-3.5 h-3.5 text-amber-500 animate-bounce" /> {credits} OF 200 FREE BUILDS LEFT
              </div>

              {/* Display Header */}
              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none max-w-3xl mx-auto">
                What do you want to <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">build</span>?
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                Describe your idea. Nep AI picks the right agent, scaffolds the project and opens a live workspace in your browser.
              </p>
            </div>

            {/* Prompt input sandbox Terminal */}
            <div className="w-full max-w-2xl bg-[#0a101c]/90 border border-slate-900 shadow-2xl rounded-3xl p-4 md:p-5 relative space-y-4">
              <div className="relative">
                <textarea
                  value={promptInput}
                  onChange={e => setPromptInput(e.target.value)}
                  placeholder="A landing page for a fintech SaaS with hero, pricing and FAQ..."
                  rows={3}
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none resize-none pb-4 leading-relaxed"
                />
                
                {/* paperclip pills standard indicator */}
                <div className="flex flex-wrap items-center gap-1 text-[9px] text-slate-500 select-none pb-2 font-semibold">
                  <Paperclip className="w-3.5 h-3.5 mr-1" />
                  <span className="hover:text-slate-300 cursor-pointer">PDF</span>
                  <span>•</span>
                  <span className="hover:text-slate-300 cursor-pointer">DOCX</span>
                  <span>•</span>
                  <span className="hover:text-slate-300 cursor-pointer">XLSX</span>
                  <span>•</span>
                  <span className="hover:text-slate-300 cursor-pointer">ZIP</span>
                  <span>•</span>
                  <span className="hover:text-slate-300 cursor-pointer">IMAGES</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-900 flex items-center justify-between gap-4">
                <span className="text-[10px] text-slate-500 font-mono font-medium">Uses 5 credits per compilation</span>
                <button
                  onClick={() => handleForge()}
                  disabled={!promptInput.trim()}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-45 text-[#070b13] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg shadow-emerald-500/10"
                >
                  Nep AI it <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Quick selectors categories */}
            <div className="flex flex-wrap justify-center gap-1.5 max-w-3xl select-none">
              {capsules.map(cap => (
                <button
                  key={cap.id}
                  onClick={() => setActiveCategory(cap.id)}
                  className={`px-3 py-1.5 rounded-xl text-[10.5px] font-semibold tracking-wide border cursor-pointer transition-all ${
                    activeCategory === cap.id
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 font-bold"
                      : "bg-[#090e1a] text-slate-400 border-slate-800 hover:text-white"
                  }`}
                >
                  {cap.label}
                </button>
              ))}
            </div>

            {/* START FROM A PROMPT grid */}
            <div className="w-full pt-8 space-y-4">
              <div className="text-center">
                <span className="text-[9px] font-mono font-black text-slate-500 tracking-widest uppercase">OR START FROM A PROMPT</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {promptPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setPromptInput(p.text);
                      setActiveCategory(p.category);
                      handleForge(p.text, p.category);
                    }}
                    className="p-4 bg-[#0a101d]/60 border border-slate-900 rounded-2xl hover:border-emerald-500/20 text-left hover:bg-[#0c1425] hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="space-y-1 pr-4 min-w-0">
                      <p className="text-xs text-slate-300 font-medium truncate leading-tight group-hover:text-white transition-colors">{p.text}</p>
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider font-semibold">{p.category}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 shrink-0 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>

            {/* templates navigation prompt button links */}
            <div className="flex gap-6 text-[11px] font-semibold text-slate-400 pt-4 font-mono select-none">
              <button onClick={() => setCurrentTab("marketplace")} className="hover:text-emerald-400 transition-colors flex items-center gap-1 group">
                Browse templates <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button onClick={() => setCurrentTab("agents")} className="hover:text-emerald-400 transition-colors flex items-center gap-1 group">
                See all 15 agents <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. AGENTS PANE VIEW (Screenshot 2) */}
        {currentTab === "agents" && (
          <AgentWorkspace
            onSuggestPrompt={(p) => {
              setPromptInput(p);
              setCurrentTab("prompt");
            }}
            onChargeCredits={handleChargeCredits}
            credits={credits}
          />
        )}

        {/* 3. TEMPLATES VIEW (Screenshot 3) */}
        {currentTab === "marketplace" && (
          <TemplateMarket
            onSelectTemplate={handleSelectTemplate}
            activeTier={activeTier}
          />
        )}

        {/* 4. PRICING TIER VIEW (Screenshot 4) */}
        {currentTab === "pricing" && (
          <PricingGrid
            onUpgradeTier={handleUpgradeTier}
            activeTier={activeTier}
          />
        )}

        {/* 5. FAQ EXPLAIN PANEL */}
        {currentTab === "faq" && <FAQCollapse />}

        {/* 6. COMPILATION WORKSPACE PANEL */}
        {currentTab === "workspace" && (
          <CodeWorkspace
            state={workspace}
            onRefresh={() => handleForge(workspace?.appName, workspace?.suggestedWidgetType)}
            logs={logs}
            setLogs={setLogs}
          />
        )}

        {/* 7. ADMIN DASH PANE */}
        {currentTab === "admin" && (
          <AdminConsole
            credits={credits}
            setCredits={setCredits}
            logs={logs}
            setLogs={setLogs}
            userEmail={userEmail}
          />
        )}
      </main>
    </div>
  );
}

// Inline Spinner Icon helper
function SpinnerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
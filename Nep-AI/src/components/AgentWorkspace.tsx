import React, { useState, useEffect, useRef } from "react";
import { 
  Search, Globe, AppWindow, Binary, FileText, Presentation, 
  FileSpreadsheet, TrendingUp, Image, Briefcase, Megaphone, 
  Database, Cpu, Wrench, PenTool, ArrowLeft, Send, Sparkles,
  RefreshCw, Terminal, Activity, ChevronRight, User, Compass
} from "lucide-react";
import { Agent, Message } from "../types";
import { AGENTS_DATA } from "../data";

interface AgentWorkspaceProps {
  onSuggestPrompt: (prompt: string) => void;
  onChargeCredits: (amount: number) => boolean;
  credits: number;
}

export default function AgentWorkspace({
  onSuggestPrompt,
  onChargeCredits,
  credits
}: AgentWorkspaceProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  
  // Agent Chat States
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: "all", label: "All Agents" },
    { id: "coding", label: "Development" },
    { id: "fullstack", label: "Full-Stack" },
    { id: "analytics", label: "Data & SQL" },
    { id: "business", label: "Business & Docs" },
    { id: "marketing", label: "Growth & Copy" }
  ];

  // Helper matching icons
  const getIcon = (name: string, className = "w-5 h-5") => {
    switch (name) {
      case "Globe": return <Globe className={className} />;
      case "AppWindow": return <AppWindow className={className} />;
      case "Binary": return <Binary className={className} />;
      case "FileText": return <FileText className={className} />;
      case "Presentation": return <Presentation className={className} />;
      case "FileSpreadsheet": return <FileSpreadsheet className={className} />;
      case "TrendingUp": return <TrendingUp className={className} />;
      case "Image": return <Image className={className} />;
      case "Briefcase": return <Briefcase className={className} />;
      case "Megaphone": return <Megaphone className={className} />;
      case "Search": return <Search className={className} />;
      case "Database": return <Database className={className} />;
      case "Cpu": return <Cpu className={className} />;
      case "Wrench": return <Wrench className={className} />;
      case "PenTool": return <PenTool className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  const filteredAgents = AGENTS_DATA.filter(agent => {
    const matchesSearch = agent.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || agent.category === selectedCategory || 
                             (selectedCategory === "analytics" && (agent.category === "database" || agent.category === "analytics")) ||
                             (selectedCategory === "coding" && (agent.category === "coding" || agent.category === "vision"));
    return matchesSearch && matchesCategory;
  });

  // Scroll to bottom on message updates
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleOpenAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setMessages([
      {
        role: "assistant",
        content: `Hi there! I am your specialized **${agent.title}** (Agent Core #${agent.code}). ${agent.description} Describe your requirement or trigger our design tools below.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim() || !selectedAgent || isTyping) return;

    // Direct credit charge (1 credit for prompt)
    const canCharge = onChargeCredits(1);
    if (!canCharge) {
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ **Insufficient Credits:** Your current balance is depleted. Please claim free build credits or upgrade in the Pricing tier to continue using specialized agent chains.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      return;
    }

    const userMsg: Message = {
      role: "user",
      content: inputVal,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/agent-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: selectedAgent.id,
          agentName: selectedAgent.title,
          messages: [...messages, userMsg].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) throw new Error("Agent failed to respond.");
      
      const data = await response.json();
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: data.text || "No response received. System active.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ **Session Interrupted:** ${err.message || "Failed to communicate with AI model server. Offline fallback engaged."}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 min-h-[calc(100vh-80px)] flex flex-col gap-6 font-sans">
      {!selectedAgent ? (
        <>
          {/* List Screen Header */}
          <div className="space-y-2">
            <span className="text-[10px] tracking-widest font-black uppercase text-emerald-400 font-mono flex items-center gap-1.5 animate-pulse">
              <Compass className="w-3.5 h-3.5" /> 15 SPECIALIZED AGENTS
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
              Every kind of work, <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">one workspace</span>.
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
              Pick a tool to dive in, or just start chatting — Nep AI routes your request to the right agent automatically.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#0a101d] border border-slate-900 p-3 rounded-2xl">
            {/* Nav Filters */}
            <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide border cursor-pointer transition-all ${
                    selectedCategory === cat.id 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                      : "bg-[#070b13] text-slate-400 border-slate-800 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Styled Search Bar */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-[#070b13] border border-slate-800 text-slate-200 pl-10 pr-16 py-2 rounded-xl text-xs focus:outline-none focus:border-emerald-500"
              />
              <span className="absolute right-3 top-2 text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800/80 px-1.5 py-0.5 rounded">
                {filteredAgents.length} / 15
              </span>
            </div>
          </div>

          {/* Core Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAgents.map(ag => (
              <div
                key={ag.id}
                onClick={() => handleOpenAgent(ag)}
                className="group relative p-6 bg-[#0a101c]/80 border border-slate-900 rounded-3xl hover:border-emerald-800/35 hover:bg-[#0c1324] hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between min-h-[190px] overflow-hidden"
              >
                {/* Visual subtle card background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-cyan-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-[#070b13] p-2 flex items-center justify-center border border-slate-800/60 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 text-emerald-400 transition-all">
                      {getIcon(ag.iconName, "w-5.5 h-5.5 text-emerald-400")}
                    </div>
                    <span className="font-mono text-[10px] tracking-wider text-slate-500 bg-[#070b13] px-2 py-0.5 rounded font-black border border-slate-900">
                      {ag.code}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                      {ag.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {ag.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between text-slate-400 hover:text-emerald-300 text-xs font-semibold">
                  <span className="group-hover:translate-x-1 transition-transform">Open tool →</span>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-600 bg-slate-950 px-1.5 py-0.5 rounded">
                    {ag.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredAgents.length === 0 && (
            <div className="text-center py-16 bg-[#0a101d] border border-slate-900 rounded-3xl space-y-3">
              <p className="text-sm text-slate-400">No specialized agents matched your matching filters.</p>
              <button 
                onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
                className="text-xs text-emerald-400 font-semibold underline"
              >
                Reset active search filters
              </button>
            </div>
          )}

          {/* Footer operational system details */}
          <footer className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <span className="text-[10px] text-emerald-400/80 font-mono font-bold tracking-widest flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" /> ALL SYSTEMS OPERATIONAL • v2.4.0
            </span>
            <div className="flex gap-4 text-[10px] text-slate-500 font-semibold font-mono">
              <span className="hover:text-slate-300 transition-colors cursor-pointer">POLICIES</span>
              <span className="hover:text-slate-300 transition-colors cursor-pointer">CREDENTIALS</span>
              <span>© 2026 NEP AI</span>
            </div>
          </footer>
        </>
      ) : (
        /* Agent Active Live Chat Pane */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-[#0a101d]/60 border border-slate-900 rounded-3xl overflow-hidden min-h-[580px]">
          {/* Main Chat Console (Left 3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-900 min-h-[500px]">
            {/* Header */}
            <div className="p-4 border-b border-slate-900 bg-[#090e1a]/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-950 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 p-2 text-emerald-400 flex items-center justify-center">
                  {getIcon(selectedAgent.iconName, "w-5 h-5")}
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">{selectedAgent.title}</h2>
                  <p className="text-[10px] text-slate-400">Specialized Direct Lane • ID {selectedAgent.code}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {selectedAgent.category}
                </span>
              </div>
            </div>

            {/* Conversation list */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[380px]">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 max-w-[85%] ${
                    m.role === "user" ? "ml-auto flex-row-reverse" : ""
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-xs shrink-0 select-none ${
                    m.role === "user" 
                      ? "bg-slate-900 border-slate-800 text-slate-300"
                      : "bg-emerald-950/40 border-emerald-500/20 text-emerald-400"
                  }`}>
                    {m.role === "user" ? <User className="w-3.5 h-3.5" /> : <Cpu className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <div className={`p-4 rounded-3xl text-xs sm:text-xs leading-relaxed space-y-2 ${
                      m.role === "user"
                        ? "bg-[#111c2f] text-slate-100 rounded-tr-none border border-slate-800/40"
                        : "bg-slate-950/80 text-slate-300 rounded-tl-none border border-[#0c1221]"
                    }`}>
                      {/* Simple custom markdown renderer snippet support */}
                      {m.content.split("\n").map((para, pIdx) => {
                        if (para.startsWith("⚠️")) {
                          return <div key={pIdx} className="bg-rose-500/5 border border-rose-50020 p-2 rounded-xl text-rose-300 text-[11px] font-semibold">{para}</div>;
                        }
                        if (para.startsWith("**") || para.includes("**")) {
                          // Simple bolding substitute
                          const parts = para.split("**");
                          return (
                            <p key={pIdx}>
                              {parts.map((token, tIdx) => tIdx % 2 === 1 ? <strong key={tIdx} className="text-emerald-400 font-bold">{token}</strong> : token)}
                            </p>
                          );
                        }
                        return <p key={pIdx}>{para}</p>;
                      })}
                    </div>
                    <span className={`block text-[9px] font-mono text-slate-500 mt-1 ${m.role === "user" ? "text-right" : ""}`}>
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <div className="bg-slate-950/80 border border-[#0c1221] p-4 rounded-3xl rounded-tl-none flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Controls */}
            <div className="p-4 border-t border-slate-900 bg-[#070b13]/80 space-y-3">
              {/* Prompt Suggestions Pills */}
              <div className="flex gap-2 p-1 overflow-x-auto select-none no-scrollbar">
                <span className="text-[10px] text-slate-500 font-bold self-center whitespace-nowrap mr-1">SUGGESTED:</span>
                <button
                  type="button"
                  onClick={() => setInputVal(selectedAgent.samplePrompt)}
                  className="px-2.5 py-1 text-[10px] bg-slate-950 hover:bg-slate-900 text-slate-300 rounded-lg border border-slate-900 hover:border-slate-800 transition-colors whitespace-nowrap cursor-pointer"
                >
                  {selectedAgent.samplePrompt}
                </button>
                <button
                  type="button"
                  onClick={() => setInputVal(`Analyze this and explain file structures for iOS and Android`)}
                  className="px-2.5 py-1 text-[10px] bg-slate-950 hover:bg-slate-900 text-slate-300 rounded-lg border border-slate-900 hover:border-slate-800 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Validate code structures
                </button>
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Ask ${selectedAgent.title} any requirement... (Uses 1 credit)`}
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-900 text-xs text-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim() || isTyping}
                  className="px-4 py-3 rounded-xl bg-emerald-500 text-[#070b13] hover:bg-emerald-400 font-bold text-xs disabled:opacity-45 disabled:hover:bg-emerald-500 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* In-chat trigger link button */}
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>Nep AI cost: 1 Credit per response. Available: {credits} credits.</span>
                <button
                  type="button"
                  onClick={() => onSuggestPrompt(selectedAgent.samplePrompt)}
                  className="text-emerald-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Use prompt in Core Workspace <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Telemetry Parameters (Right 1 col) */}
          <div className="p-5 space-y-6 bg-[#080d17]/80">
            <div className="space-y-1.5">
              <h4 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono">Agent Specif</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Review specific configurations injected into this neural session pathway.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-900 text-xs">
              <div className="space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-900">
                <span className="text-[9px] text-slate-500 font-mono block font-bold">MODEL ASSUMPTION</span>
                <span className="font-mono text-emerald-400 text-[10px] font-bold">gemini-3.5-flash</span>
              </div>

              <div className="space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-900">
                <span className="text-[9px] text-slate-500 font-mono block font-bold">LATENCY</span>
                <span className="font-mono text-green-400 text-[10px]">~240ms / payload</span>
              </div>

              <div className="space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-900">
                <span className="text-[9px] text-slate-500 font-mono block font-bold">SYSTEM PROMPT LENGTH</span>
                <span className="font-mono text-cyan-400 text-[10px]">350 tokens (Strict)</span>
              </div>

              <div className="space-y-2 bg-slate-950/45 p-3 rounded-xl border border-slate-900">
                <span className="text-[9px] text-slate-500 font-mono block font-bold">CAPABILITIES</span>
                <ul className="space-y-1 text-[10px] text-slate-400">
                  <li className="flex items-center gap-1 text-slate-300">✓ Context awareness</li>
                  <li className="flex items-center gap-1 text-slate-300">✓ Touch optimization</li>
                  <li className="flex items-center gap-1 text-slate-300">✓ Flawless JSX exports</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => {
                onSuggestPrompt(`Please write a robust module with ${selectedAgent.title} targeting Android and iOS devices`);
              }}
              className="w-full text-center py-2 rounded-xl border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 transition-colors text-xs font-semibold cursor-pointer"
            >
              Transfer Agent to IDE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

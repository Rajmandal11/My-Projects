import React, { useState } from "react";
import { 
  Shield, Database, Cpu, Activity, Coins, RefreshCw, 
  Terminal, Sliders, CheckCircle2, AlertTriangle, Play 
} from "lucide-react";
import { SystemLog } from "../types";

interface AdminConsoleProps {
  credits: number;
  setCredits: React.Dispatch<React.SetStateAction<number>>;
  logs: SystemLog[];
  setLogs: React.Dispatch<React.SetStateAction<SystemLog[]>>;
  userEmail: string;
}

export default function AdminConsole({
  credits,
  setCredits,
  logs,
  setLogs,
  userEmail
}: AdminConsoleProps) {
  const [offlineMode, setOfflineMode] = useState(false);
  const [useLegacyModel, setUseLegacyModel] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleAdjustCredits = (amount: number) => {
    setCredits(prev => Math.max(0, prev + amount));
    setToastMsg(`Successfully updated wallet balance by ${amount > 0 ? "+" : ""}${amount} credits.`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    const log: SystemLog = {
      timestamp: new Date().toLocaleTimeString(),
      level: "success",
      message: `[admin] Adjusted user balance directly. Current balance: ${credits + amount} credits.`
    };
    setLogs(prev => [log, ...prev]);
  };

  const handleClearLogs = () => {
    setLogs([]);
    setToastMsg("System sandbox console logs cleared completely.");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const isRootAdmin = userEmail.toLowerCase() === "rajmandal0000006@gmail.com";

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-8 font-sans text-xs">
      {/* Root Admin Custom Banner */}
      {isRootAdmin && (
        <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-cyan-500/10 border border-emerald-500/30 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-2">
              <span className="bg-emerald-400 text-slate-950 font-mono font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(52,211,153,0.4)]">
                👑 ROOT OVERLORD
              </span>
              <h2 className="text-lg font-black text-white">Welcome Back, Raj Mandal</h2>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Your email <span className="font-mono text-emerald-400">{userEmail}</span> is authenticated with master administrative privileges. All bypass protocols are active.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleAdjustCredits(5000)}
              className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black rounded-xl text-[10px] hover:brightness-110 shadow-lg shadow-emerald-500/15 cursor-pointer transition-all"
            >
              ⚡ INSTANT +5000 CREDITS
            </button>
            <button
              onClick={() => {
                setCredits(100000);
                setToastMsg("Master credit balance overridden to 100K.");
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
                setLogs(prev => [{
                  timestamp: new Date().toLocaleTimeString(),
                  level: "success",
                  message: "[system] Root Admin Raj Mandal overridden balance to unlimited (100,000 credits)."
                }, ...prev]);
              }}
              className="px-4 py-2 bg-slate-950 border border-slate-800 text-slate-300 font-bold rounded-xl text-[10px] hover:text-white cursor-pointer transition-colors"
            >
              OVERRIDE TO 100K
            </button>
          </div>
        </div>
      )}

      {/* Admin header */}
      <div className="space-y-1.5 pb-2 border-b border-slate-900">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-400 animate-pulse" />
          <h1 className="text-2xl font-extrabold text-white tracking-tight">AI Studio Administrator Telemetry</h1>
        </div>
        <p className="text-slate-400 text-xs leading-relaxed">
          Manage system-level properties, inject sandbox testing credentials, and simulate rate limit bounds safely.
        </p>
      </div>

      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#091522] border border-emerald-500/25 px-4 py-3 rounded-xl text-slate-200 shadow-2xl flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Stats Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#0a101d] border border-slate-900 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-500 font-semibold uppercase tracking-wider">
            <span>Server Instance</span>
            <Database className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="font-mono text-lg font-bold text-slate-200">Express + Vite Node</div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">● Port 3000 Active</span>
        </div>

        <div className="bg-[#0a101d] border border-slate-900 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-500 font-semibold uppercase tracking-wider">
            <span>Container CPU Load</span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-mono text-lg font-bold text-slate-200">14.2% Alloc</div>
          <span className="text-[10px] text-slate-500">1.4 GHz sandboxed limits</span>
        </div>

        <div className="bg-[#0a101d] border border-slate-900 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-500 font-semibold uppercase tracking-wider">
            <span>Pool Balance Ledger</span>
            <Coins className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-mono text-lg font-bold text-amber-500">{credits} Credits</div>
          <span className="text-[10px] text-slate-400">Dynamically synced on-device</span>
        </div>

        <div className="bg-[#0a101d] border border-slate-900 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-500 font-semibold uppercase tracking-wider">
            <span>Active Handshakes</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="font-mono text-lg font-bold text-slate-200">1 Connected Console</div>
          <span className="text-[10px] text-[#cbd5e1]">{userEmail}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Controls block */}
        <div className="bg-[#0a101d] border border-slate-900 rounded-3xl p-6 space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-900">
            <Sliders className="w-4.5 h-4.5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Manual Core Adjustments</h3>
          </div>

          <div className="space-y-4">
            {/* Credits adjusts */}
            <div className="space-y-2">
              <span className="font-semibold text-slate-300 block">Simulate Wallet Adjustments</span>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Add or decrement mock build and agent dialogue credits. Safe sandbox test loop.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAdjustCredits(50)}
                  className="px-3.5 py-2 hover:bg-emerald-500/10 text-emerald-400 bg-emerald-500/5 hover:border-emerald-500 rounded-xl border border-emerald-500/25 font-bold cursor-pointer"
                >
                  +50 Credits
                </button>
                <button
                  onClick={() => handleAdjustCredits(500)}
                  className="px-3.5 py-2 hover:bg-emerald-500/10 text-emerald-400 bg-emerald-500/5 hover:border-emerald-500 rounded-xl border border-emerald-500/25 font-bold cursor-pointer"
                >
                  +500 Credits (Premium Pack)
                </button>
                <button
                  onClick={() => handleAdjustCredits(-25)}
                  className="px-3 py-2 hover:bg-rose-500/10 text-rose-400 bg-rose-500/5 hover:border-rose-500 rounded-xl border border-rose-500/25 font-bold cursor-pointer"
                >
                  -25 Credits
                </button>
              </div>
            </div>

            {/* Offline Toggles */}
            <div className="space-y-3 pt-4 border-t border-slate-900/60">
              <span className="font-semibold text-slate-300 block">State Configuration Flags</span>
              <div className="space-y-2 pr-4">
                <label className="flex items-center justify-between p-2.5 bg-slate-950 border border-slate-900 rounded-xl cursor-pointer">
                  <div className="space-y-0.5">
                    <span className="text-slate-300 font-bold block">Simulate Offline Mode</span>
                    <span className="text-[10px] text-slate-500">Forces local deterministic fallback scaffolds automatically.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={offlineMode}
                    onChange={(e) => {
                      setOfflineMode(e.target.checked);
                      const logMsg = e.target.checked 
                        ? "[admin] Force-engaged Offline Mode. Gemini APIs bypassed."
                        : "[admin] Re-engaged live Gemini AI models pipelines.";
                      setLogs(prev => [{ timestamp: new Date().toLocaleTimeString(), level: "warn", message: logMsg }, ...prev]);
                    }}
                    className="w-4 h-4 rounded accent-emerald-500"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 bg-slate-950 border border-slate-900 rounded-xl cursor-pointer">
                  <div className="space-y-0.5">
                    <span className="text-slate-300 font-bold block">Legacy API Models compatibility</span>
                    <span className="text-[10px] text-slate-500">Enable backwards standard parser constraints.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={useLegacyModel}
                    onChange={(e) => setUseLegacyModel(e.target.checked)}
                    className="w-4 h-4 rounded accent-emerald-500"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Console Logs lists */}
        <div className="bg-[#0a101d] border border-slate-900 rounded-3xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-900">
              <div className="flex items-center gap-2">
                <Terminal className="w-4.5 h-4.5 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">Live express sandboxed logs</h3>
              </div>
              <button
                onClick={handleClearLogs}
                className="text-[10px] text-slate-400 hover:text-white px-2 py-1 border border-slate-800 rounded bg-slate-950"
              >
                Clear console
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 font-mono text-[10px] text-slate-400 h-64 overflow-y-auto space-y-1.5 leading-relaxed">
              {logs.map((log, index) => (
                <div key={index} className="flex gap-2.5 items-start">
                  <span className="text-slate-600">[{log.timestamp}]</span>
                  <span className={`font-bold ${
                    log.level === "success" ? "text-emerald-400" :
                    log.level === "warn" ? "text-amber-400" :
                    log.level === "error" ? "text-rose-400" : "text-sky-500"
                  }`}>{log.level.toUpperCase()}</span>
                  <span className="text-slate-300">{log.message}</span>
                </div>
              ))}
              {logs.length === 0 && (
                <div className="h-full flex items-center justify-center text-slate-600 gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> No logs available. Trigger actions to write data streams.
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-900/40 p-3 rounded-xl mt-4 flex items-center justify-between">
            <span className="text-slate-500 font-mono text-[9px]">API CLIENT STATUS</span>
            <span className="text-emerald-400 font-mono font-bold text-[9px] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> SECURE HANDSHAKES OK
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

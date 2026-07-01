import React from "react";
import { Sparkles, Shield, LogOut, Coins, Laptop, Menu, X } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  credits: number;
  userEmail: string;
  hasOpenWorkspace: boolean;
  onLogout: () => void;
}

export default function Header({
  currentTab,
  setCurrentTab,
  credits,
  userEmail,
  hasOpenWorkspace,
  onLogout,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: "prompt", label: "Tools" },
    { id: "agents", label: "Agents" },
    { id: "marketplace", label: "Templates" },
    { id: "pricing", label: "Pricing" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#070b13]/85 backdrop-blur-md border-b border-emerald-950/45 px-4 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Brand Logo */}
      <button 
        onClick={() => setCurrentTab("prompt")}
        className="flex items-center gap-2.5 group hover:opacity-90 transition-opacity cursor-pointer text-left"
      >
        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)] rotate-45 group-hover:rotate-90 transition-transform duration-300">
          <Sparkles className="w-4 h-4 text-[#070b13] -rotate-45 group-hover:-rotate-90 transition-transform duration-300" />
        </div>
        <div>
          <span className="font-sans font-bold text-lg tracking-tight text-white block">Nep AI</span>
        </div>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-1 bg-[#0c1220] border border-slate-800/60 p-1 rounded-xl">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setCurrentTab(item.id);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
              currentTab === item.id
                ? "bg-[#111c2f] text-emerald-400 border border-emerald-800/30 font-semibold"
                : "text-slate-400 hover:text-white border border-transparent"
            }`}
          >
            {item.label}
          </button>
        ))}
        {hasOpenWorkspace && (
          <button
            onClick={() => setCurrentTab("workspace")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
              currentTab === "workspace"
                ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                : "bg-emerald-500/5 text-emerald-400/80 hover:text-emerald-300 hover:bg-emerald-500/10 border border-emerald-500/10"
            }`}
          >
            <Laptop className="w-3.5 h-3.5 animate-pulse" /> Workspace
          </button>
        )}
      </nav>

      {/* Stats and User Controls */}
      <div className="hidden sm:flex items-center gap-3">
        {/* Admin Badge */}
        <button
          onClick={() => setCurrentTab("admin")}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer ${
            currentTab === "admin"
              ? "bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.3)] animate-pulse"
              : "border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 bg-emerald-500/5"
          }`}
        >
          <Shield className="w-3 h-3" /> ADMIN
        </button>

        {/* Credits Badge */}
        <div className="flex items-center gap-1.5 bg-[#0a101d] border border-emerald-950/60 px-3 py-1.5 rounded-lg text-xs">
          <Coins className="w-3.5 h-3.5 text-amber-500" />
          <span className="font-mono font-bold text-slate-100">{credits}</span>
          <span className="text-[10px] text-slate-400 font-medium">CREDITS</span>
        </div>

        {/* Dynamic user email address with short cutting and Admin verification badge */}
        <div className="flex items-center gap-1.5 select-none bg-slate-950/80 px-2.5 py-1.5 rounded-xl border border-slate-900">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-300 font-mono" title={userEmail}>
              {userEmail.length > 20 ? userEmail.slice(0, 16) + "..." : userEmail}
            </span>
            {userEmail.toLowerCase() === "rajmandal0000006@gmail.com" && (
              <span className="text-[8px] text-amber-400 font-bold uppercase tracking-widest font-mono flex items-center gap-0.5">
                👑 Root Admin
              </span>
            )}
          </div>
        </div>

        {/* Logout Toggle */}
        <button
          onClick={onLogout}
          className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-950/40 transition-colors"
          title="Sign out / reset state"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile Menu Actions */}
      <div className="flex md:hidden items-center gap-2">
        <button
          onClick={() => setCurrentTab("admin")}
          className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-bold tracking-wider"
        >
          <Shield className="w-2.5 h-2.5" /> ADMIN
        </button>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-slate-300 p-1 rounded hover:bg-[#0c1220]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-[61px] left-0 w-full bg-[#070b13] border-b border-slate-900 shadow-xl flex flex-col p-4 gap-3 md:hidden z-50">
          <div className="flex items-center justify-between pb-2 border-b border-slate-900">
            <div className="flex items-center gap-1 text-amber-500">
              <Coins className="w-4 h-4" />
              <span className="font-mono font-bold text-slate-100">{credits} credits</span>
            </div>
            <span className="text-xs text-slate-400 font-mono truncate max-w-[200px] flex items-center gap-1">
              {userEmail.toLowerCase() === "rajmandal0000006@gmail.com" && "👑 "}{userEmail}
            </span>
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`p-2 rounded-lg text-left text-xs font-semibold ${
                currentTab === item.id
                  ? "bg-slate-900 text-emerald-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
          {hasOpenWorkspace && (
            <button
              onClick={() => {
                setCurrentTab("workspace");
                setMobileMenuOpen(false);
              }}
              className="p-2 gap-2 rounded-lg text-left text-xs font-semibold bg-emerald-500/10 text-emerald-300 flex items-center"
            >
              <Laptop className="w-4 h-4" /> Go to Workspace
            </button>
          )}
          <button
            onClick={() => {
              onLogout();
              setMobileMenuOpen(false);
            }}
            className="p-2 text-rose-400 text-xs font-semibold text-left border-t border-slate-900 mt-2 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      )}
    </header>
  );
}

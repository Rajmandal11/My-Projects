import React, { useState } from "react";
import { Sparkles, ShoppingBag, ArrowRight, Laptop, Library, Star } from "lucide-react";
import { Template } from "../types";
import { TEMPLATES_DATA } from "../data";

interface TemplateMarketProps {
  onSelectTemplate: (template: Template) => void;
  activeTier: string;
}

export default function TemplateMarket({
  onSelectTemplate,
  activeTier
}: TemplateMarketProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Items" },
    { id: "personal", label: "Personal" },
    { id: "application", label: "Application" },
    { id: "storefront", label: "Storefront" },
    { id: "analytics", label: "Analytics" },
    { id: "marketing", label: "Marketing" },
    { id: "content", label: "Content" }
  ];

  const filteredTemplates = TEMPLATES_DATA.filter(temp => {
    return activeCategory === "all" || temp.category === activeCategory;
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-8 font-sans text-xs">
      
      {/* Marketplace Header */}
      <div className="space-y-2">
        <span className="text-[10px] tracking-widest font-black uppercase text-emerald-400 font-mono flex items-center gap-1.5">
          <Library className="w-3.5 h-3.5" /> TEMPLATE MARKETPLACE
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
          Start from <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">something proven</span>.
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
          Production-ready scaffolds you can fork in one click. Customize anything with a prompt in active workspaces.
        </p>
      </div>

      {/* Category Pills Navigation bar */}
      <div className="flex flex-wrap gap-1.5 bg-[#0a101d] border border-slate-900 p-2.5 rounded-2xl max-w-max">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide cursor-pointer transition-all ${
              activeCategory === cat.id 
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                : "text-slate-400 hover:text-white border border-transparent"
            }`}
          >
            {cat.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Templates Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(temp => {
          const isLackingPremium = temp.isPremium && activeTier.toLowerCase() === "free";
          return (
            <div
              key={temp.id}
              className="group p-5 bg-[#0a101d]/60 border border-slate-900 rounded-3xl hover:border-emerald-800/25 hover:bg-[#0c1425]/90 transition-all flex flex-col justify-between h-[280px] relative overflow-hidden"
            >
              {/* Card visual mockup top section representing preview */}
              <div className="space-y-4">
                <div className="h-28 rounded-2xl bg-slate-950 border border-slate-900 overflow-hidden relative flex items-center justify-center p-3 select-none">
                  {/* mockup graphic background lines */}
                  <div className="absolute inset-0 bg-grid-slate-900 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.4))] opacity-25" />
                  
                  {/* Mock browser card header */}
                  <div className="absolute top-2 left-2 flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                  </div>

                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${temp.logoColor || 'from-indigo-500 to-cyan-500'} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform`}>
                    <ShoppingBag className="w-5 h-5 text-slate-950" />
                  </div>

                  {temp.isPremium && (
                    <span className="absolute top-2 right-2 flex items-center gap-0.5 text-[8px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/25 px-1.5 py-0.5 rounded font-mono">
                      <Star className="w-2.5 h-2.5 fill-amber-400" /> Premium
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                      {temp.title}
                    </h3>
                    <div className="flex gap-1">
                      {temp.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[8px] font-mono font-semibold text-slate-500 bg-slate-950/85 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-[10.5px] text-slate-400 line-clamp-2 leading-relaxed">
                    {temp.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (isLackingPremium) {
                      alert("⚠️ Premium Scaffolding Locked: Please upgrade your account billing tier under Pricing to instantiate this Premium template.");
                    } else {
                      onSelectTemplate(temp);
                    }
                  }}
                  className={`w-full py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-all ${
                    isLackingPremium
                      ? "bg-slate-950 text-amber-500 border border-amber-500/10 hover:bg-amber-500/5"
                      : "bg-[#070b13] hover:bg-[#111c2f] text-slate-200 hover:text-emerald-400 border border-slate-900 group-hover:border-emerald-500/20"
                  }`}
                >
                  {isLackingPremium ? "Unlock with Premium plan" : "Fork and Scaffold Template"}
                  {!isLackingPremium && <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

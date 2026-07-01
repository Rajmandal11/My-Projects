import React, { useState } from "react";
import { Check, Info, Coins, ShieldCheck, CreditCard, ChevronDown, CheckCircle, RefreshCw } from "lucide-react";
import { PLANS_DATA } from "../data";

interface PricingGridProps {
  onUpgradeTier: (tierName: string) => void;
  activeTier: string;
}

export default function PricingGrid({
  onUpgradeTier,
  activeTier
}: PricingGridProps) {
  const [isYearly, setIsYearly] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<typeof PLANS_DATA[0] | null>(null);
  
  // Checkout Modal states
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenCheckout = (plan: typeof PLANS_DATA[0]) => {
    if (plan.name.toLowerCase() === "free") {
      onUpgradeTier("Free");
      return;
    }
    setCheckoutPlan(plan);
    setSuccess(false);
    setCardNumber("");
    setCardName("");
    setExpiry("");
    setCvv("");
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardName) return alert("Please specify card variables.");
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onUpgradeTier(checkoutPlan?.name || "Premium");
        setCheckoutPlan(null);
      }, 1500);
    }, 1800);
  };

  const calculatePrice = (basePrice: string) => {
    if (basePrice === "$0") return "$0";
    const num = parseInt(basePrice.replace("$", ""));
    if (isYearly) {
      // 17% discount rounded
      return `$${Math.round(num * 0.83)}`;
    }
    return basePrice;
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-12 font-sans text-xs">
      {/* Pricing Header Title */}
      <div className="text-center space-y-3.5 max-w-xl mx-auto">
        <span className="text-[10px] tracking-widest font-black uppercase text-emerald-400 font-mono">FLEXIBLE BLUEPRINTS</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Free forever. <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">Premium when you scale</span>.
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          No seat fees. No surprise overages. Cancel anytime. Simulated payment checkouts sandbox active.
        </p>

        {/* Dynamic Billing Toggle Switch */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              !isYearly ? "bg-emerald-500/10 text-emerald-400" : "text-slate-400"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
              isYearly ? "bg-emerald-500/10 text-emerald-400" : "text-slate-400"
            }`}
          >
            Yearly <span className="bg-emerald-500 text-slate-950 text-[9px] px-1.5 rounded-full font-bold">-17%</span>
          </button>
        </div>
      </div>

      {/* Packages Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 items-stretch max-w-5xl mx-auto">
        {PLANS_DATA.map((plan) => {
          const isCurrent = activeTier.toLowerCase() === plan.name.toLowerCase();
          return (
            <div
              key={plan.name}
              className={`relative p-8 rounded-3xl flex flex-col justify-between h-full bg-[#0a101d] transition-all overflow-hidden border ${
                plan.popular 
                  ? "border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.15)] bg-[#0b1424]" 
                  : "border-slate-900"
              }`}
            >
              {plan.popular && (
                <span className="absolute top-4 right-4 text-[9px] font-mono font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 animate-pulse">
                  POPULAR
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-white text-lg font-bold">{plan.name}</h3>
                  <p className="text-[11px] text-slate-400 pt-1 min-h-[32px]">{plan.tagline}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white font-mono">{calculatePrice(plan.price)}</span>
                  <span className="text-xs text-slate-500 font-semibold">{isYearly && plan.name !== "Free" ? "/seat/mo (billed yearly)" : plan.period}</span>
                </div>

                <ul className="space-y-3 pt-2 text-[11px]">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex gap-2.5 items-start text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[2.5]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => handleOpenCheckout(plan)}
                  disabled={isCurrent}
                  className={`w-full py-3 rounded-xl font-bold text-xs tracking-wide transition-all cursor-pointer ${
                    isCurrent
                      ? "bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed"
                      : plan.popular
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:brightness-110"
                        : "bg-slate-950 hover:bg-slate-900 text-slate-200 border border-slate-800"
                  }`}
                >
                  {isCurrent ? "Current plan Active" : plan.buttonText}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Plans comparison list */}
      <div className="bg-[#0a101d]/60 border border-slate-900 rounded-3xl p-6 md:p-8 max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-indigo-400" />
          <h3 className="text-sm font-bold text-white">Compare structural metrics</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-[10px] text-slate-400">
            <thead>
              <tr className="border-b border-slate-900 text-slate-500 uppercase font-bold">
                <th className="pb-3 italic">Specs Metrics</th>
                <th className="pb-3 text-center">Free</th>
                <th className="pb-3 text-center">Premium</th>
                <th className="pb-3 text-center">Team</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/60 font-semibold">
              <tr>
                <td className="py-3">Signing Bonuses</td>
                <td className="py-3 text-center text-slate-200">200 credits</td>
                <td className="py-3 text-center text-slate-200">10,000 credits bonus</td>
                <td className="py-3 text-center text-slate-200">100,000 credits pool</td>
              </tr>
              <tr>
                <td className="py-3">Daily Maintenance</td>
                <td className="py-3 text-center text-emerald-400">+100 free credits</td>
                <td className="py-3 text-center text-emerald-400">Unlimited Agents Dialogue</td>
                <td className="py-3 text-center text-emerald-400">Unlimited Dial & Collab</td>
              </tr>
              <tr>
                <td className="py-3">Direct Web Upload limits</td>
                <td className="py-3 text-center text-slate-300">50 MB</td>
                <td className="py-3 text-center text-slate-300">500 MB</td>
                <td className="py-3 text-center text-slate-300">5 GB</td>
              </tr>
              <tr>
                <td className="py-3">Active Workspace parallel builds</td>
                <td className="py-3 text-center">1 active project</td>
                <td className="py-3 text-center">Unlimited</td>
                <td className="py-3 text-center">Unlimited + shared groups</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Checkout Sandboxed Payment Processing Modal */}
      {checkoutPlan && (
        <div className="fixed inset-0 z-50 bg-[#070b13]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0a101d] border border-emerald-900/35 p-6 rounded-3xl shadow-2xl relative space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded">
                  SANDBOX CHECKOUT
                </span>
                <h3 className="text-sm font-black text-white mt-2">Sign-up for Nep AI {checkoutPlan.name}</h3>
              </div>
              <button
                onClick={() => setCheckoutPlan(null)}
                className="text-slate-400 hover:text-white font-mono px-2 py-1 rounded hover:bg-slate-900 text-[10px]"
              >
                Close
              </button>
            </div>

            {!success ? (
              <form onSubmit={handleSimulatePayment} className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 flex justify-between items-center">
                  <div className="space-y-0.5">
                    <span className="text-slate-500 text-[10px] block font-bold">TOTAL AMOUNT</span>
                    <span className="text-base text-emerald-400 font-mono font-bold">
                      {calculatePrice(checkoutPlan.price)} {isYearly ? "/yr" : "/mo"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-amber-500 bg-amber-500/5 border border-amber-500/10 px-2.5 py-1 rounded-xl">
                    <Coins className="w-3.5 h-3.5" /> +10,000 Bonus Credits
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block text-[10px] uppercase">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-2.5 w-4.5 h-4.5 text-slate-500" />
                      <input
                        type="text"
                        placeholder="4111 • 2502 • 9482 • 1042"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        required
                        className="w-full bg-[#070b13] border border-slate-800 rounded-xl py-2.5 pl-11 pr-4 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold block text-[10px] uppercase">Expiry Metric</label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        value={expiry}
                        onChange={e => setExpiry(e.target.value)}
                        required
                        className="w-full bg-[#070b13] border border-slate-800 rounded-xl py-2.5 px-4 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold block text-[10px] uppercase">CVV Block</label>
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={3}
                        value={cvv}
                        onChange={e => setCvv(e.target.value)}
                        required
                        className="w-full bg-[#070b13] border border-slate-800 rounded-xl py-2.5 px-4 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block text-[10px] uppercase">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="e.g. RAJ MANDAL"
                      value={cardName}
                      onChange={e => setCardName(e.target.value)}
                      required
                      className="w-full bg-[#070b13] border border-slate-800 rounded-xl py-2.5 px-4 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 text-center bg-emerald-400 text-[#070b13] hover:bg-emerald-300 transition-colors font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {loading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  {loading ? "Processing..." : `Approve Sandbox Charge of ${calculatePrice(checkoutPlan.price)}`}
                </button>

                <p className="text-[9px] text-slate-500 text-center leading-relaxed">
                  🔐 Safe Secure Environment: Standard mock processor. No actual credit card transactions will occur.
                </p>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <div>
                  <h4 className="text-sm font-extrabold text-white">Payment Processing Approved!</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                    Account core dynamically upgraded to Nep AI **{checkoutPlan.name}**! Upgrading balance to 10,000 premium credits.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

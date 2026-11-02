import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { AccentColor } from '../types';
import { ArrowUpRight, Menu, X, Palette, ChevronDown, Check } from 'lucide-react';

interface NavbarProps {
  accentColor: AccentColor;
  onAccentChange: (color: AccentColor) => void;
  onOpenContact: () => void;
  activeSection: string;
}

interface ThemePreset {
  id: AccentColor;
  name: string;
  tagline: string;
  dotClass: string;
  badgeClass: string;
}

const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'cyan',
    name: 'Arctic Light Blue',
    tagline: 'Electric sky blue stream & crystalline atmosphere',
    dotClass: 'bg-sky-400',
    badgeClass: 'bg-sky-500/10 text-sky-600 border-sky-500/30'
  },
  {
    id: 'emerald',
    name: 'Midnight Emerald',
    tagline: 'Deep obsidian canvas with matrix green glow',
    dotClass: 'bg-emerald-400',
    badgeClass: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
  },
  {
    id: 'violet',
    name: 'Cyber Violet',
    tagline: 'Neural purple spectrum with violet highlights',
    dotClass: 'bg-violet-400',
    badgeClass: 'bg-violet-500/10 text-violet-600 border-violet-500/30'
  },
  {
    id: 'gold',
    name: 'Solar Gold',
    tagline: 'Warm amber glow & golden energy vectors',
    dotClass: 'bg-amber-400',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
  }
];

/** Pill-nav links (reference style): label + the section each one scrolls to. */
const NAV_LINKS: { key: string; label: string; target: string }[] = [
  { key: 'hero', label: 'Home', target: 'hero' },
  { key: 'about', label: 'About', target: 'about-section' },
  { key: 'skills', label: 'Arsenal', target: 'skills-section' },
  { key: 'projects', label: 'Projects', target: 'projects-section' },
  { key: 'achievements', label: 'Awards', target: 'achievements-section' },
  { key: 'github', label: 'GitHub', target: 'github-section' },
  { key: 'timeline', label: 'Timeline', target: 'timeline-section' },
  { key: 'education', label: 'Education', target: 'education-section' },
  { key: 'blog', label: 'Blog', target: 'blog-section' }
];

const GLASS_PILL =
  'bg-white/55 backdrop-blur-xl backdrop-saturate-150 border border-white/80 shadow-[0_10px_36px_-10px_rgba(74,125,212,0.35),inset_0_1px_0_rgba(255,255,255,0.9)]';
const GLASS_PILL_SCROLLED =
  'bg-white/75 backdrop-blur-xl backdrop-saturate-150 border border-white/90 shadow-[0_16px_44px_-12px_rgba(74,125,212,0.45),inset_0_1px_0_rgba(255,255,255,0.95)]';

export const Navbar: React.FC<NavbarProps> = ({
  accentColor,
  onAccentChange,
  onOpenContact,
  activeSection
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [active, setActive] = useState<string>(activeSection || 'hero');
  const [hovered, setHovered] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const pillTransition = reduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 480, damping: 38, mass: 0.9 };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-spy: the white pill follows the section actually on screen.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.target)).filter(
      (el): el is HTMLElement => !!el
    );
    if (sections.length === 0 || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const link = NAV_LINKS.find((l) => l.target === entry.target.id);
            if (link) setActive(link.key);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentPreset = THEME_PRESETS.find((p) => p.id === accentColor) || THEME_PRESETS[0];

  const scrollTo = (target: string, key: string) => {
    setActive(key);
    setMobileMenuOpen(false);
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  };

  const pillSurface = scrolled ? GLASS_PILL_SCROLLED : GLASS_PILL;

  return (
    <motion.header
      id="main-header"
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="fixed top-0 inset-x-0 z-50 pointer-events-none"
    >
      <div className="px-3 sm:px-5 pt-3 sm:pt-4 flex items-start justify-between gap-3 max-w-[1440px] mx-auto">
        {/* Brand — overlapping-circles mark, like the reference logo */}
        <a
          href="#hero"
          id="brand-logo-link"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('hero', 'hero');
          }}
          className="pointer-events-auto flex items-center gap-2.5 group shrink-0 py-1.5 pl-1 pr-2"
        >
          <span className="relative w-8 h-6 block" aria-hidden="true">
            <span className="absolute left-0 top-0.5 w-5 h-5 rounded-full border-[2.5px] border-sky-500/80 bg-white/40 transition-transform duration-500 group-hover:-translate-x-0.5" />
            <span className="absolute left-3 top-0.5 w-5 h-5 rounded-full bg-sky-400/50 backdrop-blur-sm transition-transform duration-500 group-hover:translate-x-0.5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-sans font-extrabold tracking-tight text-slate-900 text-[17px]">
              RAJ MANDAL<span className="text-sky-600">.AI</span>
            </span>
            <span className="text-[9px] tracking-[0.22em] text-slate-500 uppercase mt-1 font-medium">
              AI &amp; ML Engineer
            </span>
          </span>
        </a>

        {/* Center floating pill nav (xl and up) */}
        <nav
          id="desktop-nav-menu"
          aria-label="Primary"
          onMouseLeave={() => setHovered(null)}
          className={`pointer-events-auto hidden xl:flex items-center gap-0.5 p-1.5 rounded-full transition-all duration-500 ${pillSurface}`}
        >
          {NAV_LINKS.map((link) => {
            const isActive = active === link.key;
            const isHovered = hovered === link.key;
            return (
              <button
                key={link.key}
                onClick={() => scrollTo(link.target, link.key)}
                onMouseEnter={() => setHovered(link.key)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative px-3.5 py-2 rounded-full text-[13.5px] font-sans transition-colors duration-300 ${
                  isActive ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-800 font-medium'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={pillTransition}
                    className="absolute inset-0 rounded-full bg-white shadow-[0_6px_20px_-6px_rgba(74,125,212,0.45),inset_0_1px_0_rgba(255,255,255,1)] border border-white"
                  />
                )}
                {!isActive && isHovered && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    transition={pillTransition}
                    className="absolute inset-0 rounded-full bg-white/55 border border-white/60"
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="pointer-events-auto hidden sm:flex items-center gap-2.5 shrink-0">
          {/* Theme presets — glass pill */}
          <div className="relative" ref={dropdownRef}>
            <button
              id="theme-presets-dropdown-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-2.5 pl-3.5 pr-3 py-2.5 rounded-full transition-all duration-500 font-sans text-[13px] text-slate-600 hover:text-slate-900 ${pillSurface}`}
              title="Select Color Scheme & Theme Preset"
            >
              <Palette className="w-4 h-4 text-sky-600" />
              <span className="text-[10px] uppercase text-slate-400 tracking-wider hidden 2xl:inline font-semibold">Theme</span>
              <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                <span className={`w-2.5 h-2.5 rounded-full ${currentPreset.dotClass} shadow-sm`} />
                <span className="hidden md:inline">{currentPreset.name}</span>
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: reduceMotion ? 0 : 0.18, ease: 'easeOut' }}
                  className="absolute right-0 mt-2.5 w-72 bg-white/85 backdrop-blur-2xl border border-white/90 rounded-3xl p-2 shadow-[0_24px_60px_-16px_rgba(74,125,212,0.4)] z-50 font-sans text-sm origin-top-right"
                >
                  <div className="px-3 py-2 border-b border-slate-200/70 mb-1 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-sky-600 font-bold">Theme Presets</span>
                    <span className="text-[9px] text-slate-400">CSS Variables Sync</span>
                  </div>
                  <div className="space-y-1">
                    {THEME_PRESETS.map((preset) => {
                      const isSelected = accentColor === preset.id;
                      return (
                        <button
                          key={preset.id}
                          id={`preset-option-${preset.id}`}
                          onClick={() => {
                            onAccentChange(preset.id);
                            setDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-2xl transition-all flex items-start gap-3 group ${
                            isSelected
                              ? 'bg-sky-50 border border-sky-300/60 text-slate-900'
                              : 'border border-transparent hover:bg-white text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          <span className="mt-0.5">
                            <span className={`w-3.5 h-3.5 rounded-full block ${preset.dotClass} shadow-md group-hover:scale-110 transition-transform`} />
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="flex items-center justify-between">
                              <span className="font-bold text-[13px]">{preset.name}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-sky-600" />}
                            </span>
                            <span className="block text-[11px] text-slate-500 leading-tight mt-0.5 line-clamp-1">
                              {preset.tagline}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hire Me — white pill like the reference's Resources button */}
          <motion.button
            id="navbar-connect-btn"
            onClick={onOpenContact}
            whileHover={reduceMotion ? undefined : { y: -1 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="group inline-flex items-center gap-2 pl-4 pr-3.5 py-2.5 rounded-full bg-white/90 backdrop-blur-xl border border-white shadow-[0_10px_30px_-8px_rgba(74,125,212,0.4)] text-slate-800 text-[13px] font-sans font-semibold hover:text-slate-950 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Hire Me</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>

        {/* Mobile toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          className={`pointer-events-auto xl:hidden p-2.5 rounded-full text-slate-600 hover:text-slate-900 transition-all duration-500 ${pillSurface}`}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu — animated glass sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto xl:hidden mx-3 overflow-hidden"
          >
            <div className="bg-white/80 backdrop-blur-2xl border border-white/90 rounded-3xl shadow-[0_24px_60px_-16px_rgba(74,125,212,0.4)] px-4 py-4 flex flex-col gap-0.5 font-sans text-[15px] text-slate-600">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.key}
                  onClick={() => scrollTo(link.target, link.key)}
                  className={`text-left px-3 py-2.5 rounded-2xl transition-colors ${
                    active === link.key ? 'bg-white text-slate-900 font-semibold shadow-sm' : 'hover:bg-white/70 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button onClick={() => { setMobileMenuOpen(false); onOpenContact(); }} className="text-left px-3 py-2.5 rounded-2xl hover:bg-white/70 hover:text-slate-900 transition-colors">
                Contact
              </button>

              <div className="pt-3 mt-2 border-t border-slate-200/70 flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold px-3">Theme Presets</span>
                <div className="grid grid-cols-2 gap-2">
                  {THEME_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        onAccentChange(preset.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`p-2.5 rounded-2xl border text-left text-[13px] font-sans font-medium flex items-center gap-2 ${
                        accentColor === preset.id
                          ? 'bg-sky-50 border-sky-300/70 text-slate-900'
                          : 'bg-white/60 border-white/80 text-slate-500'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${preset.dotClass}`} />
                      <span className="truncate">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full mt-3 py-3 rounded-2xl bg-slate-900 text-white font-semibold text-[13px] uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
              >
                <span>Let&apos;s Talk &amp; Hire Me</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

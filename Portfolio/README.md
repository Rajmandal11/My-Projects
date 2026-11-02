# Raj Mandal — AI & ML Engineer Portfolio

React 19 + TypeScript + Vite + Tailwind CSS v4. Aura-blue light edition.

**Background (v3):** the page background is the silky periwinkle wash from Raj's
reference image — colours sampled directly from it (#e7f0fd, #ccdff1, #9ebce0,
#bfd1ed, #c2d6f0) layered as soft radial washes over a #eef5fe base, fixed so
the whole page shares one continuous gradient. Sections are transparent, cards
are frosted glass, and the 3D canvas sits at 30% as a faint ambience.

## Run locally

**Prerequisites:** Node.js 18+

1. Install dependencies: `npm install`
2. (Optional) Set `GEMINI_API_KEY` in `.env.local` — see `.env.example`
3. Dev server: `npm run dev` (port 3000)
4. Production build: `npm run build` · Type-check: `npm run lint`

## What changed in this edition (white theme + quality pass)

**Theme**
- Entire page background is now **white**. Every section, card, modal, drawer and
  form was converted from the near-black palette to a light design system:
  white surfaces, slate-50/100 panels, slate-900 text, soft shadows, and
  accent colours darkened one step (sky/emerald/violet/gold 600) so they stay
  readable on white. Only code/terminal blocks stay intentionally dark.
- The 3D WebGL background was re-lit for white (white fog, softer 45% presence)
  and is now lazy-loaded — the main JS bundle dropped from ~885 KB to ~359 KB.

**Image issues fixed (the black/empty boxes in the screenshots)**
- No project had a cover image: the first project rendered an empty black box
  and the rest showed a lone emoji. All 6 projects now have real cover images
  (3 generated for Plant Disease, Face Recognition and Sentiment NLP; the
  existing dashboard/HMI/3D artwork assigned to Churn, Object Detection and
  Neural Weave) in both the grid and the Interactive Lab.
- Interactive Lab stage rebuilt: the tabs and chart no longer sit on top of the
  picture under a black gradient. The image is clean, the project title sits in
  a chip on the image (it was clipped alt-text before), the tabs are a proper
  toolbar below it, and the chart has value labels, a baseline and animated bars.
- Case-study drawer now shows the project cover image at the top.

**Bugs fixed**
- `portfolioData.ts`: an unquoted project URL (syntax-breaking), a project id
  with a space (`Object Detection` → broken preview URL), certificate year
  `205` → `2025`, a duplicate achievement id (React key collision), Face-Z
  pointing at a non-URL with DQN deliverables copy-pasted from another project.
- Projects 4–6 had no `designTokens`/`prototypeState`, so the Interactive Lab
  broke when they were selected. All projects now have both.
- The case-study `[ESC]` button did nothing — Escape and backdrop-click now
  really close it, and body scroll locks while it is open.
- The admin gear button overlapped the "3D Canvas" pill at bottom-left; the
  floating controls are now a clean stacked dock (gear above the 3D pill,
  music stays bottom-right).
- A dynamic Tailwind class in the projects grid (`group-hover:${...}`) could
  never compile — card titles now highlight via the accent CSS variable.
- Contact inputs: proper white fields, slate borders, visible placeholders and
  a focus ring (they were dark-on-dark before).

**Animation & polish**
- Scroll-reveal on every section (IntersectionObserver, `data-reveal`) with a
  soft expo ease; content is never hidden if JS/IO is unavailable.
- GPU-friendly hover lifts, image zooms, animated chart bars, smooth scrolling
  with scroll-margin for the fixed navbar, light scrollbar, visible focus
  rings, and full `prefers-reduced-motion` support.

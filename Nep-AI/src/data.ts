import { Agent, Template } from "./types";

export const AGENTS_DATA: Agent[] = [
  {
    id: "1",
    code: "01",
    title: "AI Website Builder",
    description: "Production-grade websites from a single prompt. Optimized typography and custom components.",
    category: "frontend",
    iconName: "Globe",
    samplePrompt: "Build a single-page sleek dashboard with custom analytics widgets"
  },
  {
    id: "2",
    code: "02",
    title: "AI App Generator",
    description: "Full-stack apps with auth, database models, and cloud-ready deploy scaffolds.",
    category: "fullstack",
    iconName: "AppWindow",
    samplePrompt: "Scaffold a booking platform for a personal training studio with calendar syncing"
  },
  {
    id: "3",
    code: "03",
    title: "AI Code Assistant",
    description: "Pair-programmer for any codebase, any language. Solves complex algorithms and modular refactoring.",
    category: "coding",
    iconName: "Binary",
    samplePrompt: "Write a high-performance debounced search React custom hook"
  },
  {
    id: "4",
    code: "04",
    title: "AI Document Generator",
    description: "Polished Word, PDF, and high-fidelity Markdown document compiling from standard prompts.",
    category: "documents",
    iconName: "FileText",
    samplePrompt: "Create a technical project requirements specification document for a fintech SaaS"
  },
  {
    id: "5",
    code: "05",
    title: "AI Presentation Generator",
    description: "Investor-grade slide decks, high-fidelity layouts, and customizable slide flows in minutes.",
    category: "slides",
    iconName: "Presentation",
    samplePrompt: "Design a 12-slide seed pitch deck for a vertical healthcare AI platform"
  },
  {
    id: "6",
    code: "06",
    title: "AI Resume Builder",
    description: "ATS-friendly resumes custom-tuned to pass machine scoring for top technology roles.",
    category: "business",
    iconName: "FileSpreadsheet",
    samplePrompt: "Tune my experience as a Staff React Engineer to target premium frontend architecture roles"
  },
  {
    id: "7",
    code: "07",
    title: "AI Data Analyzer",
    description: "Upload data, extract statistics, and instantly get interactive, responsive D3/Recharts data plots.",
    category: "analytics",
    iconName: "TrendingUp",
    samplePrompt: "Analyze this raw banking CSV logs and generate dynamic category spending graphs"
  },
  {
    id: "8",
    code: "08",
    title: "AI Image Analyzer",
    description: "Read, describe, extract details, and translate elements from any uploaded bitmap or vector asset.",
    category: "vision",
    iconName: "Image",
    samplePrompt: "Inspect this dashboard wireframe image and plan the corresponding React grid layout code"
  },
  {
    id: "9",
    code: "09",
    title: "AI Business Plan Generator",
    description: "Bank-ready detailed business plans with complete target market metrics and multi-year financials.",
    category: "business",
    iconName: "Briefcase",
    samplePrompt: "Generate a complete business model plan for a micro-SaaS content translation tool"
  },
  {
    id: "10",
    code: "10",
    title: "AI Marketing Assistant",
    description: "Sleek ad campaigns, optimized SEO copy, and viral creative briefs matching strict brand tones.",
    category: "marketing",
    iconName: "Megaphone",
    samplePrompt: "Draft a product launch sequence of tweets and newsletter alerts for our beta"
  },
  {
    id: "11",
    code: "11",
    title: "AI Research Assistant",
    description: "Source-cited dynamic research, academic synthesis, and deep content verification fast.",
    category: "academic",
    iconName: "Search",
    samplePrompt: "Compile the latest trends in server-side TypeScript execution speeds across runtimes"
  },
  {
    id: "12",
    code: "12",
    title: "AI SQL Generator",
    description: "Convert colloquial English requirements into production-ready raw PostgreSQL, MySQL, and Spanner statements.",
    category: "database",
    iconName: "Database",
    samplePrompt: "Create a user table schema with strict row-level security policies based on tenant_id"
  },
  {
    id: "13",
    code: "13",
    title: "AI API Builder",
    description: "REST and GraphQL endpoint structures compiled instantly with auto-generated documentation.",
    category: "fullstack",
    iconName: "Cpu",
    samplePrompt: "Design an Express router with endpoints to manage personal notes including authentication guards"
  },
  {
    id: "14",
    code: "14",
    title: "AI Bug Fixer",
    description: "Paste complex runtime stack traces and console errors. Diagnose causes and get instant patch code.",
    category: "coding",
    iconName: "Wrench",
    samplePrompt: "Fix a cannot-read-property-of-undefined error in a mapped React children array"
  },
  {
    id: "15",
    code: "15",
    title: "AI Content Writer",
    description: "Long-form editorial essays, technical deep-dives, and blog articles written in a human tone.",
    category: "marketing",
    iconName: "PenTool",
    samplePrompt: "Write a 1200-word article on why modular folder layouts prevent build token exhaustions"
  }
];

export const TEMPLATES_DATA: Template[] = [
  {
    id: "t1",
    title: "Portfolio",
    description: "A minimal portfolio for designers and engineers built in elegant high-contrast dark style.",
    category: "personal",
    tags: ["React", "Tailwind", "Motion"],
    logoColor: "from-purple-500 to-indigo-500",
    suggestedWidgetType: "portfolio"
  },
  {
    id: "t2",
    title: "SaaS Starter",
    description: "Comprehensive SaaS scaffolding featuring secure routing, subscription plans, and billing configurations.",
    category: "application",
    tags: ["React", "Express", "Postgres"],
    isPremium: true,
    logoColor: "from-emerald-500 to-cyan-500",
    suggestedWidgetType: "portfolio"
  },
  {
    id: "t3",
    title: "E-commerce",
    description: "Headless storefront designed for rapid visual interaction, shopping lists and Stripe integration mockups.",
    category: "storefront",
    tags: ["React", "Tailwind", "Stripe"],
    isPremium: true,
    logoColor: "from-amber-500 to-orange-500",
    suggestedWidgetType: "ecommerce"
  },
  {
    id: "t4",
    title: "Dashboard",
    description: "Fully interactive system analytics dashboard representing real-time chart layers and grid customizer.",
    category: "analytics",
    tags: ["React", "Recharts", "D3"],
    logoColor: "from-teal-500 to-emerald-500",
    suggestedWidgetType: "analytics"
  },
  {
    id: "t5",
    title: "AI Chat App",
    description: "Seamless ChatGPT-style message interface complete with streaming simulator and customizable conversation agents.",
    category: "application",
    tags: ["React", "Gemini", "AI SDK"],
    isPremium: true,
    logoColor: "from-blue-500 to-pink-500",
    suggestedWidgetType: "chat"
  },
  {
    id: "t6",
    title: "AI CRM",
    description: "A comprehensive contact manager with AI insights, automated prioritization, and deal status pipelines.",
    category: "application",
    tags: ["React", "Postgres", "Tailwind"],
    isPremium: true,
    logoColor: "from-cyan-500 to-indigo-500",
    suggestedWidgetType: "todo"
  },
  {
    id: "t7",
    title: "Landing Page",
    description: "A conversion-optimized, highly-responsive landing design built with modern layout rhythm.",
    category: "marketing",
    tags: ["React", "Tailwind", "Vite"],
    logoColor: "from-rose-500 to-pink-500",
    suggestedWidgetType: "portfolio"
  },
  {
    id: "t8",
    title: "Blog",
    description: "Typography-led content engine optimized for Markdown rendering, reading timers, and tag filters.",
    category: "content",
    tags: ["React", "Tailwind", "MDX"],
    logoColor: "from-indigo-600 to-blue-500",
    suggestedWidgetType: "portfolio"
  },
  {
    id: "t9",
    title: "Agency",
    description: "Stately service presentation interface configured to showcase client grids, case files, and quotes.",
    category: "marketing",
    tags: ["React", "Tailwind", "Motion"],
    logoColor: "from-violet-500 to-purple-600",
    suggestedWidgetType: "portfolio"
  }
];

export const PLANS_DATA = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    tagline: "For hobbyists exploring the engine.",
    features: [
      "200 credits on day one",
      "100 free credits daily",
      "50 MB per upload • 500 MB storage",
      "Community templates access",
      "Single project deployment limit",
      "Community support tier"
    ],
    buttonText: "Start free",
    popular: false,
    color: "slate"
  },
  {
    name: "Premium",
    price: "$8",
    period: "/month",
    tagline: "Unlimited potential for professionals.",
    features: [
      "Unlimited AI chats simulator",
      "500 MB per upload • 10 GB storage",
      "Priority AI processing loops",
      "All Premium templates included",
      "Faster deploys to Vercel, AWS, Cloudflare",
      "Version control & automatic project backup",
      "24/7 dedicated email support"
    ],
    buttonText: "Upgrade to Premium",
    popular: true,
    color: "emerald"
  },
  {
    name: "Team",
    price: "$24",
    period: "/seat/mo",
    tagline: "For teams shipping software together.",
    features: [
      "Everything included in Premium",
      "Team workspaces & administrative roles",
      "Shared project folders & shared key secret",
      "Centralized pooled credit billing",
      "SAML SSO & secure enterprise directory",
      "Dedicated account engineer priority support"
    ],
    buttonText: "Talk to sales",
    popular: false,
    color: "slate"
  }
];

export const FAQS_DATA = [
  {
    q: "How does the Nep AI workspace work?",
    a: "Nep AI compiles and executes code inside sandboxed server containers running Node.js and Lite-Vite layers. Standard requests analyze structures, map assets, and serve a secure live preview directly inside standard client browser frames."
  },
  {
    q: "What types of files can I upload to prompt?",
    a: "We support PDF documents, DOCX wireframes, XLSX database sheets, ZIP project roots, and PNG/JPEG visual designs. The AI processes these as active multi-part contexts to generate corresponding full layouts."
  },
  {
    q: "Can I connect custom databases and deployment hosts?",
    a: "Yes! Nep AI supports deployment integration for Vercel, Cloud Run, Cloud SQL, and AWS clusters. Under Premium and Team structures, these can be hooked securely through environmental settings."
  },
  {
    q: "How are my daily credits allocated?",
    a: "Free tiers receive 200 credits on sign-up and 100 free credits refreshed every 24 hours. Forging new workspaces utilizes 5 credits, while conversing with specialized agents uses 1 credit per message."
  }
];

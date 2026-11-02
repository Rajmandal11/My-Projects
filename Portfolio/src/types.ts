export type AccentColor = 'emerald' | 'cyan' | 'violet' | 'gold';

export type ViewMode = 'preview' | 'tilt3d' | 'wireframe' | 'tokens';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'NLP' | 'Vision' | 'ML/Data' | '3D & Motion' | 'Design Systems';
  tagline: string;
  year: string;
  client: string;
  role: string;
  image?: string;
  emoji: string;
  color: string;
  status: 'running' | 'ready' | 'offline' | 'completed';
  summary: string;
  challenge: string;
  solution: string;
  tech: string[];
  url: string;
  github: string;
  localhost?: string;
  impactMetrics: { label: string; value: string }[];
  deliverables: string[];
  designTokens?: {
    primaryColor: string;
    surfaceColor: string;
    typography: string;
    gridUnit: string;
    radius: string;
  };
  prototypeState?: {
    activeTab: string;
    metricValue: string;
    graphData: number[];
  };
}

export interface Achievement {
  id: string;
  icon: string;
  year: string;
  title: string;
  org: string;
  badge: string;
  image?: string;
  desc?: string;
}

export interface ExperienceItem {
  id: string;
  date: string;
  role: string;
  company: string;
  desc: string;
  tags?: string[];
}

export interface Testimonial {
  id: string;
  text: string;
  name: string;
  role: string;
  avatar: string;
  stars: number;
}

export interface BlogArticle {
  id: string;
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  emoji: string;
  url?: string;
}

export interface PressArticle {
  id: string;
  publisher: string;
  date: string;
  title: string;
  snippet: string;
  url: string;
}

export interface Pillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  tags: string[];
}

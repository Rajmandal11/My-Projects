export interface Agent {
  id: string;
  code: string;
  title: string;
  description: string;
  category: string;
  iconName: string;
  samplePrompt: string;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  category: "all" | "personal" | "application" | "storefront" | "analytics" | "marketing" | "content";
  tags: string[];
  isPremium?: boolean;
  codeSnippet?: string;
  logoColor?: string;
  suggestedWidgetType?: string;
}

export interface GeneratedFile {
  name: string;
  language: string;
  code: string;
}

export interface WorkspaceState {
  appName: string;
  description: string;
  suggestedWidgetType: string;
  files: GeneratedFile[];
  widgetConfig?: any;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface SystemLog {
  timestamp: string;
  level: "info" | "success" | "warn" | "error";
  message: string;
}

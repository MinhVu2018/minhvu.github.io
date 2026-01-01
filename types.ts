export enum TechStack {
  React = 'React',
  ReactNative = 'React Native',
  Swift = 'Swift',
  Kotlin = 'Kotlin',
  Flutter = 'Flutter',
  TypeScript = 'TypeScript',
  Python = 'Python',
  TensorFlow = 'TensorFlow',
  PyTorch = 'PyTorch',
  AWS = 'AWS',
  Docker = 'Docker',
  SQL = 'SQL',
  NodeJS = 'Node.js',
  Tailwind = 'Tailwind CSS',
  Gemini = 'Gemini API',
  ARKit = 'ARKit',
  Firebase = 'Firebase'
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: TechStack[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
  category: 'Data Science' | 'Mobile Engineering' | 'Hybrid';
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string; // Markdown supported
  date: string;
  readTime: string;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}

export interface SkillMetric {
  subject: string;
  A: number; // Proficiency level (0-100)
  fullMark: number;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  imageUrl?: string;
  icon?: string;
}
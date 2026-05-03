// Shared TypeScript types for the entire frontend

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  createdAt: string;
}

export interface Problem {
  id: string;
  title: string;
  number: number;
  difficulty: Difficulty;
  chapterId: string;
  youtubeUrl?: string;
  leetcodeUrl?: string;
  articleUrl?: string;
  order: number;
  completed: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  problems: Problem[];
  totalProblems: number;
  completedProblems: number;
}

export interface Stats {
  totalProblems: number;
  completedProblems: number;
  easyTotal: number;
  easyCompleted: number;
  mediumTotal: number;
  mediumCompleted: number;
  hardTotal: number;
  hardCompleted: number;
  percentage: number;
}

export interface AuthPayload {
  user: User;
  message: string;
}

export interface ToggleProgressPayload {
  problemId: string;
  completed: boolean;
}

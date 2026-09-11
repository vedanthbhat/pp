export type ToolId = 
  | 'blade'
  | 'scissors'
  | 'screwdriver'
  | 'awl'
  | 'bottle-opener'
  | 'small-tool'
  | 'key-ring';

export type ToolMode = 
  | 'make'
  | 'create'
  | 'build'
  | 'investigate'
  | 'venture'
  | 'live'
  | 'me';

export interface KnifeToolConfig {
  id: ToolId;
  mode: ToolMode;
  name: string;
  handwrittenLabel: string;
  shortAction: string;
  pivot: { x: number; y: number };
  closedAngle: number;
  openAngle: number;
  hoverLift: number;
  side: 'top' | 'bottom';
  description: string;
  figNum: string;
}

export interface Artifact {
  id: string;
  title: string;
  type: 'screenshot' | 'photo' | 'diagram' | 'slide' | 'document' | 'metric';
  caption: string;
  annotation?: string;
  annotationPosition?: 'top' | 'bottom' | 'left' | 'right';
  badge?: string;
  imageUrl?: string;
  mockType?: 'sqi-home' | 'sqi-methodology' | 'sqi-compare' | 'sqi-rankings' | 'sqi-extension' | 'speculate-eval' | 'speculate-compare' | 'tonerscart-home' | 'tonerscart-procurement' | 'tonerscart-catalog' | 'lanky-home' | 'lanky-shop' | 'nbfc-make-flow' | 'nbfc-deck' | 'photo-formal' | 'photo-presentation' | 'photo-mentorship' | 'photo-music' | 'photo-theatre' | 'photo-theatre-joker' | 'photo-interact' | 'photo-fest';
  details?: Record<string, string | number | boolean>;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  mode: ToolMode;
  year: string;
  type: string;
  tagline: string;
  question: string;
  problem: string;
  idea: string;
  build: string;
  evidenceSummary: string;
  outcome: string;
  whatFailed?: string;
  realization: string;
  roleExplanation?: string;
  artifacts: Artifact[];
  tags: string[];
}

export interface ResearchTopic {
  id: string;
  title: string;
  year: string;
  headline: string;
  deckSummary: string;
  stages?: string[];
  findings: string[];
  honestWeakness: string;
  lesson: string;
  artifacts?: Artifact[];
}

export interface LifeExperience {
  id: string;
  title: string;
  role: string;
  period: string;
  organization: string;
  highlights: string[];
  anecdote: string;
  artifacts: Artifact[];
  fig: string;
}

export interface SkillCategory {
  category: 'Business & Strategy' | 'Technical & Analytical';
  description: string;
  items: string[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  location: string;
  details?: string;
}

export interface CertificationEntry {
  title: string;
  issuer: string;
  year?: string;
  note?: string;
}

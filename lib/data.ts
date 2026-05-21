export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string[];
}

export interface School {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

import type { AppIconKey } from "@/components/icons";

export interface App {
  id: string;
  name: string;
  description: string;
  /** Optional longer write-up shown on detailed portfolio cards. */
  longDescription?: string;
  tags: string[];
  /** Tech stack chips shown on the landing portfolio cards. */
  stack?: string[];
  icon: AppIconKey;
  liveUrl: string;
  sourceUrl?: string;
  color: string;
  badge?: "NEW" | "FREE" | "HOT";
  rating?: number; // 0-5
  /** Short status note, e.g. "Live · 200+ users", "In private beta". */
  status?: string;
  /** Bullet highlights of impact / what I built. */
  highlights?: string[];
}

/**
 * @deprecated The diogonet page now reads from `lib/linkedin.ts` /
 * `data/linkedin.json` (synced weekly from LinkedIn). This export and the
 * `experience` / `education` / `skillCategories` exports below are kept only
 * for places that haven't migrated yet. Prefer `getLinkedInProfile()`.
 */
export const profile = {
  name: "Diogo Baptista",
  headline: "Product & Engineering",
  bio: "I build products people love. Passionate about the intersection of technology and human experience — from crafting intuitive apps to writing about ideas that matter.",
  email: "diogobap@icloud.com",
};

export const social = {
  linkedin: "https://www.linkedin.com/in/diogodbaptista/",
  github: "https://github.com/Diogo1912",
  substack: "https://substack.com/@diogobap",
};

/** @deprecated see `lib/linkedin.ts` */
export const experience: Job[] = [
  {
    id: "1",
    title: "Your Current Role",
    company: "Current Company",
    location: "Location",
    startDate: "Jan 2022",
    endDate: null,
    description: [
      "Describe your most impactful responsibility or achievement here.",
      "Another bullet point — include metrics where possible (e.g. grew X by Y%).",
      "A third achievement or project you led.",
    ],
  },
  {
    id: "2",
    title: "Previous Role",
    company: "Previous Company",
    location: "Location",
    startDate: "Jun 2019",
    endDate: "Dec 2021",
    description: [
      "Key project or initiative you owned in this role.",
      "Impact you had on the team, product, or business.",
    ],
  },
  {
    id: "3",
    title: "Early Career Role",
    company: "First Company",
    location: "Location",
    startDate: "Sep 2017",
    endDate: "May 2019",
    description: [
      "How you started your career and the foundation you built.",
      "Key skills or technologies you worked with.",
    ],
  },
];

/** @deprecated see `lib/linkedin.ts` */
export const education: School[] = [
  {
    id: "1",
    institution: "University Name",
    degree: "Bachelor's / Master's",
    field: "Your Field of Study",
    startYear: 2013,
    endYear: 2017,
  },
  {
    id: "2",
    institution: "Other Institution",
    degree: "Degree or Certification",
    field: "Field or Programme",
    startYear: 2017,
    endYear: 2018,
  },
];

/** @deprecated see `lib/linkedin.ts` */
export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["TypeScript", "Python", "Swift", "SQL"],
  },
  {
    category: "Frameworks & Libraries",
    skills: ["React", "Next.js", "Node.js", "Tailwind CSS"],
  },
  {
    category: "Tools & Platforms",
    skills: ["Figma", "Git", "Docker", "Vercel", "AWS"],
  },
  {
    category: "Practices",
    skills: ["Product Management", "Agile", "User Research", "A/B Testing"],
  },
];

export const apps: App[] = [
  {
    id: "storay",
    name: "Storay",
    description:
      "Personal inventory app. Catalogue everything you own and sell with one link, zero fees.",
    longDescription:
      "Storay is a consumer app for cataloguing the things you own — and the public 'shelf' lets you sell items with a single shareable link. No listing fees, no marketplace cut, no platform lock-in. Building it solo while studying.",
    tags: ["Web App", "iOS"],
    stack: ["Next.js", "TypeScript", "Postgres", "Tailwind", "Vercel"],
    icon: "lightbulb",
    liveUrl: "https://storay.app",
    color: "#3a8fde",
    badge: "NEW",
    rating: 5,
    status: "In private beta",
    highlights: [
      "Inventory model that handles photos, custom fields, and rich tags",
      "Public shelves with one-click sharing — sell with zero platform fees",
      "Designed end-to-end: research, product, brand, and engineering",
    ],
  },
  {
    id: "tiredofcancer",
    name: "Untire Now",
    description:
      "AI coaching companion for cancer-related fatigue, built with the Tired of Cancer team.",
    longDescription:
      "A four-step conversational coaching flow grounded in Untire Now's clinical content library. Empathy-first prompt design, retrieval over evidence-based material, and a safety layer that escalates to crisis resources when distress signals appear.",
    tags: ["AI", "Healthcare"],
    stack: [
      "Next.js 15",
      "Claude Sonnet",
      "OpenRouter",
      "SQLite",
      "RAG",
      "LLM-as-judge",
    ],
    icon: "bolt",
    liveUrl: "https://www.tiredofcancer.com/",
    color: "#16a085",
    status: "Live · Freelance work",
    highlights: [
      "Designed the conversational coaching flow end-to-end",
      "Built the RAG pipeline against the clinical content library",
      "Set up LLM-as-judge evaluation and per-request observability",
      "Implemented a risk-detection protocol that overrides the flow on distress",
    ],
  },
  {
    id: "chandle",
    name: "Chandle",
    description:
      "Daily music guessing game — listen to a clip, name the song before you run out of guesses.",
    longDescription:
      "Built for fun in a long weekend. Picks a daily song from a curated catalogue, drips out increasingly long preview clips and lets the player narrow down with autocomplete-style guesses. Inspired by Wordle and Heardle.",
    tags: ["Web App", "Game"],
    stack: ["React", "Vite", "TypeScript"],
    icon: "gamepad",
    liveUrl: "https://chandle.vercel.app",
    color: "#e74c3c",
    rating: 4,
    status: "Live",
    highlights: [
      "Daily song rotation with shareable spoiler-free results",
      "Lightweight client — no backend, ships under 50KB gzipped",
    ],
  },
  {
    id: "golexai",
    name: "Golexai",
    description:
      "AI engineering work — agents, automations, and bespoke models for clients.",
    longDescription:
      "Freelance AI engineering brand. I take on agentic systems, retrieval pipelines, prompt-tuned products and AI-assisted automations for small teams that need a senior implementer for a short window.",
    tags: ["AI", "Consulting"],
    stack: ["LangChain", "CrewAI", "Anthropic", "OpenAI", "n8n", "FastAPI"],
    icon: "bolt",
    liveUrl: "https://golexai.pl",
    color: "#8e44ad",
    rating: 5,
    status: "Booking projects",
  },
  {
    id: "circuitboard",
    name: "Circuitboard",
    description:
      "Browser-based circuit builder — drag components onto a board and wire them up.",
    longDescription:
      "A teaching-oriented playground for electronics: drag components onto a canvas, connect them up, watch values propagate. Built to scratch my own itch while studying digital logic.",
    tags: ["Web App", "Tool"],
    stack: ["TypeScript", "Canvas API", "GitHub Pages"],
    icon: "wrench",
    liveUrl: "https://diogo1912.github.io/circuitboard/",
    sourceUrl: "https://github.com/Diogo1912/circuitboard",
    color: "#27ae60",
    rating: 4,
    status: "Source available",
  },
];

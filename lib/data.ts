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
  badge?: "NEW" | "FREE" | "HOT" | "FEATURED";
  rating?: number; // 0-5
  /** Short status note, e.g. "Live · 200+ users", "In public beta". */
  status?: string;
  /** Bullet highlights of impact / what I built. */
  highlights?: string[];
}

/**
 * Service offered as freelance work. Consumed by `/freelance` (full
 * cards) and the homepage "Recent client work" recap.
 */
export interface Service {
  id: string;
  title: string;
  tagline: string;
  /** 1-emoji glyph used as the card's marker. Kept minimal — neobrutalism. */
  glyph: string;
  /** Neobrutalism accent token name (yellow|pink|blue|green|purple). */
  tone: "yellow" | "pink" | "blue" | "green" | "purple";
  /** Concise pitch shown above the deliverables list. */
  description: string;
  /** Bullets of what's included in a typical engagement. */
  deliverables: string[];
  /** Tech / tool stack chips. */
  stack: string[];
  /** Display string like "from €1,500" — full freedom to phrase per service. */
  priceFrom: string;
  /** Short note under price ("per project", "fixed-fee", etc.). */
  priceNote?: string;
  /** Optional related portfolio app id for cross-linking. */
  exampleAppId?: string;
}

export const services: Service[] = [
  {
    id: "ai-automation",
    title: "AI-powered automation",
    tagline: "Repetitive ops work, gone.",
    glyph: "⚙",
    tone: "yellow",
    description:
      "I take the slow, manual parts of your business — sorting, tagging, summarising, replying, syncing — and replace them with reliable AI-driven workflows that run on their own.",
    deliverables: [
      "Mapping your current process and finding the highest-leverage cuts",
      "Building the pipeline in n8n / Python with safe fallbacks",
      "Hooking into your existing tools (Slack, Notion, Gmail, your CRM)",
      "Setup, monitoring and a handover doc so your team can run it",
    ],
    stack: ["n8n", "Python", "OpenAI", "Anthropic API", "FastAPI", "Zapier"],
    priceFrom: "from €1,500",
    priceNote: "fixed-fee per workflow",
  },
  {
    id: "chatbots-agents",
    title: "Chatbots & AI agents",
    tagline: "Conversational products that actually work.",
    glyph: "✦",
    tone: "pink",
    description:
      "Bespoke chatbots and multi-step agents grounded in your content. Built with proper prompt design, retrieval, evaluation and safety — not a thin wrapper around a single LLM call.",
    deliverables: [
      "Conversation design — flows, tone, guardrails, escalation paths",
      "RAG pipeline against your docs / knowledge base",
      "LLM-as-judge evaluation + per-request observability",
      "Embed-anywhere widget or a dedicated app — your choice",
    ],
    stack: ["Claude", "OpenRouter", "LangChain", "CrewAI", "Next.js", "Postgres"],
    priceFrom: "from €3,000",
    priceNote: "scope-dependent",
    exampleAppId: "tiredofcancer",
  },
  {
    id: "small-business-sites",
    title: "Websites for small businesses",
    tagline: "Fast, beautiful, easy to update.",
    glyph: "◆",
    tone: "blue",
    description:
      "Modern websites for restaurants, studios, freelancers and shops. Designed to load instantly, look distinctive, and let you update copy yourself without calling a developer every time.",
    deliverables: [
      "Brand-aware design tailored to your business (not a template)",
      "Built on Next.js — accessible, SEO-ready, fast on mobile",
      "Headless CMS (Sanity or Notion) so you edit in plain language",
      "Hosting, analytics and a 30-day post-launch tweak window",
    ],
    stack: ["Next.js", "Sanity", "Tailwind", "Vercel", "Posthog"],
    priceFrom: "from €1,500",
    priceNote: "incl. design + 30 days support",
  },
  {
    id: "interactive-apps",
    title: "Interactive apps & games",
    tagline: "When you need a memorable moment.",
    glyph: "✺",
    tone: "green",
    description:
      "One-off web apps and small games — campaigns, internal tools, playful brand experiences. The kind of thing that makes people screenshot and share.",
    deliverables: [
      "Concept + interaction sketch (paper-thin first, then code)",
      "Hand-built in React/Vite or Canvas — no bloated boilerplate",
      "Mobile-first, share-friendly, deploys to your domain",
      "Source code yours at the end",
    ],
    stack: ["React", "Vite", "Canvas", "TypeScript", "Vercel"],
    priceFrom: "from €1,000",
    priceNote: "per project",
    exampleAppId: "chandle",
  },
];

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

/**
 * What I'm focused on this season — hand-curated for the homepage
 * "Right now" section. Kept separate from LinkedIn experience so I can
 * write the copy that actually fits the freelance pitch.
 */
export interface CurrentFocus {
  id: string;
  label: string;           // small uppercase pill, e.g. "Founder · Building"
  title: string;           // big title, e.g. "Storay"
  context?: string;        // parent / org line under title
  body: string;            // 1-2 sentence description
  tone: "yellow" | "pink" | "blue" | "green" | "purple";
  href?: string;           // optional click-through
}

export const currentlyDoing: CurrentFocus[] = [
  {
    id: "storay",
    label: "Founder · Building",
    title: "Storay",
    context: "My own product",
    body:
      "A personal inventory app — catalogue what you own, then share a public shelf to sell anything in one click with zero platform fees. I lead product, design, engineering and brand.",
    tone: "yellow",
    href: "https://storay.app",
  },
  {
    id: "studio",
    label: "Freelance · Open for projects",
    title: "DiogoBap Studio",
    context: "My freelance practice",
    body:
      "AI automation, chatbots and agents, small-business websites and interactive apps. Solo, senior and fixed-fee — most engagements ship in 2-6 weeks. Currently booking new clients.",
    tone: "pink",
    href: "/freelance",
  },
  {
    id: "studies",
    label: "Student · Year 3",
    title: "Computational Social Science",
    context: "Bachelor's @ University of Amsterdam",
    body:
      "A degree that sits between data science, social science and ethics — modelling societies with code, plus the methods and critique side. It's where my taste for products that 'meet people where they are' comes from.",
    tone: "blue",
  },
];

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
    badge: "FEATURED",
    rating: 5,
    status: "In public beta",
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
    status: "Live",
    highlights: [
      "Designed the conversational coaching flow end-to-end",
      "Built the RAG pipeline against the clinical content library",
      "Set up LLM-as-judge evaluation and per-request observability",
      "Implemented a risk-detection protocol that overrides the flow on distress",
    ],
  },
  {
    id: "what-is-tuesday",
    name: "What is Tuesday?",
    description:
      "You get a word — write the funniest question it could be the answer to. AI referees, players judge.",
    longDescription:
      "You get a word. Your job is to write the funniest question it could be the answer to. An AI referee decides if your setup actually lands on the word — and other players can judge yours too. Best joke wins.",
    tags: ["Web App", "Game"],
    stack: ["Next.js", "TypeScript", "Vercel"],
    icon: "dice",
    liveUrl: "https://what-is-tuesday.vercel.app",
    color: "#f59e0b",
    badge: "NEW",
    status: "Live",
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

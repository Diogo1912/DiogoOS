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
  tags: string[];
  icon: AppIconKey;
  liveUrl: string;
  sourceUrl?: string;
  color: string;
  badge?: "NEW" | "FREE" | "HOT";
  rating?: number; // 0-5
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
  linkedin: "",
  github: "",
  twitter: "",
  substack: "",
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
    tags: ["Web App", "iOS"],
    icon: "lightbulb",
    liveUrl: "https://storay.app",
    color: "#3a8fde",
    badge: "NEW",
    rating: 5,
  },
  {
    id: "chandle",
    name: "Chandle",
    description:
      "Daily music guessing game — listen to a clip, name the song before you run out of guesses.",
    tags: ["Web App", "Game"],
    icon: "gamepad",
    liveUrl: "https://chandle.vercel.app",
    color: "#e74c3c",
    rating: 4,
  },
  {
    id: "golexai",
    name: "Golexai",
    description:
      "AI engineering work — building agents, automations, and bespoke models for clients.",
    tags: ["AI", "Consulting"],
    icon: "bolt",
    liveUrl: "https://golexai.pl",
    color: "#8e44ad",
    rating: 5,
  },
  {
    id: "circuitboard",
    name: "Circuitboard",
    description:
      "Browser-based circuit builder — drag components onto a board and wire them up in your browser.",
    tags: ["Web App", "Tool"],
    icon: "wrench",
    liveUrl: "https://diogo1912.github.io/circuitboard/",
    sourceUrl: "https://github.com/Diogo1912/circuitboard",
    color: "#27ae60",
    rating: 4,
  },
];

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
    id: "1",
    name: "App Name",
    description: "A short description of what this app does and the problem it solves.",
    tags: ["Web App"],
    icon: "rocket",
    liveUrl: "#",
    color: "#3a8fde",
    badge: "NEW",
    rating: 5,
  },
  {
    id: "2",
    name: "App Name",
    description: "Description of your second project. What makes it interesting?",
    tags: ["iOS"],
    icon: "gamepad",
    liveUrl: "#",
    color: "#9b3fc4",
    rating: 4,
  },
  {
    id: "3",
    name: "App Name",
    description: "What problem does this tool solve? Who is it for?",
    tags: ["Tool"],
    icon: "tool",
    liveUrl: "#",
    color: "#27ae60",
    rating: 5,
  },
  {
    id: "4",
    name: "App Name",
    description: "Brief description of this game — genre, platform, mechanics.",
    tags: ["Game"],
    icon: "target",
    liveUrl: "#",
    color: "#e74c3c",
    badge: "HOT",
    rating: 4,
  },
  {
    id: "5",
    name: "App Name",
    description: "What this web app helps users accomplish.",
    tags: ["Web App"],
    icon: "lightbulb",
    liveUrl: "#",
    color: "#f39c12",
    rating: 5,
  },
  {
    id: "6",
    name: "App Name",
    description: "Describe this utility tool and how it saves time.",
    tags: ["Tool"],
    icon: "wrench",
    liveUrl: "#",
    color: "#1abc9c",
    rating: 4,
  },
  {
    id: "7",
    name: "App Name",
    description: "What this iOS app does and how many users it has.",
    tags: ["iOS"],
    icon: "phone",
    liveUrl: "#",
    color: "#3498db",
    rating: 5,
  },
  {
    id: "8",
    name: "App Name",
    description: "What makes this game fun or unique compared to others.",
    tags: ["Game"],
    icon: "dice",
    liveUrl: "#",
    color: "#e67e22",
    rating: 3,
  },
  {
    id: "9",
    name: "App Name",
    description: "Your newest project — what you built and why.",
    tags: ["Web App"],
    icon: "bolt",
    liveUrl: "#",
    color: "#8e44ad",
    badge: "FREE",
    rating: 5,
  },
];

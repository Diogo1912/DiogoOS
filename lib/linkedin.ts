import profile from "@/data/linkedin.json";

/**
 * Canonical shape of the user's LinkedIn snapshot. Field names mirror
 * Proxycurl's `Person` response so the sync script can normalise easily.
 *
 * One source of truth lives at `data/linkedin.json` and is rewritten
 * weekly by `scripts/sync-linkedin.ts` (locally or via the
 * `.github/workflows/sync-linkedin.yml` cron). Nothing in the app fetches
 * LinkedIn at request time — pages prerender statically off the JSON.
 */
export interface Experience {
  title: string;
  company: string;
  location: string | null;
  startDate: string;          // "Jan 2022"
  endDate: string | null;     // null = "Present"
  /** Bulleted description — each item is rendered as a list bullet.
   *  Empty array (or null) hides the description block entirely. */
  description: string[] | null;
  /** Optional, e.g. "Full-time" / "Internship" / "Freelance". */
  employment?: string;
  /** Optional, e.g. "Remote" / "Hybrid" / "On-site". */
  locationType?: string;
}

export interface Education {
  institution: string;
  degree: string | null;
  field: string | null;
  startYear: number | null;
  endYear: number | null;
}

export interface Skill {
  name: string;
  endorsements?: number;
}

export interface Certification {
  name: string;
  issuer: string | null;
  issuedOn: string | null;    // "May 2024"
  url: string | null;
}

export interface Language {
  name: string;
  proficiency: string | null; // "Native", "Professional working", …
}

export interface Honor {
  title: string;
  issuer: string | null;
  issuedOn: string | null;
  description: string | null;
}

export interface Volunteer {
  role: string;
  organization: string;
  startDate: string | null;
  endDate: string | null;
  description: string[] | null;
}

export interface Featured {
  bannerText: string;
  bannerBrand: string;
  bannerCta: string;
}

export interface LinkedInProfile {
  fullName: string;
  /** Optional pronouns, e.g. "He/Him" — shown next to the name. */
  pronouns?: string;
  headline: string;
  location: string;
  about: string | null;
  photoUrl: string | null;
  publicProfileUrl: string;
  connections: number | null;
  /** Optional Featured banner (from LinkedIn's "Featured" section). */
  featured?: Featured;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  languages: Language[];
  honors: Honor[];
  volunteer: Volunteer[];
  /** ISO timestamp of the last successful sync (`new Date().toISOString()`). */
  syncedAt: string;
}

/**
 * Returns the LinkedIn snapshot. Synchronous because the JSON is bundled
 * at build time, so this is safe to call from any server component.
 */
export function getLinkedInProfile(): LinkedInProfile {
  return profile as LinkedInProfile;
}

/* ──────────────────────────────────────────────────────────────────
 * Experience grouping for /cv
 *
 * The CV page used to render every role in one flat list. That worked
 * when there were 3 roles; with 10 it loses hierarchy. `groupExperience`
 * buckets each role into one of four hand-curated groups so the page can
 * lead with "now", surface the AI-engineering track, and demote early
 * gigs without hiding them.
 *
 * Bucketing is keyed by `company|title` to survive LinkedIn re-syncs.
 * Anything that doesn't match falls into the "Outside" bucket — so newly
 * synced roles appear by default rather than disappearing.
 * ──────────────────────────────────────────────────────────────── */

export type RoleGroupId = "now" | "ai" | "earlier" | "outside";
export type RoleGroupTone = "yellow" | "pink" | "blue" | "green";

export interface RoleGroup {
  id: RoleGroupId;
  title: string;
  blurb: string;
  tone: RoleGroupTone;
  roles: Experience[];
}

const ROLE_BUCKETS: Record<string, RoleGroupId> = {
  // Active roles
  "Storay|Founder": "now",
  "DiogoBap Studio|Owner": "now",
  // AI engineering track
  "Tired of Cancer|AI Engineer": "ai",
  "Whoppah|AI Engineer": "ai",
  "GOLEXAI|AI Engineer": "ai",
  // Earlier industry (internships before the engineer title)
  "Whoppah|QA Engineer and User Research Intern": "earlier",
  "Xantor Group|Project Management Intern": "earlier",
  // Outside the day-job — leadership, community, food service
  "Study Association Bloom|Chair of the Praesidium": "outside",
  "PANCAKES Amsterdam|Kitchen Staff": "outside",
  "Ecole Internationale de Differdange|President of the Student Council":
    "outside",
};

const GROUP_META: Record<RoleGroupId, Omit<RoleGroup, "roles">> = {
  now: {
    id: "now",
    title: "Right now",
    blurb: "What I'm splitting my time across today — both are mine.",
    tone: "yellow",
  },
  ai: {
    id: "ai",
    title: "AI engineering",
    blurb:
      "Where the AI engineering chops come from — production agents, RAG and internal tools.",
    tone: "pink",
  },
  earlier: {
    id: "earlier",
    title: "Earlier industry",
    blurb: "How I got in. Two internships before the engineer title.",
    tone: "blue",
  },
  outside: {
    id: "outside",
    title: "Outside the day-job",
    blurb:
      "Leadership, community and the studying-while-working period — the rest of who I am.",
    tone: "green",
  },
};

/** Render order, top to bottom. */
const GROUP_ORDER: RoleGroupId[] = ["now", "ai", "earlier", "outside"];

export function groupExperience(experience: Experience[]): RoleGroup[] {
  const buckets: Record<RoleGroupId, Experience[]> = {
    now: [],
    ai: [],
    earlier: [],
    outside: [],
  };

  for (const role of experience) {
    const key = `${role.company}|${role.title}`;
    const id = ROLE_BUCKETS[key] ?? "outside";
    buckets[id].push(role);
  }

  // Roles within a bucket stay in the order they came in (the JSON is
  // reverse-chronological by startDate, which is exactly what we want).
  return GROUP_ORDER.map((id) => ({
    ...GROUP_META[id],
    roles: buckets[id],
  })).filter((g) => g.roles.length > 0);
}

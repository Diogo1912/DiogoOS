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

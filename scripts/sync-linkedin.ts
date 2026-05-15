/**
 * Pulls the user's LinkedIn profile via Proxycurl and rewrites
 * `data/linkedin.json`. Run weekly by .github/workflows/sync-linkedin.yml,
 * or manually with `npm run sync:linkedin`.
 *
 * Required env:
 *   LINKEDIN_PROFILE_URL  e.g. https://www.linkedin.com/in/diogobaptista
 *   PROXYCURL_API_KEY     Proxycurl bearer token
 *
 * Why Proxycurl: LinkedIn's official API doesn't expose full profiles to
 * third parties. Proxycurl scrapes the public page on our behalf and
 * returns a structured JSON. ~$0.01 per call; once a week ≈ $0.50/year.
 */

import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import type {
  LinkedInProfile,
  Experience,
  Education,
  Skill,
  Certification,
  Language,
  Honor,
  Volunteer,
} from "../lib/linkedin";

const PROXYCURL_ENDPOINT = "https://nubela.co/proxycurl/api/v2/linkedin";
const OUTPUT_PATH = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../data/linkedin.json"
);

// ─── Proxycurl response shape (subset we use) ────────────────────────────

interface ProxycurlDate { day?: number; month?: number; year?: number }

interface ProxycurlExperience {
  title?: string;
  company?: string;
  location?: string | null;
  description?: string | null;
  starts_at?: ProxycurlDate | null;
  ends_at?: ProxycurlDate | null;
}

interface ProxycurlEducation {
  school?: string;
  degree_name?: string | null;
  field_of_study?: string | null;
  starts_at?: ProxycurlDate | null;
  ends_at?: ProxycurlDate | null;
}

interface ProxycurlCertification {
  name?: string;
  authority?: string | null;
  starts_at?: ProxycurlDate | null;
  url?: string | null;
}

interface ProxycurlLanguageProficiency {
  name?: string;
  proficiency?: string | null;
}

interface ProxycurlHonor {
  title?: string;
  issuer?: string | null;
  issued_on?: ProxycurlDate | null;
  description?: string | null;
}

interface ProxycurlVolunteer {
  title?: string;
  company?: string;
  description?: string | null;
  starts_at?: ProxycurlDate | null;
  ends_at?: ProxycurlDate | null;
}

interface ProxycurlResponse {
  full_name?: string;
  first_name?: string;
  last_name?: string;
  headline?: string | null;
  summary?: string | null;
  city?: string | null;
  state?: string | null;
  country_full_name?: string | null;
  profile_pic_url?: string | null;
  public_identifier?: string;
  connections?: number | null;
  experiences?: ProxycurlExperience[];
  education?: ProxycurlEducation[];
  skills?: string[];
  certifications?: ProxycurlCertification[];
  languages_and_proficiencies?: ProxycurlLanguageProficiency[];
  /** Proxycurl returns some honors under `accomplishment_honors_awards` */
  accomplishment_honors_awards?: ProxycurlHonor[];
  volunteer_work?: ProxycurlVolunteer[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function fmtDate(d: ProxycurlDate | null | undefined): string | null {
  if (!d || !d.year) return null;
  if (d.month && d.month >= 1 && d.month <= 12) return `${MONTHS[d.month - 1]} ${d.year}`;
  return String(d.year);
}

function dateYear(d: ProxycurlDate | null | undefined): number | null {
  return d?.year ?? null;
}

function buildLocation(p: ProxycurlResponse): string {
  return [p.city, p.state, p.country_full_name].filter(Boolean).join(", ");
}

// ─── Normalisation ───────────────────────────────────────────────────────

function normalise(p: ProxycurlResponse, sourceUrl: string): LinkedInProfile {
  const experience: Experience[] = (p.experiences ?? []).map((e) => ({
    title: e.title ?? "",
    company: e.company ?? "",
    location: e.location ?? null,
    startDate: fmtDate(e.starts_at) ?? "",
    endDate: fmtDate(e.ends_at),
    description: e.description ?? null,
  }));

  const education: Education[] = (p.education ?? []).map((e) => ({
    institution: e.school ?? "",
    degree: e.degree_name ?? null,
    field: e.field_of_study ?? null,
    startYear: dateYear(e.starts_at),
    endYear: dateYear(e.ends_at),
  }));

  const skills: Skill[] = (p.skills ?? []).map((name) => ({ name }));

  const certifications: Certification[] = (p.certifications ?? []).map((c) => ({
    name: c.name ?? "",
    issuer: c.authority ?? null,
    issuedOn: fmtDate(c.starts_at),
    url: c.url ?? null,
  }));

  const languages: Language[] = (p.languages_and_proficiencies ?? []).map((l) => ({
    name: l.name ?? "",
    proficiency: l.proficiency ?? null,
  }));

  const honors: Honor[] = (p.accomplishment_honors_awards ?? []).map((h) => ({
    title: h.title ?? "",
    issuer: h.issuer ?? null,
    issuedOn: fmtDate(h.issued_on),
    description: h.description ?? null,
  }));

  const volunteer: Volunteer[] = (p.volunteer_work ?? []).map((v) => ({
    role: v.title ?? "",
    organization: v.company ?? "",
    startDate: fmtDate(v.starts_at),
    endDate: fmtDate(v.ends_at),
    description: v.description ?? null,
  }));

  const fullName = p.full_name ?? [p.first_name, p.last_name].filter(Boolean).join(" ");

  return {
    fullName,
    headline: p.headline ?? "",
    location: buildLocation(p),
    about: p.summary ?? null,
    photoUrl: p.profile_pic_url ?? null,
    publicProfileUrl: sourceUrl,
    connections: p.connections ?? null,
    experience,
    education,
    skills,
    certifications,
    languages,
    honors,
    volunteer,
    syncedAt: new Date().toISOString(),
  };
}

// ─── Main ────────────────────────────────────────────────────────────────

async function main() {
  const profileUrl = process.env.LINKEDIN_PROFILE_URL;
  const apiKey = process.env.PROXYCURL_API_KEY;
  if (!profileUrl) throw new Error("LINKEDIN_PROFILE_URL is not set");
  if (!apiKey) throw new Error("PROXYCURL_API_KEY is not set");

  const url = new URL(PROXYCURL_ENDPOINT);
  url.searchParams.set("url", profileUrl);
  url.searchParams.set("use_cache", "if-recent");
  url.searchParams.set("skills", "include");

  console.log(`[sync] Fetching ${profileUrl}…`);
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "(no body)");
    throw new Error(`Proxycurl ${res.status}: ${body.slice(0, 400)}`);
  }
  const raw = (await res.json()) as ProxycurlResponse;
  const normalised = normalise(raw, profileUrl);

  writeFileSync(OUTPUT_PATH, JSON.stringify(normalised, null, 2) + "\n", "utf8");
  console.log(`[sync] Wrote ${OUTPUT_PATH} (${normalised.experience.length} jobs, ${normalised.education.length} schools, ${normalised.skills.length} skills).`);
}

main().catch((err: unknown) => {
  console.error("[sync] Failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});

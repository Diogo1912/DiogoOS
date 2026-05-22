import Link from "next/link";
import { getLinkedInProfile } from "@/lib/linkedin";
import { ExperienceItem } from "@/components/neo/ExperienceItem";
import { Reveal } from "@/components/neo/Reveal";

export const metadata = {
  title: "CV · Diogo Baptista",
  description:
    "Diogo Baptista's work, education, languages and skills — synced from LinkedIn.",
};

export default function CVPage() {
  const profile = getLinkedInProfile();
  const stillThere = profile.experience.filter((j) => !j.endDate).length;

  return (
    <>
      {/* CV header */}
      <section className="neo-section">
        <div className="neo-container">
          <span className="neo-badge neo-badge--green neo-hero-eyebrow">
            Synced from LinkedIn ·{" "}
            {new Date(profile.syncedAt).toLocaleDateString("en-GB", {
              month: "short",
              year: "numeric",
            })}
          </span>
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              margin: "16px 0 14px",
            }}
          >
            {profile.fullName}
            {profile.pronouns && (
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  marginLeft: 12,
                  verticalAlign: "middle",
                  color: "#666",
                }}
              >
                ({profile.pronouns})
              </span>
            )}
          </h1>
          <p style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
            {profile.headline}
          </p>
          <p style={{ color: "#555", marginTop: 4 }}>{profile.location}</p>

          <div className="neo-hero-actions">
            <a
              href={profile.publicProfileUrl}
              target="_blank"
              rel="noreferrer"
              className="neo-btn neo-btn--blue"
            >
              Open on LinkedIn ↗
            </a>
            <Link href="/freelance" className="neo-btn">
              Hire me →
            </Link>
            <Link href="/contact" className="neo-btn neo-btn--neutral">
              Say hi
            </Link>
          </div>

          {profile.about && (
            <Reveal className="neo-highlight neo-highlight--yellow" delay={80}>
              <div
                style={{
                  fontSize: 16,
                  lineHeight: 1.6,
                  marginTop: 0,
                }}
              >
                {profile.about}
              </div>
            </Reveal>
          )}

          <div className="neo-stat-row">
            <Stat value={`${profile.experience.length}+`} label="Roles" />
            <Stat value={stillThere.toString()} label="Active now" />
            <Stat value={profile.languages.length.toString()} label="Languages" />
            <Stat
              value={
                profile.education[0]?.endYear?.toString() ?? "—"
              }
              label="Grad. year"
            />
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="neo-section">
        <div className="neo-container">
          <h2>Experience</h2>
          <p className="neo-section-lead">
            Click any role to expand the details.
          </p>
          <div className="neo-exp-list">
            {profile.experience.map((e, i) => (
              <Reveal key={i} delay={i * 40}>
                <ExperienceItem
                  exp={{
                    title: e.title,
                    company: e.company,
                    employment: e.employment,
                    location: e.location,
                    startDate: e.startDate,
                    endDate: e.endDate,
                    description: e.description,
                  }}
                  index={i}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Education + Languages two-column */}
      <section className="neo-section">
        <div className="neo-container">
          <div className="neo-two-col">
            <Reveal>
              <h2 style={{ marginBottom: 14 }}>Education</h2>
              <div style={{ display: "grid", gap: 14 }}>
                {profile.education.map((edu, i) => (
                  <div key={i} className="neo-card" style={{ padding: 20 }}>
                    <div style={{ fontWeight: 800, fontSize: 17 }}>
                      {edu.institution}
                    </div>
                    {edu.degree && (
                      <div style={{ fontSize: 14, color: "#333" }}>
                        {edu.degree}
                        {edu.field ? ` · ${edu.field}` : ""}
                      </div>
                    )}
                    {(edu.startYear || edu.endYear) && (
                      <div
                        style={{ fontSize: 13, color: "#666", marginTop: 4 }}
                      >
                        {edu.startYear ?? "—"} – {edu.endYear ?? "Present"}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h2 style={{ marginBottom: 14 }}>Languages</h2>
              <div style={{ display: "grid", gap: 10 }}>
                {profile.languages.map((l, i) => (
                  <div
                    key={i}
                    className="neo-card"
                    style={{
                      padding: "12px 16px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <span style={{ fontWeight: 700 }}>{l.name}</span>
                    <span
                      className="neo-badge neo-badge--white"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {shortenProficiency(l.proficiency)}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="neo-section">
        <div className="neo-container">
          <h2>Skills &amp; tools</h2>
          <p className="neo-section-lead">
            Highlights — the longer list lives over on LinkedIn.
          </p>
          <div className="neo-chip-row">
            {(
              profile.skills.length
                ? profile.skills.map((s) => s.name)
                : [
                    "Python",
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Machine Learning",
                    "FastAPI",
                  ]
            ).map((skill, i) => (
              <Reveal key={skill} delay={i * 30}>
                <span className={`neo-chip neo-chip--${i % 5}`}>{skill}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="neo-stat">
      <div className="neo-stat-value">{value}</div>
      <div className="neo-stat-label">{label}</div>
    </div>
  );
}

function shortenProficiency(p: string | null) {
  if (!p) return "—";
  if (p.toLowerCase().includes("native")) return "Native";
  if (p.toLowerCase().includes("full")) return "Fluent";
  if (p.toLowerCase().includes("professional working")) return "Professional";
  if (p.toLowerCase().includes("limited")) return "Conversational";
  return p;
}

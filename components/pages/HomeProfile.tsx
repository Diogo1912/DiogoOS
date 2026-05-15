import { getLinkedInProfile } from "@/lib/linkedin";

/**
 * 2007-era LinkedIn profile page, fed from the weekly-synced snapshot at
 * `data/linkedin.json`. Mirrors the layout LinkedIn used in 2007:
 *   - light blue header band with the wordmark + tabs
 *   - left rail: photo + name + headline + location + actions
 *   - main column: Summary, Experience, Education, Skills, Certifications,
 *     Languages, Honors & Awards, Volunteer Experience
 *   - right rail: Public Profile URL, Connections, Last Updated
 *
 * Sections with no data are hidden entirely.
 */
export function HomeProfile() {
  const p = getLinkedInProfile();
  // Initials: first letter of the first word + first letter of the last word.
  // Ignores parenthesised middle bits like "Diogo (Da Piedade) Baptista" so
  // we get "DB" rather than "D(" from naive char-grabbing.
  const words = p.fullName
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w));
  const initials = words.length === 0
    ? "?"
    : (words[0][0] + (words[words.length - 1][0] ?? "")).toUpperCase();

  const handle = p.publicProfileUrl.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "").replace(/\/$/, "");

  const lastUpdated = new Date(p.syncedAt).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="linkedin2007">
      {/* Top brand band */}
      <header className="linkedin2007-banner">
        <div className="linkedin2007-banner-inner">
          <span className="linkedin2007-wordmark">
            diogo<span className="linkedin2007-in">net</span>
          </span>
          <nav className="linkedin2007-nav">
            <a className="is-active">Profile</a>
            <a>Contacts</a>
            <a>Inbox</a>
            <a>Groups</a>
            <a>Jobs</a>
            <a>Companies</a>
            <a>News</a>
            <a>More</a>
          </nav>
        </div>
        <div className="linkedin2007-subnav">
          <span>
            <a className="is-active">View Profile</a>
            <span className="linkedin2007-sep">·</span>
            <a>Edit Profile</a>
            <span className="linkedin2007-sep">·</span>
            <a>View Connections</a>
            <span className="linkedin2007-sep">·</span>
            <a>Recommendations</a>
          </span>
          <span className="linkedin2007-search">
            <input type="text" placeholder="Search People" readOnly />
            <button>Search</button>
          </span>
        </div>
      </header>

      {/* Body */}
      <div className="linkedin2007-body">
        <div className="linkedin2007-grid">
          {/* Left rail */}
          <aside className="linkedin2007-left">
            <div className="linkedin2007-photo">
              {p.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.photoUrl} alt={p.fullName} />
              ) : (
                <div className="linkedin2007-photo-fallback">{initials}</div>
              )}
            </div>
            <h1 className="linkedin2007-name">
              {p.fullName}
              {p.pronouns && (
                <span className="linkedin2007-pronouns"> · {p.pronouns}</span>
              )}
            </h1>
            <div className="linkedin2007-headline">{p.headline}</div>
            <div className="linkedin2007-location">{p.location}</div>

            <div className="linkedin2007-actions">
              <button className="linkedin2007-btn linkedin2007-btn-primary">Add to your network</button>
              <button className="linkedin2007-btn">Send a message</button>
              <button className="linkedin2007-btn">Forward this profile</button>
              <button className="linkedin2007-btn">Save profile</button>
            </div>

            <SidebarBox title="Public Profile">
              <a className="linkedin2007-link break-all" href={p.publicProfileUrl} target="_blank" rel="noopener noreferrer">
                diogonet.com/in/{handle}
              </a>
            </SidebarBox>

            {p.connections != null && (
              <SidebarBox title="Connections">
                <div className="linkedin2007-stat">{p.connections.toLocaleString()}{p.connections >= 500 ? "+" : ""}</div>
                <div className="linkedin2007-stat-label">connections</div>
              </SidebarBox>
            )}

            <SidebarBox title="Last Updated">
              <div className="text-[11px]">{lastUpdated}</div>
              <div className="text-[10px] text-[#666] mt-0.5">Auto-synced weekly.</div>
            </SidebarBox>
          </aside>

          {/* Main column */}
          <main className="linkedin2007-main">
            {p.about && (
              <Section title="About">
                <p className="linkedin2007-paragraph">{p.about}</p>
              </Section>
            )}

            {p.featured && (
              <Section title="Featured">
                <a
                  href={p.publicProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin2007-featured"
                >
                  <div className="linkedin2007-featured-text">
                    {p.featured.bannerText}
                  </div>
                  <div className="linkedin2007-featured-brand">
                    {p.featured.bannerBrand}
                  </div>
                  <div className="linkedin2007-featured-cta">
                    {p.featured.bannerCta} →
                  </div>
                </a>
              </Section>
            )}

            {p.experience.length > 0 && (
              <Section title="Experience">
                <div className="linkedin2007-list">
                  {p.experience.map((e, i) => {
                    const bullets = Array.isArray(e.description)
                      ? e.description.filter(Boolean)
                      : [];
                    return (
                      <div key={`${e.company}-${i}`} className="linkedin2007-entry">
                        <div className="linkedin2007-entry-title">
                          {e.title}
                          {e.employment && (
                            <span className="linkedin2007-entry-chip"> · {e.employment}</span>
                          )}
                        </div>
                        <div className="linkedin2007-entry-sub">{e.company}</div>
                        <div className="linkedin2007-entry-meta">
                          {e.startDate} – {e.endDate ?? "Present"}
                          {e.location ? <> · {e.location}</> : null}
                          {e.locationType ? <> · {e.locationType}</> : null}
                        </div>
                        {bullets.length > 0 && (
                          <ul className="linkedin2007-entry-bullets">
                            {bullets.map((b, k) => (
                              <li key={k}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Section>
            )}

            {p.education.length > 0 && (
              <Section title="Education">
                <div className="linkedin2007-list">
                  {p.education.map((s, i) => (
                    <div key={`${s.institution}-${i}`} className="linkedin2007-entry">
                      <div className="linkedin2007-entry-title">{s.institution}</div>
                      {(s.degree || s.field) && (
                        <div className="linkedin2007-entry-sub">
                          {[s.degree, s.field].filter(Boolean).join(", ")}
                        </div>
                      )}
                      {(s.startYear || s.endYear) && (
                        <div className="linkedin2007-entry-meta">
                          {s.startYear ?? ""}{s.startYear && s.endYear ? " – " : ""}{s.endYear ?? ""}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {p.skills.length > 0 && (
              <Section title="Skills">
                <div className="linkedin2007-chips">
                  {p.skills.map((s) => (
                    <span key={s.name} className="linkedin2007-chip">
                      {s.name}
                      {s.endorsements ? (
                        <span className="linkedin2007-chip-num">{s.endorsements}</span>
                      ) : null}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {p.certifications.length > 0 && (
              <Section title="Certifications">
                <div className="linkedin2007-list">
                  {p.certifications.map((c, i) => (
                    <div key={`${c.name}-${i}`} className="linkedin2007-entry">
                      <div className="linkedin2007-entry-title">
                        {c.url ? (
                          <a className="linkedin2007-link" href={c.url} target="_blank" rel="noopener noreferrer">
                            {c.name}
                          </a>
                        ) : (
                          c.name
                        )}
                      </div>
                      {c.issuer && <div className="linkedin2007-entry-sub">{c.issuer}</div>}
                      {c.issuedOn && <div className="linkedin2007-entry-meta">Issued {c.issuedOn}</div>}
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {p.languages.length > 0 && (
              <Section title="Languages">
                <ul className="linkedin2007-kv">
                  {p.languages.map((l, i) => (
                    <li key={`${l.name}-${i}`}>
                      <span className="linkedin2007-kv-key">{l.name}</span>
                      {l.proficiency && (
                        <span className="linkedin2007-kv-val"> — {l.proficiency}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {p.honors.length > 0 && (
              <Section title="Honors & Awards">
                <div className="linkedin2007-list">
                  {p.honors.map((h, i) => (
                    <div key={`${h.title}-${i}`} className="linkedin2007-entry">
                      <div className="linkedin2007-entry-title">{h.title}</div>
                      {h.issuer && <div className="linkedin2007-entry-sub">{h.issuer}</div>}
                      {h.issuedOn && <div className="linkedin2007-entry-meta">{h.issuedOn}</div>}
                      {h.description && <p className="linkedin2007-entry-body">{h.description}</p>}
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {p.volunteer.length > 0 && (
              <Section title="Volunteer Experience">
                <div className="linkedin2007-list">
                  {p.volunteer.map((v, i) => (
                    <div key={`${v.organization}-${i}`} className="linkedin2007-entry">
                      <div className="linkedin2007-entry-title">{v.role}</div>
                      <div className="linkedin2007-entry-sub">{v.organization}</div>
                      {(v.startDate || v.endDate) && (
                        <div className="linkedin2007-entry-meta">
                          {v.startDate ?? ""}{v.startDate && v.endDate ? " – " : ""}{v.endDate ?? (v.startDate ? "Present" : "")}
                        </div>
                      )}
                      {Array.isArray(v.description) && v.description.length > 0 && (
                        <ul className="linkedin2007-entry-bullets">
                          {v.description.map((b, k) => <li key={k}>{b}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            )}
          </main>
        </div>

        <footer className="linkedin2007-footer">
          © {new Date().getFullYear()} diogonet · Auto-synced from{" "}
          <a className="linkedin2007-link" href={p.publicProfileUrl} target="_blank" rel="noopener noreferrer">
            {p.publicProfileUrl.replace(/^https?:\/\//, "")}
          </a>
        </footer>
      </div>
    </div>
  );
}

/* ─── Layout helpers ─────────────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="linkedin2007-section">
      <h2 className="linkedin2007-section-head">{title}</h2>
      <div className="linkedin2007-section-body">{children}</div>
    </section>
  );
}

function SidebarBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="linkedin2007-side">
      <h3 className="linkedin2007-side-head">{title}</h3>
      <div className="linkedin2007-side-body">{children}</div>
    </div>
  );
}

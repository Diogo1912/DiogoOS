import Link from "next/link";
import { getLinkedInProfile } from "@/lib/linkedin";
import { apps, social } from "@/lib/data";

export default function LandingPage() {
  const profile = getLinkedInProfile();
  const currentRoles = (profile?.experience ?? [])
    .filter((j) => !j.endDate)
    .slice(0, 3);

  const featuredApps = apps.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="neo-hero neo-bg-dots">
        <div className="neo-container">
          <span className="neo-badge neo-badge--pink neo-hero-eyebrow">
            Based in Amsterdam · Open to chat
          </span>
          <h1>
            Hi, I&apos;m Diogo. I build <mark>products</mark> that
            meet people where they are.
          </h1>
          <p className="neo-hero-lead">
            {profile?.about ??
              "Consumer product builder, AI engineer, and student of computational social science. I make apps and write about ideas at the edge of tech and people."}
          </p>
          <div className="neo-hero-actions">
            <Link href="/apps" className="neo-btn">
              See my apps →
            </Link>
            <Link href="/contact" className="neo-btn neo-btn--neutral">
              Get in touch
            </Link>
            <Link href="/os" className="neo-btn neo-btn--purple">
              Try DiogoOS
            </Link>
          </div>
        </div>
      </section>

      {/* Right now */}
      <section className="neo-section">
        <div className="neo-container">
          <h2>Right now</h2>
          <p className="neo-section-lead">
            What I&apos;m working on this season.
          </p>
          <div className="neo-app-grid">
            {currentRoles.length === 0 && (
              <div className="neo-highlight neo-highlight--yellow">
                <h3 className="text-xl font-extrabold mb-1">Building Storay</h3>
                <p className="text-sm leading-relaxed">
                  A personal inventory app — catalogue everything you own and
                  sell with one link, zero fees.
                </p>
              </div>
            )}
            {currentRoles.map((role, i) => {
              const tones = [
                "neo-highlight--yellow",
                "neo-highlight--blue",
                "neo-highlight--green",
              ];
              return (
                <div key={i} className={`neo-highlight ${tones[i % tones.length]}`}>
                  <span className="neo-badge neo-badge--white">
                    {role.employment ?? "Role"}
                  </span>
                  <h3 className="text-xl font-extrabold mt-3 mb-1">
                    {role.title}
                  </h3>
                  <p className="text-sm font-semibold mb-2">{role.company}</p>
                  {Array.isArray(role.description) &&
                    role.description.length > 0 && (
                      <p className="text-sm leading-relaxed">
                        {role.description[0]}
                      </p>
                    )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured apps */}
      <section className="neo-section">
        <div className="neo-container">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
            <div>
              <h2>Featured apps</h2>
              <p className="neo-section-lead m-0">
                Things I&apos;ve shipped recently.
              </p>
            </div>
            <Link href="/apps" className="neo-btn neo-btn--sm neo-btn--neutral">
              All apps →
            </Link>
          </div>
          <div className="neo-app-grid">
            {featuredApps.map((app) => (
              <a
                key={app.id}
                href={app.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="neo-card neo-card--hover neo-app-card"
              >
                <span
                  className="neo-app-icon"
                  style={{ background: app.color }}
                >
                  {app.name.charAt(0)}
                </span>
                <h3>{app.name}</h3>
                <p>{app.description}</p>
                <div className="neo-app-tags">
                  {app.tags.map((t) => (
                    <span key={t} className="neo-badge neo-badge--white">
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Find me */}
      <section className="neo-section">
        <div className="neo-container">
          <h2>Find me online</h2>
          <p className="neo-section-lead">
            The best places to read me, follow my work, or say hi.
          </p>
          <div className="neo-link-row">
            <a
              className="neo-link-card"
              href={social.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <span
                className="neo-link-card-dot"
                style={{ background: "var(--neo-blue)" }}
              />
              LinkedIn
            </a>
            <a
              className="neo-link-card"
              href={social.github}
              target="_blank"
              rel="noreferrer"
            >
              <span
                className="neo-link-card-dot"
                style={{ background: "var(--neo-purple)" }}
              />
              GitHub
            </a>
            <a
              className="neo-link-card"
              href={social.substack}
              target="_blank"
              rel="noreferrer"
            >
              <span
                className="neo-link-card-dot"
                style={{ background: "var(--neo-orange)" }}
              />
              Substack
            </a>
            <Link className="neo-link-card" href="/contact">
              <span
                className="neo-link-card-dot"
                style={{ background: "var(--neo-green)" }}
              />
              Send me an email
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

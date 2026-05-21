import Link from "next/link";
import { getLinkedInProfile } from "@/lib/linkedin";
import { apps, social } from "@/lib/data";
import { Reveal } from "@/components/neo/Reveal";
import { Marquee } from "@/components/neo/Marquee";
import { PortfolioCard } from "@/components/neo/PortfolioCard";

export default function LandingPage() {
  const profile = getLinkedInProfile();
  const currentRoles = (profile.experience ?? [])
    .filter((j) => !j.endDate)
    .slice(0, 3);

  const marqueeStack = [
    "TypeScript",
    "React",
    "Next.js",
    "Python",
    "FastAPI",
    "LangChain",
    "Postgres",
    "Tailwind",
    "OpenRouter",
    "Anthropic API",
  ];

  const techGroups: { title: string; tone: string; items: string[] }[] = [
    {
      title: "Languages",
      tone: "neo-highlight--yellow",
      items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML/CSS"],
    },
    {
      title: "Frontend",
      tone: "neo-highlight--blue",
      items: ["React", "Next.js", "Vite", "Tailwind CSS", "Framer Motion"],
    },
    {
      title: "Backend & data",
      tone: "neo-highlight--green",
      items: ["FastAPI", "Django", "Node.js", "Postgres", "SQLite", "Redis"],
    },
    {
      title: "AI / ML",
      tone: "neo-highlight--pink",
      items: [
        "Anthropic API",
        "OpenAI API",
        "LangChain",
        "CrewAI",
        "RAG pipelines",
        "LLM-as-judge eval",
      ],
    },
    {
      title: "Tooling",
      tone: "neo-highlight--purple",
      items: ["Git", "Vercel", "Docker", "n8n", "Figma", "Posthog"],
    },
  ];

  const beliefs = [
    {
      tone: "neo-highlight--yellow",
      title: "Tech that meets people where they are",
      body: "Good products don't ask users to change. They slot into the life and habits people already have — and then quietly make them better.",
    },
    {
      tone: "neo-highlight--blue",
      title: "Ship something every week",
      body: "Long roadmaps rot. Small, weekly releases keep the loop tight and the feedback honest.",
    },
    {
      tone: "neo-highlight--pink",
      title: "Generalist > specialist",
      body: "I want to hold the whole stack in my head — research, design, engineering, AI, GTM — even if any one of those is held more deeply by someone else.",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="neo-hero neo-bg-dots">
        <div className="neo-container">
          <h1>
            Hi, I&apos;m Diogo. I build <mark>products</mark> that meet people
            where they are.
          </h1>
          <p className="neo-hero-lead">
            {profile.about ??
              "Consumer product builder, AI engineer, and student of computational social science. I make apps and write about ideas at the edge of tech and people."}
          </p>
          <div className="neo-hero-actions">
            <Link href="/apps" className="neo-btn">
              See my apps →
            </Link>
            <Link href="/cv" className="neo-btn neo-btn--blue">
              Read my CV
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

      {/* Skills marquee */}
      <Marquee items={marqueeStack} tone="yellow" speed={36} />

      {/* Tech I work with */}
      <section className="neo-section">
        <div className="neo-container">
          <Reveal>
            <h2>Tech I work with</h2>
            <p className="neo-section-lead">
              The tools I reach for, grouped by where they sit in the stack.
            </p>
          </Reveal>
          <div className="neo-tech-grid">
            {techGroups.map((g, i) => (
              <Reveal key={g.title} delay={i * 60}>
                <div className={`neo-highlight ${g.tone}`}>
                  <h3 className="neo-tech-title">{g.title}</h3>
                  <div className="neo-chip-row">
                    {g.items.map((it) => (
                      <span key={it} className="neo-chip-mini">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Right now */}
      <section className="neo-section">
        <div className="neo-container">
          <Reveal>
            <h2>Right now</h2>
            <p className="neo-section-lead">
              What I&apos;m working on this season.
            </p>
          </Reveal>
          <div className="neo-app-grid">
            {currentRoles.map((role, i) => {
              const tones = [
                "neo-highlight--yellow",
                "neo-highlight--blue",
                "neo-highlight--green",
              ];
              return (
                <Reveal key={i} delay={i * 80}>
                  <div className={`neo-highlight ${tones[i % tones.length]}`}>
                    <span className="neo-badge neo-badge--white">
                      {role.employment ?? "Role"}
                    </span>
                    <h3
                      style={{
                        fontSize: 22,
                        fontWeight: 900,
                        margin: "12px 0 4px",
                      }}
                    >
                      {role.title}
                    </h3>
                    <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>
                      {role.company}
                    </p>
                    {Array.isArray(role.description) &&
                      role.description.length > 0 && (
                        <p
                          style={{
                            fontSize: 14,
                            lineHeight: 1.55,
                            marginTop: 10,
                          }}
                        >
                          {role.description[0]}
                        </p>
                      )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio — detailed */}
      <section className="neo-section">
        <div className="neo-container">
          <Reveal>
            <h2>Portfolio</h2>
            <p className="neo-section-lead">
              Selected projects — each with the stack, what I built, and where
              to find it.
            </p>
          </Reveal>
          <div className="neo-portfolio-grid">
            {apps.map((app, i) => (
              <Reveal key={app.id} delay={i * 60}>
                <PortfolioCard app={app} index={i} featured={i === 0} />
              </Reveal>
            ))}
          </div>
          <div style={{ marginTop: 28, textAlign: "center" }}>
            <Link href="/apps" className="neo-btn neo-btn--neutral">
              See the full apps page →
            </Link>
          </div>
        </div>
      </section>

      {/* Beliefs */}
      <section className="neo-section">
        <div className="neo-container">
          <Reveal>
            <h2>How I work</h2>
            <p className="neo-section-lead">
              Opinions that shape the things I build.
            </p>
          </Reveal>
          <div className="neo-app-grid">
            {beliefs.map((b, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className={`neo-highlight ${b.tone}`}>
                  <h3
                    style={{
                      fontSize: 20,
                      fontWeight: 900,
                      margin: "0 0 8px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {b.title}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                    {b.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Find me */}
      <section className="neo-section">
        <div className="neo-container">
          <Reveal>
            <h2>Find me online</h2>
            <p className="neo-section-lead">
              The best places to read me, follow my work, or say hi.
            </p>
          </Reveal>
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

import Link from "next/link";
import { apps, social, services, currentlyDoing } from "@/lib/data";
import { Reveal } from "@/components/neo/Reveal";
import { Marquee } from "@/components/neo/Marquee";
import { PortfolioCard } from "@/components/neo/PortfolioCard";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  SubstackIcon,
} from "@/components/neo/BrandIcons";

const CLIENT_WORK_IDS = ["tiredofcancer", "golexai", "storay"];

export default function LandingPage() {
  const clientWork = CLIENT_WORK_IDS
    .map((id) => apps.find((a) => a.id === id))
    .filter(Boolean) as (typeof apps)[number][];

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
            I take on freelance work in <strong>AI automation</strong>,{" "}
            <strong>chatbots &amp; agents</strong>,{" "}
            <strong>websites for small businesses</strong> and{" "}
            <strong>interactive apps</strong> — solo, senior, fixed-fee, most
            engagements ship in 2-6 weeks.
          </p>
          <p
            className="neo-hero-lead"
            style={{ marginTop: 14, color: "#333" }}
          >
            Between client projects I&apos;m building{" "}
            <Link href="https://storay.app" target="_blank" rel="noreferrer">
              <strong>Storay</strong>
            </Link>
            , shipping personal experiments, and finishing my Computational
            Social Science degree at UvA. Hire me for the day-job; the side
            projects are how I stay sharp.
          </p>
          <div className="neo-hero-actions">
            <Link href="/freelance" className="neo-btn">
              Hire me →
            </Link>
            <Link href="/apps" className="neo-btn neo-btn--neutral">
              See my apps
            </Link>
            <Link href="/cv" className="neo-btn neo-btn--neutral">
              Read my CV
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
              What I reach for on client projects — pick anything from here and
              I&apos;ve probably shipped with it.
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

      {/* Recent client work — freelance proof */}
      <section className="neo-section">
        <div className="neo-container">
          <Reveal>
            <div
              className="flex items-end justify-between flex-wrap"
              style={{ gap: 16, marginBottom: 22 }}
            >
              <div>
                <h2>Recent client work</h2>
                <p className="neo-section-lead" style={{ margin: 0 }}>
                  A taste of what an engagement looks like. Full details on the
                  freelance page.
                </p>
              </div>
              <div style={{ display: "inline-flex", gap: 10, flexWrap: "wrap" }}>
                <Link href="/freelance" className="neo-btn neo-btn--sm">
                  See all services →
                </Link>
                <Link
                  href="/apps"
                  className="neo-btn neo-btn--sm neo-btn--neutral"
                >
                  See all projects
                </Link>
              </div>
            </div>
          </Reveal>
          <div className="neo-portfolio-grid">
            {clientWork.map((app, i) => (
              <Reveal key={app.id} delay={i * 60}>
                <PortfolioCard app={app} index={i} featured={false} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div
              style={{
                marginTop: 22,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {services.map((s) => (
                <Link
                  key={s.id}
                  href={`/freelance#services`}
                  className={`neo-chip neo-chip--${
                    ["yellow", "pink", "blue", "green", "purple"].indexOf(s.tone)
                  }`}
                >
                  {s.glyph}&nbsp;&nbsp;{s.title}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Right now — three things I split my time across */}
      <section className="neo-section">
        <div className="neo-container">
          <Reveal>
            <h2>Right now</h2>
            <p className="neo-section-lead">
              Three things I split my time across. The middle one is how to
              hire me — the other two are why it&apos;s worth hiring me.
            </p>
          </Reveal>
          <div className="neo-app-grid">
            {currentlyDoing.map((c, i) => {
              const tone = `neo-highlight--${c.tone}`;
              const inner = (
                <div className={`neo-highlight ${tone}`} style={{ height: "100%" }}>
                  <span className="neo-badge neo-badge--white">
                    {c.label}
                  </span>
                  <h3
                    style={{
                      fontSize: 24,
                      fontWeight: 900,
                      margin: "12px 0 2px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {c.title}
                  </h3>
                  {c.context && (
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        margin: 0,
                        opacity: 0.8,
                      }}
                    >
                      {c.context}
                    </p>
                  )}
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.6,
                      marginTop: 12,
                      marginBottom: 0,
                    }}
                  >
                    {c.body}
                  </p>
                </div>
              );
              return (
                <Reveal key={c.id} delay={i * 80}>
                  {c.href ? (
                    <Link
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                      style={{ display: "block", height: "100%", textDecoration: "none", color: "inherit" }}
                    >
                      {inner}
                    </Link>
                  ) : (
                    inner
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>


      {/* Beliefs */}
      <section className="neo-section">
        <div className="neo-container">
          <Reveal>
            <h2>How I work</h2>
            <p className="neo-section-lead">
              Opinions I bring to every client project, whether it&apos;s an
              hour or a six-week build.
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
              <LinkedInIcon />
              LinkedIn
            </a>
            <a
              className="neo-link-card"
              href={social.github}
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon />
              GitHub
            </a>
            <a
              className="neo-link-card"
              href={social.substack}
              target="_blank"
              rel="noreferrer"
            >
              <SubstackIcon />
              Substack
            </a>
            <Link className="neo-link-card" href="/contact">
              <MailIcon />
              Send me an email
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

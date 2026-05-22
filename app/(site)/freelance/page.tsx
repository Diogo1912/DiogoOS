import Link from "next/link";
import { apps, services } from "@/lib/data";
import { ServiceCard } from "@/components/neo/ServiceCard";
import { PortfolioCard } from "@/components/neo/PortfolioCard";
import { CalEmbed } from "@/components/neo/CalEmbed";
import { Reveal } from "@/components/neo/Reveal";

export const metadata = {
  title: "Hire me · Diogo Baptista",
  description:
    "Freelance services from Diogo Baptista — AI automation, chatbots & agents, small-business websites, interactive apps.",
};

const PROCESS = [
  {
    title: "Discovery call",
    body: "30 minutes, free. We figure out if I'm the right fit and what success looks like.",
    tone: "neo-highlight--yellow",
  },
  {
    title: "Scoped proposal",
    body: "Within 48h: a fixed-fee proposal with deliverables, timeline and what I need from you.",
    tone: "neo-highlight--pink",
  },
  {
    title: "Build in 1-2 week cycles",
    body: "Weekly demos, a shared workspace, and the option to redirect mid-flight if something better shows up.",
    tone: "neo-highlight--blue",
  },
  {
    title: "Handover with docs",
    body: "Source code, runbooks, credentials — everything you need to run it yourself or hand to your team.",
    tone: "neo-highlight--green",
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "How long is a typical engagement?",
    a: "Most projects ship in 2-6 weeks. Anything longer than that, I'll break into milestones so you're not staring at a black box.",
  },
  {
    q: "How do we actually work together?",
    a: "Async-first — shared Notion or Linear, daily updates, weekly demo call. Real-time pairing on request when something gnarly comes up.",
  },
  {
    q: "Where are you and what timezone do you work in?",
    a: "Amsterdam (CET / CEST). I overlap comfortably with the UK, EU and US east coast. Asia and west coast US works for kickoff calls but day-to-day is European hours.",
  },
  {
    q: "Can you sign an NDA?",
    a: "Yes — happy to sign a standard mutual NDA before the discovery call. Send yours over or I'll share a simple one.",
  },
  {
    q: "Who are you a bad fit for?",
    a: "Anything that needs an in-person team, a large existing codebase to babysit long-term, or '10 of you on retainer' setups. Best fit: founders, small teams, agencies needing a sharp specialist for a short window.",
  },
];

export default function FreelancePage() {
  const caseStudies = ["tiredofcancer", "golexai", "storay"]
    .map((id) => apps.find((a) => a.id === id))
    .filter(Boolean) as (typeof apps)[number][];

  return (
    <>
      {/* Hero */}
      <section className="neo-hero neo-bg-dots">
        <div className="neo-container">
          <span className="neo-badge neo-badge--green neo-hero-eyebrow">
            <span className="neo-status-dot" aria-hidden />
            Available for new projects · Amsterdam
          </span>
          <h1>
            I take on <mark>freelance work</mark>. Here&apos;s what I build.
          </h1>
          <p className="neo-hero-lead">
            AI-powered automation, chatbots and agents, beautiful small-business
            websites, and the occasional interactive app or game. Solo, senior,
            ship-shaped — most projects live in 2-6 weeks.
          </p>
          <div className="neo-hero-actions">
            <a href="#book" className="neo-btn">
              Book a discovery call →
            </a>
            <a href="#services" className="neo-btn neo-btn--neutral">
              See services
            </a>
            <a href="#case-studies" className="neo-btn neo-btn--blue">
              Case studies
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="neo-section">
        <div className="neo-container">
          <Reveal>
            <h2>Services</h2>
            <p className="neo-section-lead">
              Four shapes of work, all fixed-fee. Click any service to book a
              call about it.
            </p>
          </Reveal>
          <div className="neo-service-grid">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 60}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="neo-section">
        <div className="neo-container">
          <Reveal>
            <h2>How I work</h2>
            <p className="neo-section-lead">
              No long contracts, no surprise invoices. Four steps from
              &ldquo;hi&rdquo; to ship.
            </p>
          </Reveal>
          <ol className="neo-process">
            {PROCESS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 60} className="neo-process-item">
                <div className={`neo-highlight ${p.tone}`}>
                  <div className="neo-process-step">Step {i + 1}</div>
                  <h3 className="neo-process-title">{p.title}</h3>
                  <p className="neo-process-body">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Case studies */}
      <section id="case-studies" className="neo-section">
        <div className="neo-container">
          <Reveal>
            <h2>What it looks like in practice</h2>
            <p className="neo-section-lead">
              Recent client and product work — each with the stack and what
              actually shipped.
            </p>
          </Reveal>
          <div className="neo-portfolio-grid">
            {caseStudies.map((app, i) => (
              <Reveal key={app.id} delay={i * 60}>
                <PortfolioCard app={app} index={i} featured={i === 0} />
              </Reveal>
            ))}
          </div>
          <div style={{ marginTop: 22, textAlign: "center" }}>
            <Link href="/apps" className="neo-btn neo-btn--sm neo-btn--neutral">
              See all projects →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="neo-section">
        <div className="neo-container">
          <Reveal>
            <h2>FAQ</h2>
            <p className="neo-section-lead">
              The things people ask before saying yes.
            </p>
          </Reveal>
          <div className="neo-faq">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i * 40}>
                <details className="neo-faq-item">
                  <summary>
                    <span>{f.q}</span>
                    <span className="neo-faq-chev" aria-hidden>
                      +
                    </span>
                  </summary>
                  <p>{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="neo-section">
        <div className="neo-container">
          <Reveal>
            <h2>Book a call</h2>
            <p className="neo-section-lead">
              Pick a slot below — discovery calls are free, 30 minutes, no
              prep needed. Prefer email?{" "}
              <Link href="/contact" style={{ fontWeight: 700 }}>
                Head over to /contact
              </Link>
              .
            </p>
          </Reveal>
          <div className="freelance-book-grid">
            <div style={{ minWidth: 0 }}>
              <CalEmbed title="Pick a slot — discovery calls are free" />
            </div>
            <aside className="freelance-book-aside">
              <div className="neo-highlight neo-highlight--yellow">
                <h3
                  style={{
                    margin: "0 0 8px",
                    fontSize: 18,
                    fontWeight: 900,
                    letterSpacing: "-0.01em",
                  }}
                >
                  What to expect
                </h3>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 18,
                    fontSize: 14,
                    lineHeight: 1.6,
                  }}
                >
                  <li>30 minutes, on Cal Video.</li>
                  <li>You walk me through the problem.</li>
                  <li>I tell you honestly if I&apos;m the right fit.</li>
                  <li>If yes, a fixed-fee proposal lands within 48h.</li>
                </ul>
              </div>
              <div className="neo-highlight neo-highlight--blue">
                <h3
                  style={{
                    margin: "0 0 8px",
                    fontSize: 18,
                    fontWeight: 900,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Free, no commitment
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    lineHeight: 1.6,
                  }}
                >
                  Discovery calls are always free. Nothing to pay, nothing
                  to sign, nothing to send beforehand.
                </p>
              </div>
            </aside>
          </div>
          <style>{`
            .freelance-book-grid {
              display: grid;
              gap: 28px;
              grid-template-columns: minmax(0, 1fr) 300px;
              align-items: start;
            }
            .freelance-book-aside {
              display: grid;
              gap: 14px;
            }
            @media (max-width: 900px) {
              .freelance-book-grid { grid-template-columns: 1fr; }
            }
          `}</style>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { ContactForm } from "@/components/neo/ContactForm";
import { CalEmbed } from "@/components/neo/CalEmbed";
import { profile, social } from "@/lib/data";

export const metadata = {
  title: "Contact · Diogo Baptista",
  description:
    "Get in touch — email, LinkedIn, GitHub, Substack, or book a meeting on Cal.com.",
};

export default function ContactPage() {
  return (
    <section className="neo-section">
      <div className="neo-container">
        <span className="neo-badge neo-badge--green neo-hero-eyebrow">
          Inbox open
        </span>
        <h2 style={{ marginTop: 12 }}>Get in touch</h2>
        <p className="neo-section-lead">
          Three ways to reach me. Pick whichever fits.{" "}
          <Link href="/freelance" style={{ fontWeight: 700 }}>
            Freelance work? → /freelance
          </Link>
        </p>

        {/* Cal.com first — it's the fastest path */}
        <CalEmbed title="Book a 30-minute call ☎" />

        <div
          style={{
            display: "grid",
            gap: 32,
            gridTemplateColumns: "minmax(0, 1fr) 280px",
            alignItems: "start",
            marginTop: 32,
          }}
          className="contact-grid"
        >
          <div>
            <h3
              style={{
                fontSize: 22,
                fontWeight: 900,
                margin: "0 0 18px",
                letterSpacing: "-0.01em",
              }}
            >
              Or send an email
            </h3>
            <ContactForm />
          </div>

          <aside style={{ display: "grid", gap: 14 }}>
            <div className="neo-highlight neo-highlight--yellow">
              <div className="neo-label" style={{ marginBottom: 4 }}>
                Email
              </div>
              <a
                href={`mailto:${profile.email}`}
                style={{ fontWeight: 700, fontSize: 15, wordBreak: "break-all" }}
              >
                {profile.email}
              </a>
            </div>
            <div className="neo-link-row" style={{ gridTemplateColumns: "1fr" }}>
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
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

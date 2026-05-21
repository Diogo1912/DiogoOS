import { ContactForm } from "@/components/neo/ContactForm";
import { profile, social } from "@/lib/data";

export const metadata = {
  title: "Contact · Diogo Baptista",
  description: "Get in touch — email, LinkedIn, GitHub, or Substack.",
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
          Quickest way to reach me is email. The form below just composes the
          message and opens your mail client — no servers, no spam, nothing
          stored.
        </p>

        <div
          style={{
            display: "grid",
            gap: 32,
            gridTemplateColumns: "minmax(0, 1fr) 280px",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          <ContactForm to={profile.email} />

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

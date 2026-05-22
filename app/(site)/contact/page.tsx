import Link from "next/link";
import { ContactForm } from "@/components/neo/ContactForm";
import { CalEmbed } from "@/components/neo/CalEmbed";
import {
  GitHubIcon,
  LinkedInIcon,
  SubstackIcon,
} from "@/components/neo/BrandIcons";
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
        <h2>Get in touch</h2>
        <p className="neo-section-lead">
          Three ways to reach me. Pick whichever fits.{" "}
          <Link href="/freelance" style={{ fontWeight: 700 }}>
            Freelance work? → /freelance
          </Link>
        </p>

        {/* Left: Cal.com (compact) + email/socials underneath. Right: email form */}
        <div className="contact-grid">
          <div className="contact-left">
            <CalEmbed title="Book a 30-minute call ☎" compact />

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

            <div className="neo-link-row" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
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
            </div>
          </div>

          <div className="contact-right">
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
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          gap: 32px;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          align-items: start;
          margin-top: 28px;
        }
        .contact-left {
          display: grid;
          gap: 16px;
          min-width: 0;
        }
        .contact-right {
          min-width: 0;
        }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

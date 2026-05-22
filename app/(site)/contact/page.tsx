import { ContactForm } from "@/components/neo/ContactForm";
import { CalEmbed } from "@/components/neo/CalEmbed";
import {
  GitHubIcon,
  LinkedInIcon,
  SubstackIcon,
} from "@/components/neo/BrandIcons";
import { social } from "@/lib/data";

export const metadata = {
  title: "Contact · Diogo Baptista",
  description:
    "Get in touch — book a meeting on Cal.com or drop me a message.",
};

export default function ContactPage() {
  return (
    <section className="neo-section">
      <div className="neo-container">
        <h2>Get in touch</h2>

        {/* Left: Cal.com booking. Right: email form + socials underneath */}
        <div className="contact-grid">
          <div className="contact-left">
            <CalEmbed title="Book a 30-minute call ☎" compact />
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

            <div
              className="neo-link-row"
              style={{
                gridTemplateColumns: "1fr 1fr 1fr",
                marginTop: 22,
              }}
            >
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
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          gap: 32px;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          align-items: start;
          margin-top: 22px;
        }
        .contact-left,
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

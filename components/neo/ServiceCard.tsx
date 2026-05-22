import type { Service } from "@/lib/data";

interface Props {
  service: Service;
  /** Anchor to scroll to when the primary CTA is clicked. */
  ctaAnchor?: string;
}

export function ServiceCard({ service, ctaAnchor = "#book" }: Props) {
  return (
    <article className={`neo-service neo-service--${service.tone}`}>
      <header className="neo-service-head">
        <span className="neo-service-glyph" aria-hidden>
          {service.glyph}
        </span>
        <div>
          <h3 className="neo-service-title">{service.title}</h3>
          <p className="neo-service-tagline">{service.tagline}</p>
        </div>
      </header>

      <div className="neo-service-body">
        <p className="neo-service-desc">{service.description}</p>

        <div className="neo-service-section-label">What you get</div>
        <ul className="neo-service-deliverables">
          {service.deliverables.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>

        <div className="neo-service-stack">
          {service.stack.map((s) => (
            <span key={s} className="neo-portfolio-stack-chip">
              {s}
            </span>
          ))}
        </div>
      </div>

      <footer className="neo-service-foot">
        <div className="neo-service-price">
          <span className="neo-service-price-from">{service.priceFrom}</span>
          {service.priceNote && (
            <span className="neo-service-price-note">{service.priceNote}</span>
          )}
        </div>
        <a href={ctaAnchor} className="neo-btn neo-btn--sm">
          Book a call →
        </a>
      </footer>
    </article>
  );
}

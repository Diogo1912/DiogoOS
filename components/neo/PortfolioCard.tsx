"use client";

import type { App } from "@/lib/data";

const TONES = [
  "var(--neo-yellow)",
  "var(--neo-pink)",
  "var(--neo-blue)",
  "var(--neo-green)",
  "var(--neo-purple)",
];

export function PortfolioCard({
  app,
  index,
  featured,
}: {
  app: App;
  index: number;
  featured?: boolean;
}) {
  const accent = TONES[index % TONES.length];
  return (
    <article className={`neo-portfolio ${featured ? "neo-portfolio--featured" : ""}`}>
      <header
        className="neo-portfolio-head"
        style={{ background: accent }}
      >
        <div className="neo-portfolio-head-left">
          <span
            className="neo-portfolio-mark"
            style={{ background: app.color }}
            aria-hidden
          >
            {app.name.charAt(0)}
          </span>
          <div>
            <h3 className="neo-portfolio-title">{app.name}</h3>
            {app.status && (
              <span className="neo-portfolio-status">{app.status}</span>
            )}
          </div>
        </div>
        <div className="neo-portfolio-head-right">
          {app.badge && (
            <span className="neo-badge neo-badge--white">{app.badge}</span>
          )}
        </div>
      </header>

      <div className="neo-portfolio-body">
        <p className="neo-portfolio-desc">
          {app.longDescription ?? app.description}
        </p>

        {app.highlights && app.highlights.length > 0 && (
          <ul className="neo-portfolio-highlights">
            {app.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        )}

        {app.stack && app.stack.length > 0 && (
          <div className="neo-portfolio-stack">
            {app.stack.map((s) => (
              <span key={s} className="neo-portfolio-stack-chip">
                {s}
              </span>
            ))}
          </div>
        )}

        <div className="neo-portfolio-actions">
          <a
            href={app.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="neo-btn neo-btn--sm"
          >
            Visit live ↗
          </a>
          {app.sourceUrl && (
            <a
              href={app.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="neo-btn neo-btn--sm neo-btn--neutral"
            >
              Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

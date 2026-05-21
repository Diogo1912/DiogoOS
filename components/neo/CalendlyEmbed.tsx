"use client";

import { useEffect, useState } from "react";

const DEFAULT_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/diogo-baptista";

/**
 * Inline Calendly booking widget, wrapped in a neobrutalist card. Reads
 * `NEXT_PUBLIC_CALENDLY_URL` so it stays in sync with the DiogoOS iCal
 * mini-app's booking link.
 */
export function CalendlyEmbed({ title = "Book a time" }: { title?: string }) {
  const [host, setHost] = useState<string>("");

  useEffect(() => {
    setHost(window.location.hostname);
  }, []);

  const params = new URLSearchParams({
    embed_type: "Inline",
    embed_domain: host || "localhost",
    hide_gdpr_banner: "1",
    primary_color: "0a0a0a",
    text_color: "1a1a1a",
    background_color: "ffffff",
  });

  return (
    <div className="neo-calendly">
      <div className="neo-calendly-head">{title}</div>
      <iframe
        src={`${DEFAULT_URL}?${params.toString()}`}
        title="Book a meeting with Diogo"
        loading="lazy"
      />
    </div>
  );
}

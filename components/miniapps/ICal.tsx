"use client";

import { MiniAppFrame } from "@/components/os/MiniAppFrame";

/**
 * Booking window — was a fake iCal calendar; now embeds the user's real
 * Calendly so visitors can book a meeting. Wears DiogoOS window chrome
 * around Calendly's official inline widget (iframe).
 *
 * Set NEXT_PUBLIC_CALENDLY_URL to your booking page URL, e.g.
 *   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/diogo-baptista/30min
 * If unset, falls back to a stub URL that just opens calendly.com.
 */
const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/diogo-baptista";

export function ICal() {
  // Hide Calendly's own page header (we have our own window title bar)
  // and hide the GDPR cookie banner so the embed sits cleanly inside
  // our chrome. These are official Calendly query params for inline embeds.
  const embedUrl = withParams(CALENDLY_URL, {
    embed_domain: typeof window !== "undefined" ? window.location.hostname : "diogonet.com",
    embed_type: "Inline",
    hide_gdpr_banner: "1",
    hide_event_type_details: "0",
    primary_color: "1168aa",
    text_color: "1d1d1f",
    background_color: "ffffff",
  });

  return (
    <MiniAppFrame
      id="ical"
      title="Book a meeting"
      width={720}
      height={620}
      bodyClassName=""
    >
      <div className="w-full h-full bg-white">
        <iframe
          src={embedUrl}
          title="Book a meeting with Diogo"
          className="w-full h-full"
          style={{ border: "none", minHeight: 560 }}
          loading="lazy"
        />
      </div>
    </MiniAppFrame>
  );
}

function withParams(url: string, params: Record<string, string>): string {
  try {
    const u = new URL(url);
    Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v));
    return u.toString();
  } catch {
    return url;
  }
}

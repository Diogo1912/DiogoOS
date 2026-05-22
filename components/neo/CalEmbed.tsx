"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

const DEFAULT_LINK =
  process.env.NEXT_PUBLIC_CAL_LINK ?? "diogobap/30min";

/**
 * Inline Cal.com booking widget, wrapped in a neobrutalist card. Reads
 * `NEXT_PUBLIC_CAL_LINK` (format: "username/event-slug") so the booking
 * link stays in one place.
 */
export function CalEmbed({ title = "Book a time" }: { title?: string }) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "inline" });
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#0a0a0a",
            "cal-text": "#0a0a0a",
            "cal-bg": "#ffffff",
            "cal-border": "#0a0a0a",
            "cal-border-emphasis": "#0a0a0a",
          },
          dark: {
            "cal-brand": "#ffffff",
            "cal-text": "#ffffff",
            "cal-bg": "#0a0a0a",
            "cal-border": "#ffffff",
            "cal-border-emphasis": "#ffffff",
          },
        },
      });
    })();
  }, []);

  return (
    <div className="neo-cal-embed">
      <div className="neo-cal-embed-head">{title}</div>
      <div className="neo-cal-embed-frame">
        <Cal
          namespace="inline"
          calLink={DEFAULT_LINK}
          style={{ width: "100%", height: "100%", overflow: "scroll" }}
          config={{ layout: "month_view" }}
        />
      </div>
    </div>
  );
}

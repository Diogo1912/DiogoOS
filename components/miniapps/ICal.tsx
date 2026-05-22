"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { MiniAppFrame } from "@/components/os/MiniAppFrame";

/**
 * Booking window inside DiogoOS — embeds Cal.com wrapped in our window
 * chrome. Reads `NEXT_PUBLIC_CAL_LINK` (e.g. "diogobap/30min") so the
 * link stays in one place.
 */
const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? "diogobap/30min";

export function ICal() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "ical-mini" });
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <MiniAppFrame
      id="ical"
      title="Book a meeting"
      width={720}
      height={620}
      bodyClassName=""
    >
      <div className="w-full h-full bg-white" style={{ overflow: "auto" }}>
        <Cal
          namespace="ical-mini"
          calLink={CAL_LINK}
          style={{ width: "100%", height: "100%", overflow: "scroll" }}
          config={{ layout: "month_view" }}
        />
      </div>
    </MiniAppFrame>
  );
}

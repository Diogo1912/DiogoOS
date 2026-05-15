"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOS } from "@/components/os/OSProvider";

/**
 * `/` entry. In OS mode this is a deep-link → launch the Browser
 * mini-app and replace the URL with `/desktop`. In flat / mobile mode
 * we leave the URL alone so FlatSite can read the path and render the
 * right content inline. Waits for OSProvider's hydration to finish so
 * we don't redirect on stale defaults.
 */
export default function HomeEntry() {
  const router = useRouter();
  const { launchMiniApp, flatMode, isMobile, hydrated } = useOS();

  useEffect(() => {
    if (!hydrated) return;
    if (flatMode || isMobile) return;
    launchMiniApp("browser");
    router.replace("/desktop");
  }, [launchMiniApp, router, flatMode, isMobile, hydrated]);

  return null;
}

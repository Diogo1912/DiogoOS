"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOS } from "@/components/os/OSProvider";

/**
 * `/os` entry — deep-link that opens the Browser mini-app and lands the
 * URL on `/os/desktop`. Waits for OSProvider hydration so we don't act
 * on stale defaults.
 */
export default function HomeEntry() {
  const router = useRouter();
  const { launchMiniApp, hydrated } = useOS();

  useEffect(() => {
    if (!hydrated) return;
    launchMiniApp("browser");
    router.replace("/os/desktop");
  }, [launchMiniApp, router, hydrated]);

  return null;
}

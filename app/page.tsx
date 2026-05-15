"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOS } from "@/components/os/OSProvider";

/**
 * `/` now just deep-links to "open the Browser mini-app". The actual UI
 * lives in components/miniapps/Browser.tsx and is mounted by MiniAppHost
 * so it can coexist with other open apps. We redirect to `/desktop` so
 * the URL stays clean (the dock + open windows do the rest).
 */
export default function HomeEntry() {
  const router = useRouter();
  const { launchMiniApp } = useOS();

  useEffect(() => {
    launchMiniApp("browser");
    router.replace("/desktop");
  }, [launchMiniApp, router]);

  return null;
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOS } from "@/components/os/OSProvider";

export default function ContactEntry() {
  const router = useRouter();
  const { launchMiniApp, flatMode, isMobile, hydrated } = useOS();
  useEffect(() => {
    if (!hydrated) return;
    if (flatMode || isMobile) return;
    launchMiniApp("ichat");
    router.replace("/desktop");
  }, [launchMiniApp, router, flatMode, isMobile, hydrated]);
  return null;
}

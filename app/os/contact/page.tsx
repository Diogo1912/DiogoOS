"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOS } from "@/components/os/OSProvider";

export default function ContactEntry() {
  const router = useRouter();
  const { launchMiniApp, hydrated } = useOS();
  useEffect(() => {
    if (!hydrated) return;
    launchMiniApp("ichat");
    router.replace("/os/desktop");
  }, [launchMiniApp, router, hydrated]);
  return null;
}

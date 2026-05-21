"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOS } from "@/components/os/OSProvider";

export default function BlogEntry() {
  const router = useRouter();
  const { launchMiniApp, hydrated } = useOS();
  useEffect(() => {
    if (!hydrated) return;
    launchMiniApp("blogapp");
    router.replace("/os/desktop");
  }, [launchMiniApp, router, hydrated]);
  return null;
}

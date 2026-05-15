"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOS } from "@/components/os/OSProvider";

export default function ContactEntry() {
  const router = useRouter();
  const { launchMiniApp } = useOS();
  useEffect(() => {
    launchMiniApp("ichat");
    router.replace("/desktop");
  }, [launchMiniApp, router]);
  return null;
}

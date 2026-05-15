"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOS } from "@/components/os/OSProvider";

export default function AppsEntry() {
  const router = useRouter();
  const { launchMiniApp } = useOS();
  useEffect(() => {
    launchMiniApp("appstore");
    router.replace("/desktop");
  }, [launchMiniApp, router]);
  return null;
}

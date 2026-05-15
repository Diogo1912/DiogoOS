"use client";

import { useOS } from "./OSProvider";
import { Finder } from "@/components/miniapps/Finder";
import { Calculator } from "@/components/miniapps/Calculator";
import { Terminal } from "@/components/miniapps/Terminal";
import { ICal } from "@/components/miniapps/ICal";
import { Snake } from "@/components/miniapps/Snake";
import { Browser } from "@/components/miniapps/Browser";
import { AppStore } from "@/components/miniapps/AppStore";
import { BlogApp } from "@/components/miniapps/BlogApp";
import { IChat } from "@/components/miniapps/IChat";
/** Renders all currently-open mini-apps as floating windows. */
export function MiniAppHost() {
  const { miniApps } = useOS();
  const ids = miniApps.map((a) => a.id);

  return (
    <>
      {ids.includes("browser") && <Browser />}
      {ids.includes("appstore") && <AppStore />}
      {ids.includes("blogapp") && <BlogApp />}
      {ids.includes("ichat") && <IChat />}
      {ids.includes("finder") && <Finder />}
      {ids.includes("calculator") && <Calculator />}
      {ids.includes("terminal") && <Terminal />}
      {ids.includes("ical") && <ICal />}
      {ids.includes("snake") && <Snake />}
    </>
  );
}

"use client";

import { useOS } from "./OSProvider";
import { Finder } from "@/components/miniapps/Finder";
import { Calculator } from "@/components/miniapps/Calculator";
import { Terminal } from "@/components/miniapps/Terminal";
import { ICal } from "@/components/miniapps/ICal";
import { Snake } from "@/components/miniapps/Snake";
/** Renders all currently-open mini-apps as floating windows. */
export function MiniAppHost() {
  const { miniApps } = useOS();
  const ids = miniApps.map((a) => a.id);

  return (
    <>
      {ids.includes("finder") && <Finder />}
      {ids.includes("calculator") && <Calculator />}
      {ids.includes("terminal") && <Terminal />}
      {ids.includes("ical") && <ICal />}
      {ids.includes("snake") && <Snake />}
    </>
  );
}

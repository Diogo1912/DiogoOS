"use client";

import { useOS } from "./OSProvider";

const WALLPAPER_BG: Record<string, string> = {
  custom: "url('/wallpaper.jpg') center / cover no-repeat",
  aurora:
    "radial-gradient(ellipse at 50% 40%, #b86fd9 0%, #4a2884 30%, #1a0d3a 70%, #0a0518 100%)",
  aqua:
    "radial-gradient(ellipse at 50% 30%, #79b6ec 0%, #2a72c4 40%, #103a82 100%)",
  space:
    "radial-gradient(ellipse at 60% 40%, #2e1a4d 0%, #0c0820 60%, #000000 100%)",
  stones:
    "radial-gradient(ellipse at 50% 50%, #8a8074 0%, #4a443d 60%, #2a2620 100%)",
};

/**
 * Renders the desktop wallpaper as a full-screen layer. Reacts to wallpaper
 * changes from OSProvider. Captures right-click to open the context menu.
 */
export function DesktopBackground() {
  const { wallpaper, showContextMenu, photoBoothOn } = useOS();
  const bg = WALLPAPER_BG[wallpaper] ?? WALLPAPER_BG.custom;

  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        background: bg,
        filter: photoBoothOn
          ? "hue-rotate(180deg) saturate(2) contrast(1.2)"
          : undefined,
        transition: "filter 600ms ease, background 800ms ease",
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        showContextMenu(e.clientX, e.clientY);
      }}
    />
  );
}

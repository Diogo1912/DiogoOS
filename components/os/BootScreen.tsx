"use client";

import { useEffect, useState } from "react";
import { SmileyLogo } from "@/components/icons";

const KEY = "diogoos:booted";

/**
 * First-load boot screen. White screen with smiley face fade-in, then
 * fades away after 2.5s. Skipped on subsequent visits via localStorage.
 */
export function BootScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) return; // already booted this session
    setVisible(true);
    sessionStorage.setItem(KEY, "1");
    const t = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
      style={{ animation: "boot-fade 2.5s ease-in-out forwards" }}
      onClick={() => setVisible(false)}
    >
      <SmileyLogo className="w-28 h-28" />
      <div className="mt-12 w-44 h-1 rounded-full overflow-hidden bg-gray-200">
        <div
          className="h-full bg-gray-400"
          style={{ animation: "boot-progress 2.2s ease-out forwards" }}
        />
      </div>
      <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-gray-400">
        Starting DiogoOS…
      </p>
      <style>{`
        @keyframes boot-progress {
          from { width: 0; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}

"use client";

import { useOS } from "./OSProvider";
import { SmileyLogo } from "@/components/icons";

export function AboutModal() {
  const { aboutOpen, closeAbout } = useOS();
  if (!aboutOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center"
      onClick={closeAbout}
    >
      <div className="absolute inset-0 bg-black/15" />
      <div
        className="relative mac-shadow rounded-xl overflow-hidden w-[360px]"
        style={{
          background: "linear-gradient(to bottom, #f4f4f4 0%, #d9d9d9 100%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="window-titlebar h-7 flex items-center justify-center text-[12px] font-semibold text-gray-700 relative">
          <button
            onClick={closeAbout}
            className="absolute left-2 w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] hover:brightness-110"
            aria-label="Close"
          />
          About DiogoOS
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col items-center text-center">
          <SmileyLogo className="w-16 h-16" />
          <h2
            className="text-[22px] font-bold mt-3 tracking-tight"
            style={{ color: "#1d1d1f" }}
          >
            DiogoOS
          </h2>
          <p className="text-[11px] text-gray-600 mt-0.5">
            Version 10.5.8 (Snow Diogo)
          </p>

          <div className="mt-5 w-full grid grid-cols-[110px_1fr] gap-x-3 gap-y-1.5 text-[11px] text-left">
            <span className="text-gray-500 text-right">Processor</span>
            <span className="text-gray-900 font-medium">2.4 GHz Diogo Duo</span>
            <span className="text-gray-500 text-right">Memory</span>
            <span className="text-gray-900 font-medium">2 GB · 667 MHz DDR2</span>
            <span className="text-gray-500 text-right">Startup Disk</span>
            <span className="text-gray-900 font-medium">Macintosh HD</span>
            <span className="text-gray-500 text-right">Serial Number</span>
            <span className="text-gray-900 font-medium tabular-nums">
              W8919DGO2025
            </span>
            <span className="text-gray-500 text-right">Built</span>
            <span className="text-gray-900 font-medium">Lisbon, 2026</span>
          </div>

          <button
            onClick={closeAbout}
            className="aqua-button mt-6 px-4 py-1 rounded-full text-white text-[12px] font-semibold"
          >
            More Info…
          </button>

          <p className="text-[9px] text-gray-400 mt-5 italic">
            DiogoOS is a fan tribute. Not affiliated with Apple Inc.
          </p>
        </div>
      </div>
    </div>
  );
}

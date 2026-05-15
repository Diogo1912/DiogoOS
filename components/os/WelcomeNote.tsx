"use client";

import { useEffect, useRef, useState } from "react";
import { useOS } from "./OSProvider";

/**
 * First-load welcome window. Styled like a yellow sticky/Notes window with a
 * legal-pad rule. Closable via the red traffic light (sets a localStorage
 * flag so it doesn't reappear on the next visit). Re-openable from the
 * smiley menu (`openWelcome`).
 */
export function WelcomeNote() {
  const { welcomeOpen, closeWelcome, flatMode } = useOS();

  // Position state (draggable)
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const dragRef = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  // Initial centred position on first mount
  useEffect(() => {
    const w = 360;
    const h = 320;
    setPos({
      x: Math.max(16, window.innerWidth / 2 - w / 2),
      y: Math.max(48, window.innerHeight / 2 - h / 2 - 30),
    });
    setReady(true);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      const d = dragRef.current;
      if (!d) return;
      const nx = Math.min(window.innerWidth - 80, Math.max(-200, d.ox + e.clientX - d.sx));
      const ny = Math.min(window.innerHeight - 80, Math.max(24, d.oy + e.clientY - d.sy));
      setPos({ x: nx, y: ny });
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  if (!welcomeOpen || flatMode || !ready) return null;

  return (
    <div
      className="fixed mac-shadow rounded-xl overflow-hidden flex flex-col"
      style={{
        top: pos.y,
        left: pos.x,
        width: 360,
        zIndex: 55,
      }}
    >
      {/* Title bar */}
      <div
        className="window-titlebar h-7 flex items-center px-2.5 flex-shrink-0 select-none relative"
        onMouseDown={(e) => {
          if ((e.target as HTMLElement).closest("[data-traffic-light]")) return;
          dragRef.current = { sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y };
          setDragging(true);
        }}
        style={{ cursor: dragging ? "grabbing" : "grab" }}
      >
        <div className="flex items-center gap-[5px]" data-traffic-light>
          <button
            onClick={closeWelcome}
            className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] border border-[#e0443e] hover:brightness-110"
            aria-label="Close welcome"
          />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] border border-[#d4a017] opacity-60" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] border border-[#1aab29] opacity-60" />
        </div>
        <div className="absolute inset-x-0 flex justify-center pointer-events-none">
          <span
            className="text-[12px] font-semibold text-gray-600 tracking-tight"
            style={{ textShadow: "0 1px 0 rgba(255,255,255,0.6)" }}
          >
            Welcome.txt
          </span>
        </div>
      </div>

      {/* Notes-style body */}
      <div
        className="bg-[#fff8d0] text-[#3a2f0a] text-[13px] leading-[22px] px-5 py-4"
        style={{
          fontFamily: '"Marker Felt", "Brush Script MT", "Comic Sans MS", cursive',
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 21px, rgba(120,100,0,0.18) 21px, rgba(120,100,0,0.18) 22px)",
        }}
      >
        <p className="font-bold mb-2 text-[15px]">Hi — welcome to DiogoOS!</p>
        <p>
          This is my personal website pretending to be a tiny operating system.
        </p>
        <p className="mt-2">
          <b>Things to try:</b>
        </p>
        <ul className="list-disc list-inside space-y-[2px]">
          <li>Click the <b>dock</b> icons</li>
          <li>Open <b>Finder</b> to browse everything</li>
          <li>Hit <b>⌘ Space</b> for Spotlight</li>
          <li>Right-click the wallpaper</li>
        </ul>
        <p className="mt-3 text-[11px] text-[#5a4a00]">
          Prefer something plainer? Click <b>“Convert to a normal website”</b>{" "}
          (bottom-right) for a flat scrolling version.
        </p>
      </div>
    </div>
  );
}

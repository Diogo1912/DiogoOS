"use client";

import { useEffect, useRef, useState } from "react";
import { useOS } from "./OSProvider";

const STORAGE = "diogoos:sticky-pos";

export function Stickies() {
  const { stickiesOpen, setStickiesOpen } = useOS();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(
    null
  );
  const [mounted, setMounted] = useState(false);

  // Default pos top-right, hydrate from localStorage
  useEffect(() => {
    setMounted(true);
    const raw = localStorage.getItem(STORAGE);
    if (raw) {
      try {
        const p = JSON.parse(raw);
        if (typeof p.x === "number" && typeof p.y === "number") {
          setPos(p);
          return;
        }
      } catch {}
    }
    setPos({
      x: Math.max(0, window.innerWidth - 280),
      y: 60,
    });
  }, []);

  // Persist
  useEffect(() => {
    if (mounted) localStorage.setItem(STORAGE, JSON.stringify(pos));
  }, [pos, mounted]);

  const onDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("[data-sticky-close]")) return;
    e.preventDefault();
    dragRef.current = { sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y };
    setDragging(true);
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      const d = dragRef.current;
      if (!d) return;
      const nx = Math.max(-100, Math.min(window.innerWidth - 80, d.ox + e.clientX - d.sx));
      const ny = Math.max(24, Math.min(window.innerHeight - 80, d.oy + e.clientY - d.sy));
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

  if (!mounted || !stickiesOpen) return null;

  return (
    <div
      className="fixed z-[20] w-[240px] sticky-note select-none"
      style={{
        top: pos.y,
        left: pos.x,
        cursor: dragging ? "grabbing" : "grab",
        transform: `rotate(${dragging ? 0 : -2.5}deg)`,
        transition: dragging ? "none" : "transform 200ms ease",
      }}
      onMouseDown={onDown}
    >
      <div className="flex items-center justify-between px-2 py-1 sticky-header">
        <span className="text-[10px] font-bold text-[#a48700] uppercase tracking-wider">
          Stickies
        </span>
        <button
          data-sticky-close
          onClick={() => setStickiesOpen(false)}
          className="w-3 h-3 rounded-full bg-[#a48700]/70 hover:bg-[#a48700] flex items-center justify-center text-[8px] text-white"
          aria-label="Close sticky"
        >
          ×
        </button>
      </div>
      <div
        className="px-3 py-3 text-[13px] leading-snug"
        style={{
          fontFamily: '"Marker Felt", "Brush Script MT", "Comic Sans MS", cursive',
          color: "#3a2f0a",
        }}
      >
        <p className="font-semibold mb-1 text-[14px]">Hi — welcome to DiogoOS!</p>
        <p className="text-[12px]">
          This is my personal website pretending to be a tiny operating system.
        </p>
        <p className="text-[12px] mt-2 font-semibold">Things to try:</p>
        <ul className="text-[12px] list-disc list-inside leading-snug">
          <li>Click the dock icons</li>
          <li>Open <b>Finder</b> to browse everything</li>
          <li>
            Hit <kbd className="bg-yellow-200/70 px-1 rounded text-[10px]">⌘ Space</kbd> for Spotlight
          </li>
          <li>Right-click the wallpaper</li>
        </ul>
        <p className="text-[11px] mt-2 text-[#5a4a00]">
          Prefer something plainer? Click <b>&ldquo;Convert to a normal website&rdquo;</b>{" "}
          (bottom-right) for a flat scrolling version.
        </p>
        <p className="text-[10px] mt-2 text-[#7a6018] italic">
          — drag me anywhere
        </p>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

const POS_KEY = "diogoos:resume-pos";

interface Props {
  /** Coordinates of the Trash dock icon — used to detect drop-on-trash */
  onTrashHit?: () => void;
}

export function ResumeFile({ onTrashHit }: Props) {
  const [pos, setPos] = useState({ x: 24, y: 60 });
  const [origin, setOrigin] = useState({ x: 24, y: 60 });
  const [dragging, setDragging] = useState(false);
  const [bouncing, setBouncing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const dragRef = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(
    null
  );

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(POS_KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (typeof p.x === "number" && typeof p.y === "number") {
          setPos(p);
          setOrigin(p);
          return;
        }
      }
    } catch {}
    setOrigin({ x: 24, y: 60 });
  }, []);

  useEffect(() => {
    if (!dragging && mounted) {
      localStorage.setItem(POS_KEY, JSON.stringify(pos));
    }
  }, [dragging, mounted, pos]);

  const onDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragRef.current = { sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y };
    setDragging(true);
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      const d = dragRef.current;
      if (!d) return;
      setPos({
        x: Math.max(-30, Math.min(window.innerWidth - 60, d.ox + e.clientX - d.sx)),
        y: Math.max(24, Math.min(window.innerHeight - 90, d.oy + e.clientY - d.sy)),
      });
    };
    const onUp = (e: MouseEvent) => {
      setDragging(false);
      // Check if dropped over trash icon (last dock item, bottom center-ish right)
      const trashEl = document.querySelector('[data-trash]');
      if (trashEl) {
        const r = trashEl.getBoundingClientRect();
        const inside =
          e.clientX >= r.left &&
          e.clientX <= r.right &&
          e.clientY >= r.top &&
          e.clientY <= r.bottom;
        if (inside) {
          // Bulge the trash + show toast, then fly back
          setBouncing(true);
          onTrashHit?.();
          setToast("Don't throw away my career! Resume returning to desktop…");
          setTimeout(() => {
            setPos(origin);
            setBouncing(false);
            setTimeout(() => setToast(null), 1500);
          }, 700);
        }
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging, onTrashHit, origin]);

  const onDoubleClick = () => {
    // Trigger download via anchor click. If Resume.pdf doesn't exist
    // the browser will simply 404 — non-blocking easter egg.
    const a = document.createElement("a");
    a.href = "/Resume.pdf";
    a.download = "Diogo-Baptista-Resume.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setToast("Downloading Resume.pdf…");
    setTimeout(() => setToast(null), 1800);
  };

  if (!mounted) return null;

  return (
    <>
      <div
        className="fixed z-[18] w-16 flex flex-col items-center text-center select-none"
        style={{
          top: pos.y,
          left: pos.x,
          cursor: dragging ? "grabbing" : "grab",
          transition: dragging ? "none" : "top 400ms cubic-bezier(0.34,1.56,0.64,1), left 400ms cubic-bezier(0.34,1.56,0.64,1)",
          filter: dragging ? "brightness(1.1)" : undefined,
        }}
        onMouseDown={onDown}
        onDoubleClick={onDoubleClick}
        title="Double-click to download · Drag me anywhere"
      >
        {/* File icon: white sheet with folded corner + "PDF" badge */}
        <svg viewBox="0 0 48 56" className="w-12 h-14 drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]">
          <path d="M4 2 L30 2 L44 16 L44 52 Q44 54 42 54 L6 54 Q4 54 4 52 Z" fill="#ffffff" stroke="#888" strokeWidth="0.5"/>
          <path d="M30 2 L30 14 Q30 16 32 16 L44 16 Z" fill="#dddddd" stroke="#888" strokeWidth="0.5"/>
          {/* Lines */}
          <line x1="9" y1="24" x2="38" y2="24" stroke="#cfcfcf" strokeWidth="1"/>
          <line x1="9" y1="28" x2="38" y2="28" stroke="#cfcfcf" strokeWidth="1"/>
          <line x1="9" y1="32" x2="38" y2="32" stroke="#cfcfcf" strokeWidth="1"/>
          <line x1="9" y1="36" x2="28" y2="36" stroke="#cfcfcf" strokeWidth="1"/>
          {/* PDF badge */}
          <rect x="8" y="42" width="22" height="9" rx="1.5" fill="#d83a16"/>
          <text x="19" y="49" textAnchor="middle" fontFamily="Helvetica" fontSize="6.5" fontWeight="bold" fill="white">PDF</text>
        </svg>
        <span
          className="text-[10px] font-medium text-white mt-1 px-1 rounded-sm leading-tight"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
        >
          Resume.pdf
        </span>
      </div>

      {/* Bounce toast */}
      {toast && (
        <div
          className="fixed bottom-[100px] left-1/2 -translate-x-1/2 z-[80] px-4 py-2 rounded-lg text-white text-[12px] font-medium"
          style={{
            background: "rgba(20,20,20,0.88)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          }}
        >
          {toast}
        </div>
      )}

      {bouncing && (
        <style>{`[data-trash] { animation: dock-bounce 0.7s ease; }`}</style>
      )}
    </>
  );
}

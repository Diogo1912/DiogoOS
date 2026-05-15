"use client";

import { useEffect, useState } from "react";
import { MiniAppFrame } from "@/components/os/MiniAppFrame";

const KEY = "diogoos:notes-content";
const DEFAULT = `Welcome to Notes!

Some things to remember:
- Cmd + Space opens Spotlight
- Right-click the desktop for wallpaper
- Drag the title bar to move me around
- I'll save what you type here, even after reload

Try writing a haiku.
`;

export function Notes() {
  const [text, setText] = useState(DEFAULT);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(KEY);
    if (saved !== null) setText(saved);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem(KEY, text);
  }, [text, mounted]);

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  return (
    <MiniAppFrame id="notes" title="Notes" width={420}>
      <div className="bg-[#fff8d0] flex flex-col" style={{ height: 380 }}>
        {/* Toolbar */}
        <div className="px-3 py-1 bg-gradient-to-b from-[#fbe88a] to-[#e9c722] border-b border-[#b89500] text-[11px] font-semibold text-[#5a4a00] flex items-center gap-3">
          <span>Untitled.txt</span>
          <span className="ml-auto tabular-nums">{words} words</span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-transparent text-[13px] leading-relaxed p-4 resize-none outline-none text-[#3a2f0a]"
          style={{
            fontFamily:
              '"Marker Felt", "Brush Script MT", "Comic Sans MS", cursive',
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0px, transparent 23px, rgba(120,100,0,0.18) 23px, rgba(120,100,0,0.18) 24px)",
            lineHeight: "24px",
          }}
          spellCheck={false}
        />
      </div>
    </MiniAppFrame>
  );
}

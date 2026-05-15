"use client";

import { MiniAppFrame } from "@/components/os/MiniAppFrame";

const BARS = 28;

export function ITunesViz() {
  return (
    <MiniAppFrame id="itunes" title="iTunes" width={400}>
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, #4a2a8a 0%, #1a0c3a 60%, #000000 100%)",
          height: 280,
        }}
      >
        {/* Track info */}
        <div className="px-3 pt-2 pb-1 text-white text-[12px] font-bold flex items-center justify-between">
          <div>
            <div>Now Playing</div>
            <div className="text-[10px] text-white/60 italic">
              Diogo&apos;s Mix · Track 03
            </div>
          </div>
          <div className="flex gap-2 text-white/60 text-[14px]">
            <button>⏮</button>
            <button className="text-white">⏸</button>
            <button>⏭</button>
          </div>
        </div>

        {/* Equalizer bars */}
        <div className="absolute bottom-0 left-0 right-0 h-[220px] flex items-end gap-0.5 px-2 pb-2">
          {Array.from({ length: BARS }).map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm"
              style={{
                background:
                  "linear-gradient(to top, #ff5da9 0%, #b86fd9 50%, #6dbeff 100%)",
                height: `${20 + Math.random() * 75}%`,
                animation: `viz-bar ${0.6 + Math.random() * 0.8}s ease-in-out ${
                  Math.random() * 0.5
                }s infinite alternate`,
                opacity: 0.95,
              }}
            />
          ))}
        </div>

        {/* Scanlines for that CRT visualizer feel */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 3px)",
          }}
        />

        <style>{`
          @keyframes viz-bar {
            from { transform: scaleY(0.35); }
            to { transform: scaleY(1); }
          }
        `}</style>
      </div>
    </MiniAppFrame>
  );
}

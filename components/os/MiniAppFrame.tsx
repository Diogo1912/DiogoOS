"use client";

import { useEffect, useRef, useState } from "react";
import { MiniAppId, useOS } from "./OSProvider";

interface Props {
  id: MiniAppId;
  title: string;
  width?: number;
  height?: number | "auto";
  children: React.ReactNode;
  /** Optional inline style for the body */
  bodyClassName?: string;
  /** Optional secondary toolbar rendered between title bar and content
   *  (e.g. the BrowserChrome URL pill on the Browser mini-app). */
  toolbar?: React.ReactNode;
}

/**
 * Draggable window frame for routeless mini-apps. Reads/writes position via
 * OSProvider so multiple mini-apps can stay open at once.
 */
export function MiniAppFrame({
  id,
  title,
  width = 360,
  height = "auto",
  children,
  bodyClassName,
  toolbar,
}: Props) {
  const { miniApps, focusMiniApp, closeMiniApp, moveMiniApp, focusedMiniApp } =
    useOS();
  const state = miniApps.find((a) => a.id === id);

  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(
    null
  );

  // Local resize state — overrides `width`/`height` props once the user
  // starts dragging the bottom-right grip.
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [resizing, setResizing] = useState(false);
  const resizeRef = useRef<{ sx: number; sy: number; ow: number; oh: number } | null>(
    null
  );

  useEffect(() => {
    if (!resizing) return;
    const onMove = (e: MouseEvent) => {
      const r = resizeRef.current;
      if (!r) return;
      const w = Math.max(260, r.ow + (e.clientX - r.sx));
      const h = Math.max(180, r.oh + (e.clientY - r.sy));
      setSize({ w, h });
    };
    const onUp = () => setResizing(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [resizing]);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      const d = dragRef.current;
      if (!d || !state) return;
      const nx = Math.min(window.innerWidth - 80, Math.max(-200, d.ox + e.clientX - d.sx));
      const ny = Math.min(window.innerHeight - 100, Math.max(24, d.oy + e.clientY - d.sy));
      moveMiniApp(id, nx, ny);
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging, id, moveMiniApp, state]);

  if (!state) return null;

  const isFocused = focusedMiniApp === id;

  const effW = size?.w ?? width;
  const effH = size?.h ?? (height === "auto" ? undefined : height);

  return (
    <div
      className="fixed mac-shadow rounded-xl overflow-hidden flex flex-col"
      style={{
        top: state.y,
        left: state.x,
        width: effW,
        height: effH,
        zIndex: state.z,
      }}
      onMouseDown={() => focusMiniApp(id)}
    >
      {/* Title bar */}
      <div
        className={`window-titlebar h-7 flex items-center px-2.5 flex-shrink-0 select-none relative ${
          !isFocused ? "opacity-80 grayscale-[0.3]" : ""
        }`}
        onMouseDown={(e) => {
          if ((e.target as HTMLElement).closest("[data-traffic-light]")) return;
          dragRef.current = {
            sx: e.clientX,
            sy: e.clientY,
            ox: state.x,
            oy: state.y,
          };
          setDragging(true);
        }}
        style={{ cursor: dragging ? "grabbing" : "grab" }}
      >
        <div className="flex items-center gap-[5px]" data-traffic-light>
          <button
            onClick={() => closeMiniApp(id)}
            className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] border border-[#e0443e] hover:brightness-110"
            aria-label="Close"
          />
          <button
            disabled
            className="w-2.5 h-2.5 rounded-full bg-[#febc2e] border border-[#d4a017] opacity-60"
            aria-label="Minimize"
          />
          <button
            disabled
            className="w-2.5 h-2.5 rounded-full bg-[#28c840] border border-[#1aab29] opacity-60"
            aria-label="Zoom"
          />
        </div>
        <div className="absolute inset-x-0 flex justify-center pointer-events-none">
          <span
            className="text-[12px] font-semibold text-gray-600 tracking-tight"
            style={{ textShadow: "0 1px 0 rgba(255,255,255,0.6)" }}
          >
            {title}
          </span>
        </div>
      </div>

      {/* Optional toolbar (browser chrome, etc.) */}
      {toolbar}

      {/* Body */}
      <div className={`flex-1 min-h-0 overflow-auto ${bodyClassName ?? "window-body"}`}>
        {children}
      </div>

      {/* Resize grip — bottom-right diagonal pinstripes */}
      <div
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          focusMiniApp(id);
          resizeRef.current = {
            sx: e.clientX,
            sy: e.clientY,
            ow: effW,
            oh: typeof effH === "number" ? effH : 320,
          };
          setResizing(true);
        }}
        aria-label="Resize"
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-10 select-none"
        style={{
          background:
            "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.18) 56%, transparent 56%, transparent 64%, rgba(0,0,0,0.18) 64%, rgba(0,0,0,0.18) 70%, transparent 70%, transparent 78%, rgba(0,0,0,0.18) 78%, rgba(0,0,0,0.18) 84%, transparent 84%)",
        }}
      />
    </div>
  );
}

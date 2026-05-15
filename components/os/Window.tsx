"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useWindowManager } from "./WindowManager";

interface WindowProps {
  /** Stable id — usually the route path */
  id: string;
  title: string;
  children: React.ReactNode;
  /** Route to navigate to when the window is closed. Defaults to /desktop
   *  (an empty desktop) so closing a route-window doesn't auto-open
   *  another one. */
  closeHref?: string;
  /** Optional className passed to the inner content area */
  bodyClassName?: string;
  /** Optional secondary toolbar rendered between title bar and content (e.g. browser chrome) */
  toolbar?: React.ReactNode;
}

/**
 * Draggable, focusable, minimizable window. Replaces MacWindow.
 * Title bar can be grabbed to drag; traffic lights are wired to real actions.
 */
export function Window({
  id,
  title,
  children,
  closeHref = "/desktop",
  bodyClassName,
  toolbar,
}: WindowProps) {
  const router = useRouter();
  const {
    ensureOpen,
    close,
    minimize,
    toggleMaximize,
    focus,
    move,
    getWindow,
    focusedId,
  } = useWindowManager();

  // Register window on mount; re-register when route/title changes
  useEffect(() => {
    ensureOpen(id, title);
  }, [id, title, ensureOpen]);

  const state = getWindow(id);
  const isFocused = focusedId === id;
  const isMinimizing = state?.mode === "closing";
  const isMaximized = state?.mode === "maximized";
  const isMinimized = state?.mode === "minimized";

  // ─── Drag state ────────────────────────────────
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(
    null
  );
  const [dragging, setDragging] = useState(false);

  const onTitleBarMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    if ((e.target as HTMLElement).closest("[data-traffic-light]")) return;
    e.preventDefault();
    focus(id);
    if (!state) return;
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: state.x,
      origY: state.y,
    };
    setDragging(true);
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      const d = dragRef.current;
      if (!d) return;
      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;
      // Constrain to viewport: keep title bar visible
      const maxX = window.innerWidth - 80;
      const minY = 24; // menu bar
      const maxY = window.innerHeight - 100;
      const newX = Math.min(maxX, Math.max(-200, d.origX + dx));
      const newY = Math.min(maxY, Math.max(minY, d.origY + dy));
      move(id, newX, newY);
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging, id, move]);

  // ─── Traffic light handlers ────────────────────
  const handleClose = () => {
    close(id);
    router.push(closeHref);
  };
  const handleMinimize = () => minimize(id);
  const handleMaximize = () => toggleMaximize(id);

  if (!state) {
    // Initial render before ensureOpen has populated state — render off-screen
    return null;
  }

  // ─── Style: maximized fills the desktop area; minimized hides ──
  const style: React.CSSProperties = isMaximized
    ? {
        top: 24,
        bottom: 90,
        left: 12,
        right: 12,
        width: "auto",
        height: "auto",
        zIndex: state.z,
      }
    : {
        top: state.y,
        left: state.x,
        width: state.width,
        maxHeight: `calc(100vh - 24px - 90px - 24px)`,
        zIndex: state.z,
      };

  return (
    <div
      className={`fixed flex flex-col mac-shadow rounded-xl overflow-hidden transition-opacity ${
        isMinimized ? "opacity-0 pointer-events-none scale-0 origin-bottom" : ""
      } ${isMinimizing ? "animate-genie" : ""}`}
      style={{
        ...style,
        transition: dragging ? "none" : "opacity 250ms ease, transform 350ms cubic-bezier(0.6, -0.05, 0.4, 1.05)",
        transform: isMinimized ? "translateY(50vh) scale(0.05)" : undefined,
      }}
      onMouseDown={() => focus(id)}
    >
      {/* Title bar */}
      <div
        className={`window-titlebar h-8 flex items-center px-3 flex-shrink-0 select-none relative ${
          !isFocused ? "opacity-80 grayscale-[0.3]" : ""
        }`}
        onMouseDown={onTitleBarMouseDown}
        onDoubleClick={handleMaximize}
        style={{ cursor: dragging ? "grabbing" : "grab" }}
      >
        <div className="flex items-center gap-[6px] group/lights" data-traffic-light>
          <button
            onClick={handleClose}
            className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] flex items-center justify-center hover:brightness-110 transition-all focus:outline-none"
            aria-label="Close window"
          >
            <span className="opacity-0 group-hover/lights:opacity-100 text-[7px] text-[#6e1a18] font-bold leading-none select-none">
              ×
            </span>
          </button>
          <button
            onClick={handleMinimize}
            className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d4a017] flex items-center justify-center hover:brightness-110 transition-all focus:outline-none"
            aria-label="Minimize window"
          >
            <span className="opacity-0 group-hover/lights:opacity-100 text-[7px] text-[#6e5400] font-bold leading-none select-none">
              −
            </span>
          </button>
          <button
            onClick={handleMaximize}
            className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] flex items-center justify-center hover:brightness-110 transition-all focus:outline-none"
            aria-label="Toggle full size"
          >
            <span className="opacity-0 group-hover/lights:opacity-100 text-[7px] text-[#0c5c1c] font-bold leading-none select-none">
              +
            </span>
          </button>
        </div>

        <div className="absolute inset-x-0 flex justify-center pointer-events-none">
          <span
            className="text-[13px] font-semibold text-gray-600 tracking-tight"
            style={{ textShadow: "0 1px 0 rgba(255,255,255,0.6)" }}
          >
            {title}
          </span>
        </div>

        <div className="ml-auto w-[54px]" />
      </div>

      {/* Optional toolbar (browser chrome, etc.) */}
      {toolbar}

      {/* Content */}
      <div
        className={`flex-1 overflow-y-auto min-h-0 ${bodyClassName ?? "window-body"}`}
      >
        {children}
      </div>
    </div>
  );
}

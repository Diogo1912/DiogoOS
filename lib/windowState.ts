export type WindowMode = "normal" | "minimized" | "maximized" | "closing";

export interface WindowState {
  /** Stable id for this window — usually the route */
  id: string;
  /** Display title shown in the title bar */
  title: string;
  /** Top-left position of the window on the desktop */
  x: number;
  y: number;
  /** Width / height (used for resize support; px) */
  width: number;
  height: number;
  /** Stacking order — higher means more on top */
  z: number;
  /** Current display mode */
  mode: WindowMode;
}

export const DEFAULT_WINDOW_SIZE = { width: 880, height: 620 };

/**
 * Compute a sensible centered initial position for a freshly opened window.
 * Offsets each subsequent window slightly so they cascade.
 */
export function defaultPosition(stackIndex: number) {
  if (typeof window === "undefined") {
    return { x: 80 + stackIndex * 24, y: 60 + stackIndex * 24 };
  }
  const cx = Math.max(20, (window.innerWidth - DEFAULT_WINDOW_SIZE.width) / 2);
  const cy = Math.max(40, (window.innerHeight - DEFAULT_WINDOW_SIZE.height) / 2);
  return { x: cx + stackIndex * 22, y: cy + stackIndex * 22 };
}

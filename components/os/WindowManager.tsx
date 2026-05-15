"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  DEFAULT_WINDOW_SIZE,
  WindowMode,
  WindowState,
  defaultPosition,
} from "@/lib/windowState";

interface WindowManagerCtx {
  /** All currently registered windows (open, minimized, etc.) */
  windows: WindowState[];
  /** Id of the currently focused window, or null */
  focusedId: string | null;
  /** Register or focus a window — called by the Window component on mount */
  ensureOpen: (id: string, title: string) => void;
  /** Close + unregister */
  close: (id: string) => void;
  /** Minimize (genie effect handled in the Window component) */
  minimize: (id: string) => void;
  /** Restore from minimized */
  restore: (id: string) => void;
  /** Toggle maximized */
  toggleMaximize: (id: string) => void;
  /** Bring to front */
  focus: (id: string) => void;
  /** Update position after drag */
  move: (id: string, x: number, y: number) => void;
  /** Lookup helper */
  getWindow: (id: string) => WindowState | undefined;
}

const Ctx = createContext<WindowManagerCtx | null>(null);

export function useWindowManager() {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error("useWindowManager must be used inside <WindowManagerProvider>");
  return ctx;
}

export function WindowManagerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const zCounter = useRef(10);

  const ensureOpen = useCallback((id: string, title: string) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      zCounter.current += 1;
      if (existing) {
        // bring to front + restore if minimized
        return prev.map((w) =>
          w.id === id
            ? { ...w, z: zCounter.current, mode: w.mode === "minimized" ? "normal" : w.mode, title }
            : w
        );
      }
      const pos = defaultPosition(prev.length);
      return [
        ...prev,
        {
          id,
          title,
          x: pos.x,
          y: pos.y,
          width: DEFAULT_WINDOW_SIZE.width,
          height: DEFAULT_WINDOW_SIZE.height,
          z: zCounter.current,
          mode: "normal" as WindowMode,
        },
      ];
    });
    setFocusedId(id);
  }, []);

  const close = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setFocusedId((prev) => (prev === id ? null : prev));
  }, []);

  const minimize = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, mode: "minimized" } : w))
    );
    setFocusedId((prev) => (prev === id ? null : prev));
  }, []);

  const restore = useCallback((id: string) => {
    zCounter.current += 1;
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, mode: "normal", z: zCounter.current } : w
      )
    );
    setFocusedId(id);
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, mode: w.mode === "maximized" ? "normal" : "maximized" }
          : w
      )
    );
  }, []);

  const focus = useCallback((id: string) => {
    zCounter.current += 1;
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, z: zCounter.current } : w))
    );
    setFocusedId(id);
  }, []);

  const move = useCallback((id: string, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, x, y } : w))
    );
  }, []);

  const getWindow = useCallback(
    (id: string) => windows.find((w) => w.id === id),
    [windows]
  );

  /** Keyboard: Cmd/Ctrl+W closes the focused window */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isCmd = e.metaKey || e.ctrlKey;
      if (isCmd && e.key.toLowerCase() === "w" && focusedId) {
        e.preventDefault();
        close(focusedId);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [focusedId, close]);

  const value = useMemo<WindowManagerCtx>(
    () => ({
      windows,
      focusedId,
      ensureOpen,
      close,
      minimize,
      restore,
      toggleMaximize,
      focus,
      move,
      getWindow,
    }),
    [windows, focusedId, ensureOpen, close, minimize, restore, toggleMaximize, focus, move, getWindow]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

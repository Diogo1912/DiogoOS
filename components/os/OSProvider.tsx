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

export type WallpaperId = "custom" | "aurora" | "aqua" | "space" | "stones";

/** Routeless "in-OS" mini-apps. */
export type MiniAppId =
  | "finder"
  | "calculator"
  | "terminal"
  | "ical"
  | "snake"
  | "launchpad"
  | "textedit"
  | "welcome"
  // Former route apps — now mini-apps so multiple can coexist
  | "browser"
  | "appstore"
  | "blogapp"
  | "ichat";

export interface MiniAppState {
  id: MiniAppId;
  x: number;
  y: number;
  z: number;
  minimized: boolean;
}

interface OSContextValue {
  // Menu / overlays
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  toggleMenu: () => void;

  aboutOpen: boolean;
  openAbout: () => void;
  closeAbout: () => void;

  wallpaperPickerOpen: boolean;
  openWallpaperPicker: () => void;
  closeWallpaperPicker: () => void;

  spotlightOpen: boolean;
  openSpotlight: () => void;
  closeSpotlight: () => void;

  contextMenu: { x: number; y: number } | null;
  showContextMenu: (x: number, y: number) => void;
  hideContextMenu: () => void;

  // Wallpaper
  wallpaper: WallpaperId;
  setWallpaper: (id: WallpaperId) => void;

  // Photo booth (Konami easter egg)
  photoBoothOn: boolean;
  toggleBooth: () => void;

  // Stickies
  stickiesOpen: boolean;
  setStickiesOpen: (v: boolean) => void;

  // Welcome notes window (first-load greeting)
  welcomeOpen: boolean;
  closeWelcome: () => void;
  openWelcome: () => void;

  // Viewport breakpoint — true on phones / narrow tablets.
  isMobile: boolean;

  // True once the provider has read its persisted state from localStorage.
  hydrated: boolean;

  // Mini-apps
  miniApps: MiniAppState[];
  focusedMiniApp: MiniAppId | null;
  launchMiniApp: (id: MiniAppId) => void;
  closeMiniApp: (id: MiniAppId) => void;
  focusMiniApp: (id: MiniAppId) => void;
  moveMiniApp: (id: MiniAppId, x: number, y: number) => void;
}

const Ctx = createContext<OSContextValue | null>(null);

export function useOS() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useOS must be inside <OSProvider>");
  return v;
}

// v3: forces a one-time reset so older browser state can't pin the wallpaper
// to a gradient instead of /wallpaper.jpg.
const WALLPAPER_KEY = "diogoos:wallpaper:v3";
const STICKIES_KEY = "diogoos:stickies-open";
const WELCOME_KEY = "diogoos:welcome-closed";
export function OSProvider({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [wallpaperPickerOpen, setWPOpen] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(
    null
  );
  const [wallpaper, setWPState] = useState<WallpaperId>("custom");
  const [photoBoothOn, setBooth] = useState(false);
  const [stickiesOpen, setStickiesOpen] = useState(true);
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [miniApps, setMiniApps] = useState<MiniAppState[]>([]);
  const [focusedMiniApp, setFocusedMiniApp] = useState<MiniAppId | null>(null);
  const miniZ = useRef(40);

  const launchMiniApp = useCallback((id: MiniAppId) => {
    setMiniApps((prev) => {
      miniZ.current += 1;
      const existing = prev.find((a) => a.id === id);
      if (existing) {
        return prev.map((a) =>
          a.id === id ? { ...a, minimized: false, z: miniZ.current } : a
        );
      }
      const offset = prev.length * 28;
      return [
        ...prev,
        {
          id,
          x: 140 + offset,
          y: 90 + offset,
          z: miniZ.current,
          minimized: false,
        },
      ];
    });
    setFocusedMiniApp(id);
  }, []);

  const closeMiniApp = useCallback((id: MiniAppId) => {
    setMiniApps((prev) => prev.filter((a) => a.id !== id));
    setFocusedMiniApp((prev) => (prev === id ? null : prev));
  }, []);

  const focusMiniApp = useCallback((id: MiniAppId) => {
    miniZ.current += 1;
    setMiniApps((prev) =>
      prev.map((a) => (a.id === id ? { ...a, z: miniZ.current } : a))
    );
    setFocusedMiniApp(id);
  }, []);

  const moveMiniApp = useCallback((id: MiniAppId, x: number, y: number) => {
    setMiniApps((prev) =>
      prev.map((a) => (a.id === id ? { ...a, x, y } : a))
    );
  }, []);

  // Hydrate persisted state
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = localStorage.getItem(WALLPAPER_KEY) as WallpaperId | null;
    if (w && ["custom", "aurora", "aqua", "space", "stones"].includes(w)) {
      setWPState(w);
    }
    const st = localStorage.getItem(STICKIES_KEY);
    if (st === "false") setStickiesOpen(false);
    const wc = localStorage.getItem(WELCOME_KEY);
    if (wc === "1") setWelcomeOpen(false);
    setHydrated(true);
  }, []);

  // Apply wallpaper via data-attr on <html>
  useEffect(() => {
    document.documentElement.dataset.wallpaper = wallpaper;
    localStorage.setItem(WALLPAPER_KEY, wallpaper);
  }, [wallpaper]);

  useEffect(() => {
    localStorage.setItem(STICKIES_KEY, stickiesOpen ? "true" : "false");
  }, [stickiesOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(WELCOME_KEY, welcomeOpen ? "0" : "1");
  }, [welcomeOpen]);

  // Track viewport breakpoint for iOS / macOS shell selection
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => {
      setIsMobile(mq.matches);
      document.documentElement.dataset.mobile = mq.matches ? "1" : "0";
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const closeWelcome = useCallback(() => setWelcomeOpen(false), []);
  const openWelcome = useCallback(() => setWelcomeOpen(true), []);

  const setWallpaper = useCallback((id: WallpaperId) => setWPState(id), []);
  const openAbout = useCallback(() => {
    setAboutOpen(true);
    setMenuOpen(false);
  }, []);
  const closeAbout = useCallback(() => setAboutOpen(false), []);
  const openWallpaperPicker = useCallback(() => {
    setWPOpen(true);
    setMenuOpen(false);
    setContextMenu(null);
  }, []);
  const closeWallpaperPicker = useCallback(() => setWPOpen(false), []);
  const openSpotlight = useCallback(() => setSpotlightOpen(true), []);
  const closeSpotlight = useCallback(() => setSpotlightOpen(false), []);
  const showContextMenu = useCallback((x: number, y: number) => {
    setContextMenu({ x, y });
  }, []);
  const hideContextMenu = useCallback(() => setContextMenu(null), []);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);
  const toggleBooth = useCallback(() => setBooth((v) => !v), []);

  // ─── Global keyboard ───────────────────────────────────────
  useEffect(() => {
    const KONAMI = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a",
    ];
    let buffer: string[] = [];

    const onKey = (e: KeyboardEvent) => {
      const isCmd = e.metaKey || e.ctrlKey;
      // Cmd/Ctrl+Space → Spotlight
      if (isCmd && e.code === "Space") {
        e.preventDefault();
        setSpotlightOpen((v) => !v);
        return;
      }
      // Escape closes any overlay
      if (e.key === "Escape") {
        setSpotlightOpen(false);
        setAboutOpen(false);
        setWPOpen(false);
        setMenuOpen(false);
        setContextMenu(null);
        return;
      }

      // Konami sequence
      const k = e.key;
      buffer.push(k);
      buffer = buffer.slice(-KONAMI.length);
      if (buffer.length === KONAMI.length &&
          buffer.every((c, i) => c.toLowerCase() === KONAMI[i].toLowerCase())) {
        setBooth(true);
        buffer = [];
        setTimeout(() => setBooth(false), 5000);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Dismiss menu/context-menu on outside click (but not when clicking the
  // trigger itself or anything inside the dropdown).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest("[data-os-menu-trigger]")) return;
      if (t.closest(".menu-dropdown")) return;
      setMenuOpen(false);
      setContextMenu(null);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  const value = useMemo<OSContextValue>(
    () => ({
      menuOpen, setMenuOpen, toggleMenu,
      aboutOpen, openAbout, closeAbout,
      wallpaperPickerOpen, openWallpaperPicker, closeWallpaperPicker,
      spotlightOpen, openSpotlight, closeSpotlight,
      contextMenu, showContextMenu, hideContextMenu,
      wallpaper, setWallpaper,
      photoBoothOn, toggleBooth,
      stickiesOpen, setStickiesOpen,
      welcomeOpen, closeWelcome, openWelcome,
      isMobile, hydrated,
      miniApps, focusedMiniApp,
      launchMiniApp, closeMiniApp, focusMiniApp, moveMiniApp,
    }),
    [
      menuOpen, toggleMenu,
      aboutOpen, openAbout, closeAbout,
      wallpaperPickerOpen, openWallpaperPicker, closeWallpaperPicker,
      spotlightOpen, openSpotlight, closeSpotlight,
      contextMenu, showContextMenu, hideContextMenu,
      wallpaper, setWallpaper,
      photoBoothOn, toggleBooth,
      stickiesOpen,
      welcomeOpen, closeWelcome, openWelcome,
      isMobile, hydrated,
      miniApps, focusedMiniApp,
      launchMiniApp, closeMiniApp, focusMiniApp, moveMiniApp,
    ]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

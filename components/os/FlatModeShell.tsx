"use client";

import { useOS } from "./OSProvider";
import { WindowManagerProvider } from "./WindowManager";
import { FlatSite } from "./FlatSite";
import { FlatModeToggle } from "./FlatModeToggle";

interface Props {
  /** Desktop / DiogoOS view */
  os: React.ReactNode;
  /** Children to render inside the flat scrolling site (the page) */
  flat: React.ReactNode;
}

/**
 * Top-level chooser. When `flatMode` is off, renders the full OS shell.
 * When on, hides the desktop and renders the flat site wrapping the page
 * children. We still wrap in WindowManagerProvider so the pages' <Window>
 * components (which call useWindowManager) don't crash — global CSS strips
 * their absolute/chrome styling in flat mode.
 */
export function FlatModeShell({ os, flat }: Props) {
  const { flatMode } = useOS();

  if (flatMode) {
    return (
      <WindowManagerProvider>
        <FlatSite>{flat}</FlatSite>
      </WindowManagerProvider>
    );
  }

  return (
    <>
      {os}
      <FlatModeToggle />
    </>
  );
}

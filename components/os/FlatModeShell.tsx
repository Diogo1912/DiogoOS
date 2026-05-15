"use client";

import { useOS } from "./OSProvider";
import { WindowManagerProvider } from "./WindowManager";
import { FlatSite } from "./FlatSite";
import { FlatModeToggle } from "./FlatModeToggle";

interface Props {
  /** Desktop / DiogoOS view (only used when not in flat or mobile) */
  os: React.ReactNode;
  /** Unused; kept for backwards-compat with layout.tsx call site. */
  flat: React.ReactNode;
}

/**
 * Top-level chooser:
 *   - mobile (any width ≤ 768): always renders the flat site (the user
 *     asked for the "normal website" everywhere on phones).
 *   - flatMode true on desktop: renders the flat site.
 *   - otherwise: renders the full DiogoOS desktop shell.
 *
 * The `flat` children prop is no longer used — FlatSite reads pathname
 * and renders the right content directly. Kept in the signature so
 * layout.tsx doesn't need to change shape.
 */
export function FlatModeShell({ os }: Props) {
  const { flatMode, isMobile } = useOS();

  if (isMobile || flatMode) {
    return (
      <WindowManagerProvider>
        <FlatSite />
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

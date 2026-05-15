"use client";

import { useOS } from "./OSProvider";
import { FlatSite } from "./FlatSite";
import { FlatModeToggle } from "./FlatModeToggle";

/**
 * Picks the right outer shell based on `flatMode`:
 *   - OS mode → just renders the children (the existing desktop overlays in
 *     layout.tsx do the heavy lifting). Also drops in a small FlatModeToggle
 *     pill at the bottom-right.
 *   - Flat mode → wraps the children in <FlatSite/> (its own header/nav/
 *     footer/toggle) and hides the OS chrome via [data-flat="1"] in CSS.
 */
export function LayoutSwitcher({ children }: { children: React.ReactNode }) {
  const { flatMode } = useOS();

  if (flatMode) {
    return <FlatSite>{children}</FlatSite>;
  }

  return (
    <>
      {children}
      <FlatModeToggle />
    </>
  );
}

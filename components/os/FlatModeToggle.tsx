"use client";

import { useOS } from "./OSProvider";

/**
 * Floating bottom-right pill. Switches between the desktop ("DiogoOS") view
 * and a flat scrolling website. Persists choice via OSProvider →
 * localStorage.
 */
export function FlatModeToggle() {
  const { flatMode, toggleFlatMode } = useOS();

  return (
    <button
      onClick={toggleFlatMode}
      className="flat-toggle"
      aria-label={flatMode ? "Switch back to DiogoOS" : "Convert to a normal website"}
      title={flatMode ? "Switch back to DiogoOS" : "Convert to a normal website"}
    >
      <span className="flat-toggle-icon" aria-hidden>
        {flatMode ? "⌘" : "≡"}
      </span>
      <span className="flat-toggle-label">
        {flatMode ? "Back to DiogoOS" : "Convert to a normal website"}
      </span>
    </button>
  );
}

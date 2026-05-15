"use client";

import { useOS } from "./OSProvider";

/**
 * Floating bottom-right pill. Two parts:
 *   - the main pill button toggles between OS view and the flat site,
 *   - a smaller round X on the right dismisses the pill for the
 *     session. The pill can be re-enabled from the smiley menu's
 *     "Convert to a normal website…" entry.
 */
export function FlatModeToggle() {
  const { flatMode, toggleFlatMode, togglePillVisible, dismissTogglePill } = useOS();

  if (!togglePillVisible) return null;

  return (
    <div className="flat-toggle-wrap" role="group" aria-label="Site mode">
      <button
        onClick={toggleFlatMode}
        className="flat-toggle"
        aria-label={flatMode ? "Switch back to DiogoOS" : "Convert to a normal website"}
      >
        <span className="flat-toggle-label">
          {flatMode ? "Back to DiogoOS" : "Convert to a normal website"}
        </span>
      </button>

      <button
        onClick={dismissTogglePill}
        className="flat-toggle-close"
        aria-label="Hide this pill"
        title="Hide this pill (you can re-enable it from the smiley menu)"
      >
        <svg viewBox="0 0 12 12" className="w-3 h-3" aria-hidden>
          <path
            d="M3 3 L9 9 M9 3 L3 9"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

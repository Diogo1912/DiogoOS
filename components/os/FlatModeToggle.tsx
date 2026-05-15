"use client";

import { useOS } from "./OSProvider";

/**
 * Mode toggle pill, two presentations:
 *   - OS mode: floats bottom-right, label "Convert to a normal website",
 *     with a small red X next to it that dismisses the pill for the
 *     session.
 *   - Flat mode: pinned top-right, label "Back to DiogoOS", permanent
 *     (no dismiss X — the user always needs an obvious way back).
 */
export function FlatModeToggle() {
  const { flatMode, toggleFlatMode, togglePillVisible, dismissTogglePill } = useOS();

  // Flat mode: always-on top-right pill with no dismiss.
  if (flatMode) {
    return (
      <div className="flat-toggle-wrap flat-toggle-wrap--top" role="group" aria-label="Site mode">
        <button
          onClick={toggleFlatMode}
          className="flat-toggle"
          aria-label="Switch back to DiogoOS"
        >
          <span className="flat-toggle-label">Back to DiogoOS</span>
        </button>
      </div>
    );
  }

  // OS mode: bottom-right pill with dismiss X (can be hidden for the session).
  if (!togglePillVisible) return null;

  return (
    <div className="flat-toggle-wrap" role="group" aria-label="Site mode">
      <button
        onClick={toggleFlatMode}
        className="flat-toggle"
        aria-label="Convert to a normal website"
      >
        <span className="flat-toggle-label">Convert to a normal website</span>
      </button>

      <button
        onClick={dismissTogglePill}
        className="flat-toggle-close"
        aria-label="Hide this pill"
        title="Hide this pill"
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

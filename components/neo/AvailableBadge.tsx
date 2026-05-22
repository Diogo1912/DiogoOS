import Link from "next/link";

/**
 * Small "Available for new projects" pill shown in the nav. Pulsing
 * green status dot reuses the existing `.neo-status-dot` rules. Click
 * lands on /freelance so visitors get straight to the pitch.
 */
export function AvailableBadge() {
  return (
    <Link href="/freelance" className="neo-available">
      <span className="neo-status-dot" aria-hidden />
      <span className="neo-available-text">
        Available for new projects
      </span>
    </Link>
  );
}

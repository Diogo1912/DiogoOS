"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlatModeToggle } from "./FlatModeToggle";

/**
 * "Convert to a normal website" mode. Plain top-down scrolling layout that
 * still wears the 2000s Apple aesthetic — Lucida Grande typography, a
 * pinstripe-gradient header, gel buttons in the nav, and a soft slate
 * background.
 *
 * It renders the same page children (Home / Apps / Blog / Contact). Because
 * those pages each wrap their content in a <Window>, the global CSS rule
 * `[data-flat="1"] .mac-shadow { ... }` strips the floating-window framing
 * inside flat mode so things read as a regular page.
 */
export function FlatSite({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const nav = [
    { href: "/", label: "Home" },
    { href: "/apps", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="flat-site min-h-full">
      {/* Pinstripe Aqua header */}
      <header className="flat-header">
        <div className="max-w-[960px] mx-auto px-6 py-4 flex items-center gap-4">
          <div className="flat-brand">
            <span className="flat-brand-mark" aria-hidden>😊</span>
            <span className="flat-brand-name">Diogo Baptista</span>
          </div>

          <nav className="ml-auto flex items-center gap-1">
            {nav.map((n) => {
              const active = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`flat-navlink ${active ? "is-active" : ""}`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flat-header-rule" />
      </header>

      {/* Page body */}
      <main className="max-w-[960px] mx-auto px-6 py-8">
        <div className="flat-card">{children}</div>
      </main>

      <footer className="flat-footer">
        <div className="max-w-[960px] mx-auto px-6 py-6 flex items-center justify-between text-[12px] text-gray-600">
          <span>© Diogo Baptista</span>
          <span className="opacity-70">DiogoOS — Flat Edition</span>
        </div>
      </footer>

      {/* Always-on toggle so you can switch back */}
      <FlatModeToggle />
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/apps", label: "My Apps" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  return (
    <header className="neo-nav">
      <div className="neo-nav-inner">
        <Link href="/" className="neo-brand">
          <span className="neo-brand-mark" aria-hidden>
            DB
          </span>
          <span>Diogo Baptista</span>
        </Link>
        <nav className="neo-nav-links">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`neo-nav-link ${pathname === l.href ? "is-active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

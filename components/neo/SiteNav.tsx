"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/cv", label: "CV" },
  { href: "/apps", label: "My Apps" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  return (
    <header className="neo-nav">
      <div className="neo-nav-inner">
        <Link href="/" className="neo-brand">
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
          <Link
            href="/freelance"
            className={`neo-nav-link neo-nav-link--cta ${
              pathname === "/freelance" ? "is-active" : ""
            }`}
          >
            Hire me →
          </Link>
        </nav>
      </div>
    </header>
  );
}

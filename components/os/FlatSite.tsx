"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlatModeToggle } from "./FlatModeToggle";
import { HomeProfile } from "@/components/pages/HomeProfile";
import { ContactIChat } from "@/components/pages/ContactIChat";
import { AppStoreContent } from "@/components/pages/AppStoreContent";
import { BlogContent } from "@/components/pages/BlogContent";

/**
 * "Convert to a normal website" mode. Plain top-down scrolling layout that
 * still wears the 2000s Aqua aesthetic.
 *
 * Important: route pages in OS mode are now thin redirectors (they launch a
 * mini-app and replace the URL with `/desktop`). That means we can't just
 * render `{children}` here — they're empty. Instead, FlatSite reads the
 * pathname and renders the right content component itself.
 */
export function FlatSite() {
  const pathname = usePathname();

  const nav = [
    { href: "/", label: "Home" },
    { href: "/apps", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  // Treat `/desktop` (where OS mode lands after a window close) as Home
  // in flat mode so it never shows a blank card.
  const route = pathname === "/desktop" ? "/" : pathname;
  const activeHref = route;

  return (
    <div className="flat-site min-h-full">
      <header className="flat-header">
        <div className="max-w-[960px] mx-auto px-6 py-4 flex items-center gap-4">
          <div className="flat-brand">
            <span className="flat-brand-mark" aria-hidden>😊</span>
            <span className="flat-brand-name">Diogo Baptista</span>
          </div>
          <nav className="ml-auto flex items-center gap-1">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`flat-navlink ${activeHref === n.href ? "is-active" : ""}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flat-header-rule" />
      </header>

      <main className="max-w-[960px] mx-auto px-6 py-8">
        <div className="flat-card">
          <FlatPageContent route={route} />
        </div>
      </main>

      <footer className="flat-footer">
        <div className="max-w-[960px] mx-auto px-6 py-6 flex items-center justify-between text-[12px] text-gray-600">
          <span>© Diogo Baptista</span>
          <span className="opacity-70">DiogoOS — Flat Edition</span>
        </div>
      </footer>

      <FlatModeToggle />
    </div>
  );
}

/**
 * Renders the inline content for one of the four "apps" based on pathname.
 * Each case uses the SAME content component the OS-mode mini-app uses, so
 * the flat site and the desktop app are guaranteed to match.
 */
function FlatPageContent({ route }: { route: string }) {
  switch (route) {
    case "/":
      return <HomeProfile />;
    case "/apps":
      return <AppStoreContent />;
    case "/blog":
      return <BlogContent />;
    case "/contact":
      return <ContactIChat />;
    default:
      return <HomeProfile />;
  }
}

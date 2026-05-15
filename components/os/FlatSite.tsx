"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FlatModeToggle } from "./FlatModeToggle";
import { HomeProfile } from "@/components/pages/HomeProfile";
import { ContactIChat } from "@/components/pages/ContactIChat";
import { BlogTumblr } from "@/components/pages/BlogTumblr";
import { AppCard } from "@/components/apps/AppCard";
import { apps } from "@/lib/data";
import type { Post } from "@/lib/rss";

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

/** Renders the inline content for one of the four "apps" based on pathname. */
function FlatPageContent({ route }: { route: string }) {
  switch (route) {
    case "/":
      return <HomeProfile />;
    case "/apps":
      return <FlatAppsContent />;
    case "/blog":
      return <FlatBlogContent />;
    case "/contact":
      return <ContactIChat />;
    default:
      return <HomeProfile />;
  }
}

/** Inline App Store content (same body the mini-app uses). */
function FlatAppsContent() {
  return (
    <div className="min-h-full">
      <div className="px-6 pt-6">
        <div className="store-banner rounded-lg px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.15em] text-white/70 font-semibold">
              Featured
            </div>
            <div
              className="text-white font-bold text-[18px] leading-tight mt-0.5"
              style={{ textShadow: "0 -1px 0 rgba(0,0,0,0.35)" }}
            >
              Apps, games &amp; tools by Diogo Baptista
            </div>
            <div className="text-white/80 text-[11px] mt-0.5">
              A collection of things I&apos;ve built — click any app to learn more
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-white text-[13px] font-bold uppercase tracking-wider mb-3">
          All Applications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {apps.map((a) => <AppCard key={a.id} app={a} />)}
        </div>
      </div>
    </div>
  );
}

/** Inline Blog content — fetches posts via /api/posts on mount. */
function FlatBlogContent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancel = false;
    fetch("/api/posts")
      .then((r) => (r.ok ? r.json() : { posts: [] }))
      .then((d: { posts: Post[] }) => {
        if (!cancel) setPosts(d.posts ?? []);
      })
      .catch(() => {
        if (!cancel) setPosts([]);
      })
      .finally(() => {
        if (!cancel) setLoading(false);
      });
    return () => { cancel = true; };
  }, []);
  if (loading) {
    return <div className="p-10 text-center text-[12px] text-[#888]">Loading posts…</div>;
  }
  return <BlogTumblr posts={posts} />;
}

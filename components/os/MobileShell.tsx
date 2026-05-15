"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FinderDockIcon,
  HomeDockIcon,
  AppsDockIcon,
  BlogDockIcon,
  ContactDockIcon,
  CalculatorDockIcon,
  TerminalDockIcon,
  ICalDockIcon,
  SnakeDockIcon,
} from "@/components/icons";

/**
 * Mobile / phone shell. iOS-inspired chrome — a top status bar with the
 * time + signal/wifi/battery glyphs, full-bleed content, and a home
 * indicator pill at the bottom.
 *
 * The home route ("/desktop") renders a springboard-style grid of rounded
 * app tiles. Every other route renders the page content full-screen with a
 * subtle nav bar showing the page title + a back chevron.
 *
 * All icons / glyphs are original SVG (see components/icons/index.tsx). No
 * Apple trademark assets are reproduced.
 */
export function MobileShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/desktop";

  return (
    <div className="mobile-shell" data-page={pathname}>
      <MobileStatusBar />

      {isHome ? (
        <SpringBoard />
      ) : (
        <MobileApp pathname={pathname}>{children}</MobileApp>
      )}

      <HomeIndicator />
    </div>
  );
}

/* ─── Status bar ─────────────────────────────────────────────────── */

function MobileStatusBar() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const h = d.getHours();
      const m = d.getMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mobile-statusbar">
      <span className="mobile-statusbar-time">{time}</span>
      <span className="mobile-statusbar-right">
        {/* Signal bars */}
        <svg viewBox="0 0 18 12" className="w-4 h-3" aria-hidden>
          <rect x="0" y="8" width="3" height="4" rx="0.6" fill="currentColor" />
          <rect x="5" y="6" width="3" height="6" rx="0.6" fill="currentColor" />
          <rect x="10" y="3" width="3" height="9" rx="0.6" fill="currentColor" />
          <rect x="15" y="0" width="3" height="12" rx="0.6" fill="currentColor" opacity="0.45" />
        </svg>
        {/* Wifi */}
        <svg viewBox="0 0 16 12" className="w-4 h-3" aria-hidden>
          <path d="M8 11.4c.7 0 1.3-.6 1.3-1.3S8.7 8.8 8 8.8s-1.3.6-1.3 1.3.6 1.3 1.3 1.3z" fill="currentColor" />
          <path d="M2.3 4.3a8.5 8.5 0 0 1 11.4 0L12.6 5.4a7 7 0 0 0-9.2 0z" fill="currentColor" />
          <path d="M4.5 6.5a5.4 5.4 0 0 1 7 0L10.4 7.6a3.9 3.9 0 0 0-4.8 0z" fill="currentColor" />
        </svg>
        {/* Battery */}
        <svg viewBox="0 0 28 12" className="w-7 h-3" aria-hidden>
          <rect x="0.5" y="0.5" width="24" height="11" rx="3" stroke="currentColor" strokeWidth="0.9" fill="none" />
          <rect x="25.5" y="4" width="1.8" height="4" rx="0.6" fill="currentColor" />
          <rect x="2" y="2" width="20" height="8" rx="1.6" fill="currentColor" />
        </svg>
      </span>
    </div>
  );
}

/* ─── Home indicator pill ────────────────────────────────────────── */

function HomeIndicator() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/desktop";
  return (
    <button
      onClick={() => {
        if (!isHome) router.push("/desktop");
      }}
      className="mobile-home-pill"
      aria-label="Home"
    />
  );
}

/* ─── SpringBoard (home screen) ──────────────────────────────────── */

type SBApp = {
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const SB_APPS: SBApp[] = [
  { label: "diogonet", href: "/", Icon: HomeDockIcon },
  { label: "Projects", href: "/apps", Icon: AppsDockIcon },
  { label: "Blog", href: "/blog", Icon: BlogDockIcon },
  { label: "Contact", href: "/contact", Icon: ContactDockIcon },
  { label: "Files", href: "/desktop?finder=1", Icon: FinderDockIcon },
  { label: "Calculator", href: "/desktop?app=calc", Icon: CalculatorDockIcon },
  { label: "Calendar", href: "/desktop?app=ical", Icon: ICalDockIcon },
  { label: "Terminal", href: "/desktop?app=term", Icon: TerminalDockIcon },
  { label: "Snake", href: "/desktop?app=snake", Icon: SnakeDockIcon },
];

function SpringBoard() {
  return (
    <div className="mobile-springboard">
      <div className="mobile-springboard-grid">
        {SB_APPS.map((a) => (
          <Link key={a.label} href={a.href} className="mobile-sb-app">
            <div className="mobile-sb-tile">
              <a.Icon className="w-full h-full" />
            </div>
            <div className="mobile-sb-label">{a.label}</div>
          </Link>
        ))}
      </div>

      <div className="mobile-springboard-dock">
        <Link href="/" className="mobile-sb-app">
          <div className="mobile-sb-tile">
            <HomeDockIcon className="w-full h-full" />
          </div>
        </Link>
        <Link href="/blog" className="mobile-sb-app">
          <div className="mobile-sb-tile">
            <BlogDockIcon className="w-full h-full" />
          </div>
        </Link>
        <Link href="/contact" className="mobile-sb-app">
          <div className="mobile-sb-tile">
            <ContactDockIcon className="w-full h-full" />
          </div>
        </Link>
      </div>
    </div>
  );
}

/* ─── Page (an open "app") ───────────────────────────────────────── */

const PAGE_TITLES: Record<string, string> = {
  "/": "diogonet",
  "/apps": "Projects",
  "/blog": "Blog",
  "/contact": "Contact",
};

function MobileApp({
  pathname,
  children,
}: {
  pathname: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const title = PAGE_TITLES[pathname] ?? "DiogoOS";

  return (
    <div className="mobile-app">
      <div className="mobile-navbar">
        <button
          onClick={() => router.push("/desktop")}
          className="mobile-navbar-back"
          aria-label="Back to home screen"
        >
          <svg viewBox="0 0 16 16" className="w-4 h-4">
            <path
              d="M10.5 2.5L4.5 8l6 5.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Home</span>
        </button>
        <span className="mobile-navbar-title">{title}</span>
        <span className="mobile-navbar-right" />
      </div>

      <div className="mobile-app-body">{children}</div>
    </div>
  );
}

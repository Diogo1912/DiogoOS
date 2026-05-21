"use client";

import { useOS, MiniAppId } from "@/components/os/OSProvider";
import { useRouter } from "next/navigation";
import {
  HomeDockIcon,
  AppsDockIcon,
  BlogDockIcon,
  ContactDockIcon,
} from "@/components/icons";

interface LaunchItem {
  label: string;
  /** Either a route or a mini-app id (mutually exclusive) */
  route?: string;
  mini?: MiniAppId;
  /** Tile background (gradient) */
  bg: string;
  /** Inline icon JSX */
  glyph: React.ReactNode;
}

export function Launchpad() {
  const { miniApps, closeMiniApp, launchMiniApp } = useOS();
  const router = useRouter();
  const open = miniApps.some((a) => a.id === "launchpad");
  if (!open) return null;

  const items: LaunchItem[] = [
    { label: "MySpace", route: "/", bg: "linear-gradient(145deg,#ff66cc,#003399)", glyph: <HomeDockIcon className="w-full h-full" /> },
    { label: "App Store", route: "/os/apps", bg: "linear-gradient(145deg,#444,#111)", glyph: <AppsDockIcon className="w-full h-full" /> },
    { label: "Blog", route: "/os/blog", bg: "linear-gradient(145deg,#fff48a,#e9c722)", glyph: <BlogDockIcon className="w-full h-full" /> },
    { label: "iChat", route: "/os/contact", bg: "linear-gradient(145deg,#f8f8f8,#c0c0c0)", glyph: <ContactDockIcon className="w-full h-full" /> },
    { label: "Calculator", mini: "calculator", bg: "linear-gradient(145deg,#5a5a5a,#1a1a1a)", glyph: <BigGlyph>≡</BigGlyph> },
    { label: "Terminal", mini: "terminal", bg: "linear-gradient(145deg,#2a2a2a,#000000)", glyph: <BigGlyph mono>{">"}_</BigGlyph> },
    { label: "Book a meeting", mini: "ical", bg: "linear-gradient(145deg,#c81818,#5a0e0e)", glyph: <ICalGlyph /> },
    { label: "Snake", mini: "snake", bg: "linear-gradient(145deg,#5fe07a,#0a1f0a)", glyph: <BigGlyph mono>S</BigGlyph> },
  ];

  const launch = (it: LaunchItem) => {
    closeMiniApp("launchpad");
    if (it.route) router.push(it.route);
    else if (it.mini) launchMiniApp(it.mini);
  };

  return (
    <div
      className="fixed inset-0 z-[68] flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
      onClick={() => closeMiniApp("launchpad")}
    >
      <div
        className="grid grid-cols-5 gap-x-10 gap-y-8 max-w-[720px]"
        onClick={(e) => e.stopPropagation()}
      >
        {items.map((it) => (
          <button
            key={it.label}
            onClick={() => launch(it)}
            className="flex flex-col items-center group"
          >
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-white relative overflow-hidden transition-transform group-hover:scale-110"
              style={{
                background: it.bg,
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.35), 0 6px 18px rgba(0,0,0,0.5)",
              }}
            >
              {it.glyph}
              <div
                className="absolute inset-x-2 top-1 h-1/2 rounded-t-2xl pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
                }}
              />
            </div>
            <div
              className="text-white text-[12px] mt-2 font-medium"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
            >
              {it.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ICalGlyph() {
  return (
    <div className="relative z-10 w-12 h-12 rounded-md bg-white flex flex-col overflow-hidden border border-black/40">
      <div className="bg-[#c81818] text-white text-[8px] font-bold uppercase text-center py-0.5">May</div>
      <div className="flex-1 flex items-center justify-center text-[20px] font-bold text-[#1a1a1a]" style={{ fontFamily: 'Helvetica' }}>{new Date().getDate()}</div>
    </div>
  );
}

function BigGlyph({ children, mono }: { children: React.ReactNode; mono?: boolean }) {
  return (
    <span
      className="text-[36px] font-bold relative z-10"
      style={{
        fontFamily: mono ? '"Menlo", "Monaco", monospace' : undefined,
        textShadow: "0 2px 4px rgba(0,0,0,0.4)",
      }}
    >
      {children}
    </span>
  );
}

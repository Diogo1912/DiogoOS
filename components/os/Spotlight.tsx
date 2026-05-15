"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useOS, MiniAppId } from "./OSProvider";
import { apps, skillCategories, experience } from "@/lib/data";

type Result = {
  id: string;
  group: string;
  title: string;
  subtitle?: string;
  action: () => void;
};

export function Spotlight() {
  const router = useRouter();
  const {
    spotlightOpen,
    closeSpotlight,
    openAbout,
    openWallpaperPicker,
    launchMiniApp,
  } = useOS();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (spotlightOpen) {
      setQuery("");
      setActive(0);
      // Slight delay so the input is mounted
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [spotlightOpen]);

  const results = useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase();

    const appItems: { id: MiniAppId; title: string; subtitle: string; group: string }[] = [
      { id: "browser",    title: "Browser",   subtitle: "Visit diogonet.com",        group: "Applications" },
      { id: "appstore",   title: "App Store", subtitle: "Apps, games, and tools",   group: "Applications" },
      { id: "blogapp",    title: "Blog",      subtitle: "diogo's blog ★",            group: "Applications" },
      { id: "ichat",      title: "iChat",     subtitle: "Send Diogo a message",      group: "Applications" },
      { id: "finder",     title: "Finder",    subtitle: "Browse the file system",   group: "Utilities" },
      { id: "calculator", title: "Calculator", subtitle: "Math, but pretty",        group: "Utilities" },
      { id: "terminal",   title: "Terminal",  subtitle: "bash · try 'help'",        group: "Utilities" },
      { id: "ical",       title: "iCal",      subtitle: "Calendar with events",     group: "Utilities" },
      { id: "snake",      title: "Snake",     subtitle: "Arrow keys to play",       group: "Utilities" },
    ];

    const all: Result[] = [
      ...appItems.map((m) => ({
        id: `app-${m.id}`,
        group: m.group,
        title: m.title,
        subtitle: m.subtitle,
        action: () => launchMiniApp(m.id),
      })),
      // System
      {
        id: "sys-about",
        group: "System",
        title: "About DiogoOS",
        subtitle: "Version 10.5.8 (Snow Diogo)",
        action: openAbout,
      },
      {
        id: "sys-prefs",
        group: "System",
        title: "System Preferences",
        subtitle: "Change your wallpaper",
        action: openWallpaperPicker,
      },
      // Apps (data)
      ...apps.map((a) => ({
        id: `app-${a.id}`,
        group: "Projects",
        title: a.name,
        subtitle: a.description,
        action: () => router.push("/apps"),
      })),
      // Skills
      ...skillCategories.flatMap((c) =>
        c.skills.map((s) => ({
          id: `skill-${s}`,
          group: "Skills",
          title: s,
          subtitle: c.category,
          action: () => router.push("/"),
        }))
      ),
      // Experience
      ...experience.map((j) => ({
        id: `job-${j.id}`,
        group: "Experience",
        title: j.title,
        subtitle: `${j.company} · ${j.startDate} — ${j.endDate ?? "Present"}`,
        action: () => router.push("/"),
      })),
    ];

    if (!q) return all.slice(0, 12);

    return all
      .filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          (r.subtitle?.toLowerCase().includes(q) ?? false)
      )
      .slice(0, 12);
  }, [query, router, openAbout, openWallpaperPicker, launchMiniApp]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const launch = (r: Result) => {
    r.action();
    closeSpotlight();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      launch(results[active]);
    }
  };

  if (!spotlightOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[75] flex items-start justify-center pt-[120px] pointer-events-none"
      onClick={closeSpotlight}
    >
      <div
        className="w-[560px] max-w-[90vw] pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="spotlight-box rounded-2xl overflow-hidden">
          <div className="flex items-center px-4 py-3 border-b border-white/15">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 mr-3 text-white/60"
              fill="currentColor"
            >
              <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKey}
              placeholder="Spotlight — search DiogoOS"
              className="bg-transparent text-white text-[20px] flex-1 outline-none placeholder:text-white/40 font-light"
            />
            <kbd className="text-[10px] text-white/40 px-1.5 py-0.5 border border-white/20 rounded">
              esc
            </kbd>
          </div>

          {results.length > 0 ? (
            <ResultList
              results={results}
              active={active}
              onHover={setActive}
              onLaunch={launch}
            />
          ) : (
            <div className="px-4 py-6 text-center text-white/50 text-[13px]">
              No results.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultList({
  results,
  active,
  onHover,
  onLaunch,
}: {
  results: Result[];
  active: number;
  onHover: (i: number) => void;
  onLaunch: (r: Result) => void;
}) {
  let lastGroup = "";
  return (
    <div className="max-h-[400px] overflow-y-auto">
      {results.map((r, i) => {
        const showGroup = r.group !== lastGroup;
        lastGroup = r.group;
        return (
          <div key={r.id}>
            {showGroup && (
              <div className="px-4 pt-2.5 pb-1 text-[10px] uppercase tracking-[0.18em] text-white/40 font-semibold">
                {r.group}
              </div>
            )}
            <button
              onMouseEnter={() => onHover(i)}
              onClick={() => onLaunch(r)}
              className={`w-full text-left px-4 py-2 flex items-center gap-3 transition-colors ${
                active === i ? "bg-[#3a92e0]" : "hover:bg-white/5"
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="text-[14px] text-white font-medium truncate">
                  {r.title}
                </div>
                {r.subtitle && (
                  <div className="text-[11px] text-white/55 truncate">
                    {r.subtitle}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-white/30 uppercase tracking-wider">
                {r.group.slice(0, 4)}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

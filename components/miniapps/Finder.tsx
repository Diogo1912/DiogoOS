"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MiniAppFrame } from "@/components/os/MiniAppFrame";
import { useOS, MiniAppId } from "@/components/os/OSProvider";

type LocationId =
  | "diogo"
  | "applications"
  | "documents"
  | "places"
  | "network";

interface FinderItem {
  name: string;
  kind: "folder" | "app" | "doc" | "image" | "link";
  /** Optional route to navigate to on double-click */
  href?: string;
  /** Optional mini-app to launch on double-click */
  launch?: MiniAppId;
  /** Optional external URL */
  external?: string;
  /** Size column text */
  size: string;
  /** Last-modified column text */
  modified: string;
}

const LOCATIONS: { id: LocationId; label: string; emoji: string }[] = [
  { id: "diogo", label: "diogo", emoji: "🏠" },
  { id: "applications", label: "Applications", emoji: "🅰️" },
  { id: "documents", label: "Documents", emoji: "📄" },
  { id: "places", label: "Places", emoji: "📌" },
  { id: "network", label: "Network", emoji: "🌐" },
];

const ITEMS: Record<LocationId, FinderItem[]> = {
  diogo: [
    { name: "About Me", kind: "folder", launch: "terminal", size: "—", modified: "Today" },
    { name: "Resume.pdf", kind: "doc", external: "/resume.pdf", size: "184 KB", modified: "Yesterday" },
    { name: "Projects", kind: "folder", launch: "appstore", size: "—", modified: "May 10" },
    { name: "Blog Posts", kind: "folder", launch: "blogapp", size: "—", modified: "May 11" },
    { name: "Contact Card", kind: "doc", launch: "ichat", size: "1 KB", modified: "May 9" },
    { name: "diogonet.webloc", kind: "link", launch: "browser", size: "1 KB", modified: "May 14" },
  ],
  applications: [
    { name: "Calculator.app", kind: "app", launch: "calculator", size: "2.4 MB", modified: "—" },
    { name: "Terminal.app", kind: "app", launch: "terminal", size: "3.7 MB", modified: "—" },
    { name: "Book a meeting.app", kind: "app", launch: "ical", size: "5.2 MB", modified: "—" },
    { name: "Snake.app", kind: "app", launch: "snake", size: "0.9 MB", modified: "—" },
    { name: "App Store.app", kind: "app", launch: "appstore", size: "8.4 MB", modified: "—" },
  ],
  documents: [
    { name: "Resume.pdf", kind: "doc", external: "/resume.pdf", size: "184 KB", modified: "Yesterday" },
    { name: "todo.txt", kind: "doc", launch: "terminal", size: "2 KB", modified: "Today" },
    { name: "ideas.md", kind: "doc", launch: "terminal", size: "12 KB", modified: "May 11" },
    { name: "haiku-draft.txt", kind: "doc", launch: "terminal", size: "1 KB", modified: "May 8" },
  ],
  places: [
    { name: "Lisbon", kind: "folder", size: "—", modified: "—" },
    { name: "Porto", kind: "folder", size: "—", modified: "—" },
    { name: "London", kind: "folder", size: "—", modified: "—" },
    { name: "On the Train", kind: "folder", size: "—", modified: "—" },
  ],
  network: [
    { name: "diogonet.com", kind: "link", launch: "browser", size: "—", modified: "—" },
    { name: "diogo.blog", kind: "link", launch: "blogapp", size: "—", modified: "—" },
    { name: "iChat — Diogo", kind: "link", launch: "ichat", size: "—", modified: "—" },
  ],
};

const KIND_ICON: Record<FinderItem["kind"], string> = {
  folder: "📁",
  app: "🟦",
  doc: "📄",
  image: "🖼️",
  link: "🔗",
};

export function Finder() {
  const router = useRouter();
  const { launchMiniApp } = useOS();
  const [location, setLocation] = useState<LocationId>("diogo");
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const allItems = ITEMS[location];
  const items = search
    ? allItems.filter((it) => it.name.toLowerCase().includes(search.toLowerCase()))
    : allItems;

  const open = (it: FinderItem) => {
    if (it.launch) launchMiniApp(it.launch);
    else if (it.href) router.push(it.href);
    else if (it.external) window.open(it.external, "_blank");
  };

  const currentLoc = LOCATIONS.find((l) => l.id === location)!;

  return (
    <MiniAppFrame id="finder" title={currentLoc.label} width={620} bodyClassName="">
      <div className="flex flex-col" style={{ height: 420 }}>
        {/* Toolbar — back/forward, view toggles, path, search */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-b from-[#e6e6e6] to-[#c4c4c4] border-b border-[#9a9a9a]">
          <button
            className="w-6 h-6 rounded-md bg-gradient-to-b from-white to-[#d8d8d8] border border-[#888] text-[#444] text-[11px] leading-none shadow-sm hover:brightness-105"
            title="Back"
          >
            ◀
          </button>
          <button
            className="w-6 h-6 rounded-md bg-gradient-to-b from-white to-[#d8d8d8] border border-[#888] text-[#444] text-[11px] leading-none shadow-sm hover:brightness-105"
            title="Forward"
          >
            ▶
          </button>
          <div className="ml-2 inline-flex rounded-md overflow-hidden border border-[#888] shadow-sm">
            <button className="px-2 py-[3px] text-[10px] bg-gradient-to-b from-[#c8c8c8] to-[#a4a4a4] text-[#222]">▦</button>
            <button className="px-2 py-[3px] text-[10px] bg-gradient-to-b from-white to-[#d8d8d8] text-[#444]">≡</button>
            <button className="px-2 py-[3px] text-[10px] bg-gradient-to-b from-white to-[#d8d8d8] text-[#444]">⌘</button>
          </div>
          <div className="ml-3 text-[11px] text-[#333] font-medium truncate">
            <span className="opacity-70">{currentLoc.emoji}</span> {currentLoc.label}
          </div>
          <div className="ml-auto">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Search"
              className="text-[11px] px-2 py-[3px] rounded-full bg-white/85 border border-[#888] w-32 outline-none focus:w-44 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Body — sidebar + file list */}
        <div className="flex flex-1 min-h-0">
          {/* Sidebar */}
          <aside className="w-[152px] bg-[#dde4ec] border-r border-[#a3a9b2] py-2 text-[12px] text-[#1d2127] overflow-y-auto">
            <div className="px-2 mb-1 text-[10px] uppercase tracking-wider text-[#5a6068] font-semibold">
              Places
            </div>
            {LOCATIONS.map((loc) => {
              const active = loc.id === location;
              return (
                <button
                  key={loc.id}
                  onClick={() => {
                    setLocation(loc.id);
                    setSelected(null);
                  }}
                  className={`w-full text-left px-3 py-[3px] flex items-center gap-2 ${
                    active
                      ? "bg-gradient-to-b from-[#5b8fce] to-[#3672bd] text-white"
                      : "hover:bg-[#cfd6df]"
                  }`}
                >
                  <span className="text-[12px]">{loc.emoji}</span>
                  <span className="truncate">{loc.label}</span>
                </button>
              );
            })}
          </aside>

          {/* File list */}
          <div className="flex-1 flex flex-col bg-white min-h-0">
            <div className="flex items-center text-[10px] uppercase tracking-wider text-[#666] bg-gradient-to-b from-[#f3f3f3] to-[#dcdcdc] border-b border-[#a3a9b2] px-3 py-1">
              <span className="flex-1">Name</span>
              <span className="w-20 text-right">Size</span>
              <span className="w-24 text-right">Date Modified</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="text-[12px] text-gray-500 px-4 py-6 text-center">
                  Nothing matches “{search}”.
                </div>
              ) : (
                items.map((it, idx) => {
                  const isSel = selected === it.name;
                  return (
                    <div
                      key={it.name}
                      onClick={() => setSelected(it.name)}
                      onDoubleClick={() => open(it)}
                      className={`flex items-center text-[12px] px-3 py-[3px] cursor-default ${
                        isSel
                          ? "bg-gradient-to-b from-[#5b8fce] to-[#3672bd] text-white"
                          : idx % 2 === 0
                          ? "bg-white"
                          : "bg-[#f4f7fb]"
                      }`}
                    >
                      <span className="mr-2 text-[13px]">{KIND_ICON[it.kind]}</span>
                      <span className="flex-1 truncate">{it.name}</span>
                      <span className={`w-20 text-right tabular-nums ${isSel ? "text-white/90" : "text-gray-600"}`}>
                        {it.size}
                      </span>
                      <span className={`w-24 text-right ${isSel ? "text-white/90" : "text-gray-600"}`}>
                        {it.modified}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-center text-[11px] text-[#444] bg-gradient-to-b from-[#dcdcdc] to-[#b8b8b8] border-t border-[#888] px-3 py-[3px]">
          {items.length} item{items.length === 1 ? "" : "s"}
          {selected ? ` · "${selected}" selected` : ""} · Double-click to open
        </div>
      </div>
    </MiniAppFrame>
  );
}

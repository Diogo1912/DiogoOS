"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  SmileyLogo,
  WifiIcon,
  BatteryIcon,
  VolumeIcon,
} from "@/components/icons";
import { useOS } from "@/components/os/OSProvider";

const PAGE_NAMES: Record<string, string> = {
  "/": "Browser",
  "/os/apps": "App Store",
  "/os/blog": "Blog",
  "/os/desktop": "Finder",
  "/os/contact": "iChat",
};

const MENUS = ["File", "Edit", "View", "Window", "Help"];

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })
      );
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  return <span className="text-[12px] text-gray-800 tabular-nums">{time}</span>;
}

export function MenuBar() {
  const pathname = usePathname();
  const appName = PAGE_NAMES[pathname] ?? "Finder";
  const { toggleMenu, menuOpen, openSpotlight } = useOS();

  return (
    <div className="menu-bar fixed top-0 left-0 right-0 h-6 z-50 flex items-center px-1 gap-0.5 text-[13px]">
      {/* DiogoOS smiley — opens DiogoOSMenu */}
      <button
        data-os-menu-trigger
        onClick={toggleMenu}
        className={`px-2 h-full flex items-center rounded transition-colors ${
          menuOpen ? "bg-black/15" : "hover:bg-black/10"
        }`}
        aria-label="DiogoOS menu"
      >
        <SmileyLogo className="w-[15px] h-[15px]" />
      </button>

      {/* App / page name */}
      <span className="px-2 py-0.5 font-bold text-gray-900 select-none">
        {appName}
      </span>

      {/* Decorative menu items */}
      {MENUS.map((m) => (
        <span
          key={m}
          className="px-2 py-0.5 text-gray-800 rounded hover:bg-black/10 transition-colors cursor-default hidden sm:block select-none"
        >
          {m}
        </span>
      ))}

      {/* Right: status area */}
      <div className="ml-auto flex items-center gap-3 pr-2 text-gray-800">
        <VolumeIcon className="w-[14px] h-[14px] hidden md:block" />
        <WifiIcon className="w-[14px] h-[14px] hidden md:block" />
        <BatteryIcon className="w-[22px] h-[10px] hidden md:block" />
        <Clock />
        {/* Spotlight magnifier — last item on right, classic Mac OS X */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            openSpotlight();
          }}
          aria-label="Spotlight search (⌘ Space)"
          className="h-full flex items-center px-1 rounded hover:bg-black/10 transition-colors"
        >
          <svg viewBox="0 0 16 16" className="w-[13px] h-[13px] text-gray-900" fill="currentColor">
            <path d="M11.5 10.5h-.52l-.18-.18a4.3 4.3 0 0 0 .98-3.53C11.47 4.95 9.94 3.4 8.08 3.17a4.31 4.31 0 0 0-4.8 4.8c.23 1.86 1.78 3.4 3.62 3.7a4.3 4.3 0 0 0 3.53-.98l.18.18v.52l2.83 2.83a.7.7 0 0 0 .99 0 .7.7 0 0 0 0-.99L11.5 10.5zm-4 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

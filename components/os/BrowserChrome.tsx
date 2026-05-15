"use client";

import { useState } from "react";

interface Props {
  /** URL shown in the address bar */
  url: string;
  /** Active tab title */
  tabTitle: string;
}

/**
 * A generic browser toolbar — back/forward arrows, an address bar that
 * displays the current URL, a reload button, and a single tab strip.
 * Renders below the OS title bar inside a <Window>.
 */
export function BrowserChrome({ url, tabTitle }: Props) {
  const [reloading, setReloading] = useState(false);

  const handleReload = () => {
    setReloading(true);
    setTimeout(() => setReloading(false), 600);
  };

  return (
    <div className="browser-chrome flex-shrink-0">
      {/* Toolbar row */}
      <div className="flex items-center gap-2 px-2 py-1.5 border-b border-[#9a9a9a]">
        {/* Back / Forward */}
        <div className="flex items-center gap-1">
          <ChromeButton disabled aria-label="Back">
            <svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="currentColor">
              <path d="M13 4l-7 6 7 6V4z" />
            </svg>
          </ChromeButton>
          <ChromeButton disabled aria-label="Forward">
            <svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="currentColor">
              <path d="M7 4l7 6-7 6V4z" />
            </svg>
          </ChromeButton>
        </div>

        {/* Address bar */}
        <div className="browser-url-bar flex-1 flex items-center gap-1.5 px-2 py-0.5">
          {/* Padlock — generic SSL lock icon */}
          <svg viewBox="0 0 12 14" className="w-3 h-3.5 text-[#5a8a3a] flex-shrink-0" fill="currentColor">
            <path d="M6 0a3 3 0 0 0-3 3v3H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9V3a3 3 0 0 0-3-3zm-1.5 3a1.5 1.5 0 0 1 3 0v3h-3V3z" />
          </svg>
          <span className="text-[11px] text-[#1a1a1a] tabular-nums truncate">
            {url}
          </span>
        </div>

        {/* Reload */}
        <ChromeButton onClick={handleReload} aria-label="Reload">
          <svg
            viewBox="0 0 20 20"
            className={`w-3.5 h-3.5 ${reloading ? "animate-spin" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M3 10a7 7 0 0 1 12-4.95M17 4v4h-4M17 10a7 7 0 0 1-12 4.95M3 16v-4h4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </ChromeButton>

        {/* Search field */}
        <div className="browser-search-bar hidden sm:flex items-center gap-1 px-2 py-0.5">
          <svg viewBox="0 0 16 16" className="w-3 h-3 text-gray-500" fill="currentColor">
            <path d="M11.5 10.5h-.79l-.28-.27a4.5 4.5 0 1 0-.7.7l.27.28v.79l4.25 4.25 1.49-1.5L11.5 10.5zm-4 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          </svg>
          <span className="text-[10px] text-gray-500">Search</span>
        </div>
      </div>

      {/* Tab strip */}
      <div className="flex items-end px-1 pt-1">
        <div className="browser-tab-active flex items-center gap-1.5 px-3 py-1 text-[11px] text-[#1a1a1a]">
          <span className="truncate max-w-[220px]">{tabTitle}</span>
          <button
            className="w-3.5 h-3.5 rounded-full hover:bg-black/15 text-gray-700 text-[10px] leading-none flex items-center justify-center"
            aria-label="Close tab"
          >
            ×
          </button>
        </div>
        <div className="browser-tab-new flex items-center justify-center w-6 h-6 ml-1 text-[14px] text-gray-600 hover:bg-black/10 rounded-t-md cursor-default">
          +
        </div>
      </div>
    </div>
  );
}

function ChromeButton({
  children,
  disabled,
  onClick,
  ...rest
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`w-6 h-6 rounded-md flex items-center justify-center text-[#1a1a1a] ${
        disabled
          ? "opacity-35 cursor-default"
          : "hover:bg-black/10 active:bg-black/15"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}

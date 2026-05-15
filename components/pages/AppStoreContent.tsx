"use client";

import { AppCard } from "@/components/apps/AppCard";
import { apps } from "@/lib/data";

/**
 * App Store body — shared between the OS-mode AppStore mini-app and the
 * flat-mode /apps route, so the two render identical content.
 */
export function AppStoreContent() {
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
          <div className="hidden sm:flex flex-col items-end">
            <div className="text-white text-[11px] font-bold">
              {apps.length} apps
            </div>
            <div className="text-white/60 text-[10px]">all platforms</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white text-[13px] font-bold uppercase tracking-wider">
            All Applications
          </h2>
          <div className="text-gray-500 text-[11px]">
            Sorted by &nbsp;
            <span className="text-gray-300 underline-offset-2 underline cursor-default">
              Newest
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {apps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-white/10 text-center">
          <p className="text-gray-500 text-[10px] uppercase tracking-wider">
            © {new Date().getFullYear()} Diogo Baptista — Made on DiogoOS
          </p>
        </div>
      </div>
    </div>
  );
}

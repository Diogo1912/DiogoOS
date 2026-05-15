"use client";

import { useOS, WallpaperId } from "./OSProvider";

const WALLPAPERS: {
  id: WallpaperId;
  name: string;
  preview: string;
}[] = [
  {
    id: "custom",
    name: "Diogo's Photo",
    preview: "url('/wallpaper.jpg') center / cover no-repeat",
  },
  {
    id: "aurora",
    name: "Aurora",
    preview:
      "radial-gradient(ellipse at 50% 40%, #b86fd9 0%, #4a2884 30%, #1a0d3a 70%, #0a0518 100%)",
  },
  {
    id: "aqua",
    name: "Aqua Blue",
    preview:
      "radial-gradient(ellipse at 50% 30%, #79b6ec 0%, #2a72c4 40%, #103a82 100%)",
  },
  {
    id: "space",
    name: "Andromeda",
    preview:
      "radial-gradient(ellipse at 60% 40%, #2e1a4d 0%, #0c0820 60%, #000000 100%)",
  },
  {
    id: "stones",
    name: "Stones",
    preview:
      "radial-gradient(ellipse at 50% 50%, #8a8074 0%, #4a443d 60%, #2a2620 100%)",
  },
];

export function WallpaperPicker() {
  const { wallpaperPickerOpen, closeWallpaperPicker, wallpaper, setWallpaper } =
    useOS();
  if (!wallpaperPickerOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[65] flex items-center justify-center pointer-events-none"
      onClick={closeWallpaperPicker}
    >
      <div
        className="mac-shadow rounded-xl overflow-hidden w-[440px] pointer-events-auto"
        style={{ background: "linear-gradient(to bottom, #f4f4f4, #d9d9d9)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="window-titlebar h-7 flex items-center justify-center text-[12px] font-semibold text-gray-700 relative">
          <button
            onClick={closeWallpaperPicker}
            className="absolute left-2 w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]"
            aria-label="Close"
          />
          Desktop &amp; Screen Saver
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-400/50 text-[11px] font-semibold bg-gradient-to-b from-[#e9e9e9] to-[#d6d6d6]">
          <div className="px-4 py-1.5 border-r border-gray-400/40 bg-white/60 text-gray-900">
            Desktop
          </div>
          <div className="px-4 py-1.5 text-gray-500">Screen Saver</div>
        </div>

        {/* Wallpapers grid */}
        <div className="p-4 grid grid-cols-2 gap-3">
          {WALLPAPERS.map((w) => {
            const selected = wallpaper === w.id;
            return (
              <button
                key={w.id}
                onClick={() => setWallpaper(w.id)}
                className={`group relative rounded-md overflow-hidden border-2 transition-all ${
                  selected
                    ? "border-[#3a92e0] shadow-[0_0_0_2px_rgba(58,146,224,0.3)]"
                    : "border-transparent hover:border-gray-400"
                }`}
              >
                <div
                  className="w-full h-20"
                  style={{ background: w.preview }}
                />
                <div className="px-2 py-1 text-[10px] font-semibold text-gray-800 bg-gradient-to-b from-white to-gray-100 text-left">
                  {w.name}
                </div>
                {selected && (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#3a92e0] text-white flex items-center justify-center text-[10px] font-bold border border-white">
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="px-4 pb-3 text-[10px] text-gray-500 italic">
          Tip: right-click anywhere on the desktop to open this picker.
        </div>
      </div>
    </div>
  );
}

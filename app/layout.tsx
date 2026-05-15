import type { Metadata } from "next";
import "./globals.css";
import "./linkedin2007.css";
import { MenuBar } from "@/components/mac/MenuBar";
import { Dock } from "@/components/mac/Dock";
import { WindowManagerProvider } from "@/components/os/WindowManager";
import { OSProvider } from "@/components/os/OSProvider";
import { DesktopBackground } from "@/components/os/DesktopBackground";
import { DiogoOSMenu } from "@/components/os/DiogoOSMenu";
import { AboutModal } from "@/components/os/AboutModal";
import { WallpaperPicker } from "@/components/os/WallpaperPicker";
import { DesktopContextMenu } from "@/components/os/DesktopContextMenu";
import { Spotlight } from "@/components/os/Spotlight";
import { Stickies } from "@/components/os/Stickies";
import { ResumeFile } from "@/components/os/ResumeFile";
import { BootScreen } from "@/components/os/BootScreen";
import { MiniAppHost } from "@/components/os/MiniAppHost";
import { WelcomeNote } from "@/components/os/WelcomeNote";
import { FlatModeShell } from "@/components/os/FlatModeShell";

export const metadata: Metadata = {
  title: "DiogoOS",
  description:
    "DiogoOS — the personal operating system of Diogo Baptista. CV, apps, blog, and contact.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full overflow-hidden">
        <OSProvider>
          <FlatModeShell
            os={
              <>
                {/* Boot animation — once per session */}
                <BootScreen />

                {/* Desktop wallpaper (handles right-click for context menu) */}
                <DesktopBackground />

                {/* Top menu bar */}
                <MenuBar />

                {/* OS overlays */}
                <DiogoOSMenu />
                <AboutModal />
                <WallpaperPicker />
                <DesktopContextMenu />
                <Spotlight />

                {/* Desktop items (sit between bg and windows) */}
                <Stickies />
                <ResumeFile />

                {/* Mini-apps (Calculator / Notes / Terminal / etc.) */}
                <MiniAppHost />

                {/* Welcome sticky note on first load */}
                <WelcomeNote />

                {/* Window area — pages render here as <Window> overlays */}
                <WindowManagerProvider>
                  <main className="fixed inset-0 top-[24px] bottom-[90px] pointer-events-none">
                    <div className="relative w-full h-full pointer-events-auto">
                      {children}
                    </div>
                  </main>
                </WindowManagerProvider>

                {/* Dock */}
                <Dock />
              </>
            }
            flat={children}
          />
        </OSProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "../linkedin2007.css";
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

export const metadata: Metadata = {
  title: "DiogoOS",
  description:
    "DiogoOS — the personal operating system of Diogo Baptista. CV, apps, blog, and contact.",
};

export default function OSLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="os-root fixed inset-0 overflow-hidden">
      <OSProvider>
        <BootScreen />
        <DesktopBackground />
        <MenuBar />
        <DiogoOSMenu />
        <AboutModal />
        <WallpaperPicker />
        <DesktopContextMenu />
        <Spotlight />
        <Stickies />
        <ResumeFile />
        <MiniAppHost />

        <WindowManagerProvider>
          <main className="fixed inset-0 top-[24px] bottom-[90px] pointer-events-none">
            <div className="relative w-full h-full pointer-events-auto">
              {children}
            </div>
          </main>
        </WindowManagerProvider>

        <Dock />
      </OSProvider>
    </div>
  );
}

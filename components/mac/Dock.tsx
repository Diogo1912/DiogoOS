"use client";

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
  TrashDockIcon,
} from "@/components/icons";
import { useOS, MiniAppId } from "@/components/os/OSProvider";
import { ComponentType, SVGProps } from "react";

type DockApp = {
  id: MiniAppId;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const APPS: DockApp[] = [
  { id: "finder", label: "Finder", Icon: FinderDockIcon },
  { id: "browser", label: "Browser", Icon: HomeDockIcon },
  { id: "appstore", label: "App Store", Icon: AppsDockIcon },
  { id: "blogapp", label: "Blog", Icon: BlogDockIcon },
  { id: "ichat", label: "iChat", Icon: ContactDockIcon },
  { id: "calculator", label: "Calculator", Icon: CalculatorDockIcon },
  { id: "terminal", label: "Terminal", Icon: TerminalDockIcon },
  { id: "ical", label: "iCal", Icon: ICalDockIcon },
  { id: "snake", label: "Snake", Icon: SnakeDockIcon },
];

/**
 * Aqua-style dock. The glass shelf is rendered as an absolutely-positioned
 * sibling that's tilted backward via CSS perspective, while the actual icon
 * row sits flat on top — so icons stay perfectly upright. See `.dock-stage`,
 * `.dock-shelf`, `.dock-content` in globals.css.
 */
export function Dock() {
  const { launchMiniApp, miniApps } = useOS();

  return (
    <div className="fixed bottom-1.5 left-1/2 -translate-x-1/2 z-50 dock-stage">
      <div className="dock-content flex items-end gap-1.5 px-3 pt-2 pb-1.5 rounded-2xl relative">
        {/* Tilted glass backdrop — visual only, lives behind the icons. */}
        <div className="dock-shelf" aria-hidden />

        {APPS.map((item) => {
          const active = miniApps.some((a) => a.id === item.id);

          return (
            <button
              key={item.id}
              onClick={() => launchMiniApp(item.id)}
              className="relative flex flex-col items-center group dock-item"
            >
              <span className="dock-tooltip">{item.label}</span>
              <div className="dock-icon w-14 h-14 origin-bottom" aria-label={item.label}>
                <item.Icon className="w-full h-full drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]" />
              </div>
              <div
                className={`w-[3px] h-[3px] rounded-full mt-1 transition-opacity ${
                  active ? "bg-white opacity-95" : "opacity-0"
                }`}
                style={active ? { boxShadow: "0 0 4px rgba(255,255,255,0.9)" } : undefined}
              />
            </button>
          );
        })}

        {/* Separator before Trash */}
        <div className="self-stretch w-px bg-white/35 mx-1 mb-1.5 dock-item" />

        {/* Trash */}
        <div className="relative flex flex-col items-center group dock-item" data-trash>
          <span className="dock-tooltip">Trash</span>
          <div className="dock-icon w-14 h-14 origin-bottom" aria-label="Trash">
            <TrashDockIcon className="w-full h-full drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]" />
          </div>
          <div className="w-[3px] h-[3px] mt-1 opacity-0" />
        </div>
      </div>
    </div>
  );
}

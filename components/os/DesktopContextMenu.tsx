"use client";

import { useOS } from "./OSProvider";

export function DesktopContextMenu() {
  const { contextMenu, hideContextMenu, openWallpaperPicker } = useOS();
  if (!contextMenu) return null;

  // Constrain to viewport
  const x = Math.min(contextMenu.x, window.innerWidth - 220);
  const y = Math.min(contextMenu.y, window.innerHeight - 200);

  return (
    <div
      className="fixed z-[68] w-[200px]"
      style={{ top: y, left: x }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="menu-dropdown rounded-md py-1 text-[12px]">
        <CtxItem onClick={openWallpaperPicker}>Change Desktop Background…</CtxItem>
        <CtxItem disabled>Clean Up</CtxItem>
        <CtxItem disabled>Sort By Name</CtxItem>
        <div className="my-0.5 mx-2 border-t border-gray-300" />
        <CtxItem
          onClick={() => {
            hideContextMenu();
            alert("New Folder: Coming in DiogoOS 11");
          }}
        >
          New Folder
        </CtxItem>
        <CtxItem
          onClick={() => {
            hideContextMenu();
            alert("Show View Options: not in this build :)");
          }}
        >
          Show View Options
        </CtxItem>
      </div>
    </div>
  );
}

function CtxItem({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`w-full text-left px-3 py-0.5 ${
        disabled
          ? "text-gray-400 cursor-default"
          : "text-gray-900 hover:bg-[#3a92e0] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

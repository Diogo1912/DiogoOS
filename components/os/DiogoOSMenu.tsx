"use client";

import { useOS } from "./OSProvider";

/**
 * Drop-down menu that appears under the smiley in the menu bar.
 * Anchored at top-left of the viewport, just below the 24px menu bar.
 */
export function DiogoOSMenu() {
  const {
    menuOpen,
    openAbout,
    openWallpaperPicker,
    setMenuOpen,
  } = useOS();

  if (!menuOpen) return null;

  return (
    <div
      className="fixed top-[24px] left-1 z-[60] w-[220px]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="menu-dropdown rounded-md py-1.5 text-[13px]">
        <MenuItem onClick={openAbout}>About DiogoOS…</MenuItem>
        <MenuSeparator />
        <MenuItem onClick={openWallpaperPicker}>System Preferences…</MenuItem>
        <MenuSeparator />
        <MenuItem disabled>Sleep</MenuItem>
        <MenuItem
          onClick={() => {
            if (confirm("Restart DiogoOS?")) {
              setMenuOpen(false);
              window.location.reload();
            }
          }}
        >
          Restart…
        </MenuItem>
        <MenuItem disabled>Shut Down…</MenuItem>
        <MenuSeparator />
        <MenuItem
          onClick={() => {
            setMenuOpen(false);
            alert("Sorry — there's no one else to log in as.");
          }}
        >
          Log Out…
        </MenuItem>
      </div>
    </div>
  );
}

function MenuItem({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`w-full text-left px-3 py-1 ${
        disabled
          ? "text-gray-400 cursor-default"
          : "text-gray-900 hover:bg-[#3a92e0] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function MenuSeparator() {
  return <div className="my-1 mx-2 border-t border-gray-300" />;
}

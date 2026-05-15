"use client";

import { MiniAppFrame } from "@/components/os/MiniAppFrame";
import { AppStoreContent } from "@/components/pages/AppStoreContent";

/** App Store mini-app — thin wrapper around the shared AppStoreContent so
 *  the OS mini-app and the flat-mode /apps page render the same body. */
export function AppStore() {
  return (
    <MiniAppFrame
      id="appstore"
      title="App Store"
      width={780}
      height={580}
      bodyClassName="store-bg"
    >
      <AppStoreContent />
    </MiniAppFrame>
  );
}

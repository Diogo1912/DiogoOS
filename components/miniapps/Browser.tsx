"use client";

import { MiniAppFrame } from "@/components/os/MiniAppFrame";
import { BrowserChrome } from "@/components/os/BrowserChrome";
import { HomeProfile } from "@/components/pages/HomeProfile";

/**
 * Browser mini-app: renders the diogonet profile inside the
 * shared MiniAppFrame, with the same BrowserChrome URL pill that
 * used to live on the routed Window. Multiple of these can't coexist
 * (singleton id) — but it does now coexist freely with Blog/iChat/App
 * Store mini-apps.
 */
export function Browser() {
  return (
    <MiniAppFrame
      id="browser"
      title="Browser"
      width={880}
      height={620}
      bodyClassName="linkedin2007-window-body"
      toolbar={
        <BrowserChrome
          url="https://diogonet.com/in/diogobaptista"
          tabTitle="Diogo Baptista | diogonet"
        />
      }
    >
      <HomeProfile />
    </MiniAppFrame>
  );
}

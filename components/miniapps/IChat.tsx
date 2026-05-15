"use client";

import { MiniAppFrame } from "@/components/os/MiniAppFrame";
import { ContactIChat } from "@/components/pages/ContactIChat";

export function IChat() {
  return (
    <MiniAppFrame
      id="ichat"
      title="Diogo Baptista — iChat"
      width={760}
      height={520}
      bodyClassName="ichat-bg"
    >
      <ContactIChat />
    </MiniAppFrame>
  );
}

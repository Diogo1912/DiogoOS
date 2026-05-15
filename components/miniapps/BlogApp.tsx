"use client";

import { MiniAppFrame } from "@/components/os/MiniAppFrame";
import { BlogContent } from "@/components/pages/BlogContent";

/** Blog mini-app — thin wrapper around the shared BlogContent so the OS
 *  mini-app and the flat-mode /blog page render identical bodies. */
export function BlogApp() {
  return (
    <MiniAppFrame
      id="blogapp"
      title="diogo's blog ★"
      width={820}
      height={600}
      bodyClassName="blog2000-window-body"
    >
      <BlogContent />
    </MiniAppFrame>
  );
}

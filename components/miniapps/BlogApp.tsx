"use client";

import { useEffect, useState } from "react";
import { MiniAppFrame } from "@/components/os/MiniAppFrame";
import { BlogTumblr } from "@/components/pages/BlogTumblr";
import type { Post } from "@/lib/rss";

/**
 * Blog mini-app. Pulls posts from `/api/posts` on mount (since we no
 * longer have a server-rendered route page to do it for us). Empty
 * state is rendered automatically by BlogTumblr when there are no
 * posts yet.
 */
export function BlogApp() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/posts")
      .then((r) => r.ok ? r.json() : Promise.resolve({ posts: [] }))
      .then((data: { posts: Post[] }) => {
        if (!cancelled) setPosts(data.posts ?? []);
      })
      .catch(() => {
        if (!cancelled) setPosts([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <MiniAppFrame
      id="blogapp"
      title="diogo's blog ★"
      width={820}
      height={600}
      bodyClassName="blog2000-window-body"
    >
      {loading ? (
        <div className="p-10 text-center text-[12px] text-[#888]">Loading posts…</div>
      ) : (
        <BlogTumblr posts={posts} />
      )}
    </MiniAppFrame>
  );
}

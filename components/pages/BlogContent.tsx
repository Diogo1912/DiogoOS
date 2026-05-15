"use client";

import { useEffect, useState } from "react";
import { BlogTumblr } from "@/components/pages/BlogTumblr";
import type { Post } from "@/lib/rss";

/**
 * Blog body — fetches posts from /api/posts on mount and renders the
 * BlogTumblr template. Shared between the OS-mode BlogApp mini-app and
 * the flat-mode /blog route so they render identical content.
 */
export function BlogContent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel = false;
    fetch("/api/posts")
      .then((r) => (r.ok ? r.json() : { posts: [] }))
      .then((d: { posts: Post[] }) => {
        if (!cancel) setPosts(d.posts ?? []);
      })
      .catch(() => {
        if (!cancel) setPosts([]);
      })
      .finally(() => {
        if (!cancel) setLoading(false);
      });
    return () => {
      cancel = true;
    };
  }, []);

  if (loading) {
    return <div className="p-10 text-center text-[12px] text-[#888]">Loading posts…</div>;
  }
  return <BlogTumblr posts={posts} />;
}

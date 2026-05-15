import { NextResponse } from "next/server";
import { fetchPosts } from "@/lib/rss";

/**
 * Tiny JSON endpoint that exposes the Substack-RSS-backed post list to the
 * client. Used by the Blog mini-app (which needs to fetch on mount, since
 * it lives outside a server-rendered route now).
 */
export const revalidate = 3600;

export async function GET() {
  const posts = await fetchPosts();
  return NextResponse.json({ posts });
}

import { Window } from "@/components/os/Window";
import { BlogTumblr } from "@/components/pages/BlogTumblr";
import { fetchPosts } from "@/lib/rss";

export const metadata = {
  title: "Blog — Diogo Baptista",
};

export default async function BlogPage() {
  const posts = await fetchPosts();
  return (
    <Window id="/blog" title="diogo's blog ★" bodyClassName="blog2000-window-body">
      <BlogTumblr posts={posts} />
    </Window>
  );
}

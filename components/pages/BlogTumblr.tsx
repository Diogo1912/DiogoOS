import { Post } from "@/lib/rss";

interface BlogProps {
  posts: Post[];
}

/**
 * Minimalist blog — white background, green accents only. No shadows, no
 * decorative tiles, no Comic Sans. Two columns: posts on the left, a quiet
 * sidebar with About / Archives / Links on the right.
 *
 * (Component name kept as BlogTumblr so existing imports don't move.)
 */
export function BlogTumblr({ posts }: BlogProps) {
  return (
    <div
      className="blog2000-bg min-h-full"
      style={{ fontFamily: "'Trebuchet MS', Verdana, Geneva, sans-serif" }}
    >
      {/* Top banner */}
      <header className="blog2000-banner">
        <div className="max-w-[920px] mx-auto px-6 py-6">
          <h1 className="blog2000-title">
            diogo<em>.</em>blog
          </h1>
          <p className="blog2000-tagline">notes, in chronological order</p>
        </div>
      </header>

      {/* Two-column body */}
      <div className="max-w-[920px] mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-[1fr_220px] gap-8">
        {/* Posts column */}
        <main className="space-y-6">
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            posts.map((p, i) => <PostBlock key={p.url} post={p} index={i} />)
          )}

          <nav className="flex justify-between text-[12px] pt-2 text-[var(--blog-green-dark)]">
            <a href="#">← Older posts</a>
            <span className="text-[#888]">page 1 of 1</span>
            <a href="#">Newer posts →</a>
          </nav>
        </main>

        {/* Sidebar */}
        <aside className="space-y-4 text-[12px]">
          <SidebarBox title="About">
            <p className="leading-[1.6] text-[#333]">
              Hi, I&apos;m <b>Diogo</b>. I write here about software, design,
              and whatever else I&apos;ve been thinking about.
            </p>
          </SidebarBox>

          <SidebarBox title="Archives">
            <ul className="space-y-1">
              <li><a href="#">May 2026</a></li>
              <li><a href="#">April 2026</a></li>
              <li><a href="#">March 2026</a></li>
              <li><a href="#">Older →</a></li>
            </ul>
          </SidebarBox>

          <SidebarBox title="Elsewhere">
            <ul className="space-y-1">
              <li><a href="/">diogonet</a></li>
              <li><a href="/apps">projects</a></li>
              <li><a href="/contact">contact</a></li>
              <li><a href="#">RSS</a></li>
            </ul>
          </SidebarBox>
        </aside>
      </div>

      <footer className="text-center text-[11px] text-[#888] py-5 border-t border-[var(--blog-rule)]">
        © Diogo Baptista
      </footer>
    </div>
  );
}

function SidebarBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="blog2000-side">
      <h3 className="blog2000-side-head">{title}</h3>
      <div className="p-3 text-[12px] text-[#333]">{children}</div>
    </section>
  );
}

function PostBlock({ post, index }: { post: Post; index: number }) {
  const times = ["11:42 PM", "2:17 AM", "9:03 PM", "6:48 PM", "1:11 AM"];
  const comments = [3, 7, 0, 12, 1];
  return (
    <article className="blog2000-post">
      <header className="blog2000-post-head">
        <div className="text-[11px] uppercase tracking-wider text-[var(--blog-green)]">
          {post.date}
        </div>
        <h2 className="blog2000-post-title">
          <a href={post.url} target="_blank" rel="noopener noreferrer">
            {post.title}
          </a>
        </h2>
      </header>

      {post.coverImage && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-44 object-cover border-b border-[var(--blog-rule)]"
        />
      )}

      <div className="px-4 py-4">
        <p className="text-[13px] leading-[1.6] text-[#222]">{post.excerpt}</p>

        <div className="mt-4 pt-3 border-t border-[var(--blog-rule)] flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#666]">
          <span>
            by <b className="text-[#222]">Diogo</b> · {times[index % times.length]}
          </span>
          <a href={post.url} className="cursor-pointer">
            {comments[index % comments.length]} comments
          </a>
          <span className="ml-auto text-[#888]">
            labels: <a href="#">life</a>, <a href="#">code</a>
          </span>
        </div>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="blog2000-post p-6 text-[13px]">
      <h2 className="text-[16px] font-bold mb-2" style={{ color: "var(--blog-green-dark)" }}>
        No posts yet.
      </h2>
      <p className="text-[#444] leading-relaxed">
        Set <code className="bg-[var(--blog-green-soft)] px-1 py-px rounded text-[12px]">
          SUBSTACK_RSS_URL
        </code>{" "}
        in your environment and your latest entries will appear here.
      </p>
    </div>
  );
}

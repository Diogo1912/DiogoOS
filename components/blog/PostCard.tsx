import { Post } from "@/lib/rss";
import { PenIcon } from "@/components/icons";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col rounded-xl border border-gray-200 overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg group"
      style={{ background: "linear-gradient(to bottom, #fafafa, #f4f4f4)" }}
    >
      {/* Cover or placeholder */}
      {post.coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-36 object-cover"
        />
      ) : (
        <div
          className="w-full h-24 flex items-center justify-center select-none"
          style={{
            background: "linear-gradient(135deg, #68c8f8 0%, #1a7fcc 100%)",
          }}
        >
          <PenIcon className="w-9 h-9 text-white/90" />
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-[13px] font-semibold text-gray-900 group-hover:text-[#1a7fcc] transition-colors line-clamp-2 leading-snug">
          {post.title}
        </h3>
        {post.date && (
          <p className="text-[11px] text-gray-400 mt-1">{post.date}</p>
        )}
        <p className="text-[12px] text-gray-600 mt-2 line-clamp-3 flex-1 leading-relaxed">
          {post.excerpt}
        </p>
        <span
          className="text-[12px] font-medium mt-3 group-hover:underline"
          style={{ color: "#1a7fcc" }}
        >
          Read on Substack →
        </span>
      </div>
    </a>
  );
}

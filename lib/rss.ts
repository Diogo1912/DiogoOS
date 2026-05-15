import { XMLParser } from "fast-xml-parser";

export interface Post {
  title: string;
  url: string;
  date: string;
  excerpt: string;
  coverImage?: string;
}

const SUBSTACK_RSS_URL = process.env.SUBSTACK_RSS_URL ?? "";

export async function fetchPosts(): Promise<Post[]> {
  if (!SUBSTACK_RSS_URL) return [];

  try {
    const res = await fetch(SUBSTACK_RSS_URL, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const xml = await res.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
    });
    const result = parser.parse(xml);

    const rawItems: unknown[] = (() => {
      const items = result?.rss?.channel?.item;
      if (!items) return [];
      return Array.isArray(items) ? items : [items];
    })();

    return rawItems.slice(0, 12).map((raw) => {
      const item = raw as Record<string, unknown>;
      return {
        title: String(item.title ?? "Untitled"),
        url: String(item.link ?? ""),
        date: formatDate(String(item.pubDate ?? "")),
        excerpt: buildExcerpt(item),
        coverImage: extractImage(item),
      };
    });
  } catch {
    return [];
  }
}

function formatDate(raw: string): string {
  const d = new Date(raw);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function buildExcerpt(item: Record<string, unknown>): string {
  const html = String(
    item["content:encoded"] ?? item.description ?? ""
  );
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&[^;]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 220 ? text.slice(0, 220) + "…" : text;
}

function extractImage(item: Record<string, unknown>): string | undefined {
  const enc = item["enclosure"] as Record<string, string> | undefined;
  if (enc?.["@_url"]) return enc["@_url"];

  const content = String(item["content:encoded"] ?? item.description ?? "");
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/);
  return match?.[1];
}

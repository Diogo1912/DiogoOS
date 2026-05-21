import Link from "next/link";
import { social } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="neo-footer">
      <div className="neo-footer-inner">
        <span>© {new Date().getFullYear()} Diogo Baptista</span>
        <div className="flex items-center gap-3 text-[13px]">
          <a href={social.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <span>·</span>
          <a href={social.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <span>·</span>
          <a href={social.substack} target="_blank" rel="noreferrer">
            Substack
          </a>
          <span>·</span>
          <Link href="/os">DiogoOS</Link>
        </div>
      </div>
    </footer>
  );
}

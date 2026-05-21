import { SiteNav } from "@/components/neo/SiteNav";
import { SiteFooter } from "@/components/neo/SiteFooter";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="neo-site">
      <SiteNav />
      {children}
      <SiteFooter />
    </div>
  );
}

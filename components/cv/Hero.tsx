import { profile } from "@/lib/data";
import { AvatarBlock } from "@/components/icons";

function initialsFromName(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");
}

export function Hero() {
  return (
    <section className="p-8 pb-7 border-b border-gray-200">
      <div className="flex items-center gap-6">
        {/* Avatar block — initials in a glossy tile */}
        <AvatarBlock initials={initialsFromName(profile.name)} />

        <div className="min-w-0">
          <h1 className="text-[28px] font-bold text-gray-900 leading-tight tracking-tight">
            {profile.name}
          </h1>
          <p
            className="text-[15px] font-semibold mt-0.5"
            style={{ color: "#1a7fcc" }}
          >
            {profile.headline}
          </p>
          <p className="text-[13px] text-gray-600 mt-2.5 leading-relaxed max-w-xl">
            {profile.bio}
          </p>
        </div>
      </div>
    </section>
  );
}

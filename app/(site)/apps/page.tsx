import Link from "next/link";
import { apps } from "@/lib/data";

export const metadata = {
  title: "My Apps · Diogo Baptista",
  description: "Apps, games and tools I've built — including DiogoOS.",
};

export default function AppsPage() {
  return (
    <section className="neo-section">
      <div className="neo-container">
        <span className="neo-badge neo-badge--blue neo-hero-eyebrow">
          {apps.length + 1} projects · all live
        </span>
        <h2 style={{ marginTop: 12 }}>My Apps</h2>
        <p className="neo-section-lead">
          Client work, personal projects and side experiments — all live.
          Click any card to open it.{" "}
          <Link href="/freelance" style={{ fontWeight: 700 }}>
            Want one of these for your team? → /freelance
          </Link>
        </p>

        <div className="neo-app-grid">
          {/* DiogoOS — featured first as an internal route */}
          <Link href="/os" className="neo-card neo-card--hover neo-app-card">
            <span
              className="neo-app-icon"
              style={{ background: "#0a0a0a" }}
            >
              OS
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <h3>DiogoOS</h3>
              <span className="neo-badge neo-badge--yellow">Featured</span>
            </div>
            <p>
              My old personal website rebuilt as a Mac OS X-inspired desktop —
              with a menubar, dock, mini-apps and a working iChat-style contact
              page. Now a sub-app of this site.
            </p>
            <div className="neo-app-tags">
              <span className="neo-badge neo-badge--white">Web App</span>
              <span className="neo-badge neo-badge--white">For fun</span>
            </div>
          </Link>

          {apps.map((app) => (
            <a
              key={app.id}
              href={app.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="neo-card neo-card--hover neo-app-card"
            >
              <span
                className="neo-app-icon"
                style={{ background: app.color }}
              >
                {app.name.charAt(0)}
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <h3>{app.name}</h3>
                {app.badge && (
                  <span
                    className={`neo-badge ${
                      app.badge === "NEW"
                        ? "neo-badge--pink"
                        : "neo-badge--green"
                    }`}
                  >
                    {app.badge}
                  </span>
                )}
              </div>
              <p>{app.description}</p>
              <div className="neo-app-tags">
                {app.tags.map((t) => (
                  <span key={t} className="neo-badge neo-badge--white">
                    {t}
                  </span>
                ))}
              </div>
              {app.sourceUrl && (
                <span className="text-xs font-bold underline">
                  View source ↗
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

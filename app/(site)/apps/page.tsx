import Link from "next/link";
import { apps, type App } from "@/lib/data";

export const metadata = {
  title: "My Apps · Diogo Baptista",
  description: "Apps, games and tools I've built — including DiogoOS.",
};

const byId = (id: string): App | undefined => apps.find((a) => a.id === id);

export default function AppsPage() {
  const storay = byId("storay");
  const chandle = byId("chandle");
  const whatIsTuesday = byId("what-is-tuesday");
  const circuitboard = byId("circuitboard");
  const golexai = byId("golexai");
  const untire = byId("tiredofcancer");

  const sections: {
    id: string;
    title: string;
    tone: "yellow" | "pink" | "green" | "blue" | "purple";
    lead?: string;
    items: App[];
  }[] = [
    {
      id: "games",
      title: "Games & experiments",
      tone: "pink",
      lead: "Built for fun on weekends — playful interfaces and tiny worlds.",
      items: [chandle].filter(Boolean) as App[],
    },
    {
      id: "tools",
      title: "Tools",
      tone: "green",
      lead: "Things I made because nothing on the market quite fit.",
      items: [circuitboard, storay].filter(Boolean) as App[],
    },
    {
      id: "freelance",
      title: "Freelance work",
      tone: "blue",
      lead: "Shipped for clients. Want one of these for your team? See /freelance.",
      items: [untire, golexai].filter(Boolean) as App[],
    },
  ];

  return (
    <section className="neo-section">
      <div className="neo-container">
        <h2>My Apps</h2>
        <p className="neo-section-lead">
          Client work, personal projects and side experiments — all live.
          Click any card to open it.{" "}
          <Link href="/freelance" style={{ fontWeight: 700 }}>
            Want one of these for your team? → /freelance
          </Link>
        </p>

        {/* Featured — wide banner */}
        {storay && (
          <div style={{ marginTop: 28 }}>
            <h3 className="neo-apps-cat-title neo-apps-cat-title--yellow">
              Featured
            </h3>
            <a
              href={storay.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="neo-card neo-card--hover neo-apps-banner"
              style={{ background: storay.color }}
            >
              <div className="neo-apps-banner-inner">
                <div className="neo-apps-banner-icon">
                  {storay.name.charAt(0)}
                </div>
                <div className="neo-apps-banner-text">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 style={{ margin: 0 }}>{storay.name}</h3>
                    {storay.badge && (
                      <span className={`neo-badge ${badgeTone(storay.badge)}`}>
                        {storay.badge}
                      </span>
                    )}
                    {storay.status && (
                      <span className="neo-badge neo-badge--white">
                        {storay.status}
                      </span>
                    )}
                  </div>
                  <p style={{ margin: "10px 0 12px" }}>
                    {storay.longDescription ?? storay.description}
                  </p>
                  <div className="neo-app-tags">
                    {storay.tags.map((t) => (
                      <span key={t} className="neo-badge neo-badge--white">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          </div>
        )}

        {/* Games & experiments — special-cased so DiogoOS (internal route) sits with Chandle */}
        <div style={{ marginTop: 36 }}>
          <h3 className="neo-apps-cat-title neo-apps-cat-title--pink">
            Games &amp; experiments
          </h3>
          <p className="neo-section-lead" style={{ marginTop: -4 }}>
            Built for fun on weekends — playful interfaces and tiny worlds.
          </p>
          <div className="neo-app-grid">
            {chandle && <ExternalAppCard app={chandle} />}
            {whatIsTuesday && <ExternalAppCard app={whatIsTuesday} />}
            {/* DiogoOS — internal route */}
            <Link href="/os" className="neo-card neo-card--hover neo-app-card">
              <span
                className="neo-app-icon"
                style={{ background: "#6b6b6b" }}
              >
                OS
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <h3>DiogoOS</h3>
              </div>
              <p>
                My old personal website rebuilt as a Mac OS X-inspired desktop
                — with a menubar, dock, mini-apps and a working iChat-style
                contact page. Now a sub-app of this site.
              </p>
              <div className="neo-app-tags">
                <span className="neo-badge neo-badge--white">Web App</span>
                <span className="neo-badge neo-badge--white">For fun</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Remaining categories */}
        {sections
          .filter((s) => s.id !== "games")
          .map((s) => (
            <div key={s.id} style={{ marginTop: 36 }}>
              <h3 className={`neo-apps-cat-title neo-apps-cat-title--${s.tone}`}>
                {s.title}
              </h3>
              {s.lead && (
                <p className="neo-section-lead" style={{ marginTop: -4 }}>
                  {s.lead}
                </p>
              )}
              <div className="neo-app-grid">
                {s.items.map((app) => (
                  <ExternalAppCard key={app.id} app={app} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

function badgeTone(badge: NonNullable<App["badge"]>): string {
  switch (badge) {
    case "NEW":
      return "neo-badge--pink";
    case "FEATURED":
      return "neo-badge--yellow";
    case "HOT":
      return "neo-badge--pink";
    case "FREE":
    default:
      return "neo-badge--green";
  }
}

function ExternalAppCard({ app }: { app: App }) {
  return (
    <a
      href={app.liveUrl}
      target="_blank"
      rel="noreferrer"
      className="neo-card neo-card--hover neo-app-card"
    >
      <span className="neo-app-icon" style={{ background: app.color }}>
        {app.name.charAt(0)}
      </span>
      <div className="flex items-center gap-2 flex-wrap">
        <h3>{app.name}</h3>
        {app.badge && (
          <span className={`neo-badge ${badgeTone(app.badge)}`}>
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
        <span className="text-xs font-bold underline">View source ↗</span>
      )}
    </a>
  );
}

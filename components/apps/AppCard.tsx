import { App } from "@/lib/data";
import { APP_ICONS } from "@/components/icons";

interface AppCardProps {
  app: App;
}

function Stars({ value }: { value: number }) {
  return (
    <div className="store-stars text-[11px] tracking-wider">
      {"★★★★★".slice(0, value)}
      <span className="text-gray-600">{"★★★★★".slice(value)}</span>
    </div>
  );
}

export function AppCard({ app }: AppCardProps) {
  const Icon = APP_ICONS[app.icon];

  return (
    <div className="store-card rounded-lg overflow-hidden flex gap-3 p-3 relative">
      {/* Ribbon badge */}
      {app.badge && (
        <div className="store-ribbon absolute -right-1 top-2 px-2 py-[3px] rounded-l-md uppercase">
          {app.badge}
        </div>
      )}

      {/* Glossy app icon */}
      <div
        className="store-app-icon w-16 h-16 flex-shrink-0 flex items-center justify-center"
        style={{
          background: `linear-gradient(145deg, ${app.color}ee 0%, ${app.color} 55%, ${app.color}cc 100%)`,
        }}
      >
        <Icon
          className="w-9 h-9 text-white relative z-10 drop-shadow"
          style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.4))" }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col">
        <h3 className="text-[13px] font-bold text-white leading-tight truncate">
          {app.name}
        </h3>
        <p className="text-[11px] text-gray-400 mt-0.5 truncate">
          {app.tags.join(" · ")}
        </p>
        {app.rating !== undefined && (
          <div className="mt-1">
            <Stars value={app.rating} />
          </div>
        )}
        <p className="text-[11px] text-gray-300 mt-1.5 leading-snug line-clamp-2">
          {app.description}
        </p>

        <div className="mt-auto pt-2 flex items-center gap-2">
          <a
            href={app.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="store-button px-3 py-[3px] rounded-full text-[11px] uppercase tracking-wider inline-flex items-center"
          >
            View
          </a>
          {app.sourceUrl && (
            <a
              href={app.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-gray-400 hover:text-gray-200 uppercase tracking-wider"
            >
              Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

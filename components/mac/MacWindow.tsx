import { TrafficLights } from "./TrafficLights";

interface MacWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function MacWindow({ title, children, className }: MacWindowProps) {
  return (
    <div
      className={`w-full max-w-4xl flex flex-col mac-shadow rounded-xl overflow-hidden ${className ?? ""}`}
    >
      {/* Title bar */}
      <div className="window-titlebar h-8 flex items-center px-3 flex-shrink-0 select-none relative">
        <TrafficLights />
        {/* Centered title */}
        <div className="absolute inset-x-0 flex justify-center pointer-events-none">
          <span
            className="text-[13px] font-semibold text-gray-600 tracking-tight"
            style={{ textShadow: "0 1px 0 rgba(255,255,255,0.6)" }}
          >
            {title}
          </span>
        </div>
        {/* Right spacer to visually balance traffic lights */}
        <div className="ml-auto w-[54px]" />
      </div>
      {/* Scrollable content */}
      <div className="window-body flex-1 overflow-y-auto min-h-0">{children}</div>
    </div>
  );
}

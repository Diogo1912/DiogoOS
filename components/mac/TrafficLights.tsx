export function TrafficLights() {
  return (
    <div className="flex items-center gap-[6px] group/lights">
      <button
        className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] flex items-center justify-center hover:brightness-110 transition-all focus:outline-none"
        aria-label="Close"
        tabIndex={-1}
      >
        <span className="opacity-0 group-hover/lights:opacity-100 text-[7px] text-[#6e1a18] font-bold leading-none select-none">
          ×
        </span>
      </button>
      <button
        className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d4a017] flex items-center justify-center hover:brightness-110 transition-all focus:outline-none"
        aria-label="Minimize"
        tabIndex={-1}
      >
        <span className="opacity-0 group-hover/lights:opacity-100 text-[7px] text-[#6e5400] font-bold leading-none select-none">
          −
        </span>
      </button>
      <button
        className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] flex items-center justify-center hover:brightness-110 transition-all focus:outline-none"
        aria-label="Zoom"
        tabIndex={-1}
      >
        <span className="opacity-0 group-hover/lights:opacity-100 text-[7px] text-[#0c5c1c] font-bold leading-none select-none">
          +
        </span>
      </button>
    </div>
  );
}

interface Props {
  items: string[];
  tone?: "yellow" | "pink" | "blue" | "green" | "purple";
  speed?: number;
}

const TONE_VAR: Record<NonNullable<Props["tone"]>, string> = {
  yellow: "var(--neo-yellow)",
  pink: "var(--neo-pink)",
  blue: "var(--neo-blue)",
  green: "var(--neo-green)",
  purple: "var(--neo-purple)",
};

/**
 * Endlessly scrolling chunky band — used for the skills strip on the
 * landing page. Pure CSS animation, doubles the items for a seamless loop.
 */
export function Marquee({ items, tone = "yellow", speed = 40 }: Props) {
  const doubled = [...items, ...items];
  return (
    <div
      className="neo-marquee"
      style={{
        background: TONE_VAR[tone],
        ["--marquee-speed" as string]: `${speed}s`,
      }}
    >
      <div className="neo-marquee-track">
        {doubled.map((it, i) => (
          <span key={i} className="neo-marquee-item">
            {it}
            <span className="neo-marquee-dot" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

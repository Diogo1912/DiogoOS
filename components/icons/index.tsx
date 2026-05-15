import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/* ────────────────────────────────────────────────────────────
 * Menu bar icons
 * ──────────────────────────────────────────────────────────── */

/** Smiley face — DiogoOS brand logo. Pure black line-art (no fill) so it
 *  reads well on any menu bar / surface, like the Happy Mac. */
export function SmileyLogo(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" {...props}>
      {/* Face outline */}
      <circle cx="12" cy="12" r="10.2" stroke="currentColor" strokeWidth="1.6" />
      {/* Eyes */}
      <circle cx="8.6" cy="9.8" r="1.15" fill="currentColor" />
      <circle cx="15.4" cy="9.8" r="1.15" fill="currentColor" />
      {/* Smile */}
      <path
        d="M7.4 13.6 Q12 17.8 16.6 13.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** @deprecated — kept for backwards compat. Use SmileyLogo. */
export function AppleLogo(props: IconProps) {
  return <SmileyLogo {...props} />;
}

export function WifiIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 12" fill="currentColor" aria-hidden {...props}>
      <path d="M8 0C5.2 0 2.5 1 .5 3l1.1 1.1C3.4 2.4 5.6 1.5 8 1.5s4.6.9 6.4 2.6L15.5 3C13.5 1 10.8 0 8 0zm0 3c-1.9 0-3.7.7-5.2 2l1.1 1.1C5.1 5 6.5 4.5 8 4.5s2.9.5 4.1 1.6L13.2 5C11.7 3.7 9.9 3 8 3zm0 3c-1.1 0-2.1.4-2.9 1.1L6.2 8.2c.5-.4 1.1-.7 1.8-.7s1.3.3 1.8.7l1.1-1.1C10.1 6.4 9.1 6 8 6zm0 3c-.3 0-.6.1-.8.4L8 10.7l.8-1.3C8.6 9.1 8.3 9 8 9z"/>
    </svg>
  );
}

export function BatteryIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 26 12" fill="none" aria-hidden {...props}>
      <rect x="0.5" y="0.5" width="22" height="11" rx="2" stroke="currentColor" strokeWidth="0.8" fill="none"/>
      <rect x="23" y="3.5" width="2.5" height="5" rx="0.8" fill="currentColor"/>
      <rect x="2" y="2" width="18" height="8" rx="0.6" fill="currentColor"/>
    </svg>
  );
}

export function VolumeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden {...props}>
      <path d="M3 6v4h2.5L9 13.5v-11L5.5 6H3zm8.5 2c0-1.3-.7-2.4-1.7-3v6c1-.6 1.7-1.7 1.7-3z"/>
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────
 * Dock icons — Mac OS X Snow Leopard style
 * Each is a rounded square with detailed artwork and gloss
 * ──────────────────────────────────────────────────────────── */

/** Finder — split-face Aqua glyph on a rounded blue tile.
 *  Original artwork: my own SVG paths and gradient stops, evoking the
 *  classic two-tone mask without reproducing any specific asset. */
export function FinderDockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden {...props}>
      <defs>
        <linearGradient id="finder-tile" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a9d6ff" />
          <stop offset="0.5" stopColor="#3a8bd8" />
          <stop offset="1" stopColor="#0e3f8a" />
        </linearGradient>
        <linearGradient id="finder-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0.78" />
          <stop offset="0.55" stopColor="white" stopOpacity="0.08" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="finder-lowlight" cx="0.5" cy="1" r="0.7">
          <stop offset="0" stopColor="white" stopOpacity="0.42" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Rounded blue tile */}
      <rect width="64" height="64" rx="14" fill="url(#finder-tile)" />
      <rect x="0.5" y="0.5" width="63" height="63" rx="13.5" fill="none" stroke="rgba(0,0,0,0.42)" strokeWidth="0.8" />
      {/* Bottom under-glow */}
      <rect x="2" y="34" width="60" height="28" rx="12" fill="url(#finder-lowlight)" />
      {/* Face capsule — blue left / white right */}
      <path d="M12 21 Q17 7 32 7 L32 57 Q17 57 12 43 Q7 32 12 21 Z"
            fill="#0e3f8a" stroke="rgba(0,0,0,0.6)" strokeWidth="0.9" />
      <path d="M52 21 Q47 7 32 7 L32 57 Q47 57 52 43 Q57 32 52 21 Z"
            fill="#f7f7f7" stroke="rgba(0,0,0,0.6)" strokeWidth="0.9" />
      {/* Eyes — mirror palette: white pupil on blue side, dark on white */}
      <ellipse cx="22" cy="23.5" rx="2.4" ry="3.6" fill="white" />
      <ellipse cx="22" cy="22.5" rx="0.9" ry="1.4" fill="rgba(0,0,0,0.18)" />
      <ellipse cx="42" cy="23.5" rx="2.4" ry="3.6" fill="#101820" />
      <ellipse cx="42.7" cy="22.5" rx="0.7" ry="1" fill="white" opacity="0.5" />
      {/* Smile — quadratic curve, slightly higher on the white side */}
      <path d="M18 37 Q32 50 46 37"
            fill="none" stroke="#101820" strokeWidth="2.4" strokeLinecap="round" />
      {/* Faint cheek tint on blue side (echoes the highlight) */}
      <circle cx="20" cy="34" r="3" fill="white" opacity="0.12" />
      {/* Top gel sheen */}
      <rect x="3" y="2" width="58" height="22" rx="11" fill="url(#finder-gloss)" />
    </svg>
  );
}

/** Browser — chromed Aqua globe with a compass needle.
 *  Original artwork: my own paths/gradients. */
export function HomeDockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden {...props}>
      <defs>
        <radialGradient id="globe-sphere" cx="0.35" cy="0.28" r="0.95">
          <stop offset="0" stopColor="#cdebff" />
          <stop offset="0.35" stopColor="#5da6e8" />
          <stop offset="0.78" stopColor="#1e5fac" />
          <stop offset="1" stopColor="#0a2c66" />
        </radialGradient>
        <linearGradient id="globe-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6f6f6" />
          <stop offset="0.5" stopColor="#b8b8b8" />
          <stop offset="1" stopColor="#5a5a5a" />
        </linearGradient>
        <radialGradient id="globe-shine" cx="0.32" cy="0.18" r="0.5">
          <stop offset="0" stopColor="white" stopOpacity="0.85" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Chrome rim */}
      <circle cx="32" cy="32" r="30" fill="url(#globe-rim)" />
      <circle cx="32" cy="32" r="28.5" fill="none" stroke="rgba(0,0,0,0.55)" strokeWidth="0.7" />
      {/* Inner sphere */}
      <circle cx="32" cy="32" r="27" fill="url(#globe-sphere)" />
      {/* Latitudes — denser near the equator */}
      {[10, 16, 22, 32, 42, 48, 54].map((y) => {
        const dy = y - 32;
        const r = Math.sqrt(Math.max(0, 27 * 27 - dy * dy));
        return (
          <ellipse
            key={y}
            cx="32"
            cy={y}
            rx={r}
            ry={r * 0.3}
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="0.55"
          />
        );
      })}
      {/* Longitudes — symmetric meridians */}
      {[0, 18, 36, 54, 72].map((deg) => (
        <ellipse
          key={deg}
          cx="32"
          cy="32"
          rx={27 * Math.cos((deg * Math.PI) / 180)}
          ry="27"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.55"
        />
      ))}
      {/* Polar caps — subtle */}
      <ellipse cx="32" cy="6.5" rx="2.6" ry="1.1" fill="rgba(255,255,255,0.55)" />
      <ellipse cx="32" cy="57.5" rx="2.6" ry="1.1" fill="rgba(255,255,255,0.35)" />
      {/* Compass needle */}
      <polygon points="32,11 27.5,32 32,29 36.5,32" fill="#d62828" stroke="#7a1414" strokeWidth="0.4" />
      <polygon points="32,53 27.5,32 32,35 36.5,32" fill="#f4f4f4" stroke="#777" strokeWidth="0.4" />
      <circle cx="32" cy="32" r="2.6" fill="#1a1a1a" stroke="#888" strokeWidth="0.4" />
      <circle cx="32" cy="32" r="0.9" fill="#ffd76b" />
      {/* Aqua sphere highlight */}
      <ellipse cx="24" cy="17" rx="13" ry="6" fill="url(#globe-shine)" />
      {/* Bottom inner shadow ring (gives the glass-sphere feel) */}
      <circle cx="32" cy="32" r="27" fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth="0.6" />
    </svg>
  );
}

/** App Store — blue circle (NOT a rounded square) with crossed pencil/ruler/pen. */
export function AppsDockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden {...props}>
      <defs>
        <radialGradient id="store-bg" cx="0.4" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#7BB4F4" />
          <stop offset="1" stopColor="#0e3f8a" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="29" fill="url(#store-bg)" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" />
      {/* Crossed tools — abstract drafting kit */}
      <g transform="translate(32 32)">
        {/* Pencil diagonal \ */}
        <g transform="rotate(45)">
          <rect x="-1.6" y="-18" width="3.2" height="32" rx="0.6" fill="#f3e8a8" stroke="#5a4810" strokeWidth="0.5" />
          <polygon points="-1.6,14 1.6,14 0,18" fill="#3a2a08" />
          <rect x="-1.6" y="-18" width="3.2" height="3" fill="#cc4444" />
        </g>
        {/* Ruler diagonal / */}
        <g transform="rotate(-45)">
          <rect x="-2.4" y="-18" width="4.8" height="32" rx="0.6" fill="#ffffff" stroke="#666" strokeWidth="0.5" />
          {[-14, -10, -6, -2, 2, 6, 10, 14].map((y) => (
            <line key={y} x1="-2.4" y1={y} x2="0" y2={y} stroke="#888" strokeWidth="0.5" />
          ))}
        </g>
      </g>
      {/* Top gloss arc */}
      <path d="M9 22 Q32 4 55 22" stroke="white" strokeOpacity="0.45" strokeWidth="6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Blog — yellow legal-pad tile with red header strip and a fountain pen.
 *  Original SVG paths + gradients. */
export function BlogDockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden {...props}>
      <defs>
        <linearGradient id="blog-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff3a0" />
          <stop offset="0.5" stopColor="#f7d958" />
          <stop offset="1" stopColor="#dba922" />
        </linearGradient>
        <linearGradient id="blog-header" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6555f" />
          <stop offset="0.5" stopColor="#c8242d" />
          <stop offset="1" stopColor="#9a1820" />
        </linearGradient>
        <linearGradient id="blog-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0.65" />
          <stop offset="0.55" stopColor="white" stopOpacity="0.05" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="blog-pen-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3a3a" />
          <stop offset="0.5" stopColor="#161616" />
          <stop offset="1" stopColor="#2a2a2a" />
        </linearGradient>
        <linearGradient id="blog-pen-nib" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d8d8d8" />
          <stop offset="0.5" stopColor="#f4f4f4" />
          <stop offset="1" stopColor="#9a9a9a" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#blog-bg)" />
      <rect x="0.5" y="0.5" width="63" height="63" rx="13.5" fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth="0.7" />
      {/* Red header strip with subtle saddle stitch */}
      <path d="M0 15 L64 15 L64 13 Q64 5 56 5 L8 5 Q0 5 0 13 Z" fill="url(#blog-header)" />
      <path d="M0 13 L64 13" stroke="rgba(0,0,0,0.18)" strokeWidth="0.4" />
      {[10, 22, 32, 42, 54].map((x) => (
        <circle key={x} cx={x} cy={10} r="0.7" fill="#7a1014" />
      ))}
      {/* Rule lines on the page */}
      {[24, 32, 40, 48].map((y, i) => (
        <line key={y} x1="10" y1={y} x2={i === 3 ? 36 : 54} y2={y}
              stroke="#a88a10" strokeWidth="1.1" opacity="0.85" />
      ))}
      {/* Faint blue margin rule */}
      <line x1="16" y1="18" x2="16" y2="58" stroke="#b4dcff" strokeWidth="0.8" opacity="0.65" />
      {/* Fountain pen — angled across the lower-right of the pad */}
      <g transform="translate(34 38) rotate(35)">
        <rect x="0" y="-1.8" width="20" height="3.6" rx="0.8" fill="url(#blog-pen-body)"
              stroke="rgba(0,0,0,0.55)" strokeWidth="0.4" />
        {/* Cap band */}
        <rect x="13" y="-1.8" width="2.4" height="3.6" fill="#c8a050" />
        {/* Nib */}
        <polygon points="20,-1.8 26,0 20,1.8" fill="url(#blog-pen-nib)"
                 stroke="rgba(0,0,0,0.5)" strokeWidth="0.35" />
        <line x1="22" y1="-0.4" x2="24.5" y2="0.4" stroke="rgba(0,0,0,0.4)" strokeWidth="0.3" />
        {/* Ink line trailing back */}
        <line x1="-3" y1="1" x2="0" y2="0" stroke="#0a3a78" strokeWidth="0.5" opacity="0.55" />
      </g>
      {/* Top gel sheen */}
      <rect x="3" y="2" width="58" height="22" rx="11" fill="url(#blog-gloss)" />
    </svg>
  );
}

export function LaunchpadDockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden {...props}>
      <defs>
        <linearGradient id="lp-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7a7a7a" />
          <stop offset="1" stopColor="#2a2a2a" />
        </linearGradient>
        <linearGradient id="lp-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0.45" />
          <stop offset="0.55" stopColor="white" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#lp-bg)" />
      <rect x="1" y="1" width="62" height="62" rx="13" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      {/* Rocket icon */}
      <g transform="translate(32 33) rotate(-45) translate(-12 -12)">
        <path d="M12 0 C16 3 20 8 20 14 L20 18 L4 18 L4 14 C4 8 8 3 12 0 Z" fill="#e8e8e8" stroke="#888" strokeWidth="0.5" />
        <circle cx="12" cy="11" r="2.5" fill="#3a92e0" stroke="#1a4faa" strokeWidth="0.5" />
        <path d="M4 18 L0 24 L6 22 Z" fill="#ff6b3d" />
        <path d="M20 18 L24 24 L18 22 Z" fill="#ff6b3d" />
        <path d="M9 18 L12 26 L15 18 Z" fill="#ffb547" />
      </g>
      <rect x="3" y="2" width="58" height="28" rx="11" fill="url(#lp-gloss)" />
    </svg>
  );
}

/** Trash — chromed wire-mesh wastebasket. Tapered cylinder, brushed-metal
 *  rim, vertical wires that converge to a narrower base, horizontal bands
 *  fading into the body. Original artwork. */
export function TrashDockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden {...props}>
      <defs>
        <linearGradient id="trash-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7a7a7a" />
          <stop offset="0.15" stopColor="#c8c8c8" />
          <stop offset="0.5" stopColor="#f0f0f0" />
          <stop offset="0.85" stopColor="#c8c8c8" />
          <stop offset="1" stopColor="#7a7a7a" />
        </linearGradient>
        <linearGradient id="trash-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4f4f4" />
          <stop offset="0.5" stopColor="#bcbcbc" />
          <stop offset="1" stopColor="#7a7a7a" />
        </linearGradient>
        <linearGradient id="trash-inside" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2a2a" />
          <stop offset="1" stopColor="#6a6a6a" />
        </linearGradient>
      </defs>
      {/* Inside of the rim (visible through the opening) */}
      <ellipse cx="32" cy="14" rx="21" ry="4.6" fill="url(#trash-inside)" />
      {/* Rim outer band — chromed */}
      <path d="M10 14 Q10 9 32 9 Q54 9 54 14 Q54 18 32 18 Q10 18 10 14 Z"
            fill="url(#trash-rim)" stroke="#5a5a5a" strokeWidth="0.8" />
      <ellipse cx="32" cy="13" rx="20" ry="3.4" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="0.4" />
      {/* Body — slightly tapered cylinder */}
      <path
        d="M11 15
           L14.5 56
           Q14.5 60 19 60
           L45 60
           Q49.5 60 49.5 56
           L53 15
           Z"
        fill="url(#trash-body)"
        stroke="#5a5a5a"
        strokeWidth="0.9"
      />
      {/* Vertical wire mesh — converges to a narrower base */}
      {[15.5, 19, 22.5, 26, 29.5, 33, 36.5, 40, 43.5, 47, 50.5].map((x) => {
        const x2 = x + (32 - x) * 0.16;
        return (
          <line
            key={x}
            x1={x}
            y1="16"
            x2={x2}
            y2="58.5"
            stroke="rgba(50,50,50,0.55)"
            strokeWidth="0.55"
          />
        );
      })}
      {/* Horizontal banding (subtle ribs) */}
      {[24, 33, 42, 51].map((y) => (
        <ellipse
          key={y}
          cx="32"
          cy={y}
          rx={22 - (y - 14) * 0.18}
          ry="1.7"
          fill="none"
          stroke="rgba(40,40,40,0.42)"
          strokeWidth="0.45"
        />
      ))}
      {/* Specular highlight on the left flank */}
      <path d="M14 18 L17 56" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" strokeLinecap="round" />
      {/* Bottom shadow on the floor */}
      <ellipse cx="32" cy="62" rx="22" ry="1.5" fill="black" opacity="0.22" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────
 * Mini-app dock icons (varied shapes — not all rounded squares)
 * ──────────────────────────────────────────────────────────── */

/** Calculator — slightly-rounded dark slab with LCD display + key dots. */
export function CalculatorDockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden {...props}>
      <defs>
        <linearGradient id="calc-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3a3a" />
          <stop offset="1" stopColor="#0d0d0d" />
        </linearGradient>
      </defs>
      <rect x="6" y="4" width="52" height="56" rx="6" fill="url(#calc-body)" stroke="rgba(0,0,0,0.4)" strokeWidth="0.6" />
      {/* LCD */}
      <rect x="11" y="9" width="42" height="14" rx="1.5" fill="#a8b8b0" stroke="#1a1a1a" strokeWidth="0.6" />
      <text x="50" y="20" textAnchor="end" fontFamily="Helvetica" fontSize="11" fontWeight="300" fill="#1a1a1a">0</text>
      {/* Buttons */}
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3].map((col) => {
          const isOp = col === 3;
          return (
            <rect
              key={`${row}-${col}`}
              x={11 + col * 11}
              y={28 + row * 8}
              width="9"
              height="6.5"
              rx="1"
              fill={isOp ? "#ffb547" : "#5a5a5a"}
              stroke="rgba(0,0,0,0.4)"
              strokeWidth="0.4"
            />
          );
        })
      )}
      {/* Gloss */}
      <rect x="8" y="5" width="48" height="22" rx="4" fill="white" opacity="0.12" />
    </svg>
  );
}

/** Notes — sheet of paper outline (NOT a rounded square frame). */
export function NotesDockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden {...props}>
      <defs>
        <linearGradient id="notes-pad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff4a8" />
          <stop offset="1" stopColor="#e9c533" />
        </linearGradient>
      </defs>
      {/* Paper sheet w/ folded corner */}
      <path
        d="M12 8
           L46 8
           L56 18
           L56 56
           Q56 58 54 58
           L12 58
           Q10 58 10 56
           L10 10
           Q10 8 12 8 Z"
        fill="url(#notes-pad)"
        stroke="rgba(120,90,0,0.6)"
        strokeWidth="0.8"
      />
      {/* Folded corner */}
      <path d="M46 8 L46 18 L56 18 Z" fill="#f4d738" stroke="rgba(120,90,0,0.6)" strokeWidth="0.6" />
      {/* Red top strip */}
      <path d="M10 8 Q10 8 12 8 L46 8 L46 14 L10 14 Z" fill="#cc3a3a" />
      {/* Rule lines */}
      {[22, 30, 38, 46].map((y) => (
        <line key={y} x1="15" y1={y} x2="51" y2={y} stroke="#b89500" strokeWidth="0.8" opacity="0.7" />
      ))}
      <line x1="15" y1="52" x2="38" y2="52" stroke="#b89500" strokeWidth="0.8" opacity="0.7" />
      {/* Soft shadow under sheet */}
      <ellipse cx="32" cy="60" rx="22" ry="1" fill="black" opacity="0.18" />
    </svg>
  );
}

/** Terminal — dark slab with green prompt. Square-ish but smaller corner radius. */
export function TerminalDockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden {...props}>
      <defs>
        <linearGradient id="term-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2a2a" />
          <stop offset="0.5" stopColor="#0d0d0d" />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
      </defs>
      <rect x="5" y="9" width="54" height="46" rx="3" fill="url(#term-body)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
      {/* Title bar */}
      <rect x="5" y="9" width="54" height="7" rx="3" fill="#3a3a3a" />
      <rect x="5" y="14" width="54" height="2" fill="#3a3a3a" />
      {/* Three dots */}
      <circle cx="10" cy="12.5" r="1.4" fill="#ff5f57" />
      <circle cx="14" cy="12.5" r="1.4" fill="#febc2e" />
      <circle cx="18" cy="12.5" r="1.4" fill="#28c840" />
      {/* Prompt */}
      <text x="10" y="32" fontFamily="Menlo, monospace" fontSize="10" fill="#9dffb3" fontWeight="bold">{">_"}</text>
      <text x="10" y="44" fontFamily="Menlo, monospace" fontSize="7" fill="#9dffb3" opacity="0.8">$ help</text>
    </svg>
  );
}

/** iCal — white sheet with red header + day number. Light corner radius. */
export function ICalDockIcon(props: IconProps) {
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = now.getDate();
  return (
    <svg viewBox="0 0 64 64" aria-hidden {...props}>
      <rect x="5" y="6" width="54" height="54" rx="6" fill="white" stroke="rgba(0,0,0,0.3)" strokeWidth="0.7" />
      {/* Header strip */}
      <path d="M5 12 Q5 6 11 6 L53 6 Q59 6 59 12 L59 20 L5 20 Z" fill="#cc1818" />
      <text x="32" y="16.5" textAnchor="middle" fontFamily="Helvetica" fontSize="8" fill="white" fontWeight="bold">{month}</text>
      {/* Spiral binding dots */}
      <circle cx="18" cy="9" r="1.2" fill="#1a1a1a" />
      <circle cx="32" cy="9" r="1.2" fill="#1a1a1a" />
      <circle cx="46" cy="9" r="1.2" fill="#1a1a1a" />
      {/* Day number */}
      <text x="32" y="48" textAnchor="middle" fontFamily="Helvetica" fontSize="26" fill="#1a1a1a" fontWeight="300">{day}</text>
      {/* Subtle gloss */}
      <rect x="6" y="20" width="52" height="14" rx="2" fill="white" opacity="0.5" />
    </svg>
  );
}

/** iTunes — circle (NOT square) with music note. */
export function ITunesDockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden {...props}>
      <defs>
        <radialGradient id="itunes-bg" cx="0.45" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ff8aff" />
          <stop offset="0.55" stopColor="#c63ad8" />
          <stop offset="1" stopColor="#5a0e7a" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="29" fill="url(#itunes-bg)" stroke="rgba(0,0,0,0.3)" strokeWidth="0.7" />
      {/* Music note — eighth note */}
      <g fill="white">
        <ellipse cx="24" cy="44" rx="6" ry="4.4" transform="rotate(-18 24 44)" />
        <ellipse cx="40" cy="40" rx="6" ry="4.4" transform="rotate(-18 40 40)" />
        <rect x="29" y="14" width="2.4" height="28" />
        <rect x="44" y="10" width="2.4" height="28" />
        {/* Beam connecting the two stems */}
        <path d="M29 14 L46 10 L46 14.5 L29 18.5 Z" />
      </g>
      {/* Top highlight arc */}
      <path d="M9 24 Q32 4 55 24" stroke="white" strokeOpacity="0.5" strokeWidth="6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Snake — Game Boy-ish vertical body, dot-matrix screen. */
export function SnakeDockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden {...props}>
      <defs>
        <linearGradient id="snake-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8e0c8" />
          <stop offset="1" stopColor="#a89c70" />
        </linearGradient>
      </defs>
      {/* Console body */}
      <rect x="10" y="4" width="44" height="56" rx="6" fill="url(#snake-body)" stroke="rgba(0,0,0,0.35)" strokeWidth="0.7" />
      {/* Screen bezel */}
      <rect x="15" y="10" width="34" height="28" rx="2" fill="#1a1a1a" />
      {/* Screen pixels — snake */}
      <rect x="18" y="14" width="28" height="20" fill="#7a8a3a" />
      {[
        [22, 18], [26, 18], [30, 18],
        [30, 22], [30, 26], [34, 26], [38, 26],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="3" height="3" fill="#0a1a0a" />
      ))}
      <rect x="38" y="20" width="2.5" height="2.5" fill="#0a1a0a" />
      {/* D-pad cross */}
      <rect x="18" y="46" width="10" height="3.5" fill="#1a1a1a" />
      <rect x="21.5" y="42.5" width="3.5" height="10" fill="#1a1a1a" />
      {/* A/B buttons */}
      <circle cx="40" cy="46" r="2.6" fill="#cc2a2a" />
      <circle cx="46" cy="50" r="2.6" fill="#cc2a2a" />
      <text x="32" y="58" textAnchor="middle" fontFamily="Helvetica" fontSize="3.5" fontWeight="bold" fill="#5a4a20">DiogoBoy</text>
    </svg>
  );
}

/** Blog / Tumblr — keep the legal-pad style; lightly tweaked. */

/** iChat — Aqua speech bubble with a curved tail and gel sheen.
 *  Original artwork: my own SVG paths + gradient stops. */
export function ContactDockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden {...props}>
      <defs>
        <linearGradient id="ichat-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9bd6ff" />
          <stop offset="0.5" stopColor="#3aa2ec" />
          <stop offset="1" stopColor="#0c4488" />
        </linearGradient>
        <radialGradient id="ichat-lowlight" cx="0.5" cy="1.05" r="0.7">
          <stop offset="0" stopColor="white" stopOpacity="0.42" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ichat-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0.92" />
          <stop offset="0.6" stopColor="white" stopOpacity="0.1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Bubble body — soft rounded rect with a curving tail toward bottom-left */}
      <path
        d="M9 22 Q9 7 25 7 L43 7 Q59 7 59 22 L59 36 Q59 50 43 50 L26 50 L13 60 L18 48 Q9 46 9 36 Z"
        fill="url(#ichat-bg)"
        stroke="rgba(0,0,0,0.45)"
        strokeWidth="0.9"
      />
      {/* Bottom under-glow gives that glass-pebble depth */}
      <path
        d="M11 33 L57 33 Q57 49 43 49 L26 49 L14 58 L18 47 Q11 45 11 36 Z"
        fill="url(#ichat-lowlight)"
      />
      {/* Three chat dots */}
      <circle cx="22" cy="29" r="3.4" fill="white" />
      <circle cx="32" cy="29" r="3.4" fill="white" />
      <circle cx="42" cy="29" r="3.4" fill="white" />
      {/* Subtle inner-shadow on dots so they read as pearls, not flat circles */}
      <circle cx="22" cy="30" r="3.4" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="0.4" />
      <circle cx="32" cy="30" r="3.4" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="0.4" />
      <circle cx="42" cy="30" r="3.4" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="0.4" />
      {/* Aqua gel sheen — covers ~the top 40% of the bubble */}
      <path
        d="M12 20 Q12 11 24 11 L44 11 Q56 11 56 20 L56 26 Q44 22 32 22 Q20 22 12 26 Z"
        fill="url(#ichat-gloss)"
      />
      {/* Tiny specular highlight bottom-left for extra glassiness */}
      <ellipse cx="17" cy="44" rx="3" ry="1.5" fill="white" opacity="0.3" transform="rotate(-18 17 44)" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────
 * Avatar + CV icons
 * ──────────────────────────────────────────────────────────── */

export function AvatarBlock({ initials }: { initials: string }) {
  return (
    <div
      className="w-24 h-24 rounded-2xl flex-shrink-0 flex items-center justify-center text-white text-3xl font-semibold select-none relative overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #68c8f8 0%, #1a7fcc 100%)",
        boxShadow:
          "0 4px 16px rgba(26,127,204,0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
        fontFamily: "-apple-system, 'Lucida Grande', sans-serif",
        letterSpacing: "-0.5px",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.32) 0%, transparent 55%)",
        }}
      />
      <span className="relative z-10">{initials}</span>
    </div>
  );
}

export function GraduationIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 3L1 9l11 6 9-4.91V17h2V9zM5 13.18v4L12 21l7-3.82v-4L12 17z" />
    </svg>
  );
}

export function PenIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────
 * App-specific icons (used on AppCard)
 * Each is a stylized symbol that maps to the app theme
 * ──────────────────────────────────────────────────────────── */

export function RocketIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M14.5 13.5L21 7c0-3.5-2.5-5-5-5l-6.5 6.5L14.5 13.5zM10 8L4 14l2.5 1L8 18.5l1 2.5 6-6L10 8zm-2 9.5L6 18l-2-2 .5-2 3 3z" />
    </svg>
  );
}

export function GamepadIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17 6H7a6 6 0 0 0 0 12c1.66 0 3.16-.67 4.24-1.76L12 16h.01l.75.24A5.99 5.99 0 0 0 17 18a6 6 0 0 0 0-12zM9 13H7v2H5v-2H3v-2h2V9h2v2h2v2zm6 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm3-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
    </svg>
  );
}

export function ToolIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
    </svg>
  );
}

export function TargetIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
    </svg>
  );
}

export function LightbulbIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
    </svg>
  );
}

export function WrenchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
    </svg>
  );
}

export function DiceIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M19 5v14H5V5h14m1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .5.4.9.9.9h16.2c.5 0 .9-.4.9-.9V3.9c0-.5-.4-.9-.9-.9zM7.5 8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5zm0 7c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S9.83 17 9 17s-1.5-.67-1.5-1.5zM13.5 12c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5z" />
    </svg>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M7 2v11h3v9l7-12h-4l3-8H7z" />
    </svg>
  );
}

/** Lookup helper for AppCard */
export const APP_ICONS = {
  rocket: RocketIcon,
  gamepad: GamepadIcon,
  tool: ToolIcon,
  target: TargetIcon,
  lightbulb: LightbulbIcon,
  wrench: WrenchIcon,
  phone: PhoneIcon,
  dice: DiceIcon,
  bolt: BoltIcon,
} as const;

export type AppIconKey = keyof typeof APP_ICONS;

/* ────────────────────────────────────────────────────────────
 * Social icons
 * ──────────────────────────────────────────────────────────── */

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function GitHubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.11.83-.26.83-.57v-2c-3.34.72-4.04-1.6-4.04-1.6-.55-1.39-1.34-1.76-1.34-1.76-1.08-.73.08-.72.08-.72 1.2.08 1.83 1.23 1.83 1.23 1.07 1.84 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.44.37.81 1.1.81 2.22v3.29c0 .32.21.69.83.57A12 12 0 0 0 12 .3" />
    </svg>
  );
}

export function TwitterIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function SubstackIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  );
}

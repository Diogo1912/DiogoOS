"use client";

import { useState } from "react";

export interface ExpProps {
  title: string;
  company: string;
  employment?: string;
  location?: string | null;
  startDate: string;
  endDate: string | null;
  description: string[] | null;
}

const TONES = ["yellow", "pink", "blue", "green", "purple"] as const;
type Tone = (typeof TONES)[number];
const VARS: Record<Tone, string> = {
  yellow: "var(--neo-yellow)",
  pink: "var(--neo-pink)",
  blue: "var(--neo-blue)",
  green: "var(--neo-green)",
  purple: "var(--neo-purple)",
};

export function ExperienceItem({
  exp,
  index,
  tone: toneOverride,
}: {
  exp: ExpProps;
  index: number;
  /** Optional fixed tone for the marker. If omitted, cycles through TONES. */
  tone?: Tone;
}) {
  const hasDesc = Array.isArray(exp.description) && exp.description.length > 0;
  const [open, setOpen] = useState(index === 0);
  const tone: Tone = toneOverride ?? TONES[index % TONES.length];

  return (
    <article className="neo-exp">
      <button
        type="button"
        className="neo-exp-head"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        disabled={!hasDesc}
      >
        <span
          className="neo-exp-marker"
          style={{ background: VARS[tone] }}
          aria-hidden
        >
          {exp.company.charAt(0)}
        </span>
        <span className="neo-exp-titles">
          <span className="neo-exp-title">{exp.title}</span>
          <span className="neo-exp-sub">
            {exp.company}
            {exp.employment ? ` · ${exp.employment}` : ""}
            {exp.location ? ` · ${exp.location}` : ""}
          </span>
        </span>
        <span className="neo-exp-meta">
          {exp.startDate} – {exp.endDate ?? "Present"}
          {hasDesc && (
            <span className="neo-exp-chev" aria-hidden>
              {open ? "−" : "+"}
            </span>
          )}
        </span>
      </button>
      {open && hasDesc && (
        <ul className="neo-exp-body">
          {exp.description!.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

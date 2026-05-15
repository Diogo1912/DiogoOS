"use client";

import { useMemo, useState } from "react";
import { MiniAppFrame } from "@/components/os/MiniAppFrame";

const EVENTS: Record<string, string[]> = {
  "2026-05-14": ["Shipped DiogoOS v2"],
  "2026-06-01": ["Coffee with the team"],
  "2026-07-04": ["Side-project hack day"],
  "2026-12-25": ["Christmas"],
};

export function ICal() {
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return { y: d.getFullYear(), m: d.getMonth() };
  });

  const grid = useMemo(() => buildMonthGrid(month.y, month.m), [month]);
  const monthName = new Date(month.y, month.m).toLocaleString("en-US", {
    month: "long",
  });

  const todayStr = new Date().toDateString();

  return (
    <MiniAppFrame id="ical" title="iCal" width={420}>
      <div className="bg-white" style={{ height: 360 }}>
        {/* Leather-bound header */}
        <div
          className="px-4 py-2 flex items-center justify-between text-white"
          style={{
            background:
              "linear-gradient(to bottom, #8a1818 0%, #5a0e0e 100%)",
            borderBottom: "1px solid #2a0000",
            textShadow: "0 1px 0 rgba(0,0,0,0.4)",
          }}
        >
          <button
            onClick={() => setMonth((m) => ({ y: m.m === 0 ? m.y - 1 : m.y, m: (m.m + 11) % 12 }))}
            className="text-[16px] px-2 py-0.5 hover:bg-white/15 rounded"
            aria-label="Previous month"
          >
            ‹
          </button>
          <h2 className="text-[15px] font-bold tracking-tight">
            {monthName} {month.y}
          </h2>
          <button
            onClick={() => setMonth((m) => ({ y: m.m === 11 ? m.y + 1 : m.y, m: (m.m + 1) % 12 }))}
            className="text-[16px] px-2 py-0.5 hover:bg-white/15 rounded"
            aria-label="Next month"
          >
            ›
          </button>
        </div>

        {/* Weekday header */}
        <div className="grid grid-cols-7 text-[10px] uppercase tracking-wider font-bold text-gray-500 border-b border-gray-300">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="px-2 py-1 text-center border-r border-gray-200 last:border-r-0">
              {d}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7 grid-rows-6 text-[11px] h-[260px]">
          {grid.map((cell, i) => {
            const date = new Date(cell.y, cell.m, cell.d);
            const iso = `${cell.y}-${String(cell.m + 1).padStart(2, "0")}-${String(cell.d).padStart(2, "0")}`;
            const events = EVENTS[iso] ?? [];
            const isToday = date.toDateString() === todayStr;
            return (
              <div
                key={i}
                className={`border-r border-b border-gray-200 last-in-row:border-r-0 px-1.5 py-1 flex flex-col gap-0.5 ${
                  cell.outside ? "text-gray-300" : "text-gray-700"
                } ${isToday ? "bg-[#fff5d0]" : "hover:bg-gray-50"}`}
              >
                <div className="flex items-center gap-1">
                  <span className={`text-[11px] ${isToday ? "bg-[#c81818] text-white rounded-full w-5 h-5 flex items-center justify-center font-bold" : "font-medium"}`}>
                    {cell.d}
                  </span>
                </div>
                {events.map((e, j) => (
                  <div
                    key={j}
                    className="text-[9px] leading-tight px-1 py-0.5 rounded bg-[#c81818] text-white truncate"
                  >
                    {e}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </MiniAppFrame>
  );
}

function buildMonthGrid(year: number, month: number) {
  const first = new Date(year, month, 1);
  const startDay = first.getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();
  const cells: { d: number; m: number; y: number; outside: boolean }[] = [];

  for (let i = startDay - 1; i >= 0; i--) {
    cells.push({
      d: prevDays - i,
      m: month === 0 ? 11 : month - 1,
      y: month === 0 ? year - 1 : year,
      outside: true,
    });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    cells.push({ d: i, m: month, y: year, outside: false });
  }
  while (cells.length < 42) {
    const next = cells.length - (startDay + daysInMonth) + 1;
    cells.push({
      d: next,
      m: month === 11 ? 0 : month + 1,
      y: month === 11 ? year + 1 : year,
      outside: true,
    });
  }
  return cells;
}

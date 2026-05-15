"use client";

import { useState } from "react";
import { MiniAppFrame } from "@/components/os/MiniAppFrame";

const BUTTONS: { l: string; act: string; kind: "num" | "op" | "ac" | "eq" | "fn" }[] = [
  { l: "AC", act: "ac", kind: "ac" },
  { l: "±", act: "neg", kind: "fn" },
  { l: "%", act: "pct", kind: "fn" },
  { l: "÷", act: "/", kind: "op" },
  { l: "7", act: "7", kind: "num" },
  { l: "8", act: "8", kind: "num" },
  { l: "9", act: "9", kind: "num" },
  { l: "×", act: "*", kind: "op" },
  { l: "4", act: "4", kind: "num" },
  { l: "5", act: "5", kind: "num" },
  { l: "6", act: "6", kind: "num" },
  { l: "−", act: "-", kind: "op" },
  { l: "1", act: "1", kind: "num" },
  { l: "2", act: "2", kind: "num" },
  { l: "3", act: "3", kind: "num" },
  { l: "+", act: "+", kind: "op" },
  { l: "0", act: "0", kind: "num" },
  { l: ".", act: ".", kind: "num" },
  { l: "=", act: "eq", kind: "eq" },
];

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [acc, setAcc] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [reset, setReset] = useState(false);

  const press = (kind: string, act: string) => {
    if (kind === "ac") {
      setDisplay("0");
      setAcc(null);
      setOp(null);
      setReset(false);
      return;
    }
    if (kind === "num") {
      if (reset || display === "0") {
        setDisplay(act === "." ? "0." : act);
        setReset(false);
      } else if (!(act === "." && display.includes("."))) {
        setDisplay(display + act);
      }
      return;
    }
    if (kind === "op") {
      const cur = parseFloat(display);
      if (acc === null) {
        setAcc(cur);
      } else if (op) {
        setAcc(compute(acc, cur, op));
        setDisplay(String(compute(acc, cur, op)));
      }
      setOp(act);
      setReset(true);
      return;
    }
    if (kind === "eq") {
      if (acc !== null && op !== null) {
        const result = compute(acc, parseFloat(display), op);
        setDisplay(formatNum(result));
        setAcc(null);
        setOp(null);
        setReset(true);
      }
      return;
    }
    if (kind === "fn") {
      if (act === "neg") setDisplay(formatNum(-parseFloat(display)));
      if (act === "pct") setDisplay(formatNum(parseFloat(display) / 100));
    }
  };

  return (
    <MiniAppFrame id="calculator" title="Calculator" width={240}>
      <div className="bg-[#1a1a1a] p-2">
        <div
          className="bg-[#a8b8b8] text-right text-[28px] font-light text-[#1a1a1a] px-3 py-3 mb-2 rounded-sm tabular-nums truncate"
          style={{ fontFamily: '"Helvetica Neue", Helvetica, sans-serif' }}
        >
          {display}
        </div>
        <div className="grid grid-cols-4 gap-1">
          {BUTTONS.map((b) => {
            const wide = b.l === "0";
            return (
              <button
                key={b.l}
                onClick={() => press(b.kind, b.act)}
                className={`h-10 text-[16px] font-medium rounded-sm select-none active:translate-y-px ${
                  wide ? "col-span-2" : ""
                } ${calcBtnClass(b.kind)}`}
              >
                {b.l}
              </button>
            );
          })}
        </div>
      </div>
    </MiniAppFrame>
  );
}

function calcBtnClass(kind: string): string {
  if (kind === "op" || kind === "eq")
    return "bg-gradient-to-b from-[#ffb547] to-[#cc7c00] text-white shadow-inner";
  if (kind === "ac" || kind === "fn")
    return "bg-gradient-to-b from-[#7a7a7a] to-[#525252] text-white";
  return "bg-gradient-to-b from-[#5a5a5a] to-[#3a3a3a] text-white";
}

function compute(a: number, b: number, op: string): number {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? NaN : a / b;
    default:
      return b;
  }
}

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "Error";
  const s = String(n);
  return s.length > 10 ? n.toPrecision(8) : s;
}

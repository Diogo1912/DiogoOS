"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MiniAppFrame } from "@/components/os/MiniAppFrame";

const COLS = 18;
const ROWS = 18;
const TICK = 110;

type Point = { x: number; y: number };
type Dir = "U" | "D" | "L" | "R";

const SEED_SNAKE: Point[] = [
  { x: 9, y: 9 },
  { x: 8, y: 9 },
  { x: 7, y: 9 },
];

function randomFood(snake: Point[]): Point {
  while (true) {
    const f = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    };
    if (!snake.some((s) => s.x === f.x && s.y === f.y)) return f;
  }
}

export function Snake() {
  const [snake, setSnake] = useState<Point[]>(SEED_SNAKE);
  const [food, setFood] = useState<Point>({ x: 14, y: 9 });
  const [dir, setDir] = useState<Dir>("R");
  const dirRef = useRef<Dir>("R");
  const [score, setScore] = useState(0);
  const [hi, setHi] = useState(0);
  const [running, setRunning] = useState(true);
  const [dead, setDead] = useState(false);

  useEffect(() => {
    const h = parseInt(localStorage.getItem("diogoos:snake-hi") ?? "0", 10);
    if (!isNaN(h)) setHi(h);
  }, []);

  useEffect(() => {
    dirRef.current = dir;
  }, [dir]);

  const reset = useCallback(() => {
    setSnake(SEED_SNAKE);
    setFood(randomFood(SEED_SNAKE));
    setDir("R");
    setScore(0);
    setDead(false);
    setRunning(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") {
        if (dirRef.current !== "D") setDir("U");
      } else if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") {
        if (dirRef.current !== "U") setDir("D");
      } else if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        if (dirRef.current !== "R") setDir("L");
      } else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        if (dirRef.current !== "L") setDir("R");
      } else if (e.key === " ") {
        setRunning((r) => !r);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!running || dead) return;
    const id = setInterval(() => {
      setSnake((s) => {
        const head = s[0];
        const next = {
          x: head.x + (dirRef.current === "L" ? -1 : dirRef.current === "R" ? 1 : 0),
          y: head.y + (dirRef.current === "U" ? -1 : dirRef.current === "D" ? 1 : 0),
        };
        // Wall hit
        if (next.x < 0 || next.x >= COLS || next.y < 0 || next.y >= ROWS) {
          setDead(true);
          return s;
        }
        // Self hit
        if (s.some((p) => p.x === next.x && p.y === next.y)) {
          setDead(true);
          return s;
        }
        const ate = next.x === food.x && next.y === food.y;
        const newSnake = [next, ...s];
        if (!ate) newSnake.pop();
        else {
          setScore((sc) => {
            const ns = sc + 1;
            setHi((h) => {
              const nh = Math.max(h, ns);
              localStorage.setItem("diogoos:snake-hi", String(nh));
              return nh;
            });
            return ns;
          });
          setFood(randomFood(newSnake));
        }
        return newSnake;
      });
    }, TICK);
    return () => clearInterval(id);
  }, [running, dead, food]);

  return (
    <MiniAppFrame id="snake" title="Snake" width={320}>
      <div className="bg-black p-2" style={{ height: 380 }}>
        <div className="flex items-center justify-between text-[#7af07a] text-[11px] font-mono mb-1 px-1">
          <span>SCORE: {score.toString().padStart(3, "0")}</span>
          <span>HI: {hi.toString().padStart(3, "0")}</span>
          <button
            onClick={() => setRunning((r) => !r)}
            className="text-[#7af07a] hover:text-white"
            disabled={dead}
          >
            {running ? "PAUSE" : "RESUME"}
          </button>
        </div>
        <div
          className="relative bg-[#0a1f0a] mx-auto"
          style={{ width: COLS * 16, height: ROWS * 16 }}
        >
          {snake.map((s, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: s.x * 16,
                top: s.y * 16,
                width: 16,
                height: 16,
                background: i === 0 ? "#9dffb3" : "#5fe07a",
                border: "1px solid #0a1f0a",
              }}
            />
          ))}
          <div
            className="absolute"
            style={{
              left: food.x * 16,
              top: food.y * 16,
              width: 16,
              height: 16,
              background: "#ff5757",
              borderRadius: "50%",
            }}
          />
          {dead && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-[#ff5757] font-mono">
              <div className="text-[18px] font-bold">GAME OVER</div>
              <div className="text-[11px] mt-1">Score: {score}</div>
              <button
                onClick={reset}
                className="mt-3 px-3 py-1 border border-[#7af07a] text-[#7af07a] hover:bg-[#7af07a] hover:text-black text-[11px]"
              >
                PLAY AGAIN
              </button>
            </div>
          )}
        </div>
        <p className="text-[10px] text-[#7af07a]/60 mt-1 text-center font-mono">
          Arrows / WASD · Space pauses
        </p>
      </div>
    </MiniAppFrame>
  );
}

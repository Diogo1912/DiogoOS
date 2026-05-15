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
  // Three phases: "title" (start screen), "playing", "dead" (game over).
  const [phase, setPhase] = useState<"title" | "playing" | "dead">("title");
  const [running, setRunning] = useState(false);
  // Derived flags so the existing render logic still reads naturally.
  const dead = phase === "dead";

  useEffect(() => {
    const h = parseInt(localStorage.getItem("diogoos:snake-hi") ?? "0", 10);
    if (!isNaN(h)) setHi(h);
  }, []);

  useEffect(() => {
    dirRef.current = dir;
  }, [dir]);

  const startGame = useCallback(() => {
    setSnake(SEED_SNAKE);
    setFood(randomFood(SEED_SNAKE));
    setDir("R");
    setScore(0);
    setPhase("playing");
    setRunning(true);
  }, []);

  const backToTitle = useCallback(() => {
    setPhase("title");
    setRunning(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // On the title or game-over screen, Space / Enter starts the game.
      if (phase !== "playing") {
        if (e.key === " " || e.key === "Enter") {
          startGame();
        }
        return;
      }
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
  }, [phase, startGame]);

  useEffect(() => {
    if (phase !== "playing" || !running) return;
    const id = setInterval(() => {
      setSnake((s) => {
        const head = s[0];
        const next = {
          x: head.x + (dirRef.current === "L" ? -1 : dirRef.current === "R" ? 1 : 0),
          y: head.y + (dirRef.current === "U" ? -1 : dirRef.current === "D" ? 1 : 0),
        };
        // Wall hit
        if (next.x < 0 || next.x >= COLS || next.y < 0 || next.y >= ROWS) {
          setPhase("dead");
          setRunning(false);
          return s;
        }
        // Self hit
        if (s.some((p) => p.x === next.x && p.y === next.y)) {
          setPhase("dead");
          setRunning(false);
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
  }, [running, phase, food]);

  return (
    <MiniAppFrame id="snake" title="Snake" width={320}>
      <div className="bg-black p-2" style={{ height: 380 }}>
        <div className="flex items-center justify-between text-[#7af07a] text-[11px] font-mono mb-1 px-1">
          <span>SCORE: {score.toString().padStart(3, "0")}</span>
          <span>HI: {hi.toString().padStart(3, "0")}</span>
          <button
            onClick={() => setRunning((r) => !r)}
            className="text-[#7af07a] hover:text-white disabled:opacity-40"
            disabled={phase !== "playing"}
          >
            {phase !== "playing" ? "—" : running ? "PAUSE" : "RESUME"}
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
          {phase === "title" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-[#7af07a] font-mono select-none">
              <div className="text-[28px] font-bold tracking-[0.25em] mb-1">
                SNAKE
              </div>
              <div className="text-[10px] opacity-70 tracking-[0.18em] mb-5">
                DIOGOBOY ENTERTAINMENT
              </div>
              <button
                onClick={startGame}
                className="px-5 py-1.5 border-2 border-[#7af07a] text-[#7af07a] hover:bg-[#7af07a] hover:text-black text-[12px] tracking-[0.18em] font-bold"
              >
                ▶ START
              </button>
              {hi > 0 && (
                <div className="mt-5 text-[10px] opacity-70">
                  HIGH SCORE · {hi.toString().padStart(3, "0")}
                </div>
              )}
              <div className="mt-5 text-[9px] opacity-50 text-center leading-snug">
                Arrows / WASD to steer<br />Space pauses · Eat the red dot
              </div>
            </div>
          )}

          {phase === "dead" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 text-[#ff5757] font-mono">
              <div className="text-[18px] font-bold tracking-[0.18em]">GAME OVER</div>
              <div className="text-[11px] mt-1 text-[#7af07a]">Score: {score}</div>
              {score >= hi && score > 0 && (
                <div className="text-[10px] mt-1 text-[#ffea7a]">★ NEW HIGH SCORE ★</div>
              )}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={startGame}
                  className="px-3 py-1 border border-[#7af07a] text-[#7af07a] hover:bg-[#7af07a] hover:text-black text-[11px]"
                >
                  PLAY AGAIN
                </button>
                <button
                  onClick={backToTitle}
                  className="px-3 py-1 border border-[#7af07a]/60 text-[#7af07a]/80 hover:bg-[#7af07a]/20 text-[11px]"
                >
                  TITLE
                </button>
              </div>
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

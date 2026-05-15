"use client";

import { useEffect, useRef, useState } from "react";
import { MiniAppFrame } from "@/components/os/MiniAppFrame";
import { profile } from "@/lib/data";

const HOST = "diogo-os";
const USER = "diogo";

interface Line {
  kind: "in" | "out";
  text: string;
}

const HELP = `Available commands:
  help        show this help
  about       about Diogo
  ls          list directory
  cat <file>  read a file
  whoami      who you are
  date        current date
  echo <txt>  echo text
  open <app>  open an OS app (apps, blog, contact, calculator, notes, snake)
  history     show command history
  sudo ...    "nice try"
  clear       clear the terminal
  exit        close the terminal`;

const FILES: Record<string, string> = {
  "about.txt": profile.bio,
  "contact.txt": `Reach me: ${profile.email}\nOr try /contact in this OS.`,
  "secret.txt": "01001000 01101001 — you found it. Email me with 'binary'.",
  ".bashrc": `export PS1='${USER}@${HOST}:~$ '\nexport EDITOR=nano`,
};

const FILE_LIST = ["about.txt", "contact.txt", ".bashrc", "secret.txt"];

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: `Last login: today on console` },
    { kind: "out", text: `DiogoOS 10.5.8 Snow Diogo — type 'help' for commands` },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number>(-1);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    setLines((l) => [...l, { kind: "in", text: `${USER}@${HOST}:~$ ${cmd}` }]);
    if (!cmd) return;
    setHistory((h) => [...h, cmd]);
    setHistIdx(-1);

    const [c, ...args] = cmd.split(/\s+/);
    const arg = args.join(" ");
    let out: string | null = "";

    switch (c.toLowerCase()) {
      case "help":
        out = HELP;
        break;
      case "about":
      case "whoami":
        out = profile.name + " — " + profile.headline;
        break;
      case "ls":
        out = FILE_LIST.join("  ");
        break;
      case "cat":
        out = FILES[args[0]] ?? `cat: ${args[0] || "(no file)"}: No such file or directory`;
        break;
      case "date":
        out = new Date().toString();
        break;
      case "echo":
        out = arg;
        break;
      case "history":
        out = history.map((h, i) => `${i + 1}  ${h}`).join("\n");
        break;
      case "sudo":
        out = `${USER} is not in the sudoers file. This incident will be reported.`;
        break;
      case "rm":
        out = `permission denied: please don't`;
        break;
      case "open":
        out = handleOpen(args[0]);
        break;
      case "clear":
        setLines([]);
        return;
      case "exit":
        out = "logout — type 'help' to re-summon me";
        // Closing handled via global close — leave window open here
        break;
      default:
        out = `${c}: command not found. type 'help'.`;
    }
    if (out !== null) {
      setLines((l) => [...l, { kind: "out", text: out as string }]);
    }
  };

  const handleOpen = (target?: string): string => {
    if (!target) return "open: missing app name";
    const t = target.toLowerCase();
    if (["apps", "appstore", "store"].includes(t)) {
      window.location.assign("/apps");
      return "opening App Store…";
    }
    if (t === "blog" || t === "tumblr") {
      window.location.assign("/blog");
      return "opening Blog…";
    }
    if (["contact", "ichat"].includes(t)) {
      window.location.assign("/contact");
      return "opening iChat…";
    }
    if (["home", "myspace"].includes(t)) {
      window.location.assign("/");
      return "opening MySpace…";
    }
    return `open: unknown app '${target}'`;
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const ni = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(ni);
      setInput(history[ni] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const ni = histIdx + 1;
      if (ni >= history.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(ni);
        setInput(history[ni] ?? "");
      }
    }
  };

  return (
    <MiniAppFrame id="terminal" title="Terminal — bash" width={520}>
      <div
        className="bg-[#1a1a1a] text-[#e8e8e8] p-3 overflow-y-auto"
        style={{
          fontFamily: '"Menlo", "Monaco", "Courier New", monospace',
          fontSize: 12,
          height: 340,
          lineHeight: 1.45,
        }}
        onClick={() =>
          (document.getElementById("term-input") as HTMLInputElement)?.focus()
        }
      >
        {lines.map((l, i) => (
          <pre
            key={i}
            className={`whitespace-pre-wrap m-0 ${
              l.kind === "in" ? "text-[#9dffb3]" : "text-[#d0d0d0]"
            }`}
            style={{ fontFamily: "inherit" }}
          >
            {l.text}
          </pre>
        ))}
        <div className="flex items-center mt-0.5">
          <span className="text-[#9dffb3]">{USER}@{HOST}:~$&nbsp;</span>
          <input
            id="term-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            className="flex-1 bg-transparent outline-none text-[#e8e8e8] caret-[#9dffb3]"
            autoFocus
            spellCheck={false}
          />
        </div>
        <div ref={endRef} />
      </div>
    </MiniAppFrame>
  );
}

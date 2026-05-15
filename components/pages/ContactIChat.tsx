"use client";

import { useState, useRef, useEffect } from "react";
import { social, profile } from "@/lib/data";
import {
  LinkedInIcon,
  GitHubIcon,
  TwitterIcon,
  SubstackIcon,
} from "@/components/icons";

const BUDDIES = [
  { key: "linkedin" as const, label: "LinkedIn", Icon: LinkedInIcon, color: "#0a66c2", status: "online" as const },
  { key: "github" as const, label: "GitHub", Icon: GitHubIcon, color: "#1d1d1d", status: "online" as const },
  { key: "twitter" as const, label: "Twitter", Icon: TwitterIcon, color: "#000000", status: "away" as const },
  { key: "substack" as const, label: "Substack", Icon: SubstackIcon, color: "#ff6719", status: "away" as const },
];

interface Message {
  from: "me" | "them";
  text: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    from: "them",
    text: `Hey there! I'm Diogo. Drop a message and I'll get back to you at ${profile.email}.`,
  },
  { from: "them", text: "What's on your mind?" },
];

const CANNED_REPLIES = [
  "Thanks for the message! I'll get back to you at your email shortly.",
  "Got it — I'll be in touch soon.",
  "Appreciate you reaching out! Let me get back to you with a proper reply.",
];

export function ContactIChat() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [typing, setTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    setMessages((m) => [...m, { from: "me", text }]);
    setInput("");
    setTyping(true);

    // Simulate Diogo "typing" then send a canned reply
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          from: "them",
          text:
            CANNED_REPLIES[Math.floor(Math.random() * CANNED_REPLIES.length)] +
            (name && email
              ? ` (I'll reach out to ${email}.)`
              : " (Add your name + email below so I can actually reply!)"),
        },
      ]);
    }, 1400);
  };

  const openMailto = () => {
    if (!input.trim() || !name || !email) return;
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${input}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex h-full min-h-[480px]">
      {/* Buddy list sidebar */}
      <aside className="ichat-sidebar w-48 flex-shrink-0 flex flex-col">
        <div className="px-3 py-3 border-b border-gray-400/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#68c8f8] to-[#1a7fcc] flex items-center justify-center text-white font-bold text-[12px]">
              DB
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-gray-800 leading-tight">
                Diogo Baptista
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-600 mt-0.5">
                <span className="status-online w-1.5 h-1.5 rounded-full inline-block" />
                Available
              </div>
            </div>
          </div>
        </div>

        <div className="px-2 py-1.5 text-[9px] uppercase tracking-wider font-bold text-gray-500">
          Buddies — {BUDDIES.length}
        </div>

        <div className="flex-1 overflow-y-auto">
          {BUDDIES.map((b) => {
            const url = social[b.key];
            return (
              <a
                key={b.key}
                href={url || undefined}
                target={url ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-2.5 py-1.5 hover:bg-blue-500/15 transition-colors group ${
                  !url ? "opacity-60" : ""
                }`}
                onClick={!url ? (e) => e.preventDefault() : undefined}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    b.status === "online" ? "status-online" : "status-away"
                  }`}
                />
                <div
                  className="w-5 h-5 rounded-sm flex items-center justify-center flex-shrink-0"
                  style={{ background: b.color }}
                >
                  <b.Icon className="w-3 h-3 text-white" />
                </div>
                <span className="text-[11px] font-semibold text-gray-800 truncate">
                  {b.label}
                </span>
              </a>
            );
          })}
        </div>

        <div className="px-3 py-2 border-t border-gray-400/50 text-[9px] text-gray-500 italic">
          v3.0 · Bonjour
        </div>
      </aside>

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-white/40 min-w-0">
        {/* Chat header */}
        <div className="px-4 py-2 border-b border-gray-300 bg-gradient-to-b from-[#f0f0f0] to-[#dadada] flex items-center gap-2">
          <span className="status-online w-2 h-2 rounded-full" />
          <span className="text-[12px] font-bold text-gray-800">Diogo Baptista</span>
          <span className="text-[10px] text-gray-500 ml-auto italic">
            instant message
          </span>
        </div>

        {/* Messages */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5"
        >
          {messages.map((m, i) => (
            <Bubble key={i} message={m} />
          ))}
          {typing && (
            <div className="flex items-end gap-1.5">
              <div className="ichat-bubble-them px-3 py-2 inline-flex gap-1">
                <Dot delay={0} />
                <Dot delay={150} />
                <Dot delay={300} />
              </div>
            </div>
          )}
        </div>

        {/* Identification fields */}
        <div className="px-4 py-2 border-t border-gray-300 bg-gradient-to-b from-[#f5f5f5] to-[#e8e8e8] flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="mac-input flex-1 px-2 py-1 rounded text-[11px]"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            type="email"
            className="mac-input flex-1 px-2 py-1 rounded text-[11px]"
          />
        </div>

        {/* Input bar */}
        <form
          onSubmit={handleSend}
          className="px-3 py-2.5 border-t border-gray-300 bg-gradient-to-b from-[#f0f0f0] to-[#d8d8d8] flex gap-2 items-center"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="iMessage Diogo…"
            className="mac-input flex-1 px-3 py-1.5 rounded-full text-[12px]"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="aqua-button px-4 py-1 rounded-full text-white text-[12px] font-semibold disabled:opacity-50"
          >
            Send
          </button>
          <button
            type="button"
            onClick={openMailto}
            disabled={!input.trim() || !name || !email}
            className="text-[11px] text-[#1a7fcc] hover:underline disabled:opacity-40 disabled:no-underline"
          >
            Email
          </button>
        </form>
      </div>
    </div>
  );
}

function Bubble({ message }: { message: Message }) {
  const me = message.from === "me";
  return (
    <div className={`flex ${me ? "justify-end" : "justify-start"}`}>
      <div
        className={`${
          me ? "ichat-bubble-me" : "ichat-bubble-them"
        } px-3 py-1.5 max-w-[75%] text-[12px] leading-snug`}
      >
        {message.text}
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="w-1.5 h-1.5 rounded-full bg-gray-500 inline-block"
      style={{
        animation: "ichat-dot 1.2s infinite",
        animationDelay: `${delay}ms`,
      }}
    />
  );
}

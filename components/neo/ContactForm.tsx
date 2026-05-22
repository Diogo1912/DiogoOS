"use client";

import { useState } from "react";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name,
          email,
          message,
          subject: `New message from ${name || "someone"} on your site`,
          from_name: "diogonet.com contact form",
        }),
      });
      const data = (await res.json()) as { success: boolean; message?: string };

      if (data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setErrorMsg(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error — please try again or email me directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="neo-highlight neo-highlight--green">
        <h3
          style={{
            margin: "0 0 6px",
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: "-0.01em",
          }}
        >
          Message sent ✓
        </h3>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55 }}>
          Thanks — I&apos;ll get back to you within a day or two. Usually
          sooner.
        </p>
        <button
          type="button"
          className="neo-btn neo-btn--sm"
          style={{ marginTop: 14 }}
          onClick={() => setStatus("idle")}
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form className="neo-form" onSubmit={onSubmit}>
      <div>
        <label className="neo-label" htmlFor="name">
          Your name
        </label>
        <input
          id="name"
          className="neo-input"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ada Lovelace"
          disabled={status === "sending"}
        />
      </div>
      <div>
        <label className="neo-label" htmlFor="email">
          Your email
        </label>
        <input
          id="email"
          className="neo-input"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          disabled={status === "sending"}
        />
      </div>
      <div>
        <label className="neo-label" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          className="neo-textarea"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind?"
          disabled={status === "sending"}
        />
      </div>

      {/* Honeypot — web3forms recommends a hidden field bots will fill */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
      />

      {status === "error" && (
        <div
          className="neo-highlight neo-highlight--pink"
          style={{ padding: 14, fontSize: 14 }}
        >
          {errorMsg}
        </div>
      )}

      <div>
        <button
          type="submit"
          className="neo-btn neo-btn--blue"
          disabled={status === "sending" || !ACCESS_KEY}
        >
          {status === "sending" ? "Sending…" : "Send message ✉"}
        </button>
        {!ACCESS_KEY && (
          <p style={{ fontSize: 12, color: "#a00", marginTop: 10 }}>
            ⚠ NEXT_PUBLIC_WEB3FORMS_KEY is not set — the form won&apos;t
            send until it&apos;s configured.
          </p>
        )}
      </div>
    </form>
  );
}

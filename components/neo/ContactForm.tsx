"use client";

import { useState } from "react";

export function ContactForm({ to }: { to: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `Hello from ${name || "someone"} on your website`;
    const body = `${message}\n\n— ${name}${email ? ` (${email})` : ""}`;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
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
        />
      </div>
      <div>
        <button type="submit" className="neo-btn neo-btn--blue">
          Send via email ✉
        </button>
      </div>
    </form>
  );
}

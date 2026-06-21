"use client";

import { useState } from "react";

const EMAIL = "rpsingh31.work@gmail.com";

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — fall back to a temp input.
      const el = document.createElement("input");
      el.value = EMAIL;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      className="contact__mail"
      onClick={copy}
      aria-label={`Copy email address ${EMAIL} to clipboard`}
    >
      <span>{EMAIL}</span>
      <em className="contact__copy" data-copied={copied} aria-hidden="true">
        {copied ? "copied ✓" : "click to copy"}
      </em>
    </button>
  );
}

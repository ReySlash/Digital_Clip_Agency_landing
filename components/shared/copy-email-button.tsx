"use client";

import { useState } from "react";

type CopyEmailButtonProps = {
  email: string;
};

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(email);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex min-h-12  min-w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-medium text-white transition hover:border-[#57d9ff]/60 hover:bg-[#57d9ff]/10"
      aria-live="polite"
    >
      {copied ? "Email copiado" : "Copiar email"}
    </button>
  );
}

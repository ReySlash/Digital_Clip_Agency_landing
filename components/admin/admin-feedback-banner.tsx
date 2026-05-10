"use client";

import { usePortfolioModal } from "@/contexts/portfolio-modal-context";

export default function AdminFeedbackBanner() {
  const { adminFeedback, clearAdminFeedback } = usePortfolioModal();

  if (!adminFeedback) {
    return null;
  }

  const isError = adminFeedback.tone === "error";

  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live="polite"
      className={`mb-6 flex items-start justify-between gap-4 rounded-2xl border px-4 py-3 text-sm shadow-lg ${
        isError
          ? "border-red-400/30 bg-red-500/10 text-red-100"
          : "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
      }`}
    >
      <p className="leading-6">{adminFeedback.message}</p>
      <button
        type="button"
        onClick={clearAdminFeedback}
        className="shrink-0 rounded-full border border-current/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-white/10"
      >
        Cerrar
      </button>
    </div>
  );
}

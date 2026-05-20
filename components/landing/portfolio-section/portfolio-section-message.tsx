import { ScrollReveal } from "@/components/shared/scroll-reveal";

type PortfolioSectionMessageProps = {
  title: string;
  description: string;
  tone?: "neutral" | "error";
};

export function PortfolioSectionMessage({
  title,
  description,
  tone = "neutral",
}: PortfolioSectionMessageProps) {
  const toneClassName =
    tone === "error"
      ? "border-red-400/20 bg-red-500/10 text-red-100"
      : "border-white/10 bg-white/5 text-slate-200";

  return (
    <ScrollReveal>
      <div
        className={`rounded-[1.75rem] border px-6 py-10 text-center shadow-[0_24px_60px_rgba(0,0,0,0.22)] ${toneClassName}`}
      >
        <p className="text-xl font-semibold text-white">{title}</p>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-inherit/80">
          {description}
        </p>
      </div>
    </ScrollReveal>
  );
}

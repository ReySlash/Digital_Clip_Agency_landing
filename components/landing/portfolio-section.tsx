import { Suspense } from "react";
import Image from "next/image";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { getPublishedPortfolioSectionData } from "@/lib/portfolio-data";
import { siteData } from "@/lib/site-data";

function PortfolioSectionShell({ children }: { children: React.ReactNode }) {
  return (
    <section id="portafolio" className="mb-16 lg:mb-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Portafolio"
            title={siteData.portfolio.title}
            description={siteData.portfolio.description}
          />
        </ScrollReveal>

        {children}
      </div>
    </section>
  );
}

function PortfolioSectionMessage({
  title,
  description,
  tone = "neutral",
}: {
  title: string;
  description: string;
  tone?: "neutral" | "error";
}) {
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

export function PortfolioSectionLoading() {
  return (
    <div className="grid auto-rows-fr gap-6 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-linear-to-br from-[#0c1338] via-[#13215a] to-[#1d4ed8] shadow-[0_24px_60px_rgba(0,200,255,0.12)]"
        >
          <div className="h-52 animate-pulse border-b border-white/10 bg-white/10" />
          <div className="space-y-4 px-6 py-6">
            <div className="h-6 w-24 animate-pulse rounded-full bg-white/10" />
            <div className="space-y-3">
              <div className="h-8 w-3/4 animate-pulse rounded-full bg-white/10" />
              <div className="h-4 w-full animate-pulse rounded-full bg-white/10" />
              <div className="h-4 w-5/6 animate-pulse rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export async function PortfolioSectionContent() {
  const result = await getPublishedPortfolioSectionData();

  if (result.status === "error") {
    return (
      <PortfolioSectionMessage
        title="No pudimos cargar el portafolio ahora mismo."
        description="El resto del sitio sigue disponible. Intenta nuevamente en unos minutos para ver los proyectos publicados."
        tone="error"
      />
    );
  }

  if (result.status === "empty") {
    return (
      <PortfolioSectionMessage
        title="Proyectos próximamente."
        description="Estamos preparando una selección de trabajos para mostrar el estilo, la claridad narrativa y el nivel de edición de la agencia."
      />
    );
  }

  return (
    <div className="grid auto-rows-fr gap-6 lg:grid-cols-3">
      {result.items.map((portfolioItem, index) => (
        <ScrollReveal key={portfolioItem.id} delay={index * 100}>
          <a
            href={portfolioItem.href}
            target="_blank"
            rel="noreferrer"
            className="group block h-full"
          >
            <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-linear-to-br from-[#0c1338] via-[#13215a] to-[#1d4ed8] shadow-[0_24px_60px_rgba(0,200,255,0.18)] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-cyan-300/40 hover:shadow-[0_30px_80px_rgba(0,200,255,0.28)]">
              <div className="relative h-52 overflow-hidden border-b border-white/10">
                <Image
                  src={portfolioItem.thumbnail}
                  alt={portfolioItem.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,28,0.05),rgba(5,10,28,0.78))]" />
              </div>
              <div className="flex flex-1 flex-col space-y-4 px-6 py-6">
                <span className="inline-flex w-fit rounded-full border border-[#57d9ff]/30 bg-[#57d9ff]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#57d9ff]">
                  {portfolioItem.platform}
                </span>
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold tracking-tight text-white">
                    {portfolioItem.title}
                  </h3>
                  <p className="text-base leading-7 text-slate-300">
                    {portfolioItem.description}
                  </p>
                </div>
              </div>
            </article>
          </a>
        </ScrollReveal>
      ))}
    </div>
  );
}

export function PortfolioSection() {
  return (
    <PortfolioSectionShell>
      <Suspense fallback={<PortfolioSectionLoading />}>
        <PortfolioSectionContent />
      </Suspense>
    </PortfolioSectionShell>
  );
}

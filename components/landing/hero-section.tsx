import { siteData } from "@/lib/site-data";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import Link from "next/link";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="flex flex-col justify-center items-center relative overflow-hidden bg-transparent py-auto px-auto min-h-screen lg:min-h-[calc(100vh-50px)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top_right,rgba(87,217,255,0.14),transparent_45%)]" />
      <div className="pointer-events-none absolute left-0 top-24 -z-10 h-72 w-72 rounded-full bg-[#3255ff]/12 blur-3xl" />

      <div className="grid grid-cols-1 lg:grid-cols-2 md:flex-row relative z-10 px-auto w-full gap-5 lg:gap-14 items-center">
        <ScrollReveal className="space-y-8">
          <div className="order-2 lg:order-1 space-y-2 lg:space-y-5 flex flex-col items-center lg:items-start text-center lg:text-start">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#57d9ff]">
              {siteData.hero.eyebrow}
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              {siteData.hero.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              {siteData.hero.description}
            </p>
            <div className="grid gap-4 sm:max-w-md grid-cols-2">
              <Link
                href={siteData.hero.primaryCta.href}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#57d9ff] px-6 text-sm font-semibold text-[#101841] transition hover:bg-white"
              >
                {siteData.hero.primaryCta.label}
              </Link>
              <Link
                href={siteData.hero.secondaryCta.href}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition hover:border-[#57d9ff]/60 hover:bg-[#57d9ff]/10"
              >
                {siteData.hero.secondaryCta.label}
              </Link>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal
          delay={150}
          className="hidden md:block rounded-4xl border border-white/10 bg-white/6 p-6 backdrop-blur shadow-xl shadow-cyan-500/50 md:mx-5"
        >
          <div className="order-1 lg:order-2 flex h-full flex-col justify-center rounded-3xl border border-white/10 bg-linear-to-br from-[#0c1338] via-[#13215a] to-[#1d4ed8] p-6 sm:p-8">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              {siteData.agency.platforms.map((platform) => (
                <span
                  key={platform}
                  className="rounded-full border border-white/10 px-3 py-1"
                >
                  {platform}
                </span>
              ))}
            </div>
            <div className="mt-8 space-y-2 lg:space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#57d9ff]">
                Digital Clip Agency
              </p>
              <p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Tu contenido no solo debe verse bien. Debe ayudarte a crecer.
              </p>
              <p className="text-base leading-7 text-slate-300">
                Edición, ritmo y enfoque visual para que publiques con
                constancia y dediques más tiempo a crear.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

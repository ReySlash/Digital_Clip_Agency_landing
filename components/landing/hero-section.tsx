import { siteData } from "@/lib/site-data";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden border-b border-white/10 bg-transparent px-6 py-20 sm:py-24 lg:px-8 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top_right,rgba(87,217,255,0.14),transparent_45%)]" />
      <div className="pointer-events-none absolute left-0 top-24 -z-10 h-72 w-72 rounded-full bg-[#3255ff]/12 blur-3xl" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-center">
        <ScrollReveal className="space-y-8">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#57d9ff]">
              {siteData.hero.eyebrow}
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              {siteData.hero.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              {siteData.hero.description}
            </p>
          </div>

          <div className="grid gap-4 sm:max-w-md sm:grid-cols-2">
            <a
              href={siteData.hero.primaryCta.href}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#57d9ff] px-6 text-sm font-semibold text-[#101841] transition hover:bg-white"
            >
              {siteData.hero.primaryCta.label}
            </a>
            <a
              href={siteData.hero.secondaryCta.href}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition hover:border-[#57d9ff]/60 hover:bg-[#57d9ff]/10"
            >
              {siteData.hero.secondaryCta.label}
            </a>
          </div>

          <ul className="grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
            {siteData.hero.stats.map((stat) => (
              <li
                key={stat}
                className="text-center rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
              >
                {stat}
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal
          delay={150}
          className="rounded-4xl border border-white/10 bg-white/6 p-6 backdrop-blur shadow-xl shadow-cyan-500/50"
        >
          <div className="flex h-full flex-col justify-center rounded-3xl border border-white/10 bg-linear-to-br from-[#0c1338] via-[#13215a] to-[#1d4ed8] p-6 sm:p-8">
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
            <div className="mt-8 space-y-5">
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

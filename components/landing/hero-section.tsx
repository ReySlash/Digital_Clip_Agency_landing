import { ScrollReveal } from "@/components/shared/scroll-reveal";
import Image from "next/image";
import type { SiteDictionary } from "@/lib/dictionaries";
import { sectionAnchors } from "@/lib/dictionaries";

type HeroSectionProps = {
  dictionary: SiteDictionary;
};

export function HeroSection({ dictionary }: HeroSectionProps) {
  return (
    <section
      id={sectionAnchors.home}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden overflow-y-visible bg-transparent px-2 sm:px-6 lg:min-h-[calc(100vh-50px)] lg:px-0"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top_right,rgba(87,217,255,0.14),transparent_45%)]" />
      <div className="pointer-events-none absolute left-0 top-24 -z-10 h-72 w-72 rounded-full bg-[#3255ff]/12 blur-3xl" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:gap-0 lg:grid-cols-[35%_65%]">
        <ScrollReveal className="order-2 flex flex-col justify-center space-y-8 lg:order-1">
          <div className=" space-y-2 lg:space-y-5 flex flex-col items-center text-center">
            <h1 className="text-xs font-semibold uppercase tracking-[0.35em] text-[#57d9ff]">
              {dictionary.hero.eyebrow}
            </h1>
            <h2 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-5xl">
              {dictionary.hero.title}
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              {dictionary.hero.description}
            </p>
            <div className="grid gap-2 sm:gap-4 sm:max-w-md grid-cols-2">
              <a
                href={dictionary.hero.primaryCta.href}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#57d9ff] px-4 md:px-6 text-sm font-semibold text-[#101841] transition hover:bg-white"
              >
                {dictionary.hero.primaryCta.label}
              </a>
              <a
                href={dictionary.hero.secondaryCta.href}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 md:px-6 text-sm font-semibold text-white transition hover:border-[#57d9ff]/60 hover:bg-[#57d9ff]/10"
              >
                {dictionary.hero.secondaryCta.label}
              </a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal
          delay={150}
          className="order-1 flex flex-col items-center justify-center lg:order-2"
        >
          <div className="flex w-[97vw] max-w-120 items-center justify-center px-2 sm:w-[78vw] sm:max-w-136 sm:px-0 lg:w-[50vw] lg:max-w-208">
            <div className="relative z-20 -mr-3 w-[31%] rotate-2 sm:-mr-5 lg:-mr-7">
              <Image
                src="/videoProof2.jpg"
                alt={dictionary.hero.imageAlts.first}
                width={400}
                height={711}
                loading="eager"
                className="h-auto w-full rounded-2xl border border-white/10 object-cover shadow-[0_24px_60px_rgba(0,200,255,0.18)] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-cyan-300/40 hover:shadow-[0_30px_80px_rgba(0,200,255,0.28)] brightness-200 backdrop-blur-xs"
              />
            </div>
            <div className="relative z-30 w-[38%]">
              <Image
                src="/videoProof1.jpg"
                alt={dictionary.hero.imageAlts.second}
                width={400}
                height={711}
                loading="eager"
                className="h-auto w-full rounded-2xl border border-white/10 object-cover shadow-[0_24px_60px_rgba(0,200,255,0.18)] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-cyan-300/40 hover:shadow-[0_30px_80px_rgba(0,200,255,0.28)] brightness-200"
              />
            </div>
            <div className="relative z-10 -ml-3 w-[31%] -rotate-1 sm:-ml-5 lg:-ml-7">
              <Image
                src="/videoProof3.jpg"
                alt={dictionary.hero.imageAlts.third}
                width={400}
                height={711}
                loading="eager"
                className="h-auto w-full rounded-2xl border border-white/10 object-cover shadow-[0_24px_60px_rgba(0,200,255,0.18)] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-cyan-300/40 hover:shadow-[0_30px_80px_rgba(0,200,255,0.28)] brightness-200 backdrop-blur-xs"
              />
            </div>
          </div>
          <p className="block text-center text-lg font-semibold text-white mt-12">
            {dictionary.hero.socialProof}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

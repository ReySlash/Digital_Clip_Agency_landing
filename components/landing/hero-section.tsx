import { siteData } from "@/lib/site-data";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import Image from "next/image";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden overflow-y-visible bg-transparent px-2 sm:px-6 lg:min-h-[calc(100vh-50px)] lg:px-0"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top_right,rgba(87,217,255,0.14),transparent_45%)]" />
      <div className="pointer-events-none absolute left-0 top-24 -z-10 h-72 w-72 rounded-full bg-[#3255ff]/12 blur-3xl" />

      <div className="relative z-10 grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[35%_65%]">
        <ScrollReveal className="space-y-8 order-2 lg:order-1">
          <div className=" space-y-2 lg:space-y-5 flex flex-col items-center text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#57d9ff]">
              {siteData.hero.eyebrow}
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-5xl">
              {siteData.hero.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              {siteData.hero.description}
            </p>
            <div className="grid gap-2 sm:gap-4 sm:max-w-md grid-cols-2">
              <a
                href={siteData.hero.primaryCta.href}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#57d9ff] px-4 md:px-6 text-sm font-semibold text-[#101841] transition hover:bg-white"
              >
                {siteData.hero.primaryCta.label}
              </a>
              <a
                href={siteData.hero.secondaryCta.href}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 md:px-6 text-sm font-semibold text-white transition hover:border-[#57d9ff]/60 hover:bg-[#57d9ff]/10"
              >
                {siteData.hero.secondaryCta.label}
              </a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal
          delay={150}
          className="order-1 lg:order-2 flex flex-col justify-center items-center"
        >
          <div className="lg:-ml-14 flex w-screen max-w-none items-center justify-center overflow-visible px-2 sm:w-full sm:max-w-3xl sm:px-0">
            <div className="relative z-20 w-[36%] max-w-41.25 -translate-x-2 rotate-2 sm:w-[36%] sm:max-w-48.75 sm:-translate-x-6 lg:max-w-53.75">
              <Image
                src="/videoProof2.jpg"
                alt="Video Proof 2"
                width={400}
                height={711}
                loading="eager"
                className="h-auto w-full ml-2 sm:ml-5 rounded-2xl border border-white/10 object-cover shadow-[0_24px_60px_rgba(0,200,255,0.18)] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-cyan-300/40 hover:shadow-[0_30px_80px_rgba(0,200,255,0.28)] brightness-200 scale-95 backdrop-blur-xs lg:ml-10"
              />
            </div>
            <div className="relative z-30 w-[36%] max-w-45 sm:w-[36%] sm:max-w-52.5 lg:max-w-57.5">
              <Image
                src="/videoProof1.jpg"
                alt="Video Proof 1"
                width={400}
                height={711}
                loading="eager"
                className="h-auto w-full rounded-2xl border border-white/10 object-cover shadow-[0_24px_60px_rgba(0,200,255,0.18)] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-cyan-300/40 hover:shadow-[0_30px_80px_rgba(0,200,255,0.28)] brightness-200  scale-120"
              />
            </div>
            <div className="relative z-10 w-[36%] max-w-41.25 -translate-x-1 -rotate-1 sm:w-[36%] sm:max-w-48.75 sm:-translate-x-1 lg:max-w-53.75">
              <Image
                src="/videoProof3.jpg"
                alt="Video Proof 3"
                width={400}
                height={711}
                loading="eager"
                className="h-auto w-full lg:-ml-2 rounded-2xl border border-white/10 object-cover shadow-[0_24px_60px_rgba(0,200,255,0.18)] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-cyan-300/40 hover:shadow-[0_30px_80px_rgba(0,200,255,0.28)] brightness-200  scale-95 backdrop-blur-xs"
              />
            </div>
          </div>
          <p className="block text-center text-lg font-semibold text-white mt-12">
            +7M views generados en contenido editado por nosotros.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

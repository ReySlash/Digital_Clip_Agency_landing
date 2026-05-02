import Image from "next/image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteData } from "@/lib/site-data";

export function PortfolioSection() {
  return (
    <section id="portafolio" className="px-6 py-20 lg:px-8 lg:py-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Portafolio"
            title={siteData.portfolio.title}
            description={siteData.portfolio.description}
          />
        </ScrollReveal>

        <div className="grid auto-rows-fr gap-6 lg:grid-cols-3">
          {siteData.portfolio.items.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 100}>
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="group block h-full"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-linear-to-br from-[#0c1338] via-[#13215a] to-[#1d4ed8] transition group-hover:shadow-xl group-hover:shadow-cyan-500/50 group-hover:ring-1 group-hover:ring-cyan-400/60">
                  <div className="relative h-52 overflow-hidden border-b border-white/10">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,28,0.05),rgba(5,10,28,0.78))]" />
                  </div>
                  <div className="flex flex-1 flex-col space-y-4 px-6 py-6">
                    <span className="inline-flex w-fit rounded-full border border-[#57d9ff]/30 bg-[#57d9ff]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#57d9ff]">
                      {project.platform}
                    </span>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold tracking-tight text-white">
                        {project.title}
                      </h3>
                      <p className="text-base leading-7 text-slate-300">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </article>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

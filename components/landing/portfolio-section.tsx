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
              <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-linear-to-br from-[#0c1338] via-[#13215a] to-[#1d4ed8] hover:shadow-xl hover:shadow-cyan-500/50 hover:ring-cyan-500">
                <div className="h-52 bg-[linear-gradient(135deg,rgba(8,12,35,0.95),rgba(17,30,86,0.7),rgba(87,217,255,0.2))]" />
                <div className="flex flex-1 flex-col space-y-4 px-6 py-6">
                  <span className="flex justify-center rounded-full border border-[#57d9ff]/30 bg-[#57d9ff]/10 w-30 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#57d9ff]">
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
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

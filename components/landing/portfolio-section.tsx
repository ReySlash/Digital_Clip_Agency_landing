import { SectionHeading } from "@/components/shared/section-heading";
import { siteData } from "@/lib/site-data";

export function PortfolioSection() {
  return (
    <section id="portafolio" className="px-6 py-20 lg:px-8 lg:py-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
        <SectionHeading
          eyebrow="Portafolio"
          title={siteData.portfolio.title}
          description={siteData.portfolio.description}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {siteData.portfolio.items.map((project) => (
            <article
              key={project.title}
              className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#101841]"
            >
              <div className="h-52 bg-[linear-gradient(135deg,rgba(11,17,58,0.92),rgba(37,99,235,0.5),rgba(74,222,255,0.22))]" />
              <div className="space-y-4 px-6 py-6">
                <span className="inline-flex rounded-full border border-[#57d9ff]/30 bg-[#57d9ff]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#57d9ff]">
                  {project.platform}
                </span>
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold tracking-tight text-white">
                    {project.title}
                  </h3>
                  <p className="text-base leading-7 text-slate-300">{project.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

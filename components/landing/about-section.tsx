import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteData } from "@/lib/site-data";

export function AboutSection() {
  return (
    <section id="nosotros" className="py-16">
      <ScrollReveal>
        <div className="mx-auto grid w-full max-w-7xl gap-10 rounded-4xl border border-white/10 bg-linear-to-br from-[#0c1338] via-[#13215a] to-[#1d4ed8] p-8 shadow-xl shadow-[#13215a]/35 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)] lg:p-10">
          <SectionHeading
            eyebrow="Nosotros"
            title={siteData.about.title}
            description={siteData.about.description}
          />

          <div className="grid gap-4">
            {siteData.about.points.map((point, index) => (
              <ScrollReveal key={point} delay={index * 100}>
                <div className="rounded-3xl border border-white/10 bg-white/8 px-5 py-5 text-base leading-7 text-slate-200 backdrop-blur-sm">
                  {point}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

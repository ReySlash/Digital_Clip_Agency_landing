import { SectionHeading } from "@/components/shared/section-heading";
import { siteData } from "@/lib/site-data";

export function AboutSection() {
  return (
    <section id="nosotros" className="px-6 py-20 lg:px-8 lg:py-24">
      <div className="mx-auto grid w-full max-w-7xl gap-10 rounded-4xl border border-white/10 bg-[#101841] p-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)] lg:p-10">
        <SectionHeading
          eyebrow="Nosotros"
          title={siteData.about.title}
          description={siteData.about.description}
        />

        <div className="grid gap-4">
          {siteData.about.points.map((point) => (
            <div
              key={point}
              className="rounded-3xl border border-white/10 bg-white/5 px-5 py-5 text-base leading-7 text-slate-200"
            >
              {point}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

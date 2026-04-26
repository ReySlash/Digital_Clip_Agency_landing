import { SectionHeading } from "@/components/shared/section-heading";
import { siteData } from "@/lib/site-data";

export function ServicesSection() {
  return (
    <section id="servicios" className="px-6 py-20 lg:px-8 lg:py-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
        <SectionHeading
          eyebrow="Servicios"
          title={siteData.services.title}
          description={siteData.services.description}
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {siteData.services.items.map((service, index) => (
            <article
              key={service.title}
              className="rounded-[1.75rem] border border-white/10 bg-linear-to-b from-[#101841] to-[#0b113a] px-6 py-8"
            >
              <p className="text-sm font-semibold text-[#57d9ff]">0{index + 1}</p>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">
                {service.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-300">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

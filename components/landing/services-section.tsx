import Image from "next/image";
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
          {siteData.services.items.map((service) => (
            <article
              key={service.title}
              className="rounded-[1.75rem] border border-white/10 bg-linear-to-br from-[#0c1338] via-[#13215a] to-[#1d4ed8] px-6 py-8 shadow-xl shadow-[#13215a]/35"
            >
              <div className="flex justify-center">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={100}
                  height={100}
                />
              </div>
              <h3 className="mt-8 text-2xl font-semibold tracking-tight text-white">
                {service.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-300">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

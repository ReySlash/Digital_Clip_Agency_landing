import Image from "next/image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteData } from "@/lib/site-data";

export function ServicesSection() {
  return (
    <section id="servicios" className="min-h-[calc(100vh-50px)] my-16 lg:my-0">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 ">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Servicios"
            title={siteData.services.title}
            description={siteData.services.description}
          />
        </ScrollReveal>

        <div className="grid auto-rows-fr gap-6 md:grid-cols-2 xl:grid-cols-4">
          {siteData.services.items.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 100}>
              <article className="flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-linear-to-br from-[#0c1338] via-[#13215a] to-[#1d4ed8] px-6 py-8 shadow-xl shadow-cyan-500/50 ">
                <div className="flex justify-center">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={100}
                    height={100}
                  />
                </div>
                <h3 className="mt-8 text-2xl font-semibold tracking-tight text-white text-center md:text-start">
                  {service.title}
                </h3>
                <p className="mt-4 flex-1 text-base leading-7 text-slate-300 text-center md:text-start">
                  {service.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

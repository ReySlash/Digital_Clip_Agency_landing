import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { CopyEmailButton } from "@/components/shared/copy-email-button";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteData } from "@/lib/site-data";

export function ContactSection() {
  return (
    <section id="contacto" className="px-6 py-20 lg:px-8 lg:py-24">
      <ScrollReveal>
        <div className="mx-auto grid w-full max-w-7xl gap-10 rounded-4xl border border-white/10 bg-linear-to-br from-[#0c1338] via-[#13215a] to-[#1d4ed8] p-8 shadow-xl shadow-[#13215a]/35 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:p-10">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Contacto"
              title={siteData.contact.title}
              description={siteData.contact.description}
            />

            <div className="space-y-3 text-slate-300">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#57d9ff]">
                Email
              </p>
              <a
                className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                href={`mailto:${siteData.agency.email}`}
              >
                {siteData.agency.email}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
            <ScrollReveal delay={100}>
              <a
                href={`mailto:${siteData.agency.email}`}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#57d9ff] px-6 text-sm font-semibold text-[#101841] transition hover:bg-white"
              >
                {siteData.contact.ctaLabel}
              </a>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <CopyEmailButton email={siteData.agency.email} />
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <a
                href={siteData.agency.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition hover:border-[#57d9ff]/60 hover:bg-[#57d9ff]/10"
              >
                Instagram
              </a>
            </ScrollReveal>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

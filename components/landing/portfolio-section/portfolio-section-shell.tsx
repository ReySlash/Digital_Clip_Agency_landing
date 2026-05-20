import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { sectionAnchors, type SiteDictionary } from "@/lib/dictionaries";

type PortfolioSectionShellProps = {
  children: React.ReactNode;
  dictionary: SiteDictionary;
};

export function PortfolioSectionShell({
  children,
  dictionary,
}: PortfolioSectionShellProps) {
  return (
    <section id={sectionAnchors.portfolio} className="mb-16 lg:mb-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
        <ScrollReveal>
          <SectionHeading
            eyebrow={dictionary.portfolio.eyebrow}
            title={dictionary.portfolio.title}
            description={dictionary.portfolio.description}
          />
        </ScrollReveal>

        {children}
      </div>
    </section>
  );
}

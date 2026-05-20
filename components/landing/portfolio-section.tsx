import { Suspense } from "react";

import type { SiteDictionary } from "@/lib/dictionaries";

import { PortfolioSectionContent } from "./portfolio-section/portfolio-section-content";
import { PortfolioSectionLoading } from "./portfolio-section/portfolio-section-loading";
import { PortfolioSectionShell } from "./portfolio-section/portfolio-section-shell";

type PortfolioSectionProps = {
  dictionary: SiteDictionary;
};

export { PortfolioSectionContent };
export { PortfolioSectionLoading };

export function PortfolioSection({ dictionary }: PortfolioSectionProps) {
  return (
    <PortfolioSectionShell dictionary={dictionary}>
      <Suspense fallback={<PortfolioSectionLoading />}>
        <PortfolioSectionContent dictionary={dictionary} />
      </Suspense>
    </PortfolioSectionShell>
  );
}

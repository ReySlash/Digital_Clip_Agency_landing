import { Suspense } from "react";

import type { SiteDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

import { PortfolioSectionContent } from "./portfolio-section/portfolio-section-content";
import { PortfolioSectionLoading } from "./portfolio-section/portfolio-section-loading";
import { PortfolioSectionShell } from "./portfolio-section/portfolio-section-shell";

type PortfolioSectionProps = {
  dictionary: SiteDictionary;
  locale: Locale;
};

export { PortfolioSectionContent };
export { PortfolioSectionLoading };

export function PortfolioSection({ dictionary, locale }: PortfolioSectionProps) {
  return (
    <PortfolioSectionShell dictionary={dictionary}>
      <Suspense fallback={<PortfolioSectionLoading />}>
        <PortfolioSectionContent dictionary={dictionary} locale={locale} />
      </Suspense>
    </PortfolioSectionShell>
  );
}

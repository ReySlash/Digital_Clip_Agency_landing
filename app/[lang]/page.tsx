import { notFound } from "next/navigation";

import { AboutSection } from "@/components/landing/about-section";
import { ContactSection } from "@/components/landing/contact-section";
import { HeroSection } from "@/components/landing/hero-section";
import { PortfolioSection } from "@/components/landing/portfolio-section";
import { ServicesSection } from "@/components/landing/services-section";
import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";

type LangPageProps = {
  params: Promise<{ lang: string }>;
};

export default async function HomePage({ params }: LangPageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dictionary = getDictionary(lang);

  return (
    <div className="min-h-screen bg-[#101841] text-white">
      <Navbar dictionary={dictionary} locale={lang} />
      <main className="flex flex-col px-2 md:px-10 lg:px-20">
        <HeroSection dictionary={dictionary} />
        <ServicesSection dictionary={dictionary} />
        <PortfolioSection dictionary={dictionary} locale={lang} />
        <AboutSection dictionary={dictionary} />
        <ContactSection dictionary={dictionary} />
      </main>
      <Footer dictionary={dictionary} />
    </div>
  );
}

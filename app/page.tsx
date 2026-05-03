import { AboutSection } from "@/components/landing/about-section";
import { ContactSection } from "@/components/landing/contact-section";
import { HeroSection } from "@/components/landing/hero-section";
import { PortfolioSection } from "@/components/landing/portfolio-section";
import { ServicesSection } from "@/components/landing/services-section";
import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#101841] text-white">
      <Navbar />
      <main className="flex flex-col  px-2 md:px-10 lg:px-20">
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

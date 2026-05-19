import Image from "next/image";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import type { SiteDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { MobileNav } from "./mobile-nav";

type NavbarProps = {
  dictionary: SiteDictionary;
  locale: Locale;
};

export function Navbar({ dictionary, locale }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#101841]/80 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-1 px-6 lg:px-8">
        <a href="#home" className="flex items-center text-white min-w-35">
          <Image
            src="/brand/brand-logo.webp"
            alt="Digital Clip Agency Logo"
            width={58}
            height={58}
            priority
            className="h-12 w-auto object-contain"
          />
          <p className="text-5xl">|</p>
          <div className="leading-none">
            <p className="text-lg font-semibold tracking-tight">Digital Clip</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#57d9ff] sm:text-sm">
              Agency
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-4 md:flex">
          <nav aria-label="Main sections" className="block">
            <ul className="flex items-center gap-6 text-sm text-slate-300 lg:gap-18">
              {dictionary.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    className="text-lg font-bold transition hover:text-[#57d9ff]"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="hidden md:flex">
          <LanguageSwitcher
            currentLocale={locale}
            ariaLabel={dictionary.languageSwitcher.toggleLabel}
            size="compact"
          />
        </div>
        <MobileNav dictionary={dictionary} locale={locale} />
      </div>
    </header>
  );
}

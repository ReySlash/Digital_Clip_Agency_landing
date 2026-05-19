"use client";
import { useState } from "react";
import Image from "next/image";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import type { SiteDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

type MobileNavProps = {
  dictionary: SiteDictionary;
  locale: Locale;
};

export function MobileNav({ dictionary, locale }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={dictionary.mobileNav.openMenu}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl transition hover:scale-110 hover:bg-[#57d9ff]/10"
      >
        <Image
          src="/hamburger.svg"
          alt={dictionary.mobileNav.openMenu}
          width={36}
          height={36}
          className="invert"
        />
      </button>
      <div
        className={`fixed inset-0 z-50 h-screen transition-opacity duration-300 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label={dictionary.mobileNav.closeMenu}
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/60"
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-80 max-w-[85vw] flex-col border-l border-white/10 bg-[#101841] p-6 shadow-2xl transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-white">{dictionary.mobileNav.title}</p>
            <button
              type="button"
              aria-label={dictionary.mobileNav.closeMenu}
              onClick={() => setIsOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-white transition hover:scale-110"
            >
              <Image
                src="/close.svg"
                alt={dictionary.mobileNav.closeMenu}
                width={28}
                height={28}
                className="invert"
              />
            </button>
          </div>
          <nav className="mt-8">
            <ul className="space-y-4">
              {dictionary.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-lg font-semibold text-white transition hover:text-[#57d9ff]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8">
            <LanguageSwitcher
              currentLocale={locale}
              ariaLabel={dictionary.languageSwitcher.toggleLabel}
              size="comfortable"
              fullWidth
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { siteNavigation } from "@/lib/navigation";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#101841]/80 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
        <a href="#inicio" className="flex items-center text-white">
          <Image
            src="/brand/brand-logo.png"
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

        <nav aria-label="Secciones principales" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm text-slate-300 lg:gap-18">
            {siteNavigation.map((item) => (
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
        <MobileNav />
      </div>
    </header>
  );
}

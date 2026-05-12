"use client";
import { useState } from "react";
import Image from "next/image";
import { siteNavigation } from "@/lib/navigation";
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Abrir menú"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl transition hover:scale-110 hover:bg-[#57d9ff]/10"
      >
        <Image
          src="/hamburger.svg"
          alt="Abrir menú"
          width={36}
          height={36}
          className="invert"
        />
      </button>
      {isOpen ? (
        <div className="fixed inset-0 z-50 h-screen">
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60"
          />
          <div className="absolute right-0 top-0 flex h-full w-80 max-w-[85vw] flex-col border-l border-white/10 bg-[#101841] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-white">Menú</p>
              <button
                type="button"
                aria-label="Cerrar menú"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-white transition hover:scale-110"
              >
                <Image
                  src="/close.svg"
                  alt="Cerrar menú"
                  width={28}
                  height={28}
                  className="invert"
                />
              </button>
            </div>
            <nav className="mt-8">
              <ul className="space-y-4">
                {siteNavigation.map((item) => (
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
          </div>
        </div>
      ) : null}
    </div>
  );
}

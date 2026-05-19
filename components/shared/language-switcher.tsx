"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import type { Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  currentLocale: Locale;
  ariaLabel: string;
  size?: "compact" | "comfortable";
  fullWidth?: boolean;
};

export function LanguageSwitcher({
  currentLocale,
  ariaLabel,
  size = "compact",
  fullWidth = false,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    new Promise((resolve) => {
      resolve(setHash(window.location.hash || ""));
    });
  }, [pathname]);

  const segments = pathname.split("/").filter(Boolean);
  const restPath = segments.slice(1).join("/");
  const nextLocale: Locale = currentLocale === "es" ? "en" : "es";
  const nextPath =
    restPath.length > 0 ? `/${nextLocale}/${restPath}` : `/${nextLocale}`;

  const segmentClassName =
    "relative z-20 flex items-center justify-center font-semibold uppercase tracking-[0.16em] transition-colors";
  const sizeClassName =
    size === "comfortable" ? "h-5 px-1 text-sm" : "h-5 px-1 text-xs";
  const containerClassName = fullWidth ? "w-20" : "w-20";
  const indicatorBaseClassName =
    "absolute inset-y-1 w-[calc(50%-0.50rem)] rounded-full bg-[#57d9ff] shadow-[0_10px_24px_rgba(87,217,255,0.35)] transition-transform duration-500";
  const indicatorPositionClassName =
    currentLocale === "es"
      ? "translate-x-0.2"
      : "translate-x-[calc(100%+0.500rem)]";
  const esTextClassName =
    currentLocale === "es" ? "text-[#101841]" : "text-slate-300";
  const enTextClassName =
    currentLocale === "en" ? "text-[#101841]" : "text-slate-300";

  return (
    <Link
      href={`${nextPath}${hash}`}
      prefetch={false}
      aria-label={ariaLabel}
      className={`relative inline-flex justify-between ${containerClassName} rounded-full border border-white/15 bg-white/5 p-1 hover:border-[#57d9ff]/60`}
    >
      <span
        aria-hidden="true"
        className={`${indicatorBaseClassName} ${indicatorPositionClassName}`}
      />
      <span
        className={`${segmentClassName} ${sizeClassName} ${esTextClassName}`}
      >
        ES
      </span>
      <span
        className={`${segmentClassName} ${sizeClassName} ${enTextClassName}`}
      >
        EN
      </span>
    </Link>
  );
}

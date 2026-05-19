"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import type { Locale } from "@/lib/i18n";
import type { AdminDictionary } from "@/lib/admin-dictionaries";
import { setAdminLocaleAction } from "@/actions/admin/set-admin-locale-action";

type Props = {
  locale: Locale;
  dictionary: AdminDictionary["languageSwitcher"];
};

export default function AdminLanguageSwitcher({ locale, dictionary }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const nextLocale: Locale = locale === "es" ? "en" : "es";

  const handleClick = () => {
    startTransition(async () => {
      await setAdminLocaleAction(nextLocale);
      router.refresh();
    });
  };

  const segmentClassName =
    "relative z-20 flex h-5 items-center justify-center px-1 text-xs font-semibold uppercase tracking-[0.16em] transition-colors";
  const indicatorBaseClassName =
    "absolute inset-y-1 w-[calc(50%-0.50rem)] rounded-full bg-[#57d9ff] shadow-[0_10px_24px_rgba(87,217,255,0.35)] transition-transform duration-500";
  const indicatorPositionClassName =
    locale === "es" ? "translate-x-0.2" : "translate-x-[calc(100%+0.500rem)]";
  const esTextClassName = locale === "es" ? "text-[#101841]" : "text-slate-300";
  const enTextClassName = locale === "en" ? "text-[#101841]" : "text-slate-300";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-label={dictionary.ariaLabel}
      className="relative inline-flex w-20 select-none justify-between rounded-full border border-white/15 bg-white/5 p-1 hover:border-[#57d9ff]/60 disabled:cursor-not-allowed disabled:opacity-70"
    >
      <span
        aria-hidden="true"
        className={`${indicatorBaseClassName} ${indicatorPositionClassName}`}
      />
      <span
        className={`${segmentClassName} ${esTextClassName}`}
      >
        {dictionary.labelEs}
      </span>
      <span
        className={`${segmentClassName} ${enTextClassName}`}
      >
        {dictionary.labelEn}
      </span>
    </button>
  );
}

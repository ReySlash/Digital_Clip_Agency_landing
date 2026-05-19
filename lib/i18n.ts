export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";
export const LOCALE_COOKIE = "dca_locale";
export const PUBLIC_LOCALE_COOKIE = LOCALE_COOKIE;

export function hasLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function isLocalePrefixedPath(pathname: string): boolean {
  return locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
}

export function getPreferredLocale(acceptLanguageHeader: string | null): Locale {
  if (!acceptLanguageHeader) {
    return defaultLocale;
  }

  const preferredLanguages = acceptLanguageHeader
    .split(",")
    .map((entry) => entry.trim().split(";")[0]?.toLowerCase())
    .filter(Boolean) as string[];

  for (const language of preferredLanguages) {
    if (language.startsWith("en")) return "en";
    if (language.startsWith("es")) return "es";
  }

  return defaultLocale;
}

type ResolvePreferredLocaleArgs = {
  cookieValue: string | null | undefined;
  acceptLanguage: string | null | undefined;
};

export function resolvePreferredLocale({
  cookieValue,
  acceptLanguage,
}: ResolvePreferredLocaleArgs): Locale {
  if (cookieValue && hasLocale(cookieValue)) {
    return cookieValue;
  }

  return getPreferredLocale(acceptLanguage ?? null);
}

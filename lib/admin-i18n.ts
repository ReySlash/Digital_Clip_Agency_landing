import {
  LOCALE_COOKIE,
  resolvePreferredLocale,
  type Locale,
} from "@/lib/i18n";

export const ADMIN_LOCALE_COOKIE = LOCALE_COOKIE;

type ResolveAdminLocaleArgs = {
  cookieValue: string | null | undefined;
  acceptLanguage: string | null | undefined;
};

export function resolveAdminLocale({
  cookieValue,
  acceptLanguage,
}: ResolveAdminLocaleArgs): Locale {
  return resolvePreferredLocale({ cookieValue, acceptLanguage });
}

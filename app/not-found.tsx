import Link from "next/link";
import { cookies, headers } from "next/headers";

import { getDictionary } from "@/lib/dictionaries";
import { PUBLIC_LOCALE_COOKIE, resolvePreferredLocale } from "@/lib/i18n";

export default async function NotFound() {
  const cookieStore = await cookies();
  const headersList = await headers();
  const locale = resolvePreferredLocale({
    cookieValue: cookieStore.get(PUBLIC_LOCALE_COOKIE)?.value,
    acceptLanguage: headersList.get("accept-language"),
  });
  const dictionary = getDictionary(locale);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[#101841] text-center text-white">
      <h1 className="text-5xl">{dictionary.notFound.title}</h1>
      <p className="text-3xl">{dictionary.notFound.description}</p>
      <Link
        className="inline-flex min-h-12 w-auto items-center justify-center rounded-full bg-[#57d9ff] px-6 text-sm font-semibold text-[#101841] transition hover:bg-white"
        href={`/${locale}`}
      >
        {dictionary.notFound.ctaLabel}
      </Link>
    </div>
  );
}

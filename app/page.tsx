import { Suspense } from "react";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";

import { PUBLIC_LOCALE_COOKIE, resolvePreferredLocale } from "@/lib/i18n";

function HomeSkeleton() {
  return null;
}

async function HomeContent() {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const locale = resolvePreferredLocale({
    cookieValue: cookieStore.get(PUBLIC_LOCALE_COOKIE)?.value,
    acceptLanguage: headerStore.get("accept-language"),
  });

  redirect(`/${locale}`);

  // `redirect()` throws, but this keeps TS happy for JSX usage.
  return null;
}

export default function Home() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}

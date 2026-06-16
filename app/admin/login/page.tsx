import type { Metadata } from "next";
import { Suspense } from "react";
import { adminLoginAction } from "@/actions/admin/login-action";
import { LoginPageShell } from "@/components/admin/login-page-shell";
import { SubmitButton } from "@/components/admin/submit-button";
import { cookies, headers } from "next/headers";

import { getAdminDictionary } from "@/lib/admin-dictionaries";
import { resolveAdminLocale, ADMIN_LOCALE_COOKIE } from "@/lib/admin-i18n";
import { getNoIndexRobots } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Admin Login - Digital Clip Agency",
  description: "Admin login for Digital Clip Agency",
  robots: getNoIndexRobots(),
};

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
    error?: string;
  }>;
};

function LoginPageSkeleton() {
  const dictionary = getAdminDictionary("es");
  return (
    <LoginPageShell
      eyebrow={dictionary.login.eyebrow}
      title={dictionary.login.title}
      description={dictionary.login.description}
      backToSiteLabel={dictionary.login.backToSite}
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="h-4 w-16 animate-pulse rounded bg-white/10" />
          <div className="h-12 animate-pulse rounded-xl bg-white/10" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
          <div className="h-12 animate-pulse rounded-xl bg-white/10" />
        </div>
        <div className="h-12 animate-pulse rounded-full bg-white/10" />
      </div>
    </LoginPageShell>
  );
}

async function LoginPageContent({ searchParams }: LoginPageProps) {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const locale = resolveAdminLocale({
    cookieValue: cookieStore.get(ADMIN_LOCALE_COOKIE)?.value,
    acceptLanguage: headerStore.get("accept-language"),
  });
  const dictionary = getAdminDictionary(locale);

  const params = await searchParams;
  const callbackUrl = params.callbackUrl ?? "/admin";
  const showError = params.error === "CredentialsSignin";
  const showRateLimited = params.error === "RateLimited";

  return (
    <LoginPageShell
      eyebrow={dictionary.login.eyebrow}
      title={dictionary.login.title}
      description={dictionary.login.description}
      backToSiteLabel={dictionary.login.backToSite}
    >
      <form action={adminLoginAction} className="space-y-5">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm text-white/80">
            {dictionary.login.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-xl border border-white/10 bg-[#0a102c] px-4 py-3 text-sm outline-none transition focus:border-[#57d9ff]"
            placeholder={dictionary.login.emailPlaceholder}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm text-white/80">
            {dictionary.login.passwordLabel}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full rounded-xl border border-white/10 bg-[#0a102c] px-4 py-3 text-sm outline-none transition focus:border-[#57d9ff]"
            placeholder={dictionary.login.passwordPlaceholder}
          />
        </div>

        {showError ? (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {dictionary.login.invalidCredentials}
          </p>
        ) : null}

        {showRateLimited ? (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {dictionary.login.rateLimited}
          </p>
        ) : null}

        <SubmitButton
          idleLabel={dictionary.login.submitIdle}
          pendingLabel={dictionary.login.submitPending}
        />
      </form>
    </LoginPageShell>
  );
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <Suspense fallback={<LoginPageSkeleton />}>
      <LoginPageContent searchParams={searchParams} />
    </Suspense>
  );
}

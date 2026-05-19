import { getAdminPortfolioItems } from "@/lib/portfolio-data";
import { requireAdminSession } from "@/lib/admin-auth";
import PortfolioTable from "@/components/admin/portfolio-table";
import CreateItemButton from "@/components/admin/create-item-button";
import AdminFeedbackBanner from "@/components/admin/admin-feedback-banner";
import PortfolioModalWrapper from "@/components/admin/portfolio-modal-wrapper";
import { Suspense } from "react";
import LogoutButton from "@/components/admin/logout-button";
import { cookies, headers } from "next/headers";

import { getAdminDictionary } from "@/lib/admin-dictionaries";
import { resolveAdminLocale, ADMIN_LOCALE_COOKIE } from "@/lib/admin-i18n";
import AdminLanguageSwitcher from "@/components/admin/admin-language-switcher";

export const metadata = {
  title: "Admin Panel - Digital Clip Agency",
  description: "Admin panel for managing Digital Clip Agency content",
} as const;

function AdminPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#101841] text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-10 lg:py-10">
        <div className="h-24 animate-pulse rounded-3xl border border-white/10 bg-white/5" />
        <div className="h-40 animate-pulse rounded-3xl border border-white/10 bg-white/5" />
        <div className="h-105 animate-pulse rounded-3xl border border-white/10 bg-white/5" />
      </div>
    </div>
  );
}

async function AdminContent() {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const locale = resolveAdminLocale({
    cookieValue: cookieStore.get(ADMIN_LOCALE_COOKIE)?.value,
    acceptLanguage: headerStore.get("accept-language"),
  });
  const dictionary = getAdminDictionary(locale);

  const session = await requireAdminSession({
    onUnauthorized: "redirect",
    callbackUrl: "/admin",
  });

  const portfolioItems = await getAdminPortfolioItems();
  const userName = session.user.name || session.user.email || "Admin";
  const userEmail = session.user.email || "";
  const userRole = session.user.role;

  return (
    <div className="min-h-screen bg-[#101841] text-white">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#101841]/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-6 py-2 lg:px-10">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#57d9ff]">
              {dictionary.admin.headerBrand}
            </p>
            <h1 className="text-2xl font-semibold tracking-[0.08em] text-white sm:text-3xl">
              {dictionary.admin.headerTitle}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-white">{userName}</p>
                <p className="text-xs text-white/55">{userEmail}</p>
              </div>
              <span className="rounded-full border border-[#57d9ff]/30 bg-[#57d9ff]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#57d9ff]">
                {userRole}
              </span>
              <LogoutButton
                label={dictionary.logout.label}
                confirmText={dictionary.logout.confirm}
              />
            </div>
          </div>
          <AdminLanguageSwitcher
            locale={locale}
            dictionary={dictionary.languageSwitcher}
          />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-10 lg:py-10">
        <section className="grid gap-4 rounded-3xl border border-white/10 bg-linear-to-br from-[#0c1338] via-[#13215a] to-[#1d4ed8] p-6 shadow-2xl shadow-black/20 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#57d9ff]">
              {dictionary.admin.summaryEyebrow}
            </p>
            <h2 className="text-2xl font-semibold text-white">
              {dictionary.admin.summaryTitle}
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-white/65">
              {dictionary.admin.summaryDescription}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 h-full flex flex-col items-center justify-center">
            <span className="block text-xs uppercase tracking-[0.3em] text-white">
              {dictionary.admin.totalProjectsLabel}
            </span>
            <span className="mt-1 block text-2xl text-center font-semibold text-white">
              {portfolioItems.length}
            </span>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-linear-to-br from-[#0c1338] via-[#13215a] to-[#1d4ed8] p-6 shadow-2xl shadow-black/20">
          <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#57d9ff]">
                  {dictionary.admin.portfolioEyebrow}
                </p>
                <h2 className="text-xl font-semibold text-white">
                  {dictionary.admin.portfolioTitle}
                </h2>
              </div>
            </div>
            <div className="flex justify-start sm:justify-end">
              <CreateItemButton label={dictionary.admin.createButton} />
            </div>
          </div>

          <AdminFeedbackBanner
            closeLabel={dictionary.feedbackBanner.closeLabel}
          />
          <PortfolioTable
            portfolioItems={portfolioItems}
            dictionary={dictionary.portfolioTable}
          />
        </section>
      </main>

      <PortfolioModalWrapper dictionary={dictionary.modal} />
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<AdminPageSkeleton />}>
      <AdminContent />
    </Suspense>
  );
}

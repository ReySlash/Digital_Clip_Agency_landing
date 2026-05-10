import { auth } from "@/auth";
import { getAdminPortfolioItems } from "@/lib/portfolio-data";
import PortfolioTable from "@/components/admin/portfolio-table";
import CreateItemButton from "@/components/admin/create-item-button";
import PortfolioModalWrapper from "@/components/admin/portfolio-modal-wrapper";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import LogoutButton from "@/components/admin/logout-button";

export const metadata = {
  title: "Admin Panel - Digital Clip Agency",
  description: "Admin panel for managing Digital Clip Agency content",
};

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
  const session = await auth();

  // Protect the actual admin screen while leaving /admin/login accessible.
  if (!session?.user) {
    redirect("/admin/login?callbackUrl=/admin");
  }

  const portfolioItems = await getAdminPortfolioItems();
  const userName = session.user.name ?? session.user.email ?? "Admin";
  const userEmail = session.user.email ?? "";
  const userRole = (session.user as { role?: string }).role ?? "ADMIN";

  return (
    <div className="min-h-screen bg-[#101841] text-white">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#101841]/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-6 py-2 lg:px-10">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#57d9ff]">
              Digital Clip Agency
            </p>
            <h1 className="text-2xl font-semibold tracking-[0.08em] text-white sm:text-3xl">
              Panel de administración
            </h1>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-white">{userName}</p>
              <p className="text-xs text-white/55">{userEmail}</p>
            </div>
            <span className="rounded-full border border-[#57d9ff]/30 bg-[#57d9ff]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#57d9ff]">
              {userRole}
            </span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-10 lg:py-10">
        <section className="grid gap-4 rounded-3xl border border-white/10 bg-linear-to-br from-[#0c1338] via-[#13215a] to-[#1d4ed8] p-6 shadow-2xl shadow-black/20 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#57d9ff]">
              Resumen
            </p>
            <h2 className="text-2xl font-semibold text-white">
              Gestiona los proyectos que aparecen en tu portafolio.
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-white/65">
              Edita el contenido publicado, ajusta el orden de visualización y
              mantén la selección destacada alineada con el trabajo más fuerte
              de la agencia.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 h-full flex flex-col items-center justify-center">
            <span className="block text-xs uppercase tracking-[0.3em] text-white">
              Proyectos totales
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
                  Portafolio
                </p>
                <h2 className="text-xl font-semibold text-white">
                  Biblioteca de proyectos
                </h2>
              </div>
            </div>
            <div className="flex justify-start sm:justify-end">
              <CreateItemButton />
            </div>
          </div>

          <PortfolioTable portfolioItems={portfolioItems} />
        </section>
      </main>

      <PortfolioModalWrapper />
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

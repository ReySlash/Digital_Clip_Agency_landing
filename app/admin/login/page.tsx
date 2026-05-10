import Link from "next/link";
import { Suspense } from "react";

import { signIn } from "@/auth";

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
    error?: string;
  }>;
};

function LoginPageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#101841] px-6 py-16 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30">
        <div className="mb-8 space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#57d9ff]">
            Panel de administración
          </p>
          <h1 className="text-3xl font-semibold">Iniciar sesión</h1>
          <p className="text-sm text-white/65">
            Accede para gestionar el portafolio de Digital Clip Agency.
          </p>
        </div>

        {children}

        <div className="mt-6 text-center text-sm text-white/55">
          <Link
            href="/"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition hover:border-[#57d9ff]/60 hover:bg-[#57d9ff]/10"
          >
            Volver al sitio
          </Link>
        </div>
      </div>
    </main>
  );
}

function LoginPageSkeleton() {
  return (
    <LoginPageShell>
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
  const params = await searchParams;
  const callbackUrl = params.callbackUrl ?? "/admin";
  const showError = params.error === "CredentialsSignin";

  return (
    <LoginPageShell>
        <form
          action={async (formData) => {
            "use server";

            await signIn("credentials", {
              email: formData.get("email"),
              password: formData.get("password"),
              redirectTo: callbackUrl,
            });
          }}
          className="space-y-5"
        >
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-white/80">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-xl border border-white/10 bg-[#0a102c] px-4 py-3 text-sm outline-none transition focus:border-[#57d9ff]"
              placeholder="admin@digitalclipagency.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-white/80">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-white/10 bg-[#0a102c] px-4 py-3 text-sm outline-none transition focus:border-[#57d9ff]"
              placeholder="••••••••"
            />
          </div>

          {showError ? (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              Credenciales inválidas. Verifica tu email y contraseña.
            </p>
          ) : null}

          <button
            type="submit"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#57d9ff] px-6 text-sm font-semibold text-[#101841] transition hover:bg-white"
          >
            Entrar al panel
          </button>
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

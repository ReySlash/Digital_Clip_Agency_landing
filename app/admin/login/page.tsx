import { Suspense } from "react";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { signIn } from "@/auth";
import { LoginPageShell } from "@/components/admin/login-page-shell";

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
    error?: string;
  }>;
};

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

            try {
              await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                redirectTo: callbackUrl,
              });
            } catch (error) {
              if (error instanceof AuthError) {
                const loginUrl = new URL("/admin/login", process.env.AUTH_URL ?? "http://localhost:3000");
                loginUrl.searchParams.set("callbackUrl", callbackUrl);
                loginUrl.searchParams.set("error", error.type);
                redirect(`${loginUrl.pathname}${loginUrl.search}`);
              }

              throw error;
            }
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

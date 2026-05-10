import Link from "next/link";

export function LoginPageShell({ children }: { children: React.ReactNode }) {
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

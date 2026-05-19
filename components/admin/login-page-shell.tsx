import Link from "next/link";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  backToSiteLabel: string;
  children: React.ReactNode;
};

export function LoginPageShell({
  eyebrow,
  title,
  description,
  backToSiteLabel,
  children,
}: Props) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#101841] px-6 py-16 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30">
        <div className="mb-8 space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#57d9ff]">
            {eyebrow}
          </p>
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="text-sm text-white/65">{description}</p>
        </div>

        {children}

        <div className="mt-6 text-center text-sm text-white/55">
          <Link
            href="/"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition hover:border-[#57d9ff]/60 hover:bg-[#57d9ff]/10"
          >
            {backToSiteLabel}
          </Link>
        </div>
      </div>
    </main>
  );
}

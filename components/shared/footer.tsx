import { siteData } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p>© 2026 Digital Clip Agency. Edición estratégica para creadores.</p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            className="break-all transition hover:text-white"
            href={`mailto:${siteData.agency.email}`}
          >
            {siteData.agency.email}
          </a>
          <a
            className="transition hover:text-white"
            href={siteData.agency.instagram}
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

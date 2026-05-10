import RemoveItemButton from "./remove-item-button";
import { PortfolioItem } from "@prisma/client";
import UpdateItemButton from "./update-item-button";

const portfolioHeaders = [
  { key: "title", label: "Proyecto" },
  { key: "platform", label: "Plataforma" },
  { key: "status", label: "Estado" },
  { key: "description", label: "Descripción" },
  { key: "url", label: "Enlace" },
];

type Props = {
  portfolioItems: PortfolioItem[];
};

async function PortfolioTable(props: Props) {
  const items = props.portfolioItems;

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-[#081128] px-6 py-12 text-center text-sm text-white/55">
        Todavía no hay proyectos cargados. Crea el primero para empezar a
        construir el portafolio.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 ">
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              {portfolioHeaders.map((header) => (
                <th
                  key={header.key}
                  className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.25em] text-white"
                >
                  {header.label}
                </th>
              ))}
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.25em] text-white">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-white/6 text-left transition-colors hover:bg-white/3"
              >
                <td className="px-5 py-5 align-top">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="break-all text-xs text-white/45">
                      {item.thumbnail}
                    </p>
                  </div>
                </td>
                <td className="px-5 py-5 align-top text-sm text-white/70">
                  {item.platform}
                </td>
                <td className="px-5 py-5 align-top">
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                        item.published
                          ? "border border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
                          : "border border-white/10 bg-white/5 text-white/45"
                      }`}
                    >
                      {item.published ? "Publicado" : "Borrador"}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                        item.featured
                          ? "border border-[#57d9ff]/30 bg-[#57d9ff]/10 text-[#57d9ff]"
                          : "border border-white/10 bg-white/5 text-white/45"
                      }`}
                    >
                      {item.featured ? "Destacado" : "Normal"}
                    </span>
                  </div>
                </td>
                <td className="max-w-xl px-5 py-5 align-top text-sm leading-6 text-white/65">
                  {item.description}
                </td>
                <td className="px-5 py-5 align-top text-sm">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex max-w-55 break-all text-[#57d9ff] transition hover:text-[#7be3ff] hover:underline"
                  >
                    {item.href}
                  </a>
                </td>
                <td className="px-5 py-5 align-top">
                  <div className="flex items-center gap-2">
                    <UpdateItemButton item={item} />
                    <RemoveItemButton itemId={item.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PortfolioTable;

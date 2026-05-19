import RemoveItemButton from "./remove-item-button";
import { PortfolioItem } from "@prisma/client";
import UpdateItemButton from "./update-item-button";
import type { AdminDictionary } from "@/lib/admin-dictionaries";

type Props = {
  portfolioItems: PortfolioItem[];
  dictionary: AdminDictionary["portfolioTable"];
};

async function PortfolioTable(props: Props) {
  const { portfolioItems: items, dictionary } = props;

  const portfolioHeaders = [
    { key: "title", label: dictionary.headers.project },
    { key: "platform", label: dictionary.headers.platform },
    { key: "status", label: dictionary.headers.status },
    { key: "description", label: dictionary.headers.description },
    { key: "url", label: dictionary.headers.link },
  ];

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-[#081128] px-6 py-12 text-center text-sm text-white/55">
        {dictionary.emptyState}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
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
                {dictionary.headers.actions}
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
                       className={`inline-flex min-w-28 items-center justify-center rounded-full px-3 py-1 text-center text-[11px] font-semibold uppercase tracking-[0.2em] ${
                         item.published
                           ? "border border-emerald-400/25 bg-emerald-400/30 text-emerald-100"
                           : "border border-white/20 bg-white/10 text-white/70"
                       }`}
                    >
                      {item.published
                        ? dictionary.badges.published
                        : dictionary.badges.draft}
                    </span>
                    <span
                       className={`inline-flex min-w-28 items-center justify-center rounded-full px-3 py-1 text-center text-[11px] font-semibold uppercase tracking-[0.2em] ${
                         item.featured
                           ? "border border-[#57d9ff]/30 bg-[#57d9ff]/10 text-[#57d9ff]"
                           : "border border-white/10 bg-white/10 text-white/70"
                       }`}
                    >
                      {item.featured
                        ? dictionary.badges.featured
                        : dictionary.badges.normal}
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
                     className="inline-flex max-w-56 break-all text-[#57d9ff] transition hover:text-[#7be3ff] hover:underline"
                  >
                    {item.href}
                  </a>
                </td>
                <td className="px-5 py-5 align-top">
                  <div className="flex items-center gap-2">
                    <UpdateItemButton
                      item={item}
                      ariaLabelPrefix={dictionary.update.ariaLabelPrefix}
                      titleLabel={dictionary.update.title}
                    />
                    <RemoveItemButton
                      itemId={item.id}
                      ariaLabel={dictionary.remove.ariaLabel}
                      titleLabel={dictionary.remove.title}
                      confirmText={dictionary.remove.confirm}
                      successMessage={dictionary.remove.success}
                      errorMessage={dictionary.remove.error}
                    />
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

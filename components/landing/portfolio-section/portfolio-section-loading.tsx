export function PortfolioSectionLoading() {
  return (
    <div className="grid auto-rows-fr gap-6 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-linear-to-br from-[#0c1338] via-[#13215a] to-[#1d4ed8] shadow-[0_24px_60px_rgba(0,200,255,0.12)]"
        >
          <div className="h-52 animate-pulse border-b border-white/10 bg-white/10" />
          <div className="space-y-4 px-6 py-6">
            <div className="h-6 w-24 animate-pulse rounded-full bg-white/10" />
            <div className="space-y-3">
              <div className="h-8 w-3/4 animate-pulse rounded-full bg-white/10" />
              <div className="h-4 w-full animate-pulse rounded-full bg-white/10" />
              <div className="h-4 w-5/6 animate-pulse rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

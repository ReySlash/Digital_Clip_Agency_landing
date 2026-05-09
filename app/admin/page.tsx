import PortfolioTable from "@/components/admin/portfolio-table";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Admin Panel - Digital Clip Agency",
  description: "Admin panel for managing Digital Clip Agency content",
};
async function AdminPage() {
  const portfolioItems = await prisma.portfolioItem.findMany({
    orderBy: [
      { featured: "desc" },
      { sortOrder: "asc" },
      { createdAt: "desc" },
    ],
  });

  return (
    <div className="flex flex-col bg-black min-h-screen pt-10 px-20 gap-5">
      <h1 className="text-3xl text-center text-[#57d9ff] font-semibold uppercase tracking-[0.35em]">
        Digital Clip Agency Admin Panel
      </h1>

      <main className="py-10">
        <section id="Portfolio Management">
          <h2 className="text-xs text-[#57d9ff] font-semibold uppercase tracking-[0.35em]">
            Portfolio content:
          </h2>
          <button className="my-4 inline-flex min-h-12 w-auto items-center justify-center rounded-full bg-[#57d9ff] px-6 text-sm font-semibold text-[#101841] transition hover:bg-white">
            + Add new item
          </button>
          <PortfolioTable initialPortfolioItems={portfolioItems} />
        </section>
      </main>
    </div>
  );
}

export default AdminPage;

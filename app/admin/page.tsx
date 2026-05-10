import { prisma } from "@/lib/prisma";
import PortfolioTable from "@/components/admin/portfolio-table";
import CreateItemButton from "@/components/admin/create-item-button";
import PortfolioModalWrapper from "@/components/admin/portfolio-modal-wrapper";

export const metadata = {
  title: "Admin Panel - Digital Clip Agency",
  description: "Admin panel for managing Digital Clip Agency content",
};

async function getPortfolioItems() {
  try {
    const portfolioItems = await prisma.portfolioItem.findMany({
      orderBy: [
        { featured: "desc" },
        { sortOrder: "asc" },
        { createdAt: "desc" },
      ],
    });
    return portfolioItems;
  } catch (error) {
    console.error("Error fetching portfolio items:", error);
    return [];
  }
}

async function AdminPage() {
  const portfolioItems = await getPortfolioItems();

  return (
    <div className="flex flex-col bg-[#101841] min-h-screen pt-10 px-20 gap-5">
      <h1 className="text-3xl text-center text-[#57d9ff] font-semibold uppercase tracking-[0.35em]">
        Digital Clip Agency Admin Panel
      </h1>

      <main className="py-10">
        <section id="Portfolio Management">
          <h2 className="text-xs text-[#57d9ff] font-semibold uppercase tracking-[0.35em]">
            Portfolio content:
          </h2>
          <CreateItemButton />
          <PortfolioTable portfolioItems={portfolioItems} />
        </section>
      </main>
      <PortfolioModalWrapper />
    </div>
  );
}

export default AdminPage;

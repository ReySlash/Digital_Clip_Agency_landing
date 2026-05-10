import { cacheLife, cacheTag } from "next/cache";

import { prisma } from "@/lib/prisma";

const portfolioOrder = [
  { featured: "desc" as const },
  { sortOrder: "asc" as const },
  { createdAt: "desc" as const },
];

export async function getPublishedPortfolioItems() {
  "use cache";

  // Keep landing data prerenderable and reuse it until an admin mutation expires the tag.
  cacheLife("max");
  cacheTag("portfolio", "portfolio-public");

  return prisma.portfolioItem.findMany({
    where: {
      published: true,
    },
    orderBy: portfolioOrder,
  });
}

export async function getAdminPortfolioItems() {
  "use cache";

  // Admin auth remains request-bound, but the portfolio dataset itself can be reused safely.
  cacheLife("max");
  cacheTag("portfolio", "portfolio-admin");

  return prisma.portfolioItem.findMany({
    orderBy: portfolioOrder,
  });
}

import { cacheLife, cacheTag } from "next/cache";
import { PortfolioItem } from "@prisma/client";

import { prisma } from "@/lib/prisma";

const portfolioOrder = [
  { featured: "desc" as const },
  { sortOrder: "asc" as const },
  { createdAt: "desc" as const },
];

export async function getPublishedPortfolioItems() {
  "use cache";

  cacheLife("max");
  cacheTag("portfolio", "portfolio-public");

  return prisma.portfolioItem.findMany({
    where: {
      published: true,
    },
    orderBy: portfolioOrder,
  });
}

export async function getPublishedPortfolioItemsSafe() {
  try {
    return await getPublishedPortfolioItems();
  } catch (error) {
    console.error("Failed to load published portfolio items:", error);
    return [];
  }
}

type PublishedPortfolioResult = {
  status: "success" | "empty" | "error";
  items: PortfolioItem[];
};

export async function getPublishedPortfolioSectionData(): Promise<PublishedPortfolioResult> {
  try {
    const items = await getPublishedPortfolioItems();

    if (items.length === 0) {
      return { status: "empty", items: [] };
    }

    return { status: "success", items };
  } catch (error) {
    console.error("Failed to load published portfolio items:", error);
    return { status: "error", items: [] };
  }
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

export async function getLatestPublishedPortfolioUpdate() {
  "use cache";

  cacheLife("max");
  cacheTag("portfolio", "portfolio-public");

  const latestItem = await prisma.portfolioItem.findFirst({
    where: {
      published: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    select: {
      updatedAt: true,
    },
  });

  return latestItem?.updatedAt ?? null;
}

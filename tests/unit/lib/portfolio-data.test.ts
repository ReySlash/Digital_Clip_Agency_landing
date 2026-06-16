import { beforeEach, describe, expect, it, vi } from "vitest";

const { findManyMock, findFirstMock, cacheLifeMock, cacheTagMock } = vi.hoisted(() => ({
  findManyMock: vi.fn(),
  findFirstMock: vi.fn(),
  cacheLifeMock: vi.fn(),
  cacheTagMock: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    portfolioItem: {
      findMany: findManyMock,
      findFirst: findFirstMock,
    },
  },
}));

vi.mock("next/cache", () => ({
  cacheLife: cacheLifeMock,
  cacheTag: cacheTagMock,
}));

import {
  getAdminPortfolioItems,
  getLatestPublishedPortfolioUpdate,
  getPublishedPortfolioItems,
} from "@/lib/portfolio-data";

describe("portfolio-data", () => {
  beforeEach(() => {
    findManyMock.mockReset();
    findFirstMock.mockReset();
    cacheLifeMock.mockReset();
    cacheTagMock.mockReset();
    findManyMock.mockResolvedValue([]);
    findFirstMock.mockResolvedValue(null);
  });

  it("queries only published items for the public landing data", async () => {
    await getPublishedPortfolioItems();

    expect(cacheLifeMock).toHaveBeenCalledWith("max");
    expect(cacheTagMock).toHaveBeenCalledWith("portfolio", "portfolio-public");
    expect(findManyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { published: true },
        orderBy: [
          { featured: "desc" },
          { sortOrder: "asc" },
          { createdAt: "desc" },
        ],
      })
    );
  });

  it("queries the full dataset for admin data", async () => {
    await getAdminPortfolioItems();

    expect(cacheLifeMock).toHaveBeenCalledWith("max");
    expect(cacheTagMock).toHaveBeenCalledWith("portfolio", "portfolio-admin");
    expect(findManyMock).toHaveBeenCalledWith({
      orderBy: [
        { featured: "desc" },
        { sortOrder: "asc" },
        { createdAt: "desc" },
      ],
    });
  });

  it("queries the latest published portfolio update for sitemap freshness", async () => {
    const updatedAt = new Date("2026-06-16T09:00:00.000Z");
    findFirstMock.mockResolvedValue({ updatedAt });

    await expect(getLatestPublishedPortfolioUpdate()).resolves.toBe(updatedAt);
    expect(cacheLifeMock).toHaveBeenCalledWith("max");
    expect(cacheTagMock).toHaveBeenCalledWith("portfolio", "portfolio-public");
    expect(findFirstMock).toHaveBeenCalledWith({
      where: { published: true },
      orderBy: { updatedAt: "desc" },
      select: { updatedAt: true },
    });
  });
});

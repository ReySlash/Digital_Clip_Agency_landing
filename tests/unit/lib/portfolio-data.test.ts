import { beforeEach, describe, expect, it, vi } from "vitest";

const { findManyMock, cacheLifeMock, cacheTagMock } = vi.hoisted(() => ({
  findManyMock: vi.fn(),
  cacheLifeMock: vi.fn(),
  cacheTagMock: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    portfolioItem: {
      findMany: findManyMock,
    },
  },
}));

vi.mock("next/cache", () => ({
  cacheLife: cacheLifeMock,
  cacheTag: cacheTagMock,
}));

import {
  getAdminPortfolioItems,
  getPublishedPortfolioItems,
} from "@/lib/portfolio-data";

describe("portfolio-data", () => {
  beforeEach(() => {
    findManyMock.mockReset();
    cacheLifeMock.mockReset();
    cacheTagMock.mockReset();
    findManyMock.mockResolvedValue([]);
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
});

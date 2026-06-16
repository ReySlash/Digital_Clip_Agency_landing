import { beforeEach, describe, expect, it, vi } from "vitest";

const { getLatestPublishedPortfolioUpdateMock } = vi.hoisted(() => ({
  getLatestPublishedPortfolioUpdateMock: vi.fn(),
}));

vi.mock("@/lib/portfolio-data", () => ({
  getLatestPublishedPortfolioUpdate: getLatestPublishedPortfolioUpdateMock,
}));

import sitemap from "@/app/sitemap";

describe("app sitemap", () => {
  beforeEach(() => {
    vi.stubEnv("SITE_URL", "https://digitalclip.agency");
    getLatestPublishedPortfolioUpdateMock.mockReset();
  });

  it("uses the latest published portfolio timestamp when available", async () => {
    const latest = new Date("2026-06-15T12:00:00.000Z");
    getLatestPublishedPortfolioUpdateMock.mockResolvedValue(latest);

    const entries = await sitemap();

    expect(entries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: "https://digitalclip.agency/es",
          lastModified: latest,
        }),
        expect.objectContaining({
          url: "https://digitalclip.agency/en",
          lastModified: latest,
        }),
      ])
    );
  });

  it("falls back to the current date when there is no published portfolio update", async () => {
    const now = new Date("2026-06-16T10:00:00.000Z");
    getLatestPublishedPortfolioUpdateMock.mockResolvedValue(null);
    vi.useFakeTimers();
    vi.setSystemTime(now);

    const entries = await sitemap();

    expect(entries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: "https://digitalclip.agency/es",
          lastModified: now,
        }),
        expect.objectContaining({
          url: "https://digitalclip.agency/en",
          lastModified: now,
        }),
      ])
    );

    vi.useRealTimers();
  });
});

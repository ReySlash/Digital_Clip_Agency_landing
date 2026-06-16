import { afterEach, describe, expect, it, vi } from "vitest";

import { getDictionary } from "@/lib/dictionaries";
import {
  buildHomeJsonLd,
  buildLocaleMetadata,
  buildSitemapEntries,
  getAbsoluteUrl,
  getLocaleCanonicalPath,
  getSiteUrl,
  serializeJsonLd,
} from "@/lib/seo";

const originalEnv = {
  SITE_URL: process.env.SITE_URL,
  AUTH_URL: process.env.AUTH_URL,
};

describe("seo helpers", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    process.env.SITE_URL = originalEnv.SITE_URL;
    process.env.AUTH_URL = originalEnv.AUTH_URL;
  });

  it("prefers SITE_URL over AUTH_URL", () => {
    vi.stubEnv("SITE_URL", "https://digitalclip.agency");
    vi.stubEnv("AUTH_URL", "https://auth.digitalclip.agency");

    expect(getSiteUrl().toString()).toBe("https://digitalclip.agency/");
  });

  it("falls back to AUTH_URL and then localhost", () => {
    vi.stubEnv("SITE_URL", "");
    vi.stubEnv("AUTH_URL", "https://preview.digitalclip.agency");
    expect(getSiteUrl().toString()).toBe("https://preview.digitalclip.agency/");

    vi.stubEnv("AUTH_URL", "");
    expect(getSiteUrl().toString()).toBe("http://localhost:3000/");
  });

  it("builds absolute URLs from the configured origin", () => {
    vi.stubEnv("SITE_URL", "https://digitalclip.agency");

    expect(getAbsoluteUrl("/es")).toBe("https://digitalclip.agency/es");
  });

  it("returns locale canonical paths", () => {
    expect(getLocaleCanonicalPath("es")).toBe("/es");
    expect(getLocaleCanonicalPath("en")).toBe("/en");
  });

  it("escapes less-than signs in JSON-LD output", () => {
    expect(serializeJsonLd({ headline: "<script>" })).toContain("\\u003cscript>");
  });

  it("builds localized metadata with canonical and social fields", () => {
    vi.stubEnv("SITE_URL", "https://digitalclip.agency");
    const metadata = buildLocaleMetadata("es", getDictionary("es"));

    expect(metadata.alternates?.canonical).toBe("/es");
    expect(metadata.alternates?.languages).toEqual({
      es: "/es",
      en: "/en",
      "x-default": "/es",
    });
    const openGraphImages = Array.isArray(metadata.openGraph?.images)
      ? metadata.openGraph.images
      : [metadata.openGraph?.images];
    expect(openGraphImages[0]).toEqual(
      expect.objectContaining({
        url: "https://digitalclip.agency/es/opengraph-image",
      })
    );
    expect(metadata.twitter?.images).toEqual([
      "https://digitalclip.agency/es/opengraph-image",
    ]);
  });

  it("builds homepage structured data from localized content", () => {
    vi.stubEnv("SITE_URL", "https://digitalclip.agency");
    const jsonLd = buildHomeJsonLd("en", getDictionary("en"));

    expect(jsonLd["@graph"]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "@type": "Organization",
          name: "Digital Clip Agency",
        }),
        expect.objectContaining({
          "@type": "ProfessionalService",
          inLanguage: "en",
        }),
        expect.objectContaining({
          "@type": "WebSite",
        }),
      ])
    );
  });

  it("builds sitemap entries for both locales with priority ordering", () => {
    vi.stubEnv("SITE_URL", "https://digitalclip.agency");
    const lastModified = new Date("2026-06-16T00:00:00.000Z");

    expect(buildSitemapEntries(lastModified)).toEqual([
      {
        url: "https://digitalclip.agency/es",
        lastModified,
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: "https://digitalclip.agency/en",
        lastModified,
        changeFrequency: "weekly",
        priority: 0.9,
      },
    ]);
  });
});

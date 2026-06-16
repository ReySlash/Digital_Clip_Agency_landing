import type { MetadataRoute } from "next";

import { getLatestPublishedPortfolioUpdate } from "@/lib/portfolio-data";
import { buildSitemapEntries } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = (await getLatestPublishedPortfolioUpdate()) ?? new Date();

  return buildSitemapEntries(lastModified);
}


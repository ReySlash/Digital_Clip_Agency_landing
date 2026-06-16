import type { Metadata } from "next";
import type { MetadataRoute } from "next";

import type { SiteDictionary } from "@/lib/dictionaries";
import { defaultLocale, locales, type Locale } from "@/lib/i18n";

const LOCALHOST_ORIGIN = "http://localhost:3000";

function parseOrigin(value: string | undefined): URL | null {
  if (!value) {
    return null;
  }

  try {
    return new URL(value);
  } catch {
    return null;
  }
}

export function getSiteUrl(): URL {
  return (
    parseOrigin(process.env.SITE_URL) ??
    parseOrigin(process.env.AUTH_URL) ??
    new URL(LOCALHOST_ORIGIN)
  );
}

export function getAbsoluteUrl(pathname: string): string {
  return new URL(pathname, getSiteUrl()).toString();
}

export function getLocaleCanonicalPath(locale: Locale): `/${Locale}` {
  return `/${locale}`;
}

export function getLocaleAlternates() {
  return {
    languages: {
      es: getLocaleCanonicalPath("es"),
      en: getLocaleCanonicalPath("en"),
      "x-default": getLocaleCanonicalPath(defaultLocale),
    },
  } as const;
}

export function getSocialImagePath(locale: Locale): string {
  return `${getLocaleCanonicalPath(locale)}/opengraph-image`;
}

export function getPublicRobots(): NonNullable<Metadata["robots"]> {
  return {
    index: true,
    follow: true,
  };
}

export function getNoIndexRobots(): NonNullable<Metadata["robots"]> {
  return {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      nocache: true,
    },
  };
}

export function buildLocaleMetadata(locale: Locale, dictionary: SiteDictionary): Metadata {
  const canonicalPath = getLocaleCanonicalPath(locale);
  const socialImageUrl = getAbsoluteUrl(getSocialImagePath(locale));
  const alternateLocale = locale === "es" ? "en_US" : "es_ES";

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    keywords: dictionary.metadata.keywords,
    alternates: {
      canonical: canonicalPath,
      ...getLocaleAlternates(),
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      alternateLocale: [alternateLocale],
      url: getAbsoluteUrl(canonicalPath),
      siteName: dictionary.agency.name,
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      images: [
        {
          url: socialImageUrl,
          width: 1200,
          height: 630,
          alt: dictionary.hero.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      images: [socialImageUrl],
    },
  };
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function buildHomeJsonLd(locale: Locale, dictionary: SiteDictionary) {
  const canonicalPath = getLocaleCanonicalPath(locale);
  const pageUrl = getAbsoluteUrl(canonicalPath);
  const organizationId = `${getAbsoluteUrl("/") }#organization`;
  const websiteId = `${getAbsoluteUrl("/") }#website`;
  const serviceId = `${pageUrl}#service`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: dictionary.agency.name,
        url: getAbsoluteUrl("/"),
        email: dictionary.agency.email,
        logo: getAbsoluteUrl("/brand/logo2_no_bg.png"),
        sameAs: [dictionary.agency.instagram],
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: dictionary.agency.name,
        url: pageUrl,
        description: dictionary.metadata.description,
        email: dictionary.agency.email,
        inLanguage: locale,
        audience: {
          "@type": "Audience",
          audienceType: "Content creators",
        },
        provider: {
          "@id": organizationId,
        },
        areaServed: "Worldwide",
        serviceType: dictionary.services.items.map((item) => item.title),
        knowsAbout: [
          ...dictionary.agency.platforms,
          "Video editing",
          "Short-form content",
          "Content optimization",
          "Visual storytelling",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: dictionary.agency.name,
        url: getAbsoluteUrl("/"),
        inLanguage: locales,
        description: dictionary.metadata.description,
        publisher: {
          "@id": organizationId,
        },
      },
    ],
  };
}

export function buildSitemapEntries(lastModified: Date): MetadataRoute.Sitemap {
  return [
    {
      url: getAbsoluteUrl(getLocaleCanonicalPath("es")),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: getAbsoluteUrl(getLocaleCanonicalPath("en")),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}

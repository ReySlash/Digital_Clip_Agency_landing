import { describe, expect, it } from "vitest";

import {
  defaultLocale,
  getPreferredLocale,
  hasLocale,
  isLocalePrefixedPath,
  locales,
} from "@/lib/i18n";

describe("i18n", () => {
  it("supports spanish and english locales", () => {
    expect(locales).toEqual(["es", "en"]);
    expect(defaultLocale).toBe("es");
    expect(hasLocale("es")).toBe(true);
    expect(hasLocale("en")).toBe(true);
    expect(hasLocale("fr")).toBe(false);
  });

  it("detects locale-prefixed paths", () => {
    expect(isLocalePrefixedPath("/es")).toBe(true);
    expect(isLocalePrefixedPath("/en/services")).toBe(true);
    expect(isLocalePrefixedPath("/admin")).toBe(false);
  });

  it("selects preferred locale from accept-language", () => {
    expect(getPreferredLocale("en-US,en;q=0.8,es;q=0.7")).toBe("en");
    expect(getPreferredLocale("es-ES,es;q=0.9,en;q=0.6")).toBe("es");
    expect(getPreferredLocale("fr-FR,fr;q=0.9")).toBe("es");
    expect(getPreferredLocale(null)).toBe("es");
  });
});

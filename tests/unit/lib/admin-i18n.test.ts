import { describe, expect, it } from "vitest";

import { resolveAdminLocale } from "@/lib/admin-i18n";

describe("admin-i18n", () => {
  it("prefers cookie locale over accept-language", () => {
    expect(
      resolveAdminLocale({ cookieValue: "en", acceptLanguage: "es-ES,es;q=0.9" })
    ).toBe("en");
  });

  it("falls back to accept-language when cookie is invalid", () => {
    expect(
      resolveAdminLocale({ cookieValue: "fr", acceptLanguage: "en-US,en;q=0.9" })
    ).toBe("en");
  });

  it("falls back to default locale when accept-language is missing", () => {
    expect(resolveAdminLocale({ cookieValue: null, acceptLanguage: null })).toBe("es");
  });
});


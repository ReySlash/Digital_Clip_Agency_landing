import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";

import { proxy } from "@/proxy";
import { PUBLIC_LOCALE_COOKIE } from "@/lib/i18n";

function makeRequest(
  pathname: string,
  acceptLanguage?: string,
  cookieHeader?: string,
) {
  const headers: Record<string, string> = {};
  if (acceptLanguage) headers["accept-language"] = acceptLanguage;
  if (cookieHeader) headers["cookie"] = cookieHeader;

  return new NextRequest(new URL(`https://example.com${pathname}`), { headers });
}

describe("proxy locale redirects", () => {
  it("redirects root requests using accept-language", () => {
    const response = proxy(makeRequest("/", "en-US,en;q=0.9"));

    expect(response?.status).toBe(307);
    expect(response?.headers.get("location")).toBe("https://example.com/en/");
  });

  it("redirects using cookie locale when present", () => {
    const response = proxy(
      makeRequest("/", "es-ES,es;q=0.9", `${PUBLIC_LOCALE_COOKIE}=en`),
    );

    expect(response?.status).toBe(307);
    expect(response?.headers.get("location")).toBe("https://example.com/en/");
  });

  it("does not redirect locale-prefixed routes", () => {
    const response = proxy(makeRequest("/es"));

    expect(response?.status).toBe(200);
  });

  it("sets the locale cookie on locale-prefixed routes", () => {
    const response = proxy(makeRequest("/en/services"));

    expect(response?.status).toBe(200);
    expect(response?.headers.get("set-cookie")).toContain(
      `${PUBLIC_LOCALE_COOKIE}=en`,
    );
  });

  it("does not redirect admin or api routes", () => {
    expect(proxy(makeRequest("/admin"))?.status).toBe(200);
    expect(proxy(makeRequest("/api/auth/test"))?.status).toBe(200);
  });
});

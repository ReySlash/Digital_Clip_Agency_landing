import { NextRequest, NextResponse } from "next/server";

import {
  hasLocale,
  isLocalePrefixedPath,
  PUBLIC_LOCALE_COOKIE,
  resolvePreferredLocale,
} from "@/lib/i18n";

const PUBLIC_FILE = /\.[^/]+$/;

function isBypassedPath(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname)
  );
}

export function proxy(request: NextRequest) {
  const nextRequest = request;
  const url = new URL(nextRequest.url);
  const { pathname } = url;

  if (isBypassedPath(pathname)) {
    return NextResponse.next();
  }

  if (isLocalePrefixedPath(pathname)) {
    const localeCandidate = pathname.split("/").filter(Boolean)[0] ?? "";
    const response = NextResponse.next();
    if (hasLocale(localeCandidate)) {
      response.cookies.set(PUBLIC_LOCALE_COOKIE, localeCandidate, {
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
      });
    }
    return response;
  }

  const cookieLocale = nextRequest.cookies.get(PUBLIC_LOCALE_COOKIE)?.value ?? null;
  const locale = resolvePreferredLocale({
    cookieValue: cookieLocale,
    acceptLanguage: nextRequest.headers.get("accept-language"),
  });
  url.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/:path*",
};

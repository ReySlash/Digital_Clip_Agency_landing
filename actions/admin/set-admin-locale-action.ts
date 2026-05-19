"use server";

import { cookies } from "next/headers";

import { hasLocale } from "@/lib/i18n";
import { ADMIN_LOCALE_COOKIE } from "@/lib/admin-i18n";

export async function setAdminLocaleAction(nextLocale: string): Promise<void> {
  if (!hasLocale(nextLocale)) {
    return;
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_LOCALE_COOKIE, nextLocale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
}

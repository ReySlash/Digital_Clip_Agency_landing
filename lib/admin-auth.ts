import type { Session } from "next-auth";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

type RequireAdminSessionOptions = {
  onUnauthorized?: "throw" | "redirect";
  callbackUrl?: string;
};

export async function requireAdminSession(
  options: RequireAdminSessionOptions = {},
): Promise<Session> {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    if (options.onUnauthorized === "redirect") {
      const loginPath = new URL(
        "/admin/login",
        process.env.AUTH_URL ?? "http://localhost:3000",
      );
      loginPath.searchParams.set("callbackUrl", options.callbackUrl ?? "/admin");
      redirect(`${loginPath.pathname}${loginPath.search}`);
    }

    throw new Error("Unauthorized");
  }

  return session;
}

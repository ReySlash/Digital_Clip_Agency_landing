import type { Session } from "next-auth";

import { auth } from "@/auth";

export async function requireAdminSession(): Promise<Session> {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  return session;
}

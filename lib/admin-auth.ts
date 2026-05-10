import type { Session } from "next-auth";
import type { UserRole } from "@prisma/client";

import { auth } from "@/auth";

const PRIVILEGED_ROLES: UserRole[] = ["ADMIN", "DEV"];

export async function requireAdminSession(): Promise<Session> {
  const session = await auth();

  if (!session?.user || !PRIVILEGED_ROLES.includes(session.user.role)) {
    throw new Error("Unauthorized");
  }

  return session;
}

import bcrypt from "bcryptjs";
import { z } from "zod";
import type { Session } from "next-auth";
import type { UserRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const signInSchema = z.object({
  email: z.email({ message: "Email inválido" }),
  password: z.string().min(1, "Contraseña requerida"),
});

export async function authorizeCredentials(credentials: unknown) {
  const parsed = signInSchema.safeParse(credentials);

  if (!parsed.success) return null;

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

export async function jwtCallback({
  token,
  user,
}: {
  token: Record<string, unknown>;
  user?: { id: string; role: UserRole } | null;
}) {
  if (user) {
    token.id = user.id;
    token.role = user.role;
  }

  return token;
}

export async function sessionCallback({
  session,
  token,
}: {
  session: Session;
  token: Record<string, unknown>;
}) {
  if (token) {
    session.user.id = token.id as string;
    session.user.role = token.role as UserRole;
  }

  return session;
}

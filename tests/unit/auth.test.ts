import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Session } from "next-auth";

const { findUniqueMock, compareMock } = vi.hoisted(() => ({
  findUniqueMock: vi.fn(),
  compareMock: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: findUniqueMock,
    },
  },
}));

vi.mock("bcryptjs", () => ({
  default: {
    compare: compareMock,
  },
}));

import {
  authorizeCredentials,
  jwtCallback,
  sessionCallback,
} from "@/lib/auth-logic";

describe("auth helpers", () => {
  beforeEach(() => {
    findUniqueMock.mockReset();
    compareMock.mockReset();
  });

  it("returns null for invalid input", async () => {
    await expect(authorizeCredentials({ email: "bad", password: "" })).resolves.toBeNull();
  });

  it("returns null when the user does not exist", async () => {
    findUniqueMock.mockResolvedValue(null);

    await expect(
      authorizeCredentials({
        email: "admin@digitalclipagency.com",
        password: "secret123",
      })
    ).resolves.toBeNull();
  });

  it("returns null when the password is invalid", async () => {
    findUniqueMock.mockResolvedValue({
      id: "user-1",
      email: "admin@digitalclipagency.com",
      name: "Admin",
      role: "ADMIN",
      passwordHash: "hash",
    });
    compareMock.mockResolvedValue(false);

    await expect(
      authorizeCredentials({
        email: "admin@digitalclipagency.com",
        password: "wrong-password",
      })
    ).resolves.toBeNull();
  });

  it("returns the user payload for valid credentials", async () => {
    findUniqueMock.mockResolvedValue({
      id: "user-1",
      email: "admin@digitalclipagency.com",
      name: "Admin",
      role: "ADMIN",
      passwordHash: "hash",
    });
    compareMock.mockResolvedValue(true);

    await expect(
      authorizeCredentials({
        email: "admin@digitalclipagency.com",
        password: "correct-password",
      })
    ).resolves.toEqual({
      id: "user-1",
      email: "admin@digitalclipagency.com",
      name: "Admin",
      role: "ADMIN",
    });
  });

  it("stores id and role on the jwt token", async () => {
    const token = await jwtCallback({
      token: {},
      user: { id: "user-1", role: "ADMIN" },
    });

    expect(token).toMatchObject({ id: "user-1", role: "ADMIN" });
  });

  it("maps token values onto the session", async () => {
    const session = await sessionCallback({
      session: {
        user: {
          id: "",
          email: "admin@digitalclipagency.com",
          name: "Admin",
          role: "ADMIN",
        },
        expires: new Date().toISOString(),
      } as Session,
      token: { id: "user-1", role: "ADMIN" },
    });

    expect(session.user).toMatchObject({ id: "user-1", role: "ADMIN" });
  });
});

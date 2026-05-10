import { beforeEach, describe, expect, it, vi } from "vitest";

const { authMock } = vi.hoisted(() => ({
  authMock: vi.fn(),
}));

vi.mock("@/auth", () => ({
  auth: authMock,
}));

import { requireAdminSession } from "@/lib/admin-auth";

describe("requireAdminSession", () => {
  beforeEach(() => {
    authMock.mockReset();
  });

  it("allows admin users", async () => {
    const session = {
      user: {
        id: "admin-1",
        email: "admin@example.com",
        name: "Admin",
        role: "ADMIN",
      },
    };

    authMock.mockResolvedValue(session);

    await expect(requireAdminSession()).resolves.toEqual(session);
  });

  it("allows dev users", async () => {
    const session = {
      user: {
        id: "dev-1",
        email: "dev@example.com",
        name: "Dev",
        role: "DEV",
      },
    };

    authMock.mockResolvedValue(session);

    await expect(requireAdminSession()).resolves.toEqual(session);
  });

  it("rejects missing sessions", async () => {
    authMock.mockResolvedValue(null);

    await expect(requireAdminSession()).rejects.toThrow("Unauthorized");
  });
});

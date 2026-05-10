import { beforeEach, describe, expect, it, vi } from "vitest";

const { authMock, redirectMock } = vi.hoisted(() => ({
  authMock: vi.fn(),
  redirectMock: vi.fn(),
}));

vi.mock("@/auth", () => ({
  auth: authMock,
}));

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

import { requireAdminSession } from "@/lib/admin-auth";

describe("requireAdminSession", () => {
  beforeEach(() => {
    authMock.mockReset();
    redirectMock.mockReset();
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

  it("rejects signed-in users without a privileged role", async () => {
    authMock.mockResolvedValue({
      user: {
        id: "user-1",
        email: "user@example.com",
        name: "User",
        role: undefined,
      },
    });

    await expect(requireAdminSession()).rejects.toThrow("Unauthorized");
  });

  it("redirects unauthorized users when requested", async () => {
    authMock.mockResolvedValue(null);
    redirectMock.mockImplementation(() => {
      throw new Error("NEXT_REDIRECT");
    });

    await expect(
      requireAdminSession({
        onUnauthorized: "redirect",
        callbackUrl: "/admin",
      }),
    ).rejects.toThrow("NEXT_REDIRECT");

    expect(redirectMock).toHaveBeenCalledWith("/admin/login?callbackUrl=%2Fadmin");
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";

const {
  createMock,
  updateMock,
  deleteMock,
  updateTagMock,
  requireAdminSessionMock,
  validateCreateFormDataMock,
  validateUpdateFormDataMock,
  handleZodErrorMock,
} = vi.hoisted(() => ({
  createMock: vi.fn(),
  updateMock: vi.fn(),
  deleteMock: vi.fn(),
  updateTagMock: vi.fn(),
  requireAdminSessionMock: vi.fn(),
  validateCreateFormDataMock: vi.fn(),
  validateUpdateFormDataMock: vi.fn(),
  handleZodErrorMock: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    portfolioItem: {
      create: createMock,
      update: updateMock,
      delete: deleteMock,
    },
  },
}));

vi.mock("next/cache", () => ({
  updateTag: updateTagMock,
}));

vi.mock("@/lib/admin-auth", () => ({
  requireAdminSession: requireAdminSessionMock,
}));

vi.mock("@/actions/admin/portfolio-items-validation", () => ({
  validateCreateFormData: validateCreateFormDataMock,
  validateUpdateFormData: validateUpdateFormDataMock,
}));

vi.mock("@/lib/zod-utils", () => ({
  handleZodError: handleZodErrorMock,
}));

import {
  handleCreateItem,
  handleRemoveItem,
  handleUpdateItem,
} from "@/actions/admin/portfolio-items-actions";

describe("portfolio item actions", () => {
  beforeEach(() => {
    createMock.mockReset();
    updateMock.mockReset();
    deleteMock.mockReset();
    updateTagMock.mockReset();
    requireAdminSessionMock.mockReset();
    validateCreateFormDataMock.mockReset();
    validateUpdateFormDataMock.mockReset();
    handleZodErrorMock.mockReset();

    requireAdminSessionMock.mockResolvedValue({
      user: { id: "admin-1", role: "ADMIN" },
    });
  });

  it("rejects create when the caller is not authorized", async () => {
    const formData = new FormData();
    requireAdminSessionMock.mockRejectedValue(new Error("Unauthorized"));

    await expect(handleCreateItem(formData)).rejects.toThrow("Unauthorized");
    expect(validateCreateFormDataMock).not.toHaveBeenCalled();
    expect(createMock).not.toHaveBeenCalled();
  });

  it("rejects update when the caller is not authorized", async () => {
    const formData = new FormData();
    requireAdminSessionMock.mockRejectedValue(new Error("Unauthorized"));

    await expect(handleUpdateItem(formData)).rejects.toThrow("Unauthorized");
    expect(validateUpdateFormDataMock).not.toHaveBeenCalled();
    expect(updateMock).not.toHaveBeenCalled();
  });

  it("rejects delete when the caller is not authorized", async () => {
    requireAdminSessionMock.mockRejectedValue(new Error("Unauthorized"));

    await expect(handleRemoveItem("item-1")).rejects.toThrow("Unauthorized");
    expect(deleteMock).not.toHaveBeenCalled();
  });

  it("creates an item and expires all portfolio tags", async () => {
    const formData = new FormData();
    const validated = { title: "Proyecto" };

    validateCreateFormDataMock.mockResolvedValue(validated);
    createMock.mockResolvedValue({});

    await expect(handleCreateItem(formData)).resolves.toEqual({ success: true });
    expect(createMock).toHaveBeenCalledWith({ data: validated });
    expect(updateTagMock).toHaveBeenCalledWith("portfolio");
    expect(updateTagMock).toHaveBeenCalledWith("portfolio-public");
    expect(updateTagMock).toHaveBeenCalledWith("portfolio-admin");
  });

  it("updates an item and expires all portfolio tags", async () => {
    const formData = new FormData();
    const validated = { id: "item-1", title: "Proyecto" };

    validateUpdateFormDataMock.mockResolvedValue(validated);
    updateMock.mockResolvedValue({});

    await expect(handleUpdateItem(formData)).resolves.toEqual({ success: true });
    expect(updateMock).toHaveBeenCalledWith({
      where: { id: "item-1" },
      data: { title: "Proyecto" },
    });
    expect(updateTagMock).toHaveBeenCalledTimes(3);
  });

  it("removes an item and expires all portfolio tags", async () => {
    deleteMock.mockResolvedValue({});

    await handleRemoveItem("item-1");

    expect(deleteMock).toHaveBeenCalledWith({ where: { id: "item-1" } });
    expect(updateTagMock).toHaveBeenCalledTimes(3);
  });

  it("formats zod errors on create", async () => {
    const formData = new FormData();
    const zodError = new z.ZodError([]);

    validateCreateFormDataMock.mockRejectedValue(zodError);
    handleZodErrorMock.mockReturnValue({ success: false, errors: {} });

    await expect(handleCreateItem(formData)).resolves.toEqual({ success: false, errors: {} });
    expect(handleZodErrorMock).toHaveBeenCalledWith(zodError);
  });

  it("rethrows unexpected errors on delete", async () => {
    deleteMock.mockRejectedValue(new Error("db failed"));

    await expect(handleRemoveItem("item-1")).rejects.toThrow("db failed");
  });
});

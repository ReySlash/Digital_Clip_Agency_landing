"use server";
import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";
import { z } from "zod";
import { requireAdminSession } from "@/lib/admin-auth";
import { handleZodError } from "@/lib/zod-utils";
import {
  validateCreateFormData,
  validateUpdateFormData,
} from "./portfolio-items-validation";

async function handleCreateItem(formData: FormData) {
  try {
    await requireAdminSession();

    const validatedData = await validateCreateFormData(formData);
    await prisma.portfolioItem.create({ data: validatedData });

    // Expire both public and admin portfolio caches immediately after a write.
    updateTag("portfolio");
    updateTag("portfolio-public");
    updateTag("portfolio-admin");

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleZodError(error);
    }
    console.error("Error creating portfolio item:", error);
    throw error;
  }
}

async function handleUpdateItem(formData: FormData) {
  try {
    await requireAdminSession();

    const validatedData = await validateUpdateFormData(formData);
    const { id, ...data } = validatedData;

    await prisma.portfolioItem.update({
      where: { id },
      data,
    });

    updateTag("portfolio");
    updateTag("portfolio-public");
    updateTag("portfolio-admin");

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleZodError(error);
    }

    console.error("Error updating portfolio item:", error);
    throw error;
  }
}

async function handleRemoveItem(itemId: string) {
  try {
    await requireAdminSession();

    await prisma.portfolioItem.delete({
      where: {
        id: itemId,
      },
    });

    updateTag("portfolio");
    updateTag("portfolio-public");
    updateTag("portfolio-admin");
  } catch (error) {
    console.error("Error removing portfolio item:", error);
    throw error;
  }
}

export { handleCreateItem, handleUpdateItem, handleRemoveItem };

"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { handleZodError } from "@/lib/zod-utils";
import {
  validateCreateFormData,
  validateUpdateFormData,
} from "./portfolio-items-validation";

async function handleCreateItem(formData: FormData) {
  try {
    const validatedData = await validateCreateFormData(formData);
    await prisma.portfolioItem.create({ data: validatedData });
    revalidatePath("/admin");
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
    const validatedData = await validateUpdateFormData(formData);
    const { id, ...data } = validatedData;

    await prisma.portfolioItem.update({
      where: { id },
      data,
    });

    revalidatePath("/admin");
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
    await prisma.portfolioItem.delete({
      where: {
        id: itemId,
      },
    });
    revalidatePath("/admin");
  } catch (error) {
    console.error("Error removing portfolio item:", error);
    throw error;
  }
}

export { handleCreateItem, handleUpdateItem, handleRemoveItem };

"use server";
import createPortfolioItemSchema from "@/schemas/create-portfolio-item-schema";
import updatePortfolioItemSchema from "@/schemas/update-portfolio-item-schema";

export async function validateCreateFormData(formData: FormData) {
  const rawData = {
    title: formData.get("title")?.toString() ?? "",
    platform: formData.get("platform")?.toString() ?? "",
    thumbnail: formData.get("thumbnail")?.toString() ?? "",
    href: formData.get("href")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
    sortOrder: parseInt(formData.get("sortOrder") as string, 10) || 0,
  };

  return createPortfolioItemSchema.parse(rawData);
}

export async function validateUpdateFormData(formData: FormData) {
  const rawData = {
    id: formData.get("id")?.toString() ?? "",
    title: formData.get("title")?.toString() ?? "",
    platform: formData.get("platform")?.toString() ?? "",
    thumbnail: formData.get("thumbnail")?.toString() ?? "",
    href: formData.get("href")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
    sortOrder: parseInt(formData.get("sortOrder") as string, 10) || 0,
  };

  return updatePortfolioItemSchema.parse(rawData);
}

import {
  validateCreateFormData,
  validateUpdateFormData,
} from "@/actions/admin/portfolio-items-validation";

function createValidFormData() {
  const formData = new FormData();

  formData.set("title", "Proyecto test");
  formData.set("platform", "YouTube");
  formData.set("thumbnail", "https://i.ytimg.com/vi/abc/hqdefault.jpg");
  formData.set("href", "https://www.youtube.com/watch?v=abc");
  formData.set("description", "Descripcion valida");

  return formData;
}

describe("portfolio-items-validation", () => {
  it("parses create form data correctly", async () => {
    const formData = createValidFormData();
    formData.set("published", "on");
    formData.set("featured", "on");
    formData.set("sortOrder", "5");

    const parsed = await validateCreateFormData(formData);

    expect(parsed.published).toBe(true);
    expect(parsed.featured).toBe(true);
    expect(parsed.sortOrder).toBe(5);
  });

  it("defaults missing booleans and sort order", async () => {
    const formData = createValidFormData();

    const parsed = await validateCreateFormData(formData);

    expect(parsed.published).toBe(false);
    expect(parsed.featured).toBe(false);
    expect(parsed.sortOrder).toBe(0);
  });

  it("parses update form data including id", async () => {
    const formData = createValidFormData();
    formData.set("id", "item-1");

    const parsed = await validateUpdateFormData(formData);

    expect(parsed.id).toBe("item-1");
  });

  it("throws for invalid create form data", async () => {
    const formData = createValidFormData();
    formData.set("href", "bad-url");

    await expect(validateCreateFormData(formData)).rejects.toThrow();
  });
});

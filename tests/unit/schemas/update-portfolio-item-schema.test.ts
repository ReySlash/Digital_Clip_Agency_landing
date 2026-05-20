import updatePortfolioItemSchema from "@/schemas/update-portfolio-item-schema";

describe("updatePortfolioItemSchema", () => {
  it("accepts a valid update payload", () => {
    const parsed = updatePortfolioItemSchema.parse({
      id: "item-1",
      titleES: "Proyecto actualizado",
      titleEN: "Updated project",
      platform: "Instagram",
      thumbnail: "https://i.ytimg.com/vi/abc/hqdefault.jpg",
      href: "https://www.instagram.com/reel/abc",
      descriptionES: "Descripcion valida",
      descriptionEN: "Valid description",
      published: true,
      featured: true,
      sortOrder: 1,
    });

    expect(parsed.id).toBe("item-1");
    expect(parsed.featured).toBe(true);
  });

  it("requires an id", () => {
    expect(() =>
      updatePortfolioItemSchema.parse({
        id: "",
        titleES: "Proyecto actualizado",
        titleEN: "Updated project",
        platform: "Instagram",
        thumbnail: "https://i.ytimg.com/vi/abc/hqdefault.jpg",
        href: "https://www.instagram.com/reel/abc",
        descriptionES: "Descripcion valida",
        descriptionEN: "Valid description",
      })
    ).toThrow();
  });
});

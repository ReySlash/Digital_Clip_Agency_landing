import createPortfolioItemSchema from "@/schemas/create-portfolio-item-schema";

describe("createPortfolioItemSchema", () => {
  it("accepts a valid portfolio item", () => {
    const parsed = createPortfolioItemSchema.parse({
      titleES: "Proyecto test",
      titleEN: "Test project",
      platform: "YouTube",
      thumbnail: "https://i.ytimg.com/vi/abc/hqdefault.jpg",
      href: "https://www.youtube.com/watch?v=abc",
      descriptionES: "Descripcion valida",
      descriptionEN: "Valid description",
      published: true,
      featured: false,
      sortOrder: 2,
    });

    expect(parsed.titleES).toBe("Proyecto test");
    expect(parsed.titleEN).toBe("Test project");
    expect(parsed.published).toBe(true);
    expect(parsed.sortOrder).toBe(2);
  });

  it("applies defaults for optional fields", () => {
    const parsed = createPortfolioItemSchema.parse({
      titleES: "Proyecto test",
      titleEN: "Test project",
      platform: "TikTok",
      thumbnail: "https://i.ytimg.com/vi/abc/hqdefault.jpg",
      href: "https://www.tiktok.com/@digitalclip/video/123",
      descriptionES: "Descripcion valida",
      descriptionEN: "Valid description",
    });

    expect(parsed.published).toBe(false);
    expect(parsed.featured).toBe(false);
    expect(parsed.sortOrder).toBe(0);
  });

  it("rejects an empty spanish title", () => {
    expect(() =>
      createPortfolioItemSchema.parse({
        titleES: "",
        titleEN: "Test project",
        platform: "YouTube",
        thumbnail: "https://i.ytimg.com/vi/abc/hqdefault.jpg",
        href: "https://www.youtube.com/watch?v=abc",
        descriptionES: "Descripcion valida",
        descriptionEN: "Valid description",
      })
    ).toThrow();
  });

  it("rejects invalid urls", () => {
    expect(() =>
      createPortfolioItemSchema.parse({
        titleES: "Proyecto test",
        titleEN: "Test project",
        platform: "YouTube",
        thumbnail: "not-a-url",
        href: "also-not-a-url",
        descriptionES: "Descripcion valida",
        descriptionEN: "Valid description",
      })
    ).toThrow();
  });
});

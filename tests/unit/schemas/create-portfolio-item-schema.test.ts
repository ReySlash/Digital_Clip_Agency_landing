import createPortfolioItemSchema from "@/schemas/create-portfolio-item-schema";

describe("createPortfolioItemSchema", () => {
  it("accepts a valid portfolio item", () => {
    const parsed = createPortfolioItemSchema.parse({
      title: "Proyecto test",
      platform: "YouTube",
      thumbnail: "https://i.ytimg.com/vi/abc/hqdefault.jpg",
      href: "https://www.youtube.com/watch?v=abc",
      description: "Descripcion valida",
      published: true,
      featured: false,
      sortOrder: 2,
    });

    expect(parsed.title).toBe("Proyecto test");
    expect(parsed.published).toBe(true);
    expect(parsed.sortOrder).toBe(2);
  });

  it("applies defaults for optional fields", () => {
    const parsed = createPortfolioItemSchema.parse({
      title: "Proyecto test",
      platform: "TikTok",
      thumbnail: "https://i.ytimg.com/vi/abc/hqdefault.jpg",
      href: "https://www.tiktok.com/@digitalclip/video/123",
      description: "Descripcion valida",
    });

    expect(parsed.published).toBe(false);
    expect(parsed.featured).toBe(false);
    expect(parsed.sortOrder).toBe(0);
  });

  it("rejects an empty title", () => {
    expect(() =>
      createPortfolioItemSchema.parse({
        title: "",
        platform: "YouTube",
        thumbnail: "https://i.ytimg.com/vi/abc/hqdefault.jpg",
        href: "https://www.youtube.com/watch?v=abc",
        description: "Descripcion valida",
      })
    ).toThrow();
  });

  it("rejects invalid urls", () => {
    expect(() =>
      createPortfolioItemSchema.parse({
        title: "Proyecto test",
        platform: "YouTube",
        thumbnail: "not-a-url",
        href: "also-not-a-url",
        description: "Descripcion valida",
      })
    ).toThrow();
  });
});

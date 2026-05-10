import { z } from "zod";

import { handleZodError } from "@/lib/zod-utils";

describe("handleZodError", () => {
  it("groups issues by field name", () => {
    const schema = z.object({
      title: z.string().min(3),
      href: z.httpUrl(),
    });

    const result = schema.safeParse({
      title: "a",
      href: "bad-url",
    });

    expect(result.success).toBe(false);

    if (result.success) {
      throw new Error("Expected validation to fail");
    }

    expect(handleZodError(result.error)).toEqual({
      success: false,
      errors: {
        title: expect.any(Array),
        href: expect.any(Array),
      },
    });
  });

  it("collects multiple messages for the same field", () => {
    const schema = z.object({
      title: z.string().min(3).max(4),
    });

    const result = schema.safeParse({ title: "" });

    expect(result.success).toBe(false);

    if (result.success) {
      throw new Error("Expected validation to fail");
    }

    const formatted = handleZodError(result.error);

    expect(formatted.errors.title).toBeDefined();
    expect(formatted.errors.title?.length).toBeGreaterThan(0);
  });
});

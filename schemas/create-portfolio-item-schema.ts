import { z } from "zod";

const createPortfolioItemSchema = z.object({
  title: z.string().min(1),
  platform: z.string().min(1),
  thumbnail: z.httpUrl(),
  href: z.httpUrl(),
  description: z.string().min(1),
  published: z.boolean().optional().default(false),
  featured: z.boolean().optional().default(false),
  sortOrder: z.number().optional().default(0),
});

export default createPortfolioItemSchema;

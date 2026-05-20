import { z } from "zod";

const updatePortfolioItemSchema = z.object({
  id: z.string().min(1),
  titleES: z.string().min(1),
  titleEN: z.string().min(1),
  platform: z.string().min(1),
  thumbnail: z.httpUrl(),
  href: z.httpUrl(),
  descriptionES: z.string().min(1),
  descriptionEN: z.string().min(1),
  published: z.boolean().optional().default(false),
  featured: z.boolean().optional().default(false),
  sortOrder: z.number().optional().default(0),
});

export default updatePortfolioItemSchema;

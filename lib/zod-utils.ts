import { z } from "zod";

export function handleZodError(error: z.ZodError) {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const path = issue.path[0];
    if (path && typeof path === "string") {
      if (!fieldErrors[path]) fieldErrors[path] = [];
      fieldErrors[path].push(issue.message);
    }
  }
  return { success: false, errors: fieldErrors };
}

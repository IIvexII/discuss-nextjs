import { z } from "zod";

export const createCommentSchema = z.object({
  content: z.string().min(10).max(255),
});

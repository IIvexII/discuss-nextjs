import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(5).max(50),
  content: z.string().min(10).max(255),
});

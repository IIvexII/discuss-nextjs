import { z } from "zod";

export const createTopicSchema = z.object({
  title: z
    .string()
    .min(3)
    .regex(/^[a-z-]*$/, {
      message: "Title must contain only letters and hyphens",
    })
    .max(255),
  description: z.string().min(10).max(255),
});

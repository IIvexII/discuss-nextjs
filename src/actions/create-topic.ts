"use server";
import { createTopicSchema } from "@/validations/topicSchema";
import { db } from "@/db";

interface formStateType {
  error: {
    title?: string[];
    description?: string[];
  };
}

export async function createTopic(
  formState: formStateType,
  formData: FormData
): Promise<formStateType> {
  const title = formData.get("title");
  const description = formData.get("description");

  const validatedFields = createTopicSchema.safeParse({
    title,
    description,
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  return { error: {} };
}

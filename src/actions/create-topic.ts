"use server";
import { createTopicSchema } from "@/validations/topicSchema";
import { db } from "@/db";
import { redirect } from "next/navigation";
import type { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { paths } from "@/paths";

interface formStateType {
  error: {
    title?: string[];
    description?: string[];
    _form?: string[];
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

  // check if topic already exists
  const topicExists = await db.topic.findUnique({
    where: {
      slug: title as string,
    },
  });

  if (topicExists) {
    return {
      error: {
        title: ["Topic already exists"],
      },
    };
  }

  // create topic
  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: title as string,
        description: description as string,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: {
          _form: [error.message],
        },
      };
    } else {
      return {
        error: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  revalidatePath(paths.home());
  redirect(paths.showTopic(topic.slug));
}

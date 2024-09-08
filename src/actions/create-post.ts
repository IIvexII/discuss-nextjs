"use server";
import { createPostSchema } from "@/validations/postSchema";
import { db } from "@/db";
import { redirect } from "next/navigation";
import type { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { paths } from "@/paths";
import { auth } from "@/auth";

interface formStateType {
  error: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  formState: formStateType,
  formData: FormData
): Promise<formStateType> {
  const session = await auth();
  const title = formData.get("title");
  const content = formData.get("content");

  console.log(session);

  const validatedFields = createPostSchema.safeParse({
    title: title as string,
    content,
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (!session || !session.user) {
    return {
      error: { _form: ["You must be logged in to create a post"] },
    };
  }

  const topic = await db.topic.findUnique({
    where: {
      slug,
    },
  });

  if (!topic) {
    return {
      error: { _form: ["Topic not found"] },
    };
  }

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        topicId: topic.id,
        title: title as string,
        content: content as string,
        userId: session.user.id as string,
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

  revalidatePath(paths.showTopic(topic.slug));
  redirect(paths.showPost(topic.slug, post.id));
}

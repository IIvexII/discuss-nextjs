"use server";
import { createCommentSchema } from "@/validations/commentSchema";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { paths } from "@/paths";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface formStateType {
  error: {
    content?: string[];
    _form?: string[];
  };
}

export async function createComment(
  postId: string,
  formState: formStateType,
  formData: FormData
) {
  const session = await auth();
  const content = formData.get("content");

  const validatedFields = createCommentSchema.safeParse({
    content: content as string,
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (!session || !session.user) {
    return {
      error: { _form: ["You must be logged in to create a comment"] },
    };
  }

  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      topic: {
        select: {
          slug: true,
        },
      },
    },
  });

  if (!post) {
    return {
      error: { _form: ["Post not found"] },
    };
  }

  const comment = await db.comment.create({
    data: {
      content: content as string,
      postId: post.id,
      userId: session.user.id as string,
    },
  });

  revalidatePath(paths.showPost(post.topic.slug, post.id));
  redirect(paths.showPost(post.topic.slug, post.id));
}

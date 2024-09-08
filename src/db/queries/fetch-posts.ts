import { db } from "@/db";
import { Post } from "@prisma/client";

interface PostsWithData extends Post {
  topic: { slug: string };
  user: { name: string | null };
  _count: {
    comments: number;
  };
}

async function fetchPosts(): Promise<PostsWithData[]> {
  const posts = await db.post.findMany({
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });

  return posts;
}

async function fetchPostsByTopic(slug: string): Promise<PostsWithData[]> {
  const posts = await db.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });

  return posts;
}

async function fetchTopPosts(): Promise<PostsWithData[]> {
  const posts = await db.post.findMany({
    orderBy: {
      comments: {
        _count: "desc",
      },
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
    take: 5,
  });

  return posts;
}

export type { PostsWithData };
export { fetchPosts, fetchPostsByTopic, fetchTopPosts };

import { paths } from "@/paths";
import Link from "next/link";
import { db } from "@/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import CreatePostForm from "@/components/form/create-post-form";
import TopicsBadgeList from "@/components/topics/topicsBadgeList";
import CommentList from "@/components/posts/comments/CommentList";
import CreateComment from "@/components/form/create-comment";

interface PostPageProps {
  params: { slug: string; postId: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await db.post.findUnique({
    where: { id: params.postId },
    include: {
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-16 mt-8 grid grid-cols-4 gap-4">
      <div className="card bg-gray-100 border-gray-300 shadow px-8 pb-8 pt-4 col-span-3">
        {/* back to topic */}
        <Link
          href={paths.showTopic(params.slug)}
          className="w-48 flex gap-2 mb-4 hover:bg-gray-300 p-2 rounded-md"
        >
          <span className="text-2xl -mt-1">&larr;</span>
          <span>Back to {params.slug}</span>
        </Link>
        <div className="flex items-center gap-2 mb-4">
          <Image
            src={post.user.image as string}
            alt={post.user.name as string}
            width={32}
            height={32}
            className="rounded-full"
          />
          <p className="text-gray-500">{post.user.name}</p>
        </div>
        <h1 className="text-xl font-bold">{post.title}</h1>
        <p className="my-3">{post.content}</p>

        <CreateComment postId={post.id} />

        <div className="divider"></div>
        <CommentList postId={post.id} />
      </div>

      {/* create post form */}
      <div className="card bg-gray-100 border-gray-300 shadow px-8 pb-8 pt-4 self-start">
        <CreatePostForm slug={params.slug} />
        <div className="divider"></div>
        <TopicsBadgeList />
      </div>
    </div>
  );
}

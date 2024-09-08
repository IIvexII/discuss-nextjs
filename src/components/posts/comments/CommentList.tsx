import { db } from "@/db";
import Image from "next/image";

export default async function CommentList({ postId }: { postId: string }) {
  const comments = await db.comment.findMany({
    where: {
      postId: postId,
    },
    include: {
      user: { select: { name: true, image: true } },
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold">Comments</h1>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex flex-row gap-2 bg-gray-200 p-4 rounded-lg"
        >
          <Image
            src={comment.user.image as string}
            alt={comment.user.name as string}
            width={32}
            height={32}
            className="rounded-full w-14 h-14"
          />
          <div className="flex flex-col gap-2">
            <p className="text-gray-500">@{comment.user.name}</p>
            <p className="">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

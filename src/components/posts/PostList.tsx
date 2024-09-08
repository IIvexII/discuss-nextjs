import { PostsWithData } from "@/db/queries/fetch-posts";
import { paths } from "@/paths";
import Link from "next/link";

export default async function PostList({ posts }: { posts: PostsWithData[] }) {
  return (
    <div className="flex flex-col gap-2 mt-6">
      {posts.map((post) => (
        <Link
          key={post.id}
          className="relative border border-gray-200 rounded-lg py-3 px-6"
          href={paths.showPost(post.topic.slug, post.id)}
        >
          <h2 className="text-lg font-bold">{post.title}</h2>
          <div className="flex gap-8 text-xs text-gray-500 mt-2">
            <p className="">By {post.user.name}</p>
            <p className="">{post._count.comments} comments</p>
          </div>
          <p className="absolute top-4 right-4 badge badge-warning px-4 py-3">
            {post.topic.slug}
          </p>
        </Link>
      ))}
    </div>
  );
}

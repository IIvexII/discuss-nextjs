import { db } from "@/db";
import TopicsBadgeList from "@/components/topics/topicsBadgeList";
import CreatePostForm from "@/components/form/create-post-form";
import { notFound } from "next/navigation";
import { fetchPostsByTopic } from "@/db/queries/fetch-posts";
import PostList from "@/components/posts/PostList";

interface TopicPageProps {
  params: { slug: string };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const topic = await db.topic.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!topic) {
    notFound();
  }

  return (
    <div className="grid grid-cols-4 gap-4 mt-4 px-16">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold">{params.slug}</h1>

        <PostList posts={await fetchPostsByTopic(params.slug)} />
      </div>
      <div className="col-span-1 flex flex-col border border-gray-300 rounded px-4 py-6">
        <CreatePostForm slug={params.slug} />
        <div className="divider"></div>
        <h1 className="text-2xl font-bold mb-4">Topics</h1>
        <TopicsBadgeList />
      </div>
    </div>
  );
}

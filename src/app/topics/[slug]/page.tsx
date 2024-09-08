import { db } from "@/db";
import Link from "next/link";
import { paths } from "@/paths";

interface TopicPageProps {
  params: { slug: string };
}

export default async function TopicPage({ params }: TopicPageProps) {
  console.log(params);
  const topic = await db.topic.findUnique({
    where: {
      slug: params.slug,
    },
  });

  const topics = await db.topic.findMany();

  const renderTopics = topics.map((topic) => {
    return (
      <Link
        key={topic.id}
        href={paths.showTopic(topic.slug)}
        className="badge badge-warning p-4"
      >
        {topic.slug}
      </Link>
    );
  });
  return (
    <div className="grid grid-cols-4 gap-4 mt-4 px-16">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold">{topic?.slug}</h1>
      </div>
      <div className="col-span-1 flex flex-col border border-gray-300 rounded px-4 py-6">
        <button type="submit" className="btn btn-neutral w-full">
          Create Post
        </button>
        <div className="divider"></div>
        <h1 className="text-2xl font-bold mb-4">Topics</h1>
        <div className="flex flex-row flex-wrap gap-2">{renderTopics}</div>
      </div>
    </div>
  );
}

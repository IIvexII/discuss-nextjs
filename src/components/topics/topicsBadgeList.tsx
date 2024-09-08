import { db } from "@/db";
import Link from "next/link";
import { paths } from "@/paths";

export default async function TopicsBadgeList() {
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

  return <div className="flex flex-row flex-wrap gap-2">{renderTopics}</div>;
}

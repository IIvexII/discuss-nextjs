import CreateTopicForm from "@/components/form/create-topic-form";
import PostList from "@/components/posts/PostList";
import TopicsBadgeList from "@/components/topics/topicsBadgeList";
import { fetchTopPosts } from "@/db/queries/fetch-posts";

export default async function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 mx-16 mt-8">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold">Top Posts</h1>
        <PostList posts={await fetchTopPosts()} />
      </div>
      <div className="col-span-1 border border-gray-300 rounded px-4 py-6 self-start">
        <CreateTopicForm />
        <div className="divider"></div>
        <TopicsBadgeList />
      </div>
    </div>
  );
}

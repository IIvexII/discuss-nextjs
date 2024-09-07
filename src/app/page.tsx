import CreateTopicForm from "@/components/topics/create-topic-form";

export default async function Home() {
  return (
    <div className="grid grid-cols-4 mx-16 mt-8">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold">Top Posts</h1>
      </div>
      <div className="col-span-1">
        <CreateTopicForm />
      </div>
    </div>
  );
}

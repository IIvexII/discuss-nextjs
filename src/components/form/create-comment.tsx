"use client";

import { useFormState } from "react-dom";
import { createComment } from "@/actions/create-comment";
import SubmitButton from "./submit-button";

interface CreateCommentProps {
  postId: string;
}
export default function CreateComment({ postId }: CreateCommentProps) {
  const [formState, action] = useFormState(createComment.bind(null, postId), {
    error: {
      content: [""],
    },
  });

  return (
    <form className="mt-4 flex flex-col gap-4" action={action}>
      <textarea
        placeholder="Reply to this post"
        name="content"
        className="textarea textarea-bordered w-full bg-gray-50 focus:ring-0 focus:outline-none"
      ></textarea>
      {/* error */}
      {formState && "content" in formState.error && formState.error.content && (
        <div className="text-red-500">{formState.error.content.join(", ")}</div>
      )}
      <SubmitButton text="Comment" className="w-24" />
    </form>
  );
}

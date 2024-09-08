"use client";
import { createTopic } from "@/actions/create-topic";
import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import SubmitButton from "@/components/form/submit-button";

export default function CreateTopicForm() {
  const [formState, action] = useFormState(createTopic, { error: {} });
  const { data: session } = useSession();

  if (!session) {
    return (
      <div
        tabIndex={0}
        role="button"
        className="btn btn-neutral w-full"
        onClick={() => signIn()}
      >
        Login to create a topic
      </div>
    );
  }

  return (
    <div>
      <div className="dropdown dropdown-left w-full">
        <div tabIndex={0} role="button" className="btn btn-neutral w-full">
          Create Topic
        </div>
        <div
          tabIndex={0}
          className="dropdown-content mr-4 menu bg-base-100 rounded-box z-[1] w-96 px-8 py-6 shadow border border-neutral-content"
        >
          <h1 className="text-2xl font-bold text-center">Create Topic</h1>
          <div className="divider my-0"></div>
          <form className="space-y-4 mb-4" action={action}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Topic Name</span>
              </label>
              <input
                name="title"
                type="text"
                placeholder="Topic Name"
                className="input input-bordered"
              />
              {formState?.error?.title && (
                <div className="text-sm bg-red-200 border border-red-400 px-4 py-1 rounded-lg mt-2">
                  <span>{formState.error.title.join(", ")}</span>
                </div>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Topic Description</span>
              </label>
              <textarea
                name="description"
                className="textarea textarea-bordered"
                placeholder="Topic Description"
              ></textarea>
              {formState?.error?.description && (
                <div className="text-sm bg-red-200 border border-red-400 px-4 py-1 rounded-lg mt-2">
                  <span>{formState.error.description.join(", ")}</span>
                </div>
              )}
            </div>

            {formState?.error?._form && (
              <div className="text-sm bg-red-200 border border-red-400 px-4 py-1 rounded-lg mt-2">
                <span>{formState.error._form.join(", ")}</span>
              </div>
            )}
            <SubmitButton text="Create Topic" />
          </form>
        </div>
      </div>
    </div>
  );
}

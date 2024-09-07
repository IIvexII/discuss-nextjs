"use client";
import { createTopic } from "@/actions/create-topic";
import { useFormStatus, useFormState } from "react-dom";

export default function CreateTopicForm() {
  const [formState, action] = useFormState(createTopic, { error: {} });

  return (
    <div>
      <div className="dropdown dropdown-left w-full">
        <div tabIndex={0} role="button" className="btn btn-neutral w-full">
          Create Topic
        </div>
        <div
          tabIndex={0}
          className="dropdown-content mr-4 menu bg-base-100 rounded-box z-[1] w-80 px-8 py-6 shadow border border-neutral-content"
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
              {formState.error.title && (
                <div className="bg-red-200 border border-red-400 px-4 py-1 rounded-lg mt-2">
                  <span>{formState.error.title[0]}</span>
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
              {formState.error.description && (
                <div className="bg-red-200 border border-red-400 px-4 py-1 rounded-lg mt-2">
                  <span>{formState.error.description[0]}</span>
                </div>
              )}
            </div>
            <button className="btn btn-neutral w-full" type="submit">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

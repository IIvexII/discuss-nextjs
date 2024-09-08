"use client";
import { useFormStatus } from "react-dom";
export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`btn btn-neutral w-full ${pending ? "btn-disabled" : ""}`}
    >
      {pending ? <span className="loading loading-spinner"></span> : "Create"}
    </button>
  );
}

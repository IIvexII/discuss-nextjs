"use client";
import { useFormStatus } from "react-dom";
export default function SubmitButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`btn btn-neutral w-full ${
        pending ? "btn-disabled" : ""
      } ${className}`}
    >
      {pending ? <span className="loading loading-spinner"></span> : text}
    </button>
  );
}

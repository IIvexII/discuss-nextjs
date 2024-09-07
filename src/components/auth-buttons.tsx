"use client";
import { signIn, signOut } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="flex flex-row gap-4">
      <button
        className="btn btn-neutral"
        type="submit"
        onClick={() => signIn("github")}
      >
        Login with GitHub
      </button>
      <button className="btn" type="submit" onClick={() => signIn("github")}>
        Sign up
      </button>
    </div>
  );
}

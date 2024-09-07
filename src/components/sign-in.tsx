"use client";

// import * as actions from "@/actions";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <button type="submit" onClick={() => signIn("github")}>
      Signin with GitHub
    </button>
  );
}

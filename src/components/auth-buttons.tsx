"use client";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@nextui-org/react";

export default function SignIn() {
  return (
    <>
      <Button type="submit" onClick={() => signIn("github")}>
        Signin with GitHub
      </Button>
      <Button type="submit" onClick={() => signOut()}>
        Signout
      </Button>
    </>
  );
}

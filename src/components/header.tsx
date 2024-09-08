"use client";

import { useSession } from "next-auth/react";
import AuthButtons from "./auth-buttons";
import AvatarWithDropdown from "@/components/avatar-with-dropdown";
import Link from "next/link";

export default function Header() {
  const session = useSession();

  //   Render auth or avatar
  let renderAuthOrAvatar;
  if (session?.status === "loading") {
    renderAuthOrAvatar = (
      <span className="loading loading-spinner loading-md"></span>
    );
  } else if (session?.status === "authenticated") {
    renderAuthOrAvatar = (
      <AvatarWithDropdown image={session.data.user?.image || ""} />
    );
  } else {
    renderAuthOrAvatar = <AuthButtons />;
  }

  //   Render header
  return (
    <div className="navbar bg-base-100 px-12 py-4 flex flex-row items-center justify-between border-b border-gray-200">
      {/* Logo */}
      <Link href="/" className="">
        <p className="btn btn-ghost text-xl">DISCUSS</p>
      </Link>
      {/* Search bar */}
      <div className="">
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <kbd className="kbd kbd-sm">⌘</kbd>
          <kbd className="kbd kbd-sm">K</kbd>
        </label>
      </div>
      <div>{renderAuthOrAvatar}</div>
    </div>
  );
}

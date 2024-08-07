"use client";

// TODO: use server component to signout

import { Button } from "@components/ui/button";
import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";
export default function SignOutButton() {
  return (
    <div className="cursor-pointer" onClick={() => signOut()}>
      Sign Out
    </div>
  );
}

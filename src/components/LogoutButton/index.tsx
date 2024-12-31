"use client";

import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  async function handleLogout() {
    await signOut({
      redirect: false,
    });

    try {
      redirect("/");
    } catch {}
  }

  return <Button onClick={handleLogout}>Logout</Button>;
}

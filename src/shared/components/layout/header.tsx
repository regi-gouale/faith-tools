"use client";

import { UserButton, useUser } from "@stackframe/stack";
import { useTheme } from "next-themes";
import { Logo } from "../icons/logo";

export default function HandlerHeader() {
  const user = useUser();
  const { theme, setTheme } = useTheme();

  return (
    <>
      <header className="fixed z-50 flex h-14 w-full items-center justify-between border-b bg-background p-4">
        <Logo link={user ? "/dashboard" : "/"} />
        <div className="flex items-center justify-end gap-5">
          <UserButton
            colorModeToggle={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
          />
        </div>
      </header>
      <div className="min-h-14" />
    </>
  );
}

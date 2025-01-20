"use client";

import { UserButton, useUser } from "@stackframe/stack";
import { useTheme } from "next-themes";
import { Logo } from "../icons/logo";

export default function HandlerHeader() {
  const user = useUser();
  const { theme, setTheme } = useTheme();

  return (
    <>
      <header className="fixed w-full z-50 p-4 h-14 flex items-center border-b justify-between bg-background">
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

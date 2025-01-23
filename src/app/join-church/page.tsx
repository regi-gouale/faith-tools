"use client";

import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

export default function JoinChurchPage() {
  const router = useRouter();

  const user = useUser({ or: "redirect" });

  const [teamDisplayName, setTeamDisplayName] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await user.createTeam({ displayName: teamDisplayName });
      router.push("/dashboard");
    } catch (error) {
      toast.error(`Failed to create team. Please try again later. \n${error}`);
    }
  };
  return (
    <div className="flex min-h-[calc(100vh-256px)] w-screen items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-center text-2xl font-semibold">Bienvenue !</h1>
        <p className="text-center text-muted-foreground">
          Créez une église ou réjoignez-en une pour commencer
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={teamDisplayName}
            onChange={(e) => setTeamDisplayName(e.target.value)}
            placeholder="Nom de l'église"
            className="mt-4 w-full rounded border p-2"
          />
          <button type="submit" className="mt-4 w-full rounded">
            Créer une église
          </button>
        </form>
      </div>
    </div>
  );
}

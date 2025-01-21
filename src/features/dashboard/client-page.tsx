"use client";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function ClientPage() {
  const router = useRouter();
  const user = useUser({
    or: "redirect",
  });
  const teams = user.useTeams();
  const [teamDisplayName, setTeamDisplayName] = useState("");

  useEffect(() => {
    if (teams.length > 0 && !user.selectedTeam) {
      user.setSelectedTeam(teams[0]);
    }
  }, [teams, user]);

  if (teams.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="max-w-xs w-full">
          <h1 className="text-center text-2xl font-semibold">Bienvenue !</h1>
          <p className="text-center text-gray-500">
            Créez une église ou réjoignez-en une pour commencer
          </p>
          <form
            className="mt-4"
            onSubmit={(e) => {
              e.preventDefault();
              user.createTeam({ displayName: teamDisplayName });
            }}
          >
            <div>
              <Label className="text-sm">Nom de l'église</Label>
              <Input
                placeholder="Nom de l'église"
                value={teamDisplayName}
                onChange={(e) => setTeamDisplayName(e.target.value)}
              />
            </div>
            <Button className="mt-4 w-full">Créer l'église</Button>
          </form>
        </div>
      </div>
    );
  } else if (user.selectedTeam) {
    router.push(`/dashboard/${user.selectedTeam.id}`);
  }

  return null;
}

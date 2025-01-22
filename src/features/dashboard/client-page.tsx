"use client";

import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ClientPage() {
  const router = useRouter();
  const user = useUser({ or: "redirect" });
  const teams = user.useTeams();

  if (teams.length < 1) {
    router.push("/join-church");
  }

  useEffect(() => {
    async function setTeam() {
      if (teams.length >= 1 && !user.selectedTeam) {
        await user.setSelectedTeam(teams[0]);
      }
    }
    setTeam().catch((error) => {
      alert(`Failed to set team. Please try again later. \n${error}`);
    });
  }, [teams, user]);

  if (user.selectedTeam && teams.length >= 1) {
    router.push(`/dashboard/${user.selectedTeam.id}`);
  }

  return null;
  // const router = useRouter();
  // const user = useUser({
  //   or: "redirect",
  // });
  // const teams = user.useTeams();
  // const [teamDisplayName, setTeamDisplayName] = useState("");

  // useEffect(() => {
  //   async function setTeam() {
  //     if (teams.length > 0 && !user.selectedTeam) {
  //       await user.setSelectedTeam(teams[0]);
  //       setTeamDisplayName(teams[0].displayName);
  //     }
  //   }
  //   setTeam().catch((error) => {
  //     // Handle the error appropriately, e.g., log to an external service or show a user-friendly message
  //     alert(`Failed to set team. Please try again later. \n${error}`);
  //   });
  // }, [teams, user]);

  // useEffect(() => {
  //   if (teams.length === 0) {
  //     setTeamDisplayName("Eglise de la grace");
  //   }
  // }, [teams]);

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {
  //     await user.createTeam({ displayName: teamDisplayName });
  //   } catch (error) {
  //     alert(`Failed to create team. Please try again later. \n${error}`);
  //   }
  // };

  // if (user.selectedTeam) {
  //   router.push(`/dashboard/${user.selectedTeam.id}`);
  // }

  // if (teams.length === 0) {
  //   return (
  //     <div className="flex h-screen w-screen items-center justify-center">
  //       <div className="w-full max-w-xs">
  //         <h1 className="text-center text-2xl font-semibold">Bienvenue !</h1>
  //         <p className="text-center text-gray-500">
  //           Créez une église ou réjoignez-en une pour commencer
  //         </p>
  //         <form className="mt-4" onSubmit={handleSubmit}>
  //           <div>
  //             <Label className="text-sm">Nom de l'église</Label>
  //             <Input
  //               placeholder="Nom de l'église"
  //               value={teamDisplayName}
  //               onChange={(e) => setTeamDisplayName(e.target.value)}
  //             />
  //           </div>
  //           <Button className="mt-4 w-full">Créer l'église</Button>
  //         </form>
  //       </div>
  //     </div>
  //   );
  // }

  // return null;
}

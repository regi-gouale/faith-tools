import { stackServerApp } from "@/features/auth/stack";
import { MemberForm } from "@/features/members/member-form";
import { prisma } from "@/shared/lib/prisma";
import type { Member } from "@prisma/client";
import type { Team } from "@stackframe/stack";

type MemberIdPageProps = Promise<{
  memberId: string;
}>;

export default async function MemberIdPage(props: {
  params: MemberIdPageProps;
}) {
  const user = await stackServerApp.getUser({ or: "redirect" });
  if (!user.selectedTeam) return <div>Chargement en cours ...</div>;

  const team = (await user.getTeam(user.selectedTeam.id)) as Team;

  const { memberId } = await props.params;

  if (!memberId) return <div>Chargement en cours ...</div>;

  const member: Member | null = await prisma.member.findUnique({
    where: { id: memberId },
  });

  if (!member) return <div>Membre introuvable</div>;

  const permissions = await user.listPermissions(team);

  // Check if

  return (
    <>
      <div className="min-h-[calc(100vh-256px)] flex-col items-center">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            {member.fullname}
          </h2>
        </div>
        <div className="mx-auto flex w-full flex-col space-y-4">
          <div className="mx-4 space-y-2 rounded-xl p-2">
            <div>
              <div className="text-justify text-muted-foreground md:text-center">
                Voici les informations de {member.fullname} qui est membre de
                l'église {team.displayName}
              </div>
            </div>
            <div>
              <MemberForm member={member} mode={"view"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

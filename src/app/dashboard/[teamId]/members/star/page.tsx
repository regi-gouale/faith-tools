import { MembersTable } from "@/features/members/members-table";
import { prisma } from "@/shared/lib/prisma";
import { Member, MemberStatus } from "@prisma/client";
import { headers } from "next/headers";

export default async function StarMembersPage() {
  const heads = await headers();
  const pathname = heads.get("x-url");
  const splittedPathname = pathname!.split("/");
  const teamId = splittedPathname[2];

  const allOrganizationsStarMembers: Member[] = await prisma.member.findMany({
    where: {
      churchId: teamId,
      NOT: {
        status: MemberStatus.MEMBER,
      },
    },
  });

  return (
    <>
      <div className="flex-col min-h-[calc(100vh-256px)]">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Liste des STAR
            </h2>
          </div>
          <MembersTable
            members={JSON.parse(JSON.stringify(allOrganizationsStarMembers))}
          />
        </div>
      </div>
    </>
  );
}

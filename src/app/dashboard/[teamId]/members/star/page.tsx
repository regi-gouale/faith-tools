import { MembersTable } from "@/features/members/members-table";
import { prisma } from "@/shared/lib/prisma";
import { type Member, MemberStatus } from "@prisma/client";
import { headers } from "next/headers";

export default async function StarMembersPage() {
  const heads = await headers();
  const pathname = heads.get("x-url");
  if (!pathname) {
    return (
      <>
        <div className="flex h-full items-center justify-center">
          <p className="flex text-lg font-semibold text-gray-500">
            {JSON.stringify(heads)}
          </p>
        </div>
      </>
    );
  }
  const splittedPathname = pathname.split("/");
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
      <div className="min-h-[calc(100vh-256px)] flex-col">
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

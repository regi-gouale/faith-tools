import { stackServerApp } from "@/features/auth/stack";
import { MembersTable } from "@/features/members/members-table";
import { prisma } from "@/shared/lib/prisma";
import { type Member } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function AllMembersPage() {
  const user = await stackServerApp.getUser();

  if (!user) return null;
  if (!user.selectedTeam) return null;
  const teamId = user.selectedTeam.id;

  const allOrganizationsMembers: Member[] = await prisma.member.findMany({
    where: {
      churchId: teamId,
    },
    orderBy: {
      lastname: "asc",
    },
  });

  return (
    <>
      <div className="min-h-[calc(100vh-256px)] flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Tous les membres
            </h2>
            <Link
              href={`/dashboard/${teamId}/members/add`}
              className="inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded-full border bg-primary p-2 font-medium text-primary-foreground shadow-md transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 md:rounded-xl md:px-4 md:py-2"
            >
              <PlusIcon className="size-4 text-primary-foreground" />
              <span className="hidden md:block">Membre</span>
            </Link>
          </div>
          <MembersTable
            members={JSON.parse(JSON.stringify(allOrganizationsMembers))}
          />
        </div>
      </div>
    </>
  );
}

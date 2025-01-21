import { MembersTable } from "@/features/members/members-table";
import { prisma } from "@/shared/lib/prisma";
import { Member } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export default async function AllMembersPage() {
  const heads = await headers();
  const pathname = heads.get("x-url");
  const splittedPathname = pathname!.split("/");
  const teamId = splittedPathname[2];
  // "e736186a-7b40-4d88-84ba-ad80bd42a51d"

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
      <div className="flex-col min-h-[calc(100vh-256px)]">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Tous les membres
            </h2>
            <Link
              href={""}
              className="inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded-full md:rounded-xl border bg-primary p-2 md:px-4 md:py-2 font-medium text-primary-foreground shadow-md transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
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

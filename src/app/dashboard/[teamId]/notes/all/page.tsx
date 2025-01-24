import { stackServerApp } from "@/features/auth/stack";
import { NotesTable } from "@/features/notes/notes-table";
import { prisma } from "@/shared/lib/prisma";
import type { Notes } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function AllNotesPage() {
  const user = await stackServerApp.getUser();

  if (!user) return null;
  if (!user.selectedTeam) return null;
  const teamId = user.selectedTeam.id;

  const permission = await user.getPermission(user.selectedTeam, "admin");

  let allOrganizationNotes: Notes[];

  if (permission) {
    allOrganizationNotes = await prisma.notes.findMany({
      where: {
        churchId: teamId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    allOrganizationNotes = await prisma.notes.findMany({
      where: {
        churchId: teamId,
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return (
    <>
      <div className="min-h-[calc(100vh-256px)] flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Toutes les notes d'entretiens
            </h2>
            <Link
              href={`/dashboard/${teamId}/notes/add`}
              className="inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded-full border bg-primary p-2 font-medium text-primary-foreground shadow-md transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 md:rounded-xl md:px-4 md:py-2"
            >
              <PlusIcon className="size-4 text-primary-foreground" />
              <span className="hidden md:block">Note</span>
            </Link>
          </div>
          <NotesTable
            notes={JSON.parse(JSON.stringify(allOrganizationNotes))}
          />
        </div>
      </div>
    </>
  );
}

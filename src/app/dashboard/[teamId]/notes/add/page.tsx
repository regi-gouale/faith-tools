import { stackServerApp } from "@/features/auth/stack";
import { NoteForm } from "@/features/notes/note-form";
import { prisma } from "@/shared/lib/prisma";
import type { Member } from "@prisma/client";

export default async function AddMemberPage() {
  const user = await stackServerApp.getUser();
  if (!user) return null;
  if (!user.selectedTeam) return null;
  const teamId = user.selectedTeam.id;

  const allMembers: Member[] = await prisma.member.findMany({
    where: { churchId: teamId },
    orderBy: { lastname: "asc" },
  });

  return (
    <>
      <div className="min-h-[calc(100vh-256px)] flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Ajouter une note
          </h2>
          <div>
            <NoteForm members={allMembers} mode="add" />
          </div>
        </div>
      </div>
    </>
  );
}

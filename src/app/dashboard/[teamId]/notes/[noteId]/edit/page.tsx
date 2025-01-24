import { stackServerApp } from "@/features/auth/stack";
import { NoteForm } from "@/features/notes/note-form";
import { prisma } from "@/shared/lib/prisma";
import type { Notes } from "@prisma/client";
import type { Team } from "@stackframe/stack";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type NoteIdPageProps = Promise<{
  noteId: string;
}>;

export default async function EditNotePage(props: { params: NoteIdPageProps }) {
  const user = await stackServerApp.getUser({ or: "redirect" });
  if (!user.selectedTeam) return <div>Chargement en cours ...</div>;

  const team = (await user.getTeam(user.selectedTeam.id)) as Team;
  const { noteId } = await props.params;

  if (!noteId) return <div>Chargement en cours ...</div>;
  const note: Notes | null = await prisma.notes.findUnique({
    where: { id: noteId },
  });
  const members = await prisma.member.findMany({
    where: { churchId: team.id },
  });

  if (!note) return <div>Compte-rendu introuvable</div>;

  return (
    <>
      <div className="min-h-[calc(100vh-256px)] flex-col items-center">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Entretien avec {note.memberFullname}
          </h2>
        </div>
        <div className="mx-auto flex w-full flex-col space-y-4">
          <div className="mx-4 space-y-2 rounded-xl p-2">
            <div>
              <div className="text-justify text-muted-foreground md:text-center">
                Voici le compte-rendu de l'entretien effectué avec{" "}
                {note.memberFullname} le{" "}
                {format(note.noteDate, "PPP", { locale: fr })}.
              </div>
            </div>
            <div>
              <NoteForm mode={"edit"} members={members} note={note} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

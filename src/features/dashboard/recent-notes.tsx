import { Badge } from "@/shared/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { stackServerApp } from "../auth/stack";
import { getRecentNotes } from "./actions";

export async function RecentNotes() {
  const user = await stackServerApp.getUser({ or: "redirect" });
  if (!user.selectedTeam) return null;
  const teamId = user.selectedTeam.id;

  const isAdmin = await user.getPermission(user.selectedTeam, "admin");

  const notes = await getRecentNotes(
    user.id,
    teamId,
    isAdmin ? "admin" : "member"
  );

  return (
    <div className="space-y-8">
      {notes.map((note) => (
        <div className="flex items-center" key={note.id}>
          <Avatar className="size-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>
              {note.memberFullname
                ? note.memberFullname.slice(0, 2).toLocaleUpperCase()
                : "NA"}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {note.memberFullname}
            </p>
            <p className="text-sm text-muted-foreground">
              {format(note.noteDate, "PPP", { locale: fr })}
            </p>
          </div>
          <Badge className="ml-auto font-medium">{note.type}</Badge>
        </div>
      ))}
    </div>
  );
}

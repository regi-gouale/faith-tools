import { Member } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@ui/button";
import { formatDistanceToNowStrict } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowUpDown } from "lucide-react";

export const membersTableColumns: ColumnDef<Member>[] = [
  {
    id: "Prénom & Nom",
    accessorKey: "fullname",
    header: ({ column }) => (
      <div className="ml-1 flex items-center justify-start text-primary">
        <span className="text-sm font-semibold truncate">Prénom & Nom</span>
        <Button
          className="ml-0"
          variant="ghost"
          size="icon"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          <ArrowUpDown />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const member = row.original as Member;

      return (
        <div className="ml-1 text-left text-sm truncate">
          {member.firstname} {member.lastname.toLocaleUpperCase()}
        </div>
      );
    },
  },
  {
    id: "Email",
    accessorKey: "email",
    header: () => (
      <div className="flex items-center justify-start text-primary text-sm truncate">
        E-Mail
      </div>
    ),
    cell: (row) => (
      <div className="text-sm truncate text-left">
        {row.getValue() as string}
      </div>
    ),
  },
  {
    id: "Téléphone",
    accessorKey: "phone",
    header: () => (
      <div className="flex items-center justify-start text-primary text-sm truncate">
        Téléphone
      </div>
    ),
    cell: (row) => (
      <div className="text-sm text-left">{row.getValue() as string}</div>
    ),
  },
  {
    id: "Statut Membre",
    accessorKey: "status",
    header: () => (
      <div className="flex items-center justify-start text-primary text-sm truncate">
        Statut
      </div>
    ),
    cell: ({ row }) => {
      const member = row.original;
      switch (member.status) {
        case "MEMBER":
          return <div className="text-sm text-left">Membre</div>;
        case "AIDE":
          return <div className="text-sm text-left">Aide</div>;
        case "ASSISTANT_PASTOR":
          return <div className="text-sm text-left">Assistant Pasteur</div>;
        case "PASTOR":
          return <div className="text-sm text-left">Pasteur</div>;
        case "MINISTER":
          return <div className="text-sm text-left">Ministre</div>;
        case "RESPONSIBLE":
          return <div className="text-sm text-left">Responsable</div>;
        case "STAR":
          return <div className="text-sm text-left">Star</div>;
      }
    },
  },
  {
    id: "Age",
    header: () => <div className="text-sm text-primary">Age</div>,
    cell: ({ row }) => {
      const member = row.original;
      const age = formatDistanceToNowStrict(member.dateOfBirth, { locale: fr });
      return <div className="text-sm text-primary">{age}</div>;
    },
  },
];

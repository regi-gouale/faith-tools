import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import type { Notes } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const notesTableColumns: ColumnDef<Notes>[] = [
  {
    id: "Prénom & Nom",
    accessorKey: "memberFullname",
    header: ({ column }) => (
      <div className="ml-1 flex items-center justify-start text-primary">
        <span className="truncate text-sm font-semibold">Prénom & Nom</span>
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
      const note = row.original as Notes;

      return (
        <div className="ml-1 truncate text-left text-sm">
          {note.memberFullname}
        </div>
      );
    },
  },
  {
    id: "Type",
    accessorKey: "type",
    header: () => (
      <div className="flex items-center justify-start truncate text-sm text-primary">
        Type
      </div>
    ),
    cell: (row) => (
      <div className="truncate text-left text-sm">
        <Badge>{row.getValue() as string}</Badge>
      </div>
    ),
  },
  {
    id: "Raison",
    accessorKey: "reason",
    header: () => (
      <div className="flex items-center justify-start truncate text-sm text-primary">
        Raison
      </div>
    ),
    cell: (row) => (
      <div className="text-left text-sm">{row.getValue() as string}</div>
    ),
  },
  {
    id: "Date de l'entretien",
    accessorKey: "noteDate",
    header: () => (
      <div className="flex items-center justify-start truncate text-sm text-primary">
        Date de l'entretien
      </div>
    ),
    cell: (row) => (
      <div className="text-left text-sm">
        {new Date(row.getValue() as string).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    ),
  },
  {
    id: "Mis à jour le",
    accessorKey: "updatedAt",
    header: () => (
      <div className="flex items-center justify-start truncate text-sm text-primary">
        Mis à jour le
      </div>
    ),
    cell: (row) => (
      <div className="text-left text-sm">
        {new Date(row.getValue() as string).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    ),
  },
];

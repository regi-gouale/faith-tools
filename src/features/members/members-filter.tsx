import type { Member } from "@prisma/client";
import type { Table } from "@tanstack/react-table";
import { Button } from "@ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { Input } from "@ui/input";
import { ChevronDown } from "lucide-react";

export type MembersTableFilterProps = {
  table: Table<Member>;
};

export const MembersTableFilter = ({ table }: MembersTableFilterProps) => {
  return (
    <div className="font-lato flex items-center justify-between">
      <Input
        placeholder="Rechercher une personne"
        value={table.getColumn("Nom")?.getFilterValue() as string}
        onChange={(event) =>
          table.getColumn("Nom")?.setFilterValue(event.target.value)
        }
        className="mr-4 max-w-md rounded-xl"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="ml-auto rounded-xl border">
            Afficher <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="font-lato"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

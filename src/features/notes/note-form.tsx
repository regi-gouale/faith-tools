"use client";

import { Calendar } from "@/shared/components/ui/calendar";
import { Input } from "@/shared/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Textarea } from "@/shared/components/ui/textarea";
import { cn } from "@/shared/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Member } from "@prisma/client";
import { NoteType } from "@prisma/client";
import { useUser } from "@stackframe/stack";
import { Button } from "@ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { addNote } from "./actions";
import { notesFormSchema } from "./schemas";
// import { addMember, editMember } from "./actions";
// import { memberFormSchema } from "./schemas";

type NoteFormProps = {
  members: Member[];
  mode: "add" | "edit" | "view";
};

export const NoteForm = ({ members, mode = "add" }: NoteFormProps) => {
  const router = useRouter();
  const user = useUser({ or: "redirect" });
  const churchId = user.selectedTeam?.id;

  const form = useForm<z.infer<typeof notesFormSchema>>({
    resolver: zodResolver(notesFormSchema),
    defaultValues: {
      type: NoteType.INTERVIEW,
      reason: "",
      content: "",
      noteDate: new Date(),
      memberFullname: "",
      memberId: "",
      churchId: "",
      userId: "",
    },
  });

  async function onSubmit(data: z.infer<typeof notesFormSchema>) {
    if (!churchId) return;

    data.churchId = churchId;
    data.userId = user.id;
    data.memberFullname =
      members.find((m) => m.id === data.memberId)?.fullname ?? undefined;

    const parse = notesFormSchema.safeParse(data);

    if (!parse.success) {
      toast.error("Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    if (mode === "add") {
      toast.info("Ajout du compte-rendu en cours");
      const result = await addNote(data);
      if (result.ok) {
        toast.success("Compte-rendu ajouté avec succès");
        router.push(`/dashboard/${churchId}/notes/${result.data.id}`);
      } else {
        toast.error(result.error);
      }
    } else if (mode === "edit") {
      toast.info("Modification du compte-rendu en cours");
    } else {
      toast.info("Chargement du compte-rendu en cours");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto mt-8 max-w-2xl gap-2 rounded-xl border p-4 text-muted-foreground shadow-md"
      >
        <FormField
          control={form.control}
          name="memberId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du membre :</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className="rounded-xl"
                    disabled={mode === "view"}
                  >
                    <SelectValue placeholder="Choisir un membre" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {members.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.fullname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type d'entretien :</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className="rounded-xl"
                    disabled={mode === "view"}
                  >
                    <SelectValue placeholder="Choisir un type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(NoteType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="noteDate"
          render={({ field }) => (
            <FormItem className="mt-2 grid grid-cols-8 items-center">
              <FormLabel className="col-span-3 mr-2 md:col-span-2">
                Date de l'entretien :
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl className="col-span-5 md:col-span-6">
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full text-left font-normal rounded-xl col-span-5 md:col-span-6",
                        "text-muted-foreground"
                      )}
                      disabled={mode === "view"}
                    >
                      {format(field.value, "PPP", { locale: fr })}
                      <CalendarIcon className="ml-auto size-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1920-01-01")
                    }
                    captionLayout={"dropdown"}
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                    defaultMonth={field.value}
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem className="mt-2 grid grid-cols-8 items-center">
              <FormLabel className="col-span-2 mr-2 md:col-span-1">
                Raison :
              </FormLabel>
              <FormControl className="col-span-6 md:col-span-7">
                <Input
                  placeholder="Raison de l'entretien"
                  {...field}
                  className="rounded-xl"
                  readOnly={mode === "view"}
                />
              </FormControl>
              <FormMessage className="col-span-8 text-right" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="">Compte-rendus :</FormLabel>
              <FormControl className="">
                <Textarea
                  placeholder="compte-rendus de l'entretien"
                  {...field}
                  className="max-h-80 min-h-40 rounded-xl"
                  // minLength={52}
                  // maxLength={500}
                  readOnly={mode === "view"}
                />
              </FormControl>
              <FormMessage className="" />
            </FormItem>
          )}
        />

        <div className="mt-8 grid grid-cols-2 space-x-4">
          <div></div>
          <Button
            type="submit"
            className="rounded-xl shadow-md"
            variant={mode === "view" ? "outline" : "default"}
          >
            {mode === "add" ? "Ajouter" : "Modifier"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

"use client";

import { MultiSelect } from "@/shared/components/ui/multi-select";
import { cn } from "@/shared/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Member } from "@prisma/client";
import { Gender, MaritalStatus, MemberStatus } from "@prisma/client";
import { useUser } from "@stackframe/stack";
import { Button } from "@ui/button";
import { Calendar } from "@ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { Input } from "@ui/input";
import { PhoneInput } from "@ui/phone-input";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
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
import { departmentList } from "../department/department-list";
import { addMember, editMember } from "./actions";
import { memberFormSchema } from "./schemas";

type MemberFormProps = {
  member?: Member;
  mode: "add" | "edit" | "view";
};

export const MemberForm = ({ member, mode = "add" }: MemberFormProps) => {
  const router = useRouter();
  const user = useUser({ or: "redirect" });
  const churchId = user.selectedTeam?.id;

  const form = useForm<z.infer<typeof memberFormSchema>>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      firstname: member?.firstname ?? "",
      lastname: member?.lastname ?? "",
      fullname: member?.fullname ?? "",
      maritalStatus: member?.maritalStatus ?? MaritalStatus.SINGLE,
      email: member?.email ?? "",
      dateOfBirth: member?.dateOfBirth ?? new Date("2000-01-01"),
      gender: member?.gender ?? Gender.MALE,
      address: member?.address ?? "",
      status: member?.status ?? MemberStatus.MEMBER,
      phone: member?.phone ?? "",
      churchId: member?.churchId ?? churchId,
      departments: member?.departments ?? [],
    },
  });

  async function onSubmit(data: z.infer<typeof memberFormSchema>) {
    if (!churchId) return;

    data.churchId = churchId;
    const parse = memberFormSchema.safeParse(data);

    if (!parse.success) {
      toast.error("Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    if (mode === "add") {
      const result = await addMember(data);

      if (result.ok) {
        toast.success("Membre ajouté avec succès");
        form.reset();
        router.back();
      } else toast.error(result.error);
    } else if (mode === "edit") {
      const result = await editMember(data);

      if (result.ok) {
        toast.success("Membre modifié avec succès");
        router.back();
      }
    } else {
      router.push(`/dashboard/${churchId}/members/${member?.id}/edit`);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto mt-8 max-w-2xl gap-2 rounded-xl border p-4 text-muted-foreground shadow-md"
      >
        <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center">
                <FormLabel className="col-span-1 mr-2 truncate">
                  Prénom :
                </FormLabel>
                <FormControl className="col-span-3">
                  <Input
                    placeholder="Prénom"
                    {...field}
                    className="rounded-xl"
                    readOnly={mode === "view"}
                  />
                </FormControl>
                <FormMessage className="col-span-4 text-right" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center">
                <FormLabel className="col-span-1 mr-2 md:text-right">
                  Nom :
                </FormLabel>
                <FormControl className="col-span-3">
                  <Input
                    placeholder="Nom"
                    {...field}
                    className="rounded-xl"
                    readOnly={mode === "view"}
                  />
                </FormControl>
                <FormMessage className="col-span-4 text-right" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-2 grid grid-cols-8 items-center">
              <FormLabel className="col-span-2 mr-2 md:col-span-1">
                E-Mail :
              </FormLabel>
              <FormControl className="col-span-6 md:col-span-7">
                <Input
                  placeholder="E-mail"
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
          name="address"
          render={({ field }) => (
            <FormItem className="mt-2 grid grid-cols-8 items-center">
              <FormLabel className="col-span-2 mr-2 md:col-span-1">
                Adresse :
              </FormLabel>
              <FormControl className="col-span-6 md:col-span-7">
                <Input
                  placeholder="Adresse complète"
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
          name="phone"
          render={({ field }) => (
            <FormItem className="mt-2 grid grid-cols-8 items-center">
              <FormLabel className="col-span-2 mr-2 md:col-span-1">
                N° Tél :
              </FormLabel>
              <FormControl className="col-span-6 md:col-span-7">
                <PhoneInput
                  placeholder="+33 6 12 34 57 89"
                  {...field}
                  className="rounded-xl"
                  readOnly={mode === "view"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="mt-2 grid grid-cols-8 items-center">
              <FormLabel className="col-span-3 mr-2 md:col-span-2">
                Date de naissance :
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
        <div className="mt-4 grid grid-cols-2 space-x-4">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sexe :</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className="rounded-xl"
                      disabled={mode === "view"}
                    >
                      <SelectValue placeholder="Choisir un sexe" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Gender.MALE}>Homme</SelectItem>
                    <SelectItem value={Gender.FEMALE}>Femme</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maritalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Situation Conjugale :</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className="rounded-xl"
                      disabled={mode === "view"}
                    >
                      <SelectValue placeholder="Choisir un sexe" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={MaritalStatus.SINGLE}>
                      Célibataire
                    </SelectItem>
                    <SelectItem value={MaritalStatus.MARRIED}>
                      Marié(e)
                    </SelectItem>
                    <SelectItem value={MaritalStatus.DIVORCED}>
                      Divorcé(e)
                    </SelectItem>
                    <SelectItem value={MaritalStatus.WIDOWED}>
                      Veuf(ve)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="mt-2 grid grid-cols-8 items-center">
              <FormLabel className="col-span-3 mr-2 md:col-span-2">
                Type de Membre :
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="col-span-5 md:col-span-6">
                  <SelectTrigger
                    className="rounded-xl"
                    disabled={mode === "view"}
                  >
                    <SelectValue placeholder="Choisir un sexe" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={MemberStatus.MEMBER}>Membre</SelectItem>
                  <SelectItem value={MemberStatus.AIDE}>AIDE</SelectItem>
                  <SelectItem value={MemberStatus.STAR}>STAR</SelectItem>
                  <SelectItem value={MemberStatus.RESPONSIBLE}>
                    Responsable de département
                  </SelectItem>
                  <SelectItem value={MemberStatus.MINISTER}>
                    Responsable de ministère
                  </SelectItem>
                  <SelectItem value={MemberStatus.ASSISTANT_PASTOR}>
                    Assistant Pasteur
                  </SelectItem>
                  <SelectItem value={MemberStatus.PASTOR}>Pasteur</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="departments"
          render={({ field }) => (
            <FormItem className="mt-2 grid grid-cols-8 items-center">
              <FormLabel className="col-span-3 mr-2 md:col-span-2">
                Département(s) :
              </FormLabel>
              <FormControl className="col-span-5 md:col-span-6">
                <MultiSelect
                  options={departmentList}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                  placeholder="Choisir les départements"
                  variant="inverted"
                  maxCount={3}
                  disabled={mode === "view"}
                  {...field}
                />
              </FormControl>
              <FormMessage className="col-span-8 text-right" />
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

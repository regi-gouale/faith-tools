import { NoteType } from "@prisma/client";
import { z } from "zod";

export const notesFormSchema = z.object({
  type: z.nativeEnum(NoteType),
  content: z.string({ required_error: "Le contenu est requis" }).nonempty(),
  reason: z.string().nonempty(),
  noteDate: z.date({ required_error: "La date de l'entretien est requise" }),
  memberFullname: z.string().optional(),

  memberId: z.string().nonempty(),
  churchId: z.string().optional(),
  userId: z.string().optional(),
});

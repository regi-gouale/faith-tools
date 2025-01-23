import { Gender, MaritalStatus, MemberStatus } from "@prisma/client";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const addMemberFormSchema = z.object({
  firstname: z.string({ required_error: "Le prénom est requis" }).min(2, {
    message: "Le prénom doit contenir au moins 2 caractères",
  }),
  lastname: z.string({ required_error: "Le nom est requis" }).min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  fullname: z.string().optional(),
  maritalStatus: z.nativeEnum(MaritalStatus),
  email: z
    .string({
      required_error: "L'email est requis",
      invalid_type_error: "L'email est invalide",
    })
    .email({ message: "L'email est invalide" }),
  phone: z
    .string()
    .refine(isValidPhoneNumber, {
      message: "Le téléphone est invalide",
    })
    .or(z.literal("")),
  dateOfBirth: z.date({
    required_error: "La date de naissance est requise",
    invalid_type_error: "La date de naissance est invalide",
  }),
  gender: z.nativeEnum(Gender),
  status: z.nativeEnum(MemberStatus),

  address: z.string().optional(),
  churchId: z.string(),
});

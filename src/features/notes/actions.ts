"use server";

import { prisma } from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import type { z } from "zod";
import type { notesFormSchema } from "./schemas";

export const addNote = async (data: z.infer<typeof notesFormSchema>) => {
  try {
    const note = await prisma.notes.findFirst({
      where: {
        memberId: data.memberId,
        noteDate: data.noteDate,
        type: data.type,
      },
    });

    if (note) {
      return {
        ok: false,
        error: "Le compte-rendu existe déjà",
        data: JSON.parse(JSON.stringify(note)),
      };
    }

    const member = await prisma.member.findFirst({
      where: { id: data.memberId },
    });
    if (!member) {
      return {
        ok: false,
        error: "La personne n'existe pas",
        data: null,
      };
    }

    const newNote = await prisma.notes.create({
      data: {
        type: data.type,
        content: data.content,
        reason: data.reason,
        noteDate: data.noteDate,

        memberFullname: data.memberFullname ?? "",
        memberId: data.memberId,
        churchId: data.churchId ?? "",
        userId: data.userId ?? "",
      },
    });
    revalidatePath("/");
    return {
      ok: true,
      error: null,
      data: JSON.parse(JSON.stringify(newNote)),
    };
  } catch {
    // console.error("Une erreur est survenue lors de la création de la personne");
    return {
      ok: false,
      error: "Une erreur est survenue lors de la création de la personne",
      data: null,
    };
  }
};

// export const editMember = async (data: z.infer<typeof memberFormSchema>) => {
//   try {
//     const member = await prisma.member.findFirst({
//       where: {
//         email: data.email,
//       },
//     });

//     if (!member) {
//       return {
//         ok: false,
//         error: "La personne n'existe pas",
//         data: null,
//       };
//     }

//     const updatedMember = await prisma.member.update({
//       where: {
//         id: member.id,
//       },
//       data: {
//         firstname: data.firstname,
//         lastname: data.lastname.toLocaleUpperCase(),
//         fullname: `${data.firstname} ${data.lastname.toLocaleUpperCase()}`,
//         maritalStatus: data.maritalStatus,
//         email: data.email,
//         dateOfBirth: data.dateOfBirth,
//         gender: data.gender,
//         address: data.address,
//         status: data.status,
//         phone: data.phone,
//         churchId: data.churchId,
//         departments: data.departments,
//       },
//     });
//     revalidatePath("/");
//     return {
//       ok: true,
//       error: null,
//       data: JSON.parse(JSON.stringify(updatedMember)),
//     };
//   } catch {
//     // console.error("Une erreur est survenue lors de la création de la personne");
//     return {
//       ok: false,
//       error: "Une erreur est survenue lors de la modification de la personne",
//       data: null,
//     };
//   }
// };

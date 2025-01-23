"use server";

import { prisma } from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import type { z } from "zod";
import type { addMemberFormSchema } from "./schemas";

export const addMember = async (data: z.infer<typeof addMemberFormSchema>) => {
  try {
    const member = await prisma.member.findFirst({
      where: {
        email: data.email,
      },
    });

    if (member) {
      return {
        ok: false,
        error: "La personne existe déjà",
        data: JSON.parse(JSON.stringify(member)),
      };
    }

    const newMember = await prisma.member.create({
      data: {
        firstname: data.firstname,
        lastname: data.lastname.toLocaleUpperCase(),
        fullname: `${data.firstname} ${data.lastname.toLocaleUpperCase()}`,
        maritalStatus: data.maritalStatus,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        address: data.address,
        status: data.status,
        phone: data.phone,
        churchId: data.churchId,
      },
    });
    revalidatePath("/");
    return {
      ok: true,
      error: null,
      data: JSON.parse(JSON.stringify(newMember)),
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

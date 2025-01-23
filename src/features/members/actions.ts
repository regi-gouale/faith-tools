"use server";

import { prisma } from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import type { z } from "zod";
import type { memberFormSchema } from "./schemas";

export const addMember = async (data: z.infer<typeof memberFormSchema>) => {
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

export const editMember = async (data: z.infer<typeof memberFormSchema>) => {
  try {
    const member = await prisma.member.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!member) {
      return {
        ok: false,
        error: "La personne n'existe pas",
        data: null,
      };
    }

    const updatedMember = await prisma.member.update({
      where: {
        id: member.id,
      },
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
      data: JSON.parse(JSON.stringify(updatedMember)),
    };
  } catch {
    // console.error("Une erreur est survenue lors de la création de la personne");
    return {
      ok: false,
      error: "Une erreur est survenue lors de la modification de la personne",
      data: null,
    };
  }
};

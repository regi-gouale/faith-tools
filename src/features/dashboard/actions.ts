"use server";

import { prisma } from "@/shared/lib/prisma";
import { MemberStatus } from "@prisma/client";

export const getNumberOfMembers = async (churchId: string) => {
  const members = await prisma.member.findMany({
    where: { churchId },
  });
  return members.length;
};

export async function getNumberOfMembersCreatedThisMonth(churchId: string) {
  const members = await prisma.member.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
      churchId: churchId,
    },
  });
  return members.length;
}

export async function getNumberOfNotes(churchId: string) {
  const notes = await prisma.notes.findMany({
    where: {
      churchId,
    },
  });
  return notes.length;
}

export async function getNumberOfMyNotes(userId: string, churchId: string) {
  const reports = await prisma.notes.findMany({
    where: {
      userId,
      churchId,
    },
  });
  return reports.length;
}

export async function getNumberOfHelpers(churchId: string) {
  const helpers = await prisma.member.findMany({
    where: {
      churchId,
      status: {
        not: MemberStatus.MEMBER,
      },
    },
  });
  return helpers.length;
}

export async function getRecentNotes(
  userId: string,
  churchId: string,
  permission: "admin" | "member" = "member"
) {
  if (permission === "member") {
    const notes = await prisma.notes.findMany({
      where: {
        userId,
        churchId,
      },
      orderBy: {
        noteDate: "desc",
      },
      take: 5,
    });
    return notes;
  }
  const notes = await prisma.notes.findMany({
    where: {
      churchId,
    },
    orderBy: {
      noteDate: "desc",
    },
    take: 5,
  });
  return notes;
}

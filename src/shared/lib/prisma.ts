import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    omit: {
      // user: {
      //   hashedPassword: true,
      // },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

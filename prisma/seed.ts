import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.organization.createMany({
    data: [
      {
        name: "Impact Centre Chrétien - Campus de Lyon",
        slug: "icc-lyon",
        joinCode: "ICC-LYON",
      },
      {
        name: "Impact Centre Chrétien - Église de Lyon Sud",
        slug: "icc-lyon-sud",
        joinCode: "ICC-LYON-SUD",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

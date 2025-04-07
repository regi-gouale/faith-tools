/*
  Warnings:

  - Added the required column `noteDate` to the `Notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "departments" TEXT[];

-- AlterTable
ALTER TABLE "Notes" ADD COLUMN     "churchId" TEXT,
ADD COLUMN     "memberFullname" TEXT,
ADD COLUMN     "noteDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

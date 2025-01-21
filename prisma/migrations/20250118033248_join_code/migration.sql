/*
  Warnings:

  - A unique constraint covering the columns `[joinCode]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `joinCode` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "joinCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Organization_joinCode_key" ON "Organization"("joinCode");

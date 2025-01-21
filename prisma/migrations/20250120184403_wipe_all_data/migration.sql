/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification_tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "MemberStatus" AS ENUM ('MEMBER', 'STAR', 'AIDE', 'RESPONSIBLE', 'MINISTER', 'PASTOR', 'ASSISTANT_PASTOR');

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_organizationId_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Organization";

-- DropTable
DROP TABLE "sessions";

-- DropTable
DROP TABLE "users";

-- DropTable
DROP TABLE "verification_tokens";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "maritalStatus" "MaritalStatus" NOT NULL DEFAULT 'SINGLE',
    "email" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'MALE',
    "address" TEXT,
    "status" "MemberStatus" NOT NULL DEFAULT 'MEMBER',
    "churchId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateEnum
CREATE TYPE "NoteType" AS ENUM ('INTERVIEW', 'ADVICE', 'PRAYER', 'FOLLOW_UP', 'INTEGRATION', 'LEAVING', 'CLINICAL');

-- CreateTable
CREATE TABLE "Notes" (
    "id" TEXT NOT NULL,
    "type" "NoteType" NOT NULL DEFAULT 'INTERVIEW',
    "content" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

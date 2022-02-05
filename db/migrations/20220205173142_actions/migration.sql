/*
  Warnings:

  - You are about to drop the `Action` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_sectionId_fkey";

-- DropTable
DROP TABLE "Action";

-- CreateTable
CREATE TABLE "AuditAction" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "number" INTEGER,
    "sectionId" INTEGER NOT NULL,

    CONSTRAINT "AuditAction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AuditAction" ADD CONSTRAINT "AuditAction_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "AuditSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

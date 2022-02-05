/*
  Warnings:

  - You are about to drop the column `sectionId` on the `AuditAction` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `AuditAction` table. All the data in the column will be lost.
  - Added the required column `auditSectionId` to the `AuditAction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `AuditAction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AuditAction" DROP CONSTRAINT "AuditAction_sectionId_fkey";

-- AlterTable
ALTER TABLE "AuditAction" DROP COLUMN "sectionId",
DROP COLUMN "title",
ADD COLUMN     "auditSectionId" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AuditAction" ADD CONSTRAINT "AuditAction_auditSectionId_fkey" FOREIGN KEY ("auditSectionId") REFERENCES "AuditSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

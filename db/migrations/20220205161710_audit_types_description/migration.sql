/*
  Warnings:

  - You are about to drop the column `auditId` on the `AuditType` table. All the data in the column will be lost.
  - Added the required column `description` to the `AuditType` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AuditType" DROP CONSTRAINT "AuditType_auditId_fkey";

-- AlterTable
ALTER TABLE "AuditType" DROP COLUMN "auditId",
ADD COLUMN     "description" TEXT NOT NULL;

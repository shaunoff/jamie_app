/*
  Warnings:

  - Made the column `position` on table `AuditType` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AuditType" ALTER COLUMN "position" SET NOT NULL;

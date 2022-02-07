/*
  Warnings:

  - Made the column `position` on table `AuditAction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AuditAction" ALTER COLUMN "position" SET NOT NULL;

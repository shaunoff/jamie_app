/*
  Warnings:

  - Made the column `number` on table `AuditSection` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AuditSection" ALTER COLUMN "number" SET NOT NULL;

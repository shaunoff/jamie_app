/*
  Warnings:

  - You are about to drop the column `text` on the `Audit` table. All the data in the column will be lost.
  - You are about to drop the column `assessmnet` on the `AuditAssessment` table. All the data in the column will be lost.
  - Added the required column `assessment` to the `AuditAssessment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Audit" DROP COLUMN "text",
ADD COLUMN     "comment" TEXT;

-- AlterTable
ALTER TABLE "AuditAssessment" DROP COLUMN "assessmnet",
ADD COLUMN     "assessment" INTEGER NOT NULL;

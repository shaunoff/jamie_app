/*
  Warnings:

  - You are about to drop the column `assessmnet` on the `Audit` table. All the data in the column will be lost.
  - You are about to drop the column `comment` on the `Audit` table. All the data in the column will be lost.
  - Added the required column `auditTypeId` to the `Audit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Audit" DROP COLUMN "assessmnet",
DROP COLUMN "comment",
ADD COLUMN     "auditTypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "AuditAssessment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "assessmnet" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "auditId" INTEGER NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "actionId" INTEGER NOT NULL,
    "auditTypeId" INTEGER NOT NULL,

    CONSTRAINT "AuditAssessment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Audit" ADD CONSTRAINT "Audit_auditTypeId_fkey" FOREIGN KEY ("auditTypeId") REFERENCES "AuditType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditAssessment" ADD CONSTRAINT "AuditAssessment_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "Audit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditAssessment" ADD CONSTRAINT "AuditAssessment_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "AuditSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditAssessment" ADD CONSTRAINT "AuditAssessment_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "AuditAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditAssessment" ADD CONSTRAINT "AuditAssessment_auditTypeId_fkey" FOREIGN KEY ("auditTypeId") REFERENCES "AuditType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `dateId` on the `AuditAssessment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AuditAssessment" DROP CONSTRAINT "AuditAssessment_dateId_fkey";

-- AlterTable
ALTER TABLE "AuditAssessment" DROP COLUMN "dateId",
ADD COLUMN     "monthId" INTEGER;

-- AddForeignKey
ALTER TABLE "AuditAssessment" ADD CONSTRAINT "AuditAssessment_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Day"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "AuditAssessment" ADD COLUMN     "dateId" INTEGER;

-- AddForeignKey
ALTER TABLE "AuditAssessment" ADD CONSTRAINT "AuditAssessment_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "Day"("id") ON DELETE SET NULL ON UPDATE CASCADE;

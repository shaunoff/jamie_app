-- DropForeignKey
ALTER TABLE "AuditAssessment" DROP CONSTRAINT "AuditAssessment_actionId_fkey";

-- AddForeignKey
ALTER TABLE "AuditAssessment" ADD CONSTRAINT "AuditAssessment_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "AuditAction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

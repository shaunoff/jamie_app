-- DropForeignKey
ALTER TABLE "AuditAssessment" DROP CONSTRAINT "AuditAssessment_locationId_fkey";

-- AddForeignKey
ALTER TABLE "AuditAssessment" ADD CONSTRAINT "AuditAssessment_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

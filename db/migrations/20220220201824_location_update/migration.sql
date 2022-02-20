-- DropForeignKey
ALTER TABLE "AuditAssessment" DROP CONSTRAINT "AuditAssessment_actionId_fkey";

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "lat" INTEGER,
ADD COLUMN     "lng" INTEGER;

-- AddForeignKey
ALTER TABLE "AuditAssessment" ADD CONSTRAINT "AuditAssessment_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "AuditAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

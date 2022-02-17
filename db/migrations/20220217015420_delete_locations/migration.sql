-- DropForeignKey
ALTER TABLE "Audit" DROP CONSTRAINT "Audit_locationId_fkey";

-- AddForeignKey
ALTER TABLE "Audit" ADD CONSTRAINT "Audit_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

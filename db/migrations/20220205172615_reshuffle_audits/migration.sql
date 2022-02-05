/*
  Warnings:

  - You are about to drop the `Section` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_sectionId_fkey";

-- DropTable
DROP TABLE "Section";

-- CreateTable
CREATE TABLE "AuditSection" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER,
    "auditTypeId" INTEGER NOT NULL,

    CONSTRAINT "AuditSection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AuditSection" ADD CONSTRAINT "AuditSection_auditTypeId_fkey" FOREIGN KEY ("auditTypeId") REFERENCES "AuditType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "AuditSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

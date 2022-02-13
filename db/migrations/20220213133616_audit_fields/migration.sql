/*
  Warnings:

  - Added the required column `assessmnet` to the `Audit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `Audit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateId` to the `Audit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Audit" ADD COLUMN     "assessmnet" INTEGER NOT NULL,
ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "dateId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Audit" ADD CONSTRAINT "Audit_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

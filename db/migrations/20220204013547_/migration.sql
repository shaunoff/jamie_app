/*
  Warnings:

  - The `number` column on the `Action` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `number` column on the `Section` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Action" DROP COLUMN "number",
ADD COLUMN     "number" INTEGER;

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "number",
ADD COLUMN     "number" INTEGER;

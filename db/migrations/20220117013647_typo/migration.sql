/*
  Warnings:

  - You are about to drop the column `dayOfweek` on the `Day` table. All the data in the column will be lost.
  - Added the required column `dayOfWeek` to the `Day` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Day" DROP COLUMN "dayOfweek",
ADD COLUMN     "dayOfWeek" INTEGER NOT NULL;

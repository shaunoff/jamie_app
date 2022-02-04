/*
  Warnings:

  - Added the required column `number` to the `Action` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "number" TEXT NOT NULL;

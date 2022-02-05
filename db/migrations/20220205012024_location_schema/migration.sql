/*
  Warnings:

  - Added the required column `address1` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address2` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `county` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postCode` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "address1" TEXT NOT NULL,
ADD COLUMN     "address2" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "county" TEXT NOT NULL,
ADD COLUMN     "postCode" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `date_actual` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `date_dim_id` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `day_name` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `day_of_month` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `day_of_quarter` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `day_of_week` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `day_of_year` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `day_suffix` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `epoch` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `first_day_of_month` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `first_day_of_quarter` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `first_day_of_week` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `first_day_of_year` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `last_day_of_month` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `last_day_of_quarter` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `last_day_of_week` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `last_day_of_year` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `month_actual` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `month_name` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `month_name_abbreviated` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `quarter_actual` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `quarter_name` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `week_of_month` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `week_of_year` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `week_of_year_iso` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `weekend_indr` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `year_actual` on the `Day` table. All the data in the column will be lost.
  - You are about to alter the column `mmddyyyy` on the `Day` table. The data in that column could be lost. The data in that column will be cast from `Char(10)` to `Char(8)`.
  - Added the required column `actualDate` to the `Day` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayName` to the `Day` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayOfMonth` to the `Day` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayOfYear` to the `Day` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayOfweek` to the `Day` table without a default value. This is not possible if the table is not empty.
  - Added the required column `daySuffix` to the `Day` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isWeekend` to the `Day` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthName` to the `Day` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthNameAbbreviated` to the `Day` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthOfYear` to the `Day` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unix` to the `Day` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekOfYear` to the `Day` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Day` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Day" DROP COLUMN "date_actual",
DROP COLUMN "date_dim_id",
DROP COLUMN "day_name",
DROP COLUMN "day_of_month",
DROP COLUMN "day_of_quarter",
DROP COLUMN "day_of_week",
DROP COLUMN "day_of_year",
DROP COLUMN "day_suffix",
DROP COLUMN "epoch",
DROP COLUMN "first_day_of_month",
DROP COLUMN "first_day_of_quarter",
DROP COLUMN "first_day_of_week",
DROP COLUMN "first_day_of_year",
DROP COLUMN "last_day_of_month",
DROP COLUMN "last_day_of_quarter",
DROP COLUMN "last_day_of_week",
DROP COLUMN "last_day_of_year",
DROP COLUMN "month_actual",
DROP COLUMN "month_name",
DROP COLUMN "month_name_abbreviated",
DROP COLUMN "quarter_actual",
DROP COLUMN "quarter_name",
DROP COLUMN "week_of_month",
DROP COLUMN "week_of_year",
DROP COLUMN "week_of_year_iso",
DROP COLUMN "weekend_indr",
DROP COLUMN "year_actual",
ADD COLUMN     "actualDate" TEXT NOT NULL,
ADD COLUMN     "dayName" VARCHAR(9) NOT NULL,
ADD COLUMN     "dayOfMonth" INTEGER NOT NULL,
ADD COLUMN     "dayOfYear" INTEGER NOT NULL,
ADD COLUMN     "dayOfweek" INTEGER NOT NULL,
ADD COLUMN     "daySuffix" VARCHAR(4) NOT NULL,
ADD COLUMN     "isWeekend" BOOLEAN NOT NULL,
ADD COLUMN     "monthName" VARCHAR(9) NOT NULL,
ADD COLUMN     "monthNameAbbreviated" CHAR(3) NOT NULL,
ADD COLUMN     "monthOfYear" INTEGER NOT NULL,
ADD COLUMN     "unix" BIGINT NOT NULL,
ADD COLUMN     "weekOfYear" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL,
ALTER COLUMN "mmddyyyy" SET DATA TYPE CHAR(8);

/*
  Warnings:

  - You are about to drop the column `end_time` on the `booked_slot` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `booked_slot` table. All the data in the column will be lost.
  - Added the required column `from` to the `booked_slot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `booked_slot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booked_slot" DROP COLUMN "end_time",
DROP COLUMN "start_time",
ADD COLUMN     "from" TIMESTAMPTZ(6) NOT NULL,
ADD COLUMN     "to" TIMESTAMPTZ(6) NOT NULL;

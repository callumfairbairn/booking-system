/*
  Warnings:

  - Added the required column `date` to the `booked_slot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booked_slot" ADD COLUMN     "date" DATE NOT NULL;

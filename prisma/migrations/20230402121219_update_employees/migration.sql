/*
  Warnings:

  - You are about to drop the `EMPLOYEES` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "EMPLOYEES";

-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

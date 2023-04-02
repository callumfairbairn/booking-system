-- CreateTable
CREATE TABLE "EMPLOYEES" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT,
    "name" TEXT,
    "phone_number" BIGINT,

    CONSTRAINT "EMPLOYEES_pkey" PRIMARY KEY ("id")
);

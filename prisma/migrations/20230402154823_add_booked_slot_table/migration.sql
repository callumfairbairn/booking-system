-- CreateTable
CREATE TABLE "booked_slot" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start_time" TIMESTAMPTZ(6) NOT NULL,
    "end_time" TIMESTAMPTZ(6) NOT NULL,
    "user_email" TEXT NOT NULL,
    "employee_id" INTEGER NOT NULL,

    CONSTRAINT "booked_slot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "booked_slot" ADD CONSTRAINT "booked_slot_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

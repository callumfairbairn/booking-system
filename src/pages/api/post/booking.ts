import { TimeOfDay } from "@/types";
import { createBookedSlot } from "@/util/createBookedSlot";
import { slotLength, workingHours } from "@/util/environmentVars";
import { getSlots } from "@/util/getSlots";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | Error>
) {
  if (req.method !== 'POST') {
    res.status(405).send(Error('Only POST requests allowed'))
    return
  }
  
  const { date, timeOfDay, name, email } = req.body;

  if (!date || !timeOfDay || !name || !email) {
    return res.status(400).json(Error("All fields are required"));
  }
  const dateAsDateObject = new Date(date as string)

  const bookedSlots = await prisma.booked_slot.findMany({
    where: {
      date: dateAsDateObject,
    },
  })
  const employees = await prisma.employee.findMany()
  if (bookedSlots) {
    const slots = getSlots({
      date: dateAsDateObject,
      bookedSlots,
      employees,
      slotLength,
      workingHours
    })
    const newBookedSlot = createBookedSlot(slots, timeOfDay as TimeOfDay)

    await prisma.booked_slot.create({
      data: {
        date: dateAsDateObject,
        from: newBookedSlot.from,
        to: newBookedSlot.to,
        employee_id: newBookedSlot.employee.id,
        user_email: email as string,
      },
    })
    return res.status(200).json('Success')
  }
  return res.status(500).json(Error('Booked slots not found'))
}
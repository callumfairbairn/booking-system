import { Availability, getAvailability } from "@/util/getAvailability";
import { getSlots } from "@/util/getSlots";
import { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "@/util/prisma";

const SLOT_LENGTH = 3;
const WORKING_HOURS = { from: 9, to: 17 };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Availability | Error>
) {
  if (req.method !== 'GET') {
    res.status(405).send(Error('Only POST requests allowed'))
    return
  }

  const { date } =  req.query;

  if (!date) {
    return res.status(400).json(Error('Date is required'))
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
      slotLength: SLOT_LENGTH,
      workingHours: WORKING_HOURS 
    })
    return res.status(200).json(getAvailability(slots))
  }
  return res.status(500).json(Error('Booked slots not found'))
}
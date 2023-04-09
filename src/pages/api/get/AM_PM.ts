import { AM_PM, get_AM_PM } from "@/util/get_AM_PM";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AM_PM | Error>
) {
  const { date } =  req.query;

  if (!date) {
    return res.status(400).json(Error('Date is required'))
  }

  const slots = await prisma.booked_slot.findMany({
    where: {
      date: new Date(date as string),
    },
  })

  if (slots) {
    return res.status(200).json(get_AM_PM(slots))
  }
  return res.status(500).json(Error('Slots not found'))
}
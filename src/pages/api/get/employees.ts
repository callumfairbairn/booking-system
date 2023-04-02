// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/util/prisma'

import { employee } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<employee | Error>
) {
  const employees = await prisma.employee.findFirst()
  if (employees) {
    return res.status(200).json(employees)
  }
  return res.status(500).json(Error('Employee not found'))
}

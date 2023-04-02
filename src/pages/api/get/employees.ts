// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/util/prisma'

import { employees } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<employees | Error>
) {
  const employees = await prisma.employees.findFirst()
  if (employees) {
    return res.status(200).json(employees)
  }
  return res.status(500).json(Error('Employee not found'))
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next/types';
import prisma from '@/util/prisma'

import { employee } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<employee[] | Error>
) {
  if (req.method !== 'GET') {
    res.status(405).send(Error('Only GET requests allowed'))
    return
  }

  const employees = await prisma.employee.findMany()
  if (employees) {
    return res.status(200).json(employees)
  }
  return res.status(500).json(Error('Employee not found'))
}

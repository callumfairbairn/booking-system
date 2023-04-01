// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Database } from 'types/supabase';

import { createClient, PostgrestError } from '@supabase/supabase-js'

const supabaseUrl = 'https://wmjcmreneslbznzsvzhg.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY as string
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | PostgrestError>
) {
  const { data, error } = await supabase.from('EMPLOYEES').select('name')
  if (error) {
    return res.status(500).json(error)
  }
  res.status(200).json({ name: `${data[0].name}` })
}

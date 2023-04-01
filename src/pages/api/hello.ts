// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Database } from 'types/supabase';

import { createClient, PostgrestError } from '@supabase/supabase-js'

const supabaseUrl = 'https://wmjcmreneslbznzsvzhg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtamNtcmVuZXNsYnpuenN2emhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkyNDkyOTksImV4cCI6MTk5NDgyNTI5OX0.oCAUuePg7CJRlDPVNhyyhWCvF61cWHrJmwWZWjFGI6o'
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
  res.status(200).json({ name: data[0].name })
}

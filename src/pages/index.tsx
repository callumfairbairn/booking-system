import { formatDate } from '@/util/date'
import fetcher from '@/util/fetcher'
import { Availability } from '@/util/getAvailability'
import { Button, Spinner } from 'flowbite-react'
import Head from 'next/head'
import { useState } from 'react'

const today = formatDate(new Date(`${formatDate(new Date())}T00:00:00+0000`))

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<string>(today)
  const [availability, setAvailability] = useState<Availability | null>(null)
  const [availabilityLoading, setAvailabilityLoading] = useState<boolean>(false)

  const handleDateChange = async (date: string) => {
    setSelectedDate(date)
    setAvailabilityLoading(true)
    if (selectedDate === null) {
      return setAvailabilityLoading(false)
    }
    const result = await fetcher(`/api/get/availability?date=${selectedDate}`)
    setAvailability(result)
    setAvailabilityLoading(false)
  }

  return (
    <>
      <Head>
        <title>Cleaning company</title>
        <meta name="description" content="Cleaning company description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={'bg-slate-300 flex flex-col p-3 min-h-screen min-x-screen justify-center items-center'}>
        <div className='flex flex-col max-w-4xl w-full items-center gap-4'>
          <div className='flex gap-2 content-center justify-center max-w-sm'>
            <input type='date' min={today} value={selectedDate} onChange={(event) => handleDateChange(event.target.value)} />
          </div>
          <div className={`flex gap-1 h-10 ${availability ? 'visible' : 'invisible'}`}>
            {availabilityLoading ? <Spinner size='lg' /> : (
              <>
                <Button pill disabled={!availability?.AM}>AM</Button>
                <Button pill disabled={!availability?.PM}>PM</Button>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

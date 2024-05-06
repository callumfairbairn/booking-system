import { ErrorAlert } from '@/components/ErrorAlert'
import { DatePicker } from '@/components/ui/datePicker'
import { Button } from '@/components/ui/button'
import { TimeOfDay } from '@/types'
import { formatDate } from '@/util/date'
import fetcher from '@/util/fetcher'
import { Availability } from '@/util/getAvailability'
import { poster } from '@/util/poster'
import { Spinner } from 'flowbite-react'
import Head from 'next/head'
import { useState } from 'react'
import useSWR from 'swr'

const today = new Date(`${formatDate(new Date())}T00:00:00+0000`)

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date>(today)
  const { data: availability, isLoading, mutate, error } = useSWR<Availability>(`/api/get/availability?date=${formatDate(selectedDate)}`, fetcher)

  const handleDateChange = async (date: Date) => {
    setSelectedDate(date)
  }

  const handleTimeOfDayClick = async (timeOfDay: TimeOfDay) => {
    await poster(`/api/post/booking`, {
      timeOfDay,
      date: formatDate(selectedDate),
      name: 'Placeholder name',
      email: 'Placeholder email',
    })
    mutate()
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
            <DatePicker onChange={handleDateChange} initialDate={today} fromDate={today} />
          </div>
          <div className={`flex gap-1 h-10 ${availability ? 'visible' : 'invisible'}`}>
            {isLoading ? <Spinner size='lg' /> : (
              <>
                <Button
                  disabled={!availability?.AM}
                  onClick={() => handleTimeOfDayClick(TimeOfDay.AM)}
                >
                  AM
                </Button>
                <Button
                  disabled={!availability?.PM}
                  onClick={() => handleTimeOfDayClick(TimeOfDay.PM)}
                >
                  PM
                </Button>
              </>
            )}
          </div>
          <div className={`flex gap-1 h-10 ${error ? 'visible' : 'invisible'}`}>
            {error ? <ErrorAlert textMajor="Error" textMinor="Something went wrong" /> : null}
          </div>
        </div>
      </main>
    </>
  )
}

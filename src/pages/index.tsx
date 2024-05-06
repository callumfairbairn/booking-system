import { ErrorAlert } from '@/components/ErrorAlert'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/datePicker'
import { useSmoothSWR } from '@/lib/useSmoothSWR'
import { TimeOfDay } from '@/types'
import { formatDate } from '@/util/date'
import fetcher from '@/util/fetcher'
import { Availability } from '@/util/getAvailability'
import { poster } from '@/util/poster'
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import Head from 'next/head'
import { useState } from 'react'

const today = new Date(`${formatDate(new Date())}T00:00:00+0000`)

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date>(today)
  const { data: availability, mutate, error } = useSmoothSWR<Availability>(`/api/get/availability?date=${formatDate(selectedDate)}`, fetcher)

  const handleDateChange = async (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
    }
  }

  const handleDateDecrement = () => {
    const dayBefore = new Date(selectedDate.getTime());
    dayBefore.setDate(selectedDate.getDate() - 1)
    setSelectedDate(dayBefore)
  }

  const handleDateIncrement = () => {
    const dayAfter = new Date(selectedDate.getTime());
    dayAfter.setDate(selectedDate.getDate() + 1)
    setSelectedDate(dayAfter)
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
            <Button disabled={selectedDate <= today} onClick={handleDateDecrement}>
              <ChevronLeftIcon />
            </Button>
            <DatePicker onSelect={handleDateChange} date={selectedDate} fromDate={today} />
            <Button onClick={handleDateIncrement}>
              <ChevronRightIcon />
            </Button>
          </div>
          <div className={`flex gap-1 h-10`}>
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
          </div>
          <div className={`flex gap-1 h-10 ${error ? 'visible' : 'invisible'}`}>
            {error ? <ErrorAlert textMajor="Error" textMinor="Something went wrong" /> : null}
          </div>
        </div>
      </main>
    </>
  )
}

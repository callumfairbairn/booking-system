import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import useSWR from 'swr'
import fetcher from '@/util/fetcher'
import { employee } from '@prisma/client'
import Datepicker from "tailwind-datepicker-react"
import { useState } from 'react'
import { Button } from 'flowbite-react'
import { Availability } from '@/util/getAvailability'

const datepickerOptions = {
  minDate: new Date(),
}

// convert date object to YYYY-MM-DD
const formatDate = (date: Date | null) => {
  if (!date) return null
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${month}-${day}`
}


export default function Home() {
  const [showDatepicker, setShowDatepicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [availability, setAvailability] = useState<Availability | null>(null)
  const handleDateChange = (date: Date | null) => setSelectedDate(date)
  const handleShowDatepicker = async () => {
    const result = await fetcher(`/api/get/availability?date=${formatDate(selectedDate)}`)
    setAvailability(result)
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
          <div className='flex flex-col gap-1 content-center justify-center max-w-sm'>
            <Datepicker
              options={datepickerOptions}
              show={showDatepicker}
              setShow={setShowDatepicker}
              onChange={handleDateChange}
            />
            <Button onClick={handleShowDatepicker}>Show availability</Button>
          </div>
          <div className={`flex gap-1 ${availability ? 'visible' : 'invisible'}`}>
            <Button pill disabled={!availability?.AM}>AM</Button>
            <Button pill disabled={!availability?.PM}>PM</Button>
          </div>
        </div>
      </main>
    </>
  )
}

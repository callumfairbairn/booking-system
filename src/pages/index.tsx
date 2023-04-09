import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import useSWR from 'swr'
import fetcher from '@/util/fetcher'
import { employee } from '@prisma/client'


export default function Home() {
  const { data: employees } = useSWR<employee[]>('/api/get/employees', fetcher)
  const { data: AM_PM } = useSWR<string>('/api/get/AM_PM?date=2023-04-08', fetcher)

  return (
    <>
      <Head>
        <title>Cleaning company</title>
        <meta name="description" content="Cleaning company description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className='flex-col bg-teal-100'>
          {employees ? employees.map((employee) => (
            <div style={{ textAlign: 'start' }} key={employee.id}>{`${employee.id}: ${employee.name}`}</div>
          )) : null}
        </div>
        <div className='flex-col bg-orange-300'>
          {AM_PM ? Object.entries(AM_PM).map(([key, value]) => (
            <div style={{ textAlign: 'start' }} key={key}>{`${key}: ${value}`}</div>
          )) : null}
        </div>
      </main>
    </>
  )
}
 
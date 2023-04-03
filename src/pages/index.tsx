import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import useSWR from 'swr'
import fetcher from '@/util/fetcher'
import { employee } from '@prisma/client'


export default function Home() {
  const { data: employee } = useSWR<employee>('/api/get/employees', fetcher)

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
          {employee ? Object.entries(employee).map(([key, value]) => (
            <div style={{ textAlign: 'start' }} key={key}>{`${key}: ${value}`}</div>
          )) : null}
        </div>
      </main>
    </>
  )
}
 
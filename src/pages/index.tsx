import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import useSWR from 'swr'
import fetcher from '@/fetcher'


export default function Home() {
  const { data } = useSWR<{ name: string }>('/api/hello', fetcher)

  return (
    <>
      <Head>
        <title>Cleaning company</title>
        <meta name="description" content="Cleaning company description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          {data?.name}
        </div>
      </main>
    </>
  )
}

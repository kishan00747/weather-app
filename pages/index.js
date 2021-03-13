import Head from 'next/head'
import Weather from '../components/Weather/Weather'
// import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Weather />

    </div>
  )
}

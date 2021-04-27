import Head from 'next/head'
import Sidebar from './Components/Sidebar'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Chatter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar/>
      </div>
  )
}
 
import Head from 'next/head'
import Sidebar from './Components/Sidebar'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Let's Talk</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar/>
      </div>
  )
}
 
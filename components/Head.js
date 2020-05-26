import Head from 'next/head'

export default function HeadComponent({ title }) {
  return (
    <Head>
      <title>
        {title} | AsyncAPI Initiative
      </title>
    </Head>
  )
}
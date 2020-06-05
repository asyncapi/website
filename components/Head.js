import { useContext } from 'react'
import Head from 'next/head'
import AppContext from '../context/AppContext'

export default function HeadComponent({
  title,
  description = 'Building the future of event-driven architectures.',
  image = '/img/social/card.png',
}) {
  const { path = '' } = useContext(AppContext)
  const permalink = `${process.env.ORIGIN}${path}`
  let type = 'website'
  if (path.startsWith('/docs') || path.startsWith('/blog')) type = 'article'
  if (!image.startsWith('http') && !image.startsWith('https')) image = `${process.env.ORIGIN}${image}`
  title = `${title} | AsyncAPI Initiative`

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="description" content={description} />
      
      {/* Google / Search Engine Tags */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={image} />
      
      {/* Twitter Card data */}
      <meta name="twitter:card" value="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Open Graph data */}
      <meta property="og:title" content={title} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={permalink} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />
      
      <title>{title}</title>
    </Head>
  )
}
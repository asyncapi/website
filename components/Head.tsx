import Head from 'next/head';
import { useContext } from 'react';
import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';

import AppContext from '../context/AppContext';

interface IHeadProps {
  title: string;
  description?: string;
  image?: string;
  rssTitle?: string;
  rssLink?: string;
}

/**
 * @description The HeadComponent is the head of the page with the meta tags.
 *
 * @param {string} props.title - The title of the page
 * @param {string} props.description - The description of the page
 * @param {string} props.image - The image of the page
 * @param {string} props.rssTitle - The RSS title of the page
 * @param {string} props.rssLink - The RSS link of the page
 */
export default function HeadComponent({
  title,
  description = `Open source tools to easily build and maintain your event-driven architecture.
                All powered by the AsyncAPI specification, the industry standard for defining asynchronous APIs.`,
  image = '/img/social/website-card.jpg',
  rssTitle = 'RSS Feed for AsyncAPI Initiative Blog',
  rssLink = '/rss.xml'
}: IHeadProps) {
  const url = process.env.NEXT_PUBLIC_DEPLOY_PRIME_URL || process.env.NEXT_PUBLIC_DEPLOY_URL || 'http://localhost:3000';
  const appContext = useContext(AppContext);
  const { path = '' } = appContext || {};
  let currImage = image;

  const permalink = `${url}${path}`;
  let type = 'website';

  if (path.startsWith('/docs') || path.startsWith('/blog')) {
    type = 'article';
  }

  if (!image.startsWith('http') && !image.startsWith('https')) {
    currImage = `${url}${image}`;
  }

  const permTitle = 'AsyncAPI Initiative for event-driven APIs';

  const currTitle = title ? `${title} | ${permTitle}` : permTitle;

  // enable google analytics
  if (typeof window !== 'undefined' && window.location.hostname.includes('asyncapi.com')) {
    TagManager.initialize({ gtmId: 'GTM-T58BTVQ' });
    ReactGA.initialize('UA-109278936-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
      <meta httpEquiv='x-ua-compatible' content='ie=edge' />
      <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
      <meta name='description' content={description} />
      <link rel='alternate' type='application/rss+xml' title={rssTitle} href={rssLink} />

      {/* Google / Search Engine Tags */}
      <meta itemProp='name' content={title} />
      <meta itemProp='description' content={description} />
      <meta itemProp='image' content={currImage} />

      {/* Twitter Card data */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={currImage} />

      {/* Open Graph data */}
      <meta property='og:title' content={title} />
      <meta property='og:type' content={type} />
      <meta property='og:url' content={permalink} />
      <meta property='og:image' content={currImage} />
      <meta property='og:description' content={description} />

      <title>{currTitle}</title>
    </Head>
  );
}

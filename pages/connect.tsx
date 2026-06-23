import Head from 'next/head';
import React from 'react';

import ConnectPage from '../components/ConnectPage';

/**
 * @description The Connect page displays all AsyncAPI social media and contact links.
 * This page is intentionally not wrapped in i18n redirect so that
 * it works cleanly as a QR-code landing page at asyncapi.com/connect.
 */
export default function Connect() {
  return (
    <div className='dark:bg-dark-background'>
      <Head>
        <title>Connect | AsyncAPI Initiative for event-driven APIs</title>
        <meta
          name='description'
          content='Find all the ways to connect with the AsyncAPI community — Slack, LinkedIn, Mastodon, Conferences, and Email.'
        />
      </Head>
      <ConnectPage />
    </div>
  );
}

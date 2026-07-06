import React from 'react';

import ConnectPage from '@/components/ConnectPage';
import Head from '@/components/Head';

const description =
  'Find all the ways to connect with the AsyncAPI community — Slack, GitHub, LinkedIn, Mastodon, Conferences, and Email.';

/**
 * @description The Connect page displays all AsyncAPI social media and contact links.
 */
export default function Connect() {
  return (
    <div className='dark:bg-dark-background'>
      <Head title='Connect' description={description} />
      <ConnectPage />
    </div>
  );
}

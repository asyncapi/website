import React from 'react';

import AsyncAPIColorIcon from '@/components/icons/AsyncAPIColorIcon';
import Loader from '@/components/Loader';

import Head from '../components/Head';
import { Redirect } from '../utils/redirect';

/**
 * @description This is the home page which is the first page that loads when the user visits the website.
 */
export default function HomePage() {
  Redirect();

  return (
    <>
      <Head title='AsyncAPI Initiative for event-driven APIs' />
      <div className='h-screen'>
        <Loader
          loaderText='Loading...'
          loaderIcon={<AsyncAPIColorIcon alt='Loading...' />}
          className='my-60'
          dark={false}
          pulsating
        />
      </div>
    </>
  );
}

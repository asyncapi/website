import Link from 'next/link';
import React from 'react';

import type { ErrorFallbackProps } from '@/types/components/error/ErrorBoundaryProps';

import IconExclamation from '../icons/Exclamation';
import IconHome from '../icons/Home';

/**
 * @description Full-page fallback rendered by the global ErrorBoundary when an
 * unrecoverable rendering error escapes the page content. It preserves the
 * layout shell around it and offers accessible recovery actions.
 * @param {ErrorFallbackProps} props - The error and the reset handler.
 */
export default function GlobalErrorFallback({ error, reset }: ErrorFallbackProps): React.JSX.Element {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div
      role='alert'
      aria-live='assertive'
      data-testid='GlobalErrorFallback'
      className='flex min-h-[60vh] w-full items-center justify-center bg-white px-4 py-16 dark:bg-dark-background'
    >
      <div className='w-full max-w-xl text-center'>
        <div className='mx-auto flex size-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30'>
          <IconExclamation className='size-8 text-red-600 dark:text-red-400' aria-hidden='true' />
        </div>
        <h1 className='mt-6 font-sans text-2xl font-bold text-gray-900 antialiased dark:text-dark-heading'>
          Something went wrong
        </h1>
        <p className='mt-3 font-sans text-base text-gray-600 antialiased dark:text-dark-text'>
          An unexpected error interrupted this page. The rest of the site is still available, so you can retry or head
          back to the homepage.
        </p>

        {isDevelopment && error?.message && (
          <pre
            data-testid='GlobalErrorFallback-details'
            className='mt-6 max-h-48 overflow-auto whitespace-pre-wrap rounded-md bg-gray-100 p-4 text-left font-mono
              text-sm text-red-700 dark:bg-dark-card dark:text-red-300'
          >
            {error.message}
          </pre>
        )}

        <div className='mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'>
          <button
            type='button'
            onClick={reset}
            data-testid='GlobalErrorFallback-retry'
            className='inline-flex w-full items-center justify-center rounded-md bg-primary-500 px-5 py-3 text-md
              font-semibold tracking-heading text-white transition-all duration-500 ease-in-out hover:bg-primary-400
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
              dark:focus-visible:ring-offset-dark-background sm:w-auto'
          >
            Try Again
          </button>
          <Link
            href='/'
            data-testid='GlobalErrorFallback-home'
            className='inline-flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 px-5 py-3
              text-md font-semibold tracking-heading text-gray-700 transition-all duration-500 ease-in-out
              hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500
              focus-visible:ring-offset-2 dark:border-border dark:text-dark-text dark:hover:bg-muted
              dark:focus-visible:ring-offset-dark-background sm:w-auto'
          >
            <IconHome className='size-5' aria-hidden='true' />
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

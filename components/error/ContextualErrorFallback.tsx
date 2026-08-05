import React from 'react';

import type { ErrorFallbackProps } from '@/types/components/error/ErrorBoundaryProps';

import IconExclamation from '../icons/Exclamation';

type IContextualErrorFallbackProps = ErrorFallbackProps & {
  // Optional short label describing which widget failed, e.g. "sidebar".
  label?: string;
};

/**
 * @description Lightweight, inline fallback for widgets, sidebars, and other
 * non-critical sections. It fails gracefully without disrupting the parent
 * page and lets the user retry just the affected region.
 * @param {IContextualErrorFallbackProps} props - The error, reset handler and label.
 */
export default function ContextualErrorFallback({
  reset,
  label = 'section'
}: IContextualErrorFallbackProps): React.JSX.Element {
  return (
    <div
      role='alert'
      aria-live='polite'
      data-testid='ContextualErrorFallback'
      className='flex flex-col gap-2 rounded-md border border-yellow-300 bg-yellow-50 p-4 text-left
        dark:border-yellow-700/60 dark:bg-yellow-900/20'
    >
      <div className='flex items-start gap-2'>
        <IconExclamation className='mt-0.5 size-5 shrink-0 text-yellow-500 dark:text-yellow-400' aria-hidden='true' />
        <div>
          <p className='font-sans text-sm font-medium text-yellow-800 antialiased dark:text-yellow-200'>
            This {label} could not be displayed.
          </p>
          <p className='mt-1 font-sans text-sm text-yellow-700 antialiased dark:text-yellow-300/80'>
            The rest of the page is still available. You can try loading it again.
          </p>
        </div>
      </div>
      <div>
        <button
          type='button'
          onClick={reset}
          data-testid='ContextualErrorFallback-retry'
          className='rounded-sm font-sans text-sm font-semibold text-yellow-800 underline underline-offset-2
            transition-colors hover:text-yellow-900 focus:outline-none focus-visible:ring-2
            focus-visible:ring-yellow-500 focus-visible:ring-offset-1 dark:text-yellow-200 dark:hover:text-yellow-100'
        >
          Try again
        </button>
      </div>
    </div>
  );
}

import { useRouter } from 'next/router';
import React from 'react';

import GitHubIssue from './buttons/GitHubIssue';

interface IFeedbackProps {
  className?: string;
}

/**
 * @description A component that allows users to submit feedback
 * @param {string} props.className - The class name for the component
 */
export default function Feedback({ className }: IFeedbackProps) {
  const { asPath } = useRouter();

  // Strip query string and hash so only the pathname appears in the issue title
  const docsPath = asPath.split('?')[0].split('#')[0];
  const issueTitle = `Docs Feedback: ${docsPath}`;

  const feedbackUrl =
    'https://github.com/asyncapi/website/issues/new' +
    '?template=docs-feedback.yml' +
    `&title=${encodeURIComponent(issueTitle)}` +
    `&labels=${encodeURIComponent('📑 docs')}`;

  return (
    <div
      className={`flex flex-col rounded-md border dark:bg-dark-card dark:border-border border-gray-200 p-4 shadow-md ${className}`}
    >
      <div className='flex flex-row'>
        <img src='/img/illustrations/icons/icon.svg' className='my-auto sm:size-14 lg:w-14' alt='' aria-hidden='true' />
        <div className='ml-4 flex flex-col'>
          <div className='text-xl dark:text-dark-heading'>Was this helpful?</div>
          <div className='text-sm dark:text-dark-text text-gray-500'>
            Help us improve the docs by sharing your feedback.
          </div>
        </div>
      </div>
      <div className='mt-4 block text-sm lg:flex lg:flex-row'>
        <a
          href={feedbackUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='flex w-full flex-row justify-center rounded bg-primary-500 dark:border border-primary-500 dark:hover:bg-transparent py-2 text-white shadow-md transition-all duration-300 ease-in-out hover:shadow-lg lg:w-6/12'
          data-testid='Feedback-submit-link'
        >
          Submit Feedback
        </a>
        <div className='my-2 w-full text-center dark:text-dark-text font-medium lg:my-auto lg:w-1/12'>OR</div>
        <GitHubIssue className='bg-secondary-500 dark:border dark:border-secondary-500 dark:hover:bg-transparent' />
      </div>
    </div>
  );
}

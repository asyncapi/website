import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import GitHubIssue from './buttons/GitHubIssue';

interface IFeedbackProps {
  className?: string;
}

/**
 * @description A component that allows users to submit feedback
 * @param {string} props.className - The class name for the component
 */
export default function Feedback({ className }: IFeedbackProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [feedback, setFeedback] = useState('');
  const { asPath } = useRouter();

  useEffect(() => {
    setSubmitted(false);
    setError(false);
  }, [asPath]);

  const dateStamp = new Date();
  const timeStamp = dateStamp.toUTCString();

  /**
   * @description A function that handles the form submission
   * @param {React.FormEvent<HTMLFormElement>} e - The form event
   */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      title: `Feedback on ${asPath} - ${timeStamp}`,
      feedback
    };

    fetch('/.netlify/functions/github_discussions', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 200) {
        setSubmitted(true);
      }
      if (response.status !== 200) {
        setError(true);
      }
      response.json();
    });
  }

  if (submitted) {
    return (
      <div className={`flex flex-col rounded-md border border-gray-200 p-4 text-center shadow-md ${className}`}>
        <div className='mx-auto block w-fit'>
          <img src='/img/illustrations/icons/icon-check.svg' className='md:w-14' alt='checkmark' aria-hidden='true' />
        </div>
        <div className='mx-auto mt-4 text-center text-lg' data-testid='Feedback-div'>
          Thank you for your feedback!
        </div>
        <div className='text-md mx-auto text-center text-gray-500'>
          Your contribution has been received and we couldn&apos;t be happier.
        </div>
        <a
          href='https://github.com/asyncapi/website'
          target='_blank'
          rel='noopener noreferrer'
          className='mx-auto mt-4 w-full rounded-md bg-black p-2 shadow-md transition-all duration-500 ease-in-out hover:shadow-lg md:w-1/2'
        >
          <div className='flex flex-row justify-center text-center text-white'>
            <img src='/img/logos/github-fill.svg' className='mr-2 w-6' alt='GitHub' aria-hidden='true' />
            Follow on GitHub
          </div>
        </a>
      </div>
    );
  }
  if (error) {
    return (
      <div className={`flex flex-col rounded-md border border-gray-200 p-4 text-center shadow-md ${className}`}>
        <div className='mx-auto block w-fit'>
          <img src='/img/illustrations/icons/icon-x.svg' className='md:w-14' alt='x' aria-hidden='true' />
        </div>
        <div className='mx-auto mt-4 text-center text-lg' data-testid='Feedback-error'>
          Oops! Something went wrong...
        </div>
        <div className='text-md mx-auto text-center text-gray-500'>We were unable to process your feedback</div>
        <GitHubIssue className='mx-auto' />
      </div>
    );
  }

  return (
    <div className={`flex flex-col rounded-md border border-gray-200 p-4 shadow-md ${className}`}>
      <div className='flex flex-row'>
        <img src='/img/illustrations/icons/icon.svg' className='my-auto sm:size-14 lg:w-16' alt='' aria-hidden='true' />
        <div className='ml-4 flex flex-col'>
          <div className='text-xl'>Was this helpful?</div>
          <div className='text-sm text-gray-500'>Help us improve the docs by adding your contribution.</div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='my-4 flex flex-col'>
          <textarea
            className='inline-block h-20 w-full rounded-md border bg-gray-50 px-2 py-1 align-top text-sm text-gray-700 focus:border-0'
            placeholder='Write your suggestions here'
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
          <div className='mt-4 block text-sm lg:flex lg:flex-row'>
            <button
              className='w-full rounded bg-primary-500 py-2 text-white shadow-md transition-all duration-500 ease-in-out hover:shadow-lg lg:w-6/12'
              type='submit'
            >
              Submit feedback
            </button>
            <div className='my-2 w-full text-center font-medium lg:my-auto lg:w-1/12'>OR</div>
            <GitHubIssue />
          </div>
        </div>
      </form>
    </div>
  );
}

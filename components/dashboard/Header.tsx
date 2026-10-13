import React from 'react';

import Button from '../buttons/Button';
import GithubButton from '../buttons/GithubButton';
import SlackButton from '../buttons/SlackButton';

/**
 * @description Header component for the dashboard.
 */
export default function Header() {
  return (
    <div className='sm:flex sm:justify-between items-start' id='main-content'>
      <div className='lg:flex lg:justify-between'>
        <div className='max-w-2xl'>
          <h2
            className='text-4xl font-extrabold leading-10 text-gray-900 dark:text-white sm:text-4xl sm:leading-none sm:tracking-tight mb-4'
            data-testid='Header-heading'
          >
            Dashboard
          </h2>
          <p className='text-xl leading-7 text-gray-700 dark:text-gray-300' data-testid='Header-paragraph'>
            Visualize our progress. Get involved.{' '}
          </p>
        </div>
      </div>
      <div className='mt-6 sm:mt-0 flex flex-col gap-2 self-end text-center xs:flex-row'>
        <Button
          text='Contribution Guide'
          href='https://www.asyncapi.com/docs/community/010-contribution-guidelines'
          target='_blank'
        />
        <GithubButton text='View on Github' className='lg:mt-0' />
        <SlackButton className='lg:mt-0' />
      </div>
    </div>
  );
}

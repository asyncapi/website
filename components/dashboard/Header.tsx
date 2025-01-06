import React from 'react';

import Button from '../buttons/Button';
import GithubButton from '../buttons/GithubButton';
import SlackButton from '../buttons/SlackButton';

/**
 * @description Header component for the dashboard.
 */
export default function Header() {
  return (
    <div className='sm:flex sm:justify-between' id='main-content'>
      <div className='lg:flex lg:justify-between'>
        <div className='max-w-xl'>
          <h2
            className='text-4xl font-extrabold leading-10 text-gray-900 sm:text-4xl sm:leading-none sm:tracking-tight'
            data-testid='Header-heading'
          >
            Dashboard
          </h2>
          <p className='mt-5 text-xl leading-7 text-gray-700' data-testid='Header-paragraph'>
            Visualize our progress. Get involved.{' '}
          </p>
        </div>
      </div>
      <div className='mt-3 flex flex-col gap-x-2 gap-y-1 self-end text-center xs:flex-row'>
        <Button
          text='Contribution Guide'
          href='https://github.com/asyncapi?type=source#-contribute-to-asyncapi'
          target='_blank'
        />
        <GithubButton text='View on Github' className='lg:mt-0' />
        <SlackButton className='lg:mt-0' />
      </div>
    </div>
  );
}

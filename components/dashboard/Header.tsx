import React from 'react';

import Button from '../buttons/Button';
import GithubButton from '../buttons/GithubButton';
import SlackButton from '../buttons/SlackButton';

/**
 * @description Header component for the dashboard.
 */
export default function Header() {
  return (
    <div className="sm:flex sm:justify-between" id="main-content">
      <div className="lg:flex lg:justify-between">
        <div className="max-w-xl">
          <h2
            className="text-4xl font-extrabold leading-10 text-gray-900 sm:text-4xl sm:tracking-tight sm:leading-none"
            data-testid="Header-heading"
          >
            Dashboard
          </h2>
          <p
            className="mt-5 text-xl leading-7 text-gray-700"
            data-testid="Header-paragraph"
          >
            Visualize our progress. Get involved.{' '}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-y-1 gap-x-2 self-end mt-3 text-center xs:flex-row">
        <GithubButton text="View on Github" className="lg:mt-0" />
        <SlackButton className="lg:mt-0" />
      </div>
    </div>
  );
}

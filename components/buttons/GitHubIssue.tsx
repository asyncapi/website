import React from 'react';

export default function GitHubIssue({ className = '' }) {
  return (
    <a
      className={`flex flex-row justify-center rounded bg-black py-2 text-white shadow-md transition-all duration-500 ease-in-out hover:shadow-lg lg:w-6/12 ${className}`}
      href='https://github.com/asyncapi/website/issues/new?assignees=alequetzalli+-&labels=%F0%9F%93%91+docs&template=docs.yml&title=%5B%F0%9F%93%91+Docs%5D%3A+'
      target='_blank'
      rel='noopener noreferrer'
      data-testid='GithubIssue-Link'
    >
      <img src='/img/logos/github-fill.svg' className='mr-2' alt='Github:AsyncAPI' />
      Create Issue on GitHub
    </a>
  );
}

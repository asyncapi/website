import React from 'react';

/**
 * @description The GitHubIssue component is a button that links to the GitHub issue creation page.
 * @param {string} props.className - The class name to be applied to the button.
 */
export default function GitHubIssue({ className = '' }) {
  return (
    <a
      className={`flex flex-row justify-center rounded bg-black py-2 text-white 
                shadow-md transition-all duration-500 ease-in-out hover:shadow-lg lg:w-6/12 ${className}`}
      href='https://github.com/asyncapi/website/issues/new/choose'
      target='_blank'
      rel='noopener noreferrer'
      data-testid='GithubIssue-Link'
    >
      <img src='/img/logos/github-fill.svg' className='mr-2' alt='Github:AsyncAPI' />
      Create Issue on GitHub
    </a>
  );
}

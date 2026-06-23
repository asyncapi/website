import React from 'react';

interface IGitHubIssueProps {
  readonly className?: string;
  readonly href?: string;
}

/**
 * @description A button that links to the GitHub issue creation page.
 * @param {string} props.className - Additional class names to apply to the button.
 * @param {string} props.href - The URL to link to. Defaults to the general issue chooser page.
 */
export default function GitHubIssue({
  className = '',
  href = 'https://github.com/asyncapi/website/issues/new/choose'
}: IGitHubIssueProps) {
  return (
    <a
      className={`flex flex-row justify-center rounded bg-black py-2 text-white 
                shadow-md transition-all duration-500 ease-in-out hover:shadow-lg lg:w-6/12 ${className}`}
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      data-testid='GithubIssue-Link'
    >
      <img src='/img/logos/github-fill.svg' className='mr-2' alt='Github:AsyncAPI' />
      Create Issue on GitHub
    </a>
  );
}

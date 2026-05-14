import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import type { IPost } from '@/types/post';

import { buildDocsFeedbackIssueUrl, getDocsFeedbackContentHint } from '../utils/build-docs-feedback-issue-url';

interface IFeedbackProps {
  className?: string;
  post?: Pick<IPost, 'slug' | 'id' | 'isIndex'>;
}

function resolveSiteOrigin(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return (
    process.env.NEXT_PUBLIC_DEPLOY_PRIME_URL ||
    process.env.NEXT_PUBLIC_DEPLOY_URL ||
    'https://www.asyncapi.com'
  );
}

/**
 * @description Card that links to GitHub to file documentation feedback with page context prefilled.
 * @param {string} props.className - The class name for the component
 * @param {Pick<IPost, 'slug' | 'id' | 'isIndex'>} props.post - Current doc post (optional), used for source-file hints
 */
export default function Feedback({ className, post }: IFeedbackProps) {
  const { asPath } = useRouter();
  const pagePath = asPath.split('?')[0];

  const issueHref = useMemo(() => {
    const origin = resolveSiteOrigin();
    const pageUrl = `${origin}${pagePath}`;
    const contentHint = post ? getDocsFeedbackContentHint(post) : null;
    return buildDocsFeedbackIssueUrl({ pagePath, pageUrl, contentHint });
  }, [pagePath, post?.slug, post?.id, post?.isIndex]);

  return (
    <div className={`flex flex-col rounded-md border border-gray-200 p-4 shadow-md ${className ?? ''}`}>
      <div className='flex flex-row'>
        <img src='/img/illustrations/icons/icon.svg' className='my-auto sm:size-14 lg:w-16' alt='' aria-hidden='true' />
        <div className='ml-4 flex flex-col'>
          <div className='text-xl'>Was this helpful?</div>
          <div className='text-sm text-gray-500'>
            Help us improve the docs by opening an issue on GitHub. We include this page&apos;s URL so we can find the
            right content.
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <a
          className='flex flex-row justify-center rounded bg-black py-2 text-white shadow-md transition-all duration-500 ease-in-out hover:shadow-lg'
          href={issueHref}
          target='_blank'
          rel='noopener noreferrer'
          data-testid='GithubIssue-Link'
        >
          <img src='/img/logos/github-fill.svg' className='mr-2' alt='GitHub' />
          Give feedback on GitHub
        </a>
      </div>
    </div>
  );
}

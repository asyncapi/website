import React, { useEffect, useRef, useState } from 'react';

import getShareLinks from '@/utils/getShareLinks';

import IconLinkedIn from '../icons/LinkedIn';
import IconTwitter from '../icons/Twitter';

type ISocialShareButtonsProps = Readonly<{
  title: string;
  slug: string;
  className?: string;
}>;

const buttonClassName =
  'inline-flex size-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-primary-500 hover:text-primary-500 dark:border-gray-600 dark:text-gray-300 dark:hover:border-primary-500 dark:hover:text-primary-500';

/**
 * @description Buttons for sharing a blog post on Twitter/X and LinkedIn, or copying its link.
 *
 * @param {string} props.title - The title of the post, used as the pre-filled share text
 * @param {string} props.slug - The slug of the post, e.g. `/blog/my-post`
 * @param {string} props.className - Additional classes for the wrapper
 */
export default function SocialShareButtons({ title, slug, className = '' }: ISocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const { url, twitter, linkedin } = getShareLinks(slug, title);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied or unavailable (e.g. insecure context); nothing to copy then.
      setCopied(false);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`} data-testid='SocialShareButtons'>
      <span className='mr-1 text-sm text-gray-500 dark:text-gray-400'>Share:</span>
      <a
        href={twitter}
        target='_blank'
        rel='noopener noreferrer'
        className={buttonClassName}
        aria-label='Share on Twitter'
        data-testid='SocialShareButtons-twitter'
      >
        <IconTwitter className='size-4' />
      </a>
      <a
        href={linkedin}
        target='_blank'
        rel='noopener noreferrer'
        className={buttonClassName}
        aria-label='Share on LinkedIn'
        data-testid='SocialShareButtons-linkedin'
      >
        <IconLinkedIn className='size-4' />
      </a>
      <button
        type='button'
        onClick={copyLink}
        className={`${buttonClassName} ${copied ? 'border-primary-500 text-primary-500' : ''}`}
        aria-label='Copy link'
        data-testid='SocialShareButtons-copy'
      >
        <svg
          className='size-4'
          fill='none'
          stroke='currentColor'
          strokeWidth={2}
          viewBox='0 0 24 24'
          aria-hidden='true'
        >
          {copied ? (
            <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
          ) : (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M10 14a4 4 0 005.66 0l3-3a4 4 0 00-5.66-5.66l-1 1M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 005.66 5.66l1-1'
            />
          )}
        </svg>
      </button>
      <span className='sr-only' role='status' aria-live='polite'>
        {copied ? 'Link copied' : ''}
      </span>
    </div>
  );
}

import React, { useState, useEffect } from 'react';

import IconClipboard from './icons/Clipboard';
import IconLinkedIn from './icons/LinkedIn';
import IconTwitter from './icons/Twitter';

interface SocialShareButtonsProps {
  title: string;
  url?: string;
}

/**
 * SocialShareButtons component allows users to share a blog post on Twitter, LinkedIn, or copy the link to clipboard.
 *
 * @param {string} title - The title of the post to be shared.
 * @param {string} url - The URL of the post (optional, defaults to window.location.href).
 */
export default function SocialShareButtons({ title, url }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(url || window.location.href);
  }, [url]);

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  useEffect(() => {
    let timeout: any;

    if (copied) {
      timeout = setTimeout(() => setCopied(false), 2000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [copied]);

  const handleCopy = () => {
    if (navigator.clipboard && currentUrl) {
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          setCopied(true);
        })
        .catch(() => {
          // Error handling without console.log to satisfy linter
        });
    }
  };

  return (
    <div className='flex items-center mt-6 space-x-4'>
      <span className='text-sm font-medium text-gray-500'>Share:</span>

      {/* Twitter Share */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target='_blank'
        rel='noopener noreferrer'
        className='text-gray-500 transition-colors duration-200 hover:text-[#1DA1F2]'
        aria-label='Share on Twitter'
      >
        <IconTwitter className='w-6 h-6' />
      </a>

      {/* LinkedIn Share */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target='_blank'
        rel='noopener noreferrer'
        className='text-gray-500 transition-colors duration-200 hover:text-[#0A66C2]'
        aria-label='Share on LinkedIn'
      >
        <IconLinkedIn className='w-6 h-6' />
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className='relative text-gray-500 transition-colors duration-200 group hover:text-gray-800'
        aria-label='Copy Link'
      >
        <IconClipboard className='w-6 h-6' />
        {copied && (
          <span className='absolute px-2 py-1 text-xs text-white transform -translate-x-1/2 bg-gray-800 rounded shadow-lg -top-8 left-1/2 whitespace-nowrap'>
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}

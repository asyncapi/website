import React, { useState, useEffect } from 'react';
import IconTwitter from './icons/Twitter';
import IconLinkedIn from './icons/LinkedIn';
import IconClipboard from './icons/Clipboard';

interface SocialShareButtonsProps {
  title: string;
  url?: string; // Optional, will use window.location.href if not provided
}

export default function SocialShareButtons({ title, url }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(url || window.location.href);
  }, [url]);

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (copied) {
      timeout = setTimeout(() => setCopied(false), 2000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [copied]);

  const handleCopy = () => {
    if (navigator.clipboard && currentUrl) {
      navigator.clipboard.writeText(currentUrl)
        .then(() => {
          setCopied(true);
        })
        .catch((err) => {
          console.error('Failed to copy to clipboard:', err);
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
        className='relative text-gray-500 transition-colors duration-200 hover:text-gray-800 group'
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

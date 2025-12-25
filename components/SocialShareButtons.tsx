import React, { useState } from 'react';
import IconTwitter from './icons/Twitter';
import IconLinkedIn from './icons/LinkedIn';
import IconClipboard from './icons/Clipboard';

interface SocialShareButtonsProps {
  title: string;
  url?: string; // Optional, will use window.location.href if not provided
}

export default function SocialShareButtons({ title, url }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => {
    if (typeof window !== 'undefined') {
      return url || window.location.href;
    }
    return '';
  };

  const currentUrl = getUrl();
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="flex items-center space-x-4 mt-6">
      <span className="text-gray-500 text-sm font-medium">Share:</span>
      
      {/* Twitter Share */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-[#1DA1F2] transition-colors duration-200"
        aria-label="Share on Twitter"
      >
        <IconTwitter className="w-6 h-6" />
      </a>

      {/* LinkedIn Share */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-[#0A66C2] transition-colors duration-200"
        aria-label="Share on LinkedIn"
      >
        <IconLinkedIn className="w-6 h-6" />
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="text-gray-500 hover:text-gray-800 transition-colors duration-200 relative group"
        aria-label="Copy Link"
      >
        <IconClipboard className="w-6 h-6" />
        {copied && (
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}

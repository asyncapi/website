import { faFacebookF, faLinkedinIn, faRedditAlien, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo } from 'react';

/**
 * Props for the SocialShare component
 */
type Props = {
  url?: string;
  path?: string;
  title: string;
  hashtags?: string[];
  text?: string;
  className?: string;
};

/**
 * Helper to encode URI components safely
 * @param s - The string to encode
 */
function encode(s?: string) {
  return encodeURIComponent(s || '');
}

/**
 * SocialShare Component
 * Renders a row of social media sharing buttons (X, LinkedIn, Reddit, Facebook).
 * Automatically generates sharing URLs based on the provided title and path.
 * @param {Props} props - The component props
 * @returns {JSX.Element | null} The rendered button group or null if URL cannot be determined
 */
export default function SocialShare({ url, path, title, hashtags = [], text = '', className = '' }: Props) {
  const shareUrl = useMemo(() => {
    if (url) return url;

    const base = process.env.NEXT_PUBLIC_SITE_URL;

    if (base) {
      const p = path?.replace(/^\//, '') ?? '';

      return `${base.replace(/\/$/, '')}/${p}`;
    }

    if (typeof window !== 'undefined') {
      const { origin } = window.location;
      const p = path ?? '';

      return `${origin}${p}`;
    }

    return '';
  }, [url, path]);

  const hashtagParam = hashtags.length > 0 ? hashtags.join(',') : undefined;

  const twitterParams = [
    text ? `text=${encode(`${text} ${title}`)}` : `text=${encode(title)}`,
    shareUrl ? `url=${encode(shareUrl)}` : '',
    hashtagParam ? `hashtags=${encode(hashtagParam)}` : ''
  ]
    .filter(Boolean)
    .join('&');

  const twitterShare = `https://twitter.com/intent/tweet?${twitterParams}`;

  const linkedinParams = [shareUrl ? `url=${encode(shareUrl)}` : ''].filter(Boolean).join('&');

  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?${linkedinParams}`;

  const redditParams = [shareUrl ? `url=${encode(shareUrl)}` : '', title ? `title=${encode(title)}` : '']
    .filter(Boolean)
    .join('&');

  const redditShare = `https://www.reddit.com/submit?${redditParams}`;

  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encode(shareUrl)}`;

  if (!shareUrl) return null;

  const openInNewWindow = (href: string) => {
    if (typeof window === 'undefined') return;
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  const handleClick = (href: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    openInNewWindow(href);
  };

  const iconClass = 'w-4 h-4 transition-transform group-hover:scale-125';

  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      {/* X / Twitter */}
      <button
        aria-label='Share on X (Twitter)'
        title='Share on X (Twitter)'
        type='button'
        onClick={handleClick(twitterShare)}
        className='group inline-flex items-center gap-2 whitespace-nowrap rounded-md border px-3 py-1 text-sm font-medium text-gray-700 hover:text-black transition-transform duration-200 hover:scale-110 hover:border-black/50 focus:outline-none focus:ring-2 focus:ring-offset-2'
      >
        <FontAwesomeIcon icon={faXTwitter} className={iconClass} aria-hidden />
      </button>

      {/* LinkedIn */}
      <button
        aria-label='Share on LinkedIn'
        title='Share on LinkedIn'
        type='button'
        onClick={handleClick(linkedinShare)}
        className='group inline-flex items-center gap-2 whitespace-nowrap rounded-md border px-3 py-1 text-sm font-medium text-gray-700 hover:text-[#0077B5] transition-transform duration-200 hover:scale-110 hover:border-[#0077B5]/60 focus:outline-none focus:ring-2 focus:ring-offset-2'
      >
        <FontAwesomeIcon icon={faLinkedinIn} className={iconClass} aria-hidden />
      </button>

      {/* Reddit */}
      <button
        aria-label='Share on Reddit'
        title='Share on Reddit'
        type='button'
        onClick={handleClick(redditShare)}
        className='group inline-flex items-center gap-2 whitespace-nowrap rounded-md border px-3 py-1 text-sm font-medium text-gray-700 hover:text-[#FF5700] transition-transform duration-200 hover:scale-110 hover:border-[#FF5700]/60 focus:outline-none focus:ring-2 focus:ring-offset-2'
      >
        <FontAwesomeIcon icon={faRedditAlien} className={iconClass} aria-hidden />
      </button>

      {/* Facebook */}
      <button
        aria-label='Share on Facebook'
        title='Share on Facebook'
        type='button'
        onClick={handleClick(facebookShare)}
        className='group inline-flex items-center gap-2 whitespace-nowrap rounded-md border px-3 py-1 text-sm font-medium text-gray-700 hover:text-[#1877F2] transition-transform duration-200 hover:scale-110 hover:border-[#1877F2]/60 focus:outline-none focus:ring-2 focus:ring-offset-2'
      >
        <FontAwesomeIcon icon={faFacebookF} className={iconClass} aria-hidden />
      </button>
    </div>
  );
}

import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faRedditAlien,
  faFacebookF,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';

type Props = {
  url?: string;
  path?: string;
  title: string;
  hashtags?: string[];
  text?: string;
  className?: string;
};

function encode(s?: string) {
  return encodeURIComponent(s ?? '');
}

export default function SocialShare({
  url,
  path,
  title,
  hashtags = [],
  text = '',
  className = '',
}: Props) {
  const shareUrl = useMemo(() => {
    if (url) return url;
    const base = process.env.NEXT_PUBLIC_SITE_URL;
    if (base) {
      const p = path?.replace(/^\//, '') ?? '';
      return `${base.replace(/\/$/, '')}/${p}`;
    }
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      const p = path ?? '';
      return `${origin}${p}`;
    }
    return '';
  }, [url, path]);

  const hashtagParam = hashtags.length > 0 ? hashtags.join(',') : undefined;

  const twitterParams = [
    text
      ? `text=${encode(text + (text ? ' ' : '') + title)}`
      : `text=${encode(title)}`,
    shareUrl ? `url=${encode(shareUrl)}` : '',
    hashtagParam ? `hashtags=${encode(hashtagParam)}` : '',
  ]
    .filter(Boolean)
    .join('&');

  const twitterShare = `https://twitter.com/intent/tweet?${twitterParams}`;

  const linkedinParams = [
    shareUrl ? `url=${encode(shareUrl)}` : '',
    title ? `title=${encode(title)}` : '',
  ]
    .filter(Boolean)
    .join('&');

  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?${linkedinParams}`;

  const redditParams = [
    shareUrl ? `url=${encode(shareUrl)}` : '',
    title ? `title=${encode(title)}` : '',
  ]
    .filter(Boolean)
    .join('&');
  const redditShare = `https://www.reddit.com/submit?${redditParams}`;

  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encode(shareUrl)}`;

  if (!shareUrl) return null;

  const openInNewWindow = (href: string) => {
    if (typeof window === 'undefined') return;
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  const handleClick =
    (href: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      openInNewWindow(href);
    };

  const iconClass = 'w-4 h-4';

  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      {/* X / Twitter */}
      <button
        aria-label={`Share "${title}" on X (Twitter)`}
        title="Share on X (Twitter)"
        type="button"
        onClick={handleClick(twitterShare)}
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border px-3 py-1 text-sm font-medium transition hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        <FontAwesomeIcon icon={faXTwitter} className={iconClass} aria-hidden />
      </button>

      {/* LinkedIn */}
      <button
        aria-label={`Share "${title}" on LinkedIn`}
        title="Share on LinkedIn"
        type="button"
        onClick={handleClick(linkedinShare)}
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border px-3 py-1 text-sm font-medium transition hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        <FontAwesomeIcon
          icon={faLinkedinIn}
          className={iconClass}
          aria-hidden
        />
      </button>

      {/* Reddit */}
      <button
        aria-label={`Share "${title}" on Reddit`}
        title="Share on Reddit"
        type="button"
        onClick={handleClick(redditShare)}
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border px-3 py-1 text-sm font-medium transition hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        <FontAwesomeIcon
          icon={faRedditAlien}
          className={iconClass}
          aria-hidden
        />
      </button>

      {/* Facebook */}
      <button
        aria-label={`Share "${title}" on Facebook`}
        title="Share on Facebook"
        type="button"
        onClick={handleClick(facebookShare)}
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border px-3 py-1 text-sm font-medium transition hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        <FontAwesomeIcon icon={faFacebookF} className={iconClass} aria-hidden />
      </button>
    </div>
  );
}

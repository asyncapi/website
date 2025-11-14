import React, { useState, useEffect, useRef } from 'react';

interface LazyYouTubeEmbedProps {
  /** YouTube video ID */
  id: string;
  /** Additional URL parameters (e.g., '?start=86') */
  appendSrc?: string;
  /** Title for accessibility */
  title?: string;
  /** Aspect ratio class (default: aspect-video) */
  aspectRatio?: string;
  /** Whether to show thumbnail (default: true) */
  showThumbnail?: boolean;
}

/**
 * Lightweight YouTube embed component that only loads YouTube scripts when user clicks to play
 * This significantly improves page load performance by deferring heavy YouTube JavaScript
 */
export default function LazyYouTubeEmbed({
  id,
  appendSrc = '',
  title = 'YouTube video player',
  aspectRatio = 'aspect-video',
  showThumbnail = true
}: LazyYouTubeEmbedProps) {

  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate thumbnail URL
  const thumbnailUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  const fallbackThumbnailUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  let embedParams = '';
  if (appendSrc) {
    // If appendSrc starts with ?, use it as is, otherwise prepend &
    embedParams = appendSrc.startsWith('?') ? appendSrc : `?${appendSrc}`;
  } else {
    embedParams = '?';
  }
  
  // Add autoplay parameter when user clicks
  const embedUrl = `https://www.youtube.com/embed/${id}${embedParams}${embedParams.includes('?') && embedParams !== '?' ? '&' : ''}autoplay=1&rel=0&modestbranding=1`;

  const handleClick = () => {
    setIsPlaying(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };
 

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-lg bg-black ${aspectRatio}`}
    >
      {!isPlaying ? (
        <div
          className='absolute inset-0 flex cursor-pointer items-center justify-center bg-black'
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role='button'
          tabIndex={0}
          aria-label={`Play video: ${title}`}
        >
          {showThumbnail && (
            <>
              <img
                src={thumbnailUrl}
                alt={title}
                className='absolute inset-0 h-full w-full object-cover'
                loading='lazy'
                fetchPriority='low'
                onError={(e) => {
                  // Fallback to lower quality thumbnail if maxresdefault doesn't exist
                  const target = e.target as HTMLImageElement;
                  if (target.src !== fallbackThumbnailUrl) {
                    target.src = fallbackThumbnailUrl;
                  }
                }}
              />
              <div className='absolute inset-0 bg-black bg-opacity-30 transition-opacity hover:bg-opacity-20' />
            </>
          )}
          {/* Play button */}
          <div className='relative z-10 flex items-center justify-center'>
            <div className='rounded-full bg-red-600 p-4 transition-transform hover:scale-110'>
              <svg
                className='h-12 w-12 text-white'
                fill='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path d='M8 5v14l11-7z' />
              </svg>
            </div>
          </div>
          
          <div className='absolute bottom-4 left-1/2 z-10 -translate-x-1/2 transform text-white'>
            <span className='text-sm font-medium'>Click to play</span>
          </div>
        </div>
      ) : (
        <iframe
          className='absolute inset-0 h-full w-full'
          src={`${embedUrl}&autoplay=1`}
          title={title}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
          loading='lazy'
        />
      )}
    </div>
  );
}
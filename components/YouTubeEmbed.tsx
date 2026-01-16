import React, { useEffect, useId, useRef } from 'react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

interface YouTubeEmbedProps {
  id: string;
  appendSrc?: string;
}

export default function YouTubeEmbed({ id, appendSrc = '' }: YouTubeEmbedProps) {
  const playerId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const pendingPlayersRef = useRef<(() => void)[]>([]);
  const isAPIReadyRef = useRef(false);

  useEffect(() => {
    const originalCallback = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      isAPIReadyRef.current = true;
      originalCallback?.();
      pendingPlayersRef.current.forEach((fn) => fn());
      pendingPlayersRef.current = [];
    };

    // If API already loaded before this effect ran
    if (window.YT && window.YT.Player) {
      isAPIReadyRef.current = true;
    }

    return () => {
      window.onYouTubeIframeAPIReady = originalCallback;
    };
  }, []);

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');

      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];

      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, []);

  // Initialize Player
  useEffect(() => {
    let player: any;

    const createPlayer = () => {
      if (window.YT && window.YT.Player && containerRef.current) {
        player = new window.YT.Player(containerRef.current, {
          height: '100%',
          width: '100%',
          videoId: id,
          playerVars: {
            rel: 0,
            modestbranding: 1,
            enablejsapi: 1,
            origin: window.location.origin,
            autoplay: 1
          },
          events: {
            onReady: (event: any) => {
              if (appendSrc && appendSrc.includes('start=')) {
                const startMatch = appendSrc.match(/start=(\d+)/);

                if (startMatch && startMatch[1]) {
                  event.target.seekTo(parseInt(startMatch[1], 10), true);
                }
              }
              event.target.playVideo();
            }
          }
        });
        playerRef.current = player;
      }
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else if (isAPIReadyRef.current) {
      createPlayer();
    } else {
      pendingPlayersRef.current.push(createPlayer);
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className='relative w-full pt-[56.25%] bg-black overflow-hidden rounded-lg group'>
      <div id={playerId} ref={containerRef} className='absolute top-0 left-0 w-full h-full' />
    </div>
  );
}

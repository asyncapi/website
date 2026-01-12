import React, { useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}

interface YouTubeEmbedProps {
    id: string;
    appendSrc?: string;
    title?: string;
}

export default function YouTubeEmbed({ id, appendSrc = '', title = 'YouTube video player' }: YouTubeEmbedProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<any>(null);
    const [currentVideoId] = useState(id);

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
                    videoId: currentVideoId,
                    playerVars: {
                        rel: 0,
                        modestbranding: 1,
                        enablejsapi: 1,
                        origin: window.location.origin,
                        autoplay: 1,
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
                        },
                    },
                });
                playerRef.current = player;
            }
        };

        if (window.YT && window.YT.Player) {
            createPlayer();
        } else {
            window.onYouTubeIframeAPIReady = () => {
                createPlayer();
            };
        }

        return () => {
            if (player && player.destroy) {
                player.destroy();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentVideoId]);

    return (
        <div className="relative w-full pt-[56.25%] bg-black overflow-hidden rounded-lg group">
            <div id="youtube-player" ref={containerRef} className="absolute top-0 left-0 w-full h-full" />
        </div>
    );
}

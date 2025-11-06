import React from 'react';

import videoData from '../../config/newsroom_videos.json';
import YouTubeCard from './YouTubeCard';

interface NewsroomYoutubeProps {
  className?: string;
}

/**
 * Newsroom Youtube component displays a grid of YouTubeCard components.
 * @description This component displays the latest videos from the AsyncAPI YouTube channel.
 * @param {string} [props.className=''] - Additional CSS classes for styling.
 */
export default function NewsroomYoutube({ className = '' }: NewsroomYoutubeProps) {
  // Only show the first 3 videos
  const videos = videoData.slice(0, 3);

  return (
    <div className={className} data-testid='NewsroomYoutube-main'>
      <ul className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {videos.map((video, index) => (
          <YouTubeCard key={index} video={video} />
        ))}
      </ul>
    </div>
  );
}

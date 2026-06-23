import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import ArrowRight from '../icons/ArrowRight';
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';

interface YouTubeVideo {
  image_url: string;
  title: string;
  description: string;
  videoId: string;
}

interface YouTubeCardProps {
  video: YouTubeVideo;
}

/**
 * @description This component displays a YouTube video card with an image, title, description, and link to the video.
 * @param {Props} video - The video object containing image, title, description, and videoId.
 */
export default function YouTubeCard({ video }: YouTubeCardProps) {
  return (
    <li className='h-full list-none'>
      <a href={`https://youtube.com/watch?v=${video.videoId}`} target='_blank' rel='noreferrer'>
        <article className='h-full'>
          <div className='flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-300 ease-in-out hover:shadow-lg dark:border-gray-800 dark:bg-dark-background'>
            <img data-testid='YoutubeCard-img' src={video.image_url} alt='video' className='h-36 w-full object-cover' />

            <div className='flex flex-1 flex-col justify-between p-4' data-testid='YoutubeCard-main'>
              <div>
                <Heading
                  level={HeadingLevel.h3}
                  typeStyle={HeadingTypeStyle.smSemibold}
                  className='line-clamp-2 text-sm text-gray-900 dark:text-white'
                >
                  {video.title}
                </Heading>
                <Paragraph
                  typeStyle={ParagraphTypeStyle.sm}
                  className='mt-2 line-clamp-2 text-xs text-gray-600 dark:text-gray-300'
                >
                  {video.description}
                </Paragraph>
              </div>

              <div className='mt-3 block border-t border-gray-200 pt-3 dark:border-gray-700'>
                <span className='text-xs font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300'>
                  Watch on Youtube
                  <ArrowRight className='ml-1 inline w-3' />
                </span>
              </div>
            </div>
          </div>
        </article>
      </a>
    </li>
  );
}

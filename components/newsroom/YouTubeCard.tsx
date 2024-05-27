import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import ArrowRight from '../icons/ArrowRight';
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';
import TextLink from '../typography/TextLink';

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
    <li className={'min-w-full h-full max-w-md rounded-lg px-2 pb-6'}>
      <article className='h-full rounded-lg'>
        <div
          className={
            'flex h-full cursor-pointer flex-col divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg'
          }
        >
          <img data-testid='YoutubeCard-img' src={video.image_url} alt='video' className='h-60 w-full object-cover' />

          <div className='flex flex-1 flex-col justify-between bg-white p-6' data-testid='YoutubeCard-main'>
            <div>
              <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.smSemibold} className='mt-2'>
                {video.title}
              </Heading>
              <Paragraph typeStyle={ParagraphTypeStyle.md} className='mt-3 break-words'>
                {video.description}
              </Paragraph>
            </div>

            <div className='mt-6 block'>
              <TextLink href={`https://youtube.com/watch?v=${video.videoId}`} target='_blank'>
                Watch on Youtube
                <ArrowRight className='inline w-6' />
              </TextLink>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}

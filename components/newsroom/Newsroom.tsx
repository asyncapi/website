import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import ArrowRight from '../icons/ArrowRight';
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';
import TextLink from '../typography/TextLink';
import NewsroomArticle from './NewsroomArticle';
import NewsroomBlogPosts from './NewsroomBlogPosts';
import NewsroomYoutube from './NewsroomYoutube';

/**
 * @description This component displays the latest updates, blog posts, news, and videos.
 */
export default function Newsroom() {
  return (
    <>
      <div className='mt-12 text-center' data-testid='Newsroom-main'>
        <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.lg}>
          Latest Updates
        </Heading>
        <Paragraph typeStyle={ParagraphTypeStyle.md} className='mx-auto mt-5 max-w-2xl'>
          Get a glimpse of latest news, events, and blog posts. Want to publish a blog post? We love community
          stories.&nbsp;
          <TextLink href='https://github.com/asyncapi/website/issues/new?template=blog.md' target='_blank'>
            Submit yours!
          </TextLink>
        </Paragraph>
      </div>

      <div className='my-20 -mr-2 flex-row lg:flex' data-testid='Newsroom-sub-div'>
        <div className='pt-4 text-center lg:w-1/4 lg:text-left'>
          <Heading level={HeadingLevel.h4} typeStyle={HeadingTypeStyle.mdSemibold}>
            From the blog
          </Heading>
          <Paragraph typeStyle={ParagraphTypeStyle.md} className='mt-5'>
            Check out these articles written by community members
          </Paragraph>
          <div className='my-5' data-testid='Newsroom-Blog-Link'>
            <TextLink href='/blog' className='mt-5'>
              Read all blog posts
              <ArrowRight className='inline w-6' />
            </TextLink>
          </div>
        </div>
        <div className='lg:w-3/4' data-testid='Newsroom-Blog'>
          <NewsroomBlogPosts />
        </div>
      </div>

      <hr />

      <div className='my-20 flex flex-col lg:flex-row'>
        <div className='pt-4 text-center lg:w-1/4 lg:text-left'>
          <Heading level={HeadingLevel.h4} typeStyle={HeadingTypeStyle.mdSemibold}>
            Latest News
          </Heading>
          <Paragraph typeStyle={ParagraphTypeStyle.md} className='mt-5'>
            Read about what people are <br /> saying about AsyncAPI
          </Paragraph>
          <div className='my-5' data-testid='Newsroom-Twitter-Link'>
            <TextLink href='https://twitter.com/AsyncAPISpec' className='mt-4' target='_blank'>
              Follow us on Twitter
              <ArrowRight className='inline w-6' />
            </TextLink>
          </div>
        </div>

        <div className='w-full flex-row items-stretch justify-between md:flex md:h-120 lg:w-3/4'>
          <div className='relative flex w-full flex-col overflow-y-auto'>
            <div className='min-h-0'>
              <div className='md:t-0 md:b-0 md:l-0 md:r-0 size-full md:absolute'>
                <NewsroomArticle />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className='my-20 -mr-2 flex-row lg:flex'>
        <div className='pt-4 text-center lg:w-1/4 lg:text-left'>
          <Heading level={HeadingLevel.h4} typeStyle={HeadingTypeStyle.mdSemibold}>
            Video & Live Streams
          </Heading>
          <Paragraph typeStyle={ParagraphTypeStyle.md} className='mt-5'>
            Watch our latest videos and live streams on the AsyncAPI YouTube channel
          </Paragraph>
          <div className='my-5' data-testid='Newsroom-Youtube'>
            <TextLink href='https://www.youtube.com/c/AsyncAPI' className='mt-4' target='_blank'>
              Visit our YouTube channel
              <ArrowRight className='inline w-6' />
            </TextLink>
          </div>
        </div>
        <div className='lg:w-3/4'>
          <NewsroomYoutube />
        </div>
      </div>
    </>
  );
}

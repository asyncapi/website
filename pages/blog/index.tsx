import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

import Empty from '@/components/illustrations/Empty';
import GenericLayout from '@/components/layout/GenericLayout';
import Loader from '@/components/Loader';
import BlogPostItem from '@/components/navigation/BlogPostItem';
import Filter from '@/components/navigation/Filter';
import Heading from '@/components/typography/Heading';
import Paragraph from '@/components/typography/Paragraph';
import TextLink from '@/components/typography/TextLink';
import BlogContext from '@/context/BlogContext';
import type { IBlogPost } from '@/types/post';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

/**
 * @description The BlogIndexPage is the blog index page of the website.
 */
export default function BlogIndexPage() {
  const router = useRouter();
  const { navItems } = useContext(BlogContext);

  const [posts, setPosts] = useState<IBlogPost[]>(
    navItems
      ? navItems.sort((i1: IBlogPost, i2: IBlogPost) => {
          const i1Date = new Date(i1.date);
          const i2Date = new Date(i2.date);

          if (i1.featured && !i2.featured) return -1;
          if (!i1.featured && i2.featured) return 1;

          return i2Date.getTime() - i1Date.getTime();
        })
      : []
  );
  const [isClient, setIsClient] = useState(false);

  const onFilter = (data: IBlogPost[]) => setPosts(data);
  const toFilter = [
    {
      name: 'type'
    },
    {
      name: 'authors',
      unique: 'name'
    },
    {
      name: 'tags'
    }
  ];
  const clearFilters = () => {
    router.push(`${router.pathname}`, undefined, {
      shallow: true
    });
  };
  const showClearFilters = Object.keys(router.query).length > 0;

  const description = 'Find the latest and greatest stories from our community';
  const image = '/img/social/blog.webp';

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <GenericLayout title='Blog' description={description} image={image} wide>
      <div className='relative px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-28 lg:pt-12' id='main-content'>
        <div className='absolute inset-0'>
          <div className='h-1/3 bg-white sm:h-2/3'></div>
        </div>
        <div className='relative mx-auto max-w-7xl'>
          <div className='text-center'>
            <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.lg}>
              Welcome to our blog!
            </Heading>
            <Paragraph className='mx-auto mt-3 max-w-2xl sm:mt-4'>
              Find the latest and greatest stories from our community
            </Paragraph>
            <Paragraph typeStyle={ParagraphTypeStyle.md} className='mx-auto mt-4 max-w-2xl'>
              Want to publish a blog post? We love community stories.{' '}
              <TextLink href='https://github.com/asyncapi/website/issues/new?template=blog.md' target='_blank'>
                Submit yours!
              </TextLink>
            </Paragraph>
            <Paragraph typeStyle={ParagraphTypeStyle.md} className='mx-auto mt-1 max-w-2xl'>
              We have an
              <img
                className='ml-1 text-primary-500 hover:text-primary-300'
                style={{ display: 'inline' }}
                src='/img/logos/rss.svg'
                alt='RSS feed'
                height='18px'
                width='18px'
              />
              <TextLink href='/rss.xml'> RSS Feed</TextLink>, too!
            </Paragraph>
          </div>
          <div className='mx:64 mt-12 md:flex md:justify-center lg:justify-center'>
            <Filter
              data={navItems || []}
              onFilter={onFilter}
              className='md: mx-px mt-1 w-full md:mt-0 md:w-1/5 md:text-sm'
              checks={toFilter}
            />
            {showClearFilters && (
              <button
                type='button'
                className='bg-none text-md mt-1 rounded-md border border-gray-200 px-4 py-2 font-semibold tracking-heading text-gray-800 shadow-none transition-all duration-500 ease-in-out hover:text-gray-700 md:mt-0 md:py-0'
                onClick={clearFilters}
              >
                <span className='inline-block'>Clear filters</span>
              </button>
            )}
          </div>
          <div>
            {Object.keys(posts).length === 0 && (
              <div className='mt-16 flex flex-col items-center justify-center'>
                <Empty />
                <p className='mx-auto mt-3 max-w-2xl text-xl leading-7 text-gray-500'>No post matches your filter</p>
              </div>
            )}
            {Object.keys(posts).length > 0 && isClient && (
              <ul className='mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3'>
                {posts.map((post, index) => (
                  <BlogPostItem key={index} post={post} />
                ))}
              </ul>
            )}
            {Object.keys(posts).length > 0 && !isClient && (
              <div className='h-screen w-full'>
                <Loader loaderText='Loading Blogs' className='mx-auto my-60' pulsating />
              </div>
            )}
          </div>
        </div>
      </div>
    </GenericLayout>
  );
}

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
 * Blog index page component.
 * @returns {JSX.Element} The rendered blog index page.
 */
export default function BlogIndexPage() {
  const router = useRouter();
  const { navItems } = useContext(BlogContext);

  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState(9);

  useEffect(() => {
    if (navItems) {
      const sortedPosts = navItems.sort((i1: IBlogPost, i2: IBlogPost) => {
        const i1Date = new Date(i1.date);
        const i2Date = new Date(i2.date);

        if (i1.featured && !i2.featured) return -1;
        if (!i1.featured && i2.featured) return 1;

        return i2Date.getTime() - i1Date.getTime();
      });

      setPosts(sortedPosts);
    }
  }, [navItems]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const loadMore = () => setVisiblePosts((prev) => prev + 9);

  const onFilter = (data: IBlogPost[]) => {
    setPosts(data);
    setVisiblePosts(9);
  };

  const toFilter = [{ name: 'type' }, { name: 'authors', unique: 'name' }, { name: 'tags' }];

  const clearFilters = () => {
    router.push(router.pathname, undefined, { shallow: true });
  };

  const showClearFilters = Object.keys(router.query).length > 0;

  const description = 'Find the latest and greatest stories from our community';
  const image = '/img/social/blog.webp';

  return (
    <GenericLayout title='Blog' description={description} image={image} wide>
      <div className='relative px-6 pb-16 pt-8 sm:px-8 lg:px-12 lg:pb-24 lg:pt-12' id='main-content'>
        <div className='relative mx-auto max-w-7xl'>
          <div className='text-center'>
            <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.xl}>
              Welcome to our blog!
            </Heading>
            <Paragraph className='mx-auto mt-3 max-w-2xl text-lg sm:mt-4'>
              Find the latest and greatest stories from our community.
            </Paragraph>
            <Paragraph typeStyle={ParagraphTypeStyle.md} className='mx-auto mt-4 max-w-2xl'>
              Want to publish a blog post? We love community stories.{' '}
              <TextLink href='https://github.com/asyncapi/website/issues/new?template=blog.md' target='_blank'>
                Submit yours!
              </TextLink>
            </Paragraph>
            <Paragraph typeStyle={ParagraphTypeStyle.md} className='mx-auto mt-1 max-w-2xl'>
              We have an{' '}
              <img
                className='ml-1 inline text-primary-500 hover:text-primary-300'
                src='/img/logos/rss.svg'
                alt='RSS feed'
                height='18px'
                width='18px'
              />{' '}
              <TextLink href='/rss.xml'>RSS Feed</TextLink>, too!
            </Paragraph>
          </div>

          {/* Filter Section */}
          <div className='mt-12 flex flex-wrap justify-center gap-4'>
            <Filter data={navItems || []} onFilter={onFilter} className='w-full text-sm md:w-1/5' checks={toFilter} />
            {showClearFilters && (
              <button
                type='button'
                className='bg-none rounded-md border border-gray-200 px-4 py-2 font-semibold text-gray-800 shadow-none transition-all hover:text-gray-700'
                onClick={clearFilters}
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Blog Posts Section */}
          <div>
            {posts.length === 0 && (
              <div className='mt-16 flex flex-col items-center justify-center'>
                <Empty />
                <p className='mx-auto mt-3 max-w-2xl text-xl leading-7 text-gray-500'>No post matches your filter</p>
              </div>
            )}

            {posts.length > 0 && isClient && (
              <ul className='mx-auto mt-10 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3'>
                {posts.slice(0, visiblePosts).map((post, index) => (
                  <BlogPostItem key={index} post={post} />
                ))}
              </ul>
            )}

            {posts.length > 0 && !isClient && (
              <div className='h-screen w-full'>
                <Loader loaderText='Loading Blogs' className='mx-auto my-60' pulsating />
              </div>
            )}

            {visiblePosts < posts.length && isClient && (
              <div className='mt-8 flex justify-center'>
                <button
                  type='button'
                  className='rounded-md bg-primary-500 px-6 py-3 text-white shadow-md transition duration-300 hover:bg-primary-600'
                  onClick={loadMore}
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </GenericLayout>
  );
}

import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import type { Filter as FilterType } from '@/components/helpers/applyFilter';
import Empty from '@/components/illustrations/Empty';
import Container from '@/components/layout/Container';
import GenericLayout from '@/components/layout/GenericLayout';
import Loader from '@/components/Loader';
import BlogPostItem from '@/components/navigation/BlogPostItem';
import Filter from '@/components/navigation/Filter';
import NewsletterSubscribe from '@/components/NewsletterSubscribe';
import PaginationComponent from '@/components/Pagination';
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
  const [activeTab, setActiveTab] = useState<string>('All Posts');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onFilter = useCallback((data: IBlogPost[], _query: FilterType) => setPosts(data), []);
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
    setActiveTab('All Posts');
  };
  const showClearFilters = Object.keys(router.query).length > 0;

  const description = 'Find the latest and greatest stories from our community';
  const image = '/img/social/blog.webp';

  useEffect(() => {
    setIsClient(true);

    const updatePostsPerPage = () => {
      if (window.innerWidth < 640) {
        setPostsPerPage(5);
      } else {
        setPostsPerPage(9);
      }
    };

    updatePostsPerPage();
    window.addEventListener('resize', updatePostsPerPage);

    return () => window.removeEventListener('resize', updatePostsPerPage);
  }, []);

  // Filter posts by active tab (only if no dropdown filters are active)
  const hasDropdownFilters = Object.keys(router.query).length > 0;
  const filteredByTab = posts.filter((post) => {
    // If dropdown filters are active, show all posts (dropdown takes priority)
    if (hasDropdownFilters) return true;
    // Otherwise, apply tab filter
    if (activeTab === 'All Posts') return true;

    return post.type.toLowerCase() === activeTab.toLowerCase();
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredByTab.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredByTab.slice(indexOfFirstPost, indexOfLastPost);

  // Reset to page 1 when changing tabs, filters, or posts per page
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, posts, postsPerPage]);

  // Reset tab to "All Posts" when dropdown filters change
  useEffect(() => {
    if (hasDropdownFilters) {
      setActiveTab('All Posts');
    }
  }, [router.query, hasDropdownFilters]);

  const tabs = ['All Posts', 'Community', 'Conference', 'Communication', 'Engineering', 'Strategy'];

  return (
    <GenericLayout title='Blog' description={description} image={image} wide>
      <div className='relative px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-28 lg:pt-12' id='main-content'>
        <div className='relative mx-auto max-w-7xl'>
          <div className='text-center px-4'>
            <Heading
              level={HeadingLevel.h1}
              typeStyle={HeadingTypeStyle.xxl}
              className='text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
            >
              Welcome to our blog!
            </Heading>
            <Paragraph className='mx-auto mt-3 max-w-2xl text-gray-600 dark:text-gray-300 sm:mt-4 text-base sm:text-lg'>
              Find the latest and greatest stories from our community
            </Paragraph>
            <Paragraph
              typeStyle={ParagraphTypeStyle.md}
              className='mx-auto mt-3 max-w-2xl text-gray-600 dark:text-gray-300 text-sm sm:text-base'
            >
              Stay in touch! Get blog posts delivered directly to your{' '}
              <TextLink
                href='/newsletter'
                className='text-primary-400 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300'
              >
                email
              </TextLink>
              .
            </Paragraph>
          </div>
          {/* Filters Section */}
          <div className='mx-auto mt-8 max-w-7xl'>
            <div className='flex flex-col gap-3 md:flex-row md:justify-center md:items-center'>
              <Filter
                data={navItems || []}
                onFilter={onFilter}
                className='mx-px w-full md:w-auto md:text-sm'
                checks={toFilter}
              />
              <a
                href='/rss.xml'
                className='ml-1 text-secondary-500 underline hover:text-gray-800 font-medium transition ease-in-out duration-300'
              >
                RSS Feed
              </a>
              {', too!'}
            </Paragraph>
          </div>

          {/* Category Tabs - Hidden on mobile */}
          <div className='mt-6 px-4 hidden md:block'>
            <div className='flex justify-center'>
              <div
                className={`inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-card p-1 ${hasDropdownFilters ? 'opacity-50' : ''}`}
              >
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => !hasDropdownFilters && setActiveTab(tab)}
                    disabled={hasDropdownFilters}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 
                      whitespace-nowrap ${
                        activeTab === tab && !hasDropdownFilters
                          ? 'bg-primary-500 text-white shadow-sm'
                          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                      } ${hasDropdownFilters ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            {currentPosts.length === 0 && (
              <div className='mt-16 flex flex-col items-center justify-center'>
                <Empty />
                <p className='mx-auto mt-3 max-w-2xl text-xl leading-7 text-gray-500 dark:text-gray-400'>
                  No post matches your filter
                </p>
              </div>
            )}
            {currentPosts.length > 0 && isClient && (
              <>
                <ul className='mx-auto mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl'>
                  {currentPosts.map((post, index) => (
                    <BlogPostItem key={index} post={post} />
                  ))}
                </ul>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className='mt-12 px-4'>
                    {/* Mobile Pagination */}
                    <div className='flex sm:hidden items-center justify-between gap-2'>
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className='flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-card px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-background disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        Previous
                      </button>
                      <span className='text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap'>
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className='flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-card px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-background disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        Next
                      </button>
                    </div>

                    {/* Desktop/Tablet Pagination */}
                    <div className='hidden sm:block'>
                      <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        variant='compact'
                      />
                    </div>
                  </div>
                )}
              </>
            )}
            {Object.keys(posts).length > 0 && !isClient && (
              <div className='h-screen w-full'>
                <Loader loaderText='Loading Blogs' className='mx-auto my-60' pulsating />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className='mt-8 bg-dark rounded-3xl py-12'>
        <Container wide>
          <NewsletterSubscribe dark />
        </Container>
      </div>
    </GenericLayout>
  );
}

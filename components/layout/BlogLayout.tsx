import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import Script from 'next/script';
import React, { useContext } from 'react';

import AppContext from '@/context/AppContext';
import { IBlog, IBlogPost } from '@/types/post';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import AuthorAvatars from '../../components/AuthorAvatars';
import Container from '../../components/layout/Container';
import BlogContext from '../../context/BlogContext';
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';

interface IBlogLayoutProps {
  post: IBlogPost;
  children: React.ReactNode;
  seo?: any; // SEO properties
  source?: MDXRemoteSerializeResult;
  navItems?: IBlog; // Navigation items for blog posts
}

/**
 * @description The layout for the blog pages.
 * @param props.post - The blog post data
 * @param props.children - The content of the blog post
 * @param props.seo - The SEO data for the blog post
 * @param props.source - The MDX source for the blog post
 * @param props.navItems - Navigation items for blog posts
 */
export default function BlogLayout({ post, children, seo, source, navItems }: IBlogLayoutProps) {
  const appContext = useContext(AppContext);
  const { path = '' } = appContext || {};

  return (
    <BlogContext.Provider value={{ post, navItems }}>
      <Container cssBreakingPoint='lg' wide>
        <main className='mx-auto mt-5 w-full lg:mt-10' data-testid='Blog-layout'>
          <header className='mb-10 md:mb-16'>
            <div className='mb-4'>
              <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.lg}>
                {post.title}
              </Heading>
            </div>
            <div className='flex flex-col items-start justify-between md:flex-row md:items-center'>
              <div>
                <div className='flex items-center space-x-2'>
                  <AuthorAvatars authors={post.authors} />
                  {post.date && (
                    <time dateTime={post.date} className='text-sm leading-6 text-gray-500'>
                      {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                  )}
                </div>
                <div className='mt-2 flex items-center text-sm leading-6 text-gray-500'>
                  {post.tags && (
                    <div className='mr-4 flex space-x-2'>
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className='rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </div>
          </header>
          <article className='mb-32'>
            <Script
              src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5cb852c7b57ed596"
              strategy="afterInteractive"
            />
            <style>{`
              /* AddThis hack */
              #at4-share {
                  left: 50%;
                  margin-left: -500px !important;
                  position: absolute;
              }
              #at4-share.addthis-animated {
                animation-duration: 0s !important;
              }
              #at4-scc {
                  display: none !important;
              }
            `}</style>
            {post.canonical && <link rel='canonical' href={post.canonical} />}
            <img src={post.cover} alt={post.coverCaption} title={post.coverCaption} className='my-6 w-full' />
            {children}
          </article>
        </main>
      </Container>
    </BlogContext.Provider>
  );
}
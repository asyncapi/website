import moment from 'moment';
import ErrorPage from 'next/error';
import HtmlHead from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import { Share2 } from 'lucide-react';

import type { IPosts } from '@/types/post';

import BlogContext from '../../context/BlogContext';
import AuthorAvatars from '../AuthorAvatars';
import AnnouncementHero from '../campaigns/AnnouncementHero';
import Head from '../Head';
import TOC from '../TOC';
import Container from './Container';

interface IBlogLayoutProps {
  post: IPosts['blog'][number];
  children: React.ReactNode;
  navItems?: IPosts['blog'];
}

export default function BlogLayout({
  post,
  children,
  navItems
}: IBlogLayoutProps) {
  const router = useRouter();
  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  // Close share options on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
        setShowShareOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!post) return <ErrorPage statusCode={404} />;
  if (post.title === undefined) throw new Error('Post title is required');

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <BlogContext.Provider value={{ post }}>
      <AnnouncementHero className='mx-8 my-4' />
      <Container cssBreakingPoint='lg' flex flexReverse>
        <TOC
          toc={post.toc}
          cssBreakingPoint='lg'
          className={`sticky top-20 mt-4 max-h-screen overflow-y-auto bg-blue-100 p-4 lg:top-24
            lg:-mr-20 lg:mt-2 lg:max-h-(screen-16) lg:min-w-40 lg:max-w-64 lg:border-l lg:border-gray-200
            lg:bg-transparent lg:pb-8 lg:pt-0 xl:-mr-36 xl:min-w-72`}
        />
        <main className='mt-8 px-4 sm:px-6 lg:max-w-172 lg:flex-1 lg:pl-0 lg:pr-8 xl:max-w-172'>
          <header className='pr-4 sm:pr-6 md:pr-8'>
            <h1 className='font-normal font-sans text-4xl text-gray-800 antialiased' data-testid='BlogLayout-main'>
              {post.title}
            </h1>
            <div className='mt-6 flex items-center'>
              <div className='relative shrink-0'>
                <AuthorAvatars authors={post.authors} />
              </div>
              <div className='ml-3'>
                <p className='text-sm font-medium leading-5 text-gray-900'>
                  <span className='hover:underline'>
                    {post.authors
                      .map((author, index) =>
                        author.link ? (
                          <a key={index} href={author.link}>
                            {author.name}
                          </a>
                        ) : (
                          author.name
                        )
                      )
                      .reduce((prev, curr) => [prev, ' & ', curr] as any)}
                  </span>
                </p>
                <div className='flex text-sm leading-5 text-gray-500'>
                  <time dateTime={post.date}>{moment(post.date).format('MMMM D, YYYY')}</time>
                  <span className='mx-1'>&middot;</span>
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </div>
          </header>
          {/* Share Button and Options */}
          <div ref={shareRef} className='relative mt-4 '>
                  <button
                    onClick={() => setShowShareOptions(!showShareOptions)}
                    className='flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 '
                  >
                  <Share2 size={18} /> Share
                  </button>
                  {showShareOptions && (
                    <div className='absolute mt-2 w-48 bg-white border border-gray-300 rounded shadow p-2 z-10'>
                      <button
                        onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                        setShowShareOptions(false);
                        }}
                        className='w-full text-left px-3 py-2 hover:bg-gray-100 rounded'
                      >
                    Copy Link
                  </button>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      post.title
                    )} - ${encodeURIComponent(window.location.href)}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block px-3 py-2 hover:bg-gray-100 rounded'
                  >
                    Share on WhatsApp
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      window.location.href
                    )}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block px-3 py-2 hover:bg-gray-100 rounded'
                  >
                    Share on LinkedIn
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      window.location.href
                    )}&text=${encodeURIComponent(post.title)}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block px-3 py-2 hover:bg-gray-100 rounded'
                  >
                    Share on Twitter
                  </a>
                </div>
              )}
            </div>
          <article className='mb-32'>
            <Head title={post.title} description={post.excerpt} image={post.cover} />
            <HtmlHead>
              <script
                type='text/javascript'
                src='//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5cb852c7b57ed596'
                async
              />
              <style>{`
                #at4-share {
                    left: 50%;
                    margin-left: -500px !important;
                    position: absolute;
                }
                #at4-scc {
                    display: none !important;
                }
              `}</style>
              {post.canonical && <link rel='canonical' href={post.canonical} />}
            </HtmlHead>
            <img src={post.cover} alt={post.coverCaption} title={post.coverCaption} className='my-6 w-full' />
            {children}
          </article>
        </main>
      </Container>
    </BlogContext.Provider>
  );
}

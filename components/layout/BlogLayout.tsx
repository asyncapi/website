import moment from 'moment';
import ErrorPage from 'next/error';
import HtmlHead from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

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

/**
 * @description The blog layout with the post and its content
 * @param {IPosts['blog'][number]} props.post - The post
 * @param {React.ReactNode} props.children - The children
 */
export default function BlogLayout({ post, children }: IBlogLayoutProps) {
  const router = useRouter();

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
          <article className='mb-32'>
            <Head title={post.title} description={post.excerpt} image={post.cover} />
            <HtmlHead>
              <script
                type='text/javascript'
                src='//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5cb852c7b57ed596'
                async
              />
              <style>{`
                /* AddThis hack */

                #at4-share {
                    left: 50%;
                    margin-left: -500px !important;
                    position: absolute;

                    &amp;.addthis-animated {
                      animation-duration: 0s !important;
                    }
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

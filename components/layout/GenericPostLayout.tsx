import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import React from 'react';

import type { IPosts } from '@/types/post';

import GenericPostContext from '../../context/GenericPostContext';
import AnnouncementHero from '../campaigns/AnnouncementHero';
import Head from '../Head';
import Container from './Container';

interface IGenericPostLayoutProps {
  // Commnon to all posts
  post: IPosts['blog'][number];
  children: React.ReactNode;
}

/**
 * @description The blog layout with the post and its content
 * @param props.post - The blog post to render in the layout
 * @param props.children - The content of the blog post
 */
export default function GenericPostLayout({ post, children }: IGenericPostLayoutProps) {
  const router = useRouter();

  if (!post) return <ErrorPage statusCode={404} />;
  if (post.title === undefined && post.slug !== '/about') throw new Error('Post title is required');

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <GenericPostContext.Provider value={{ post }}>
      <AnnouncementHero className='m-4 text-center' small={true} />
      <Container>
        <main className='mt-8 px-4 sm:px-6' data-testid='GenericPostLayout-main-div'>
          <header className='pr-4 sm:pr-6 md:pr-8'>
            <h1
              className='font-normal font-sans text-4xl text-gray-800 antialiased'
              data-testid='GenericPostLayout-Heading'
            >
              {post.title}
            </h1>
          </header>
          <article className='mb-32' data-testid='GenericPostLayout-Head'>
            <Head title={post.title} description={post.excerpt} image={post.cover} />
            {children}
          </article>
        </main>
      </Container>
    </GenericPostContext.Provider>
  );
}

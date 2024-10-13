import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import TextTruncate from 'react-text-truncate';

import { BlogPostType } from '@/types/components/navigation/BlogPostType';
import type { IBlogPost } from '@/types/post';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import AuthorAvatars from '../AuthorAvatars';
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';

interface FeaturedBlogPostProps {
  post: IBlogPost;
  className?: string;
}

/**
 * @description Renders a featured blog post with the provided data.
 * @param {FeaturedBlogPostProps} props - The component props.
 * @param {string} [props.className=''] - Additional CSS classes for styling.
 */
export default function FeaturedBlogPost({ post, className = '' }: FeaturedBlogPostProps) {
  let typeColors = ['bg-indigo-100', 'text-indigo-800'];

  switch (post.type.toLowerCase()) {
    case BlogPostType.Video:
      typeColors = ['bg-pink-100', 'text-pink-800'];
      break;
    case BlogPostType.Marketing:
      typeColors = ['bg-orange-100', 'text-orange-800'];
      break;
    case BlogPostType.Strategy:
      typeColors = ['bg-green-100', 'text-green-800'];
      break;
    case BlogPostType.Communication:
      typeColors = ['bg-teal-100', 'text-teal-800'];
      break;
    default:
  }

  return (
    <div className={`rounded-lg ${className}`}>
      <article className='h-full rounded-lg'>
        <Link href={post.slug}>
          <span
            className={
              'flex h-full cursor-pointer flex-col divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg md:max-w-164 md:flex-row'
            }
            data-testid='FeaturedBlogPostItem-Link'
          >
            <img
              className='w-full object-cover md:w-56'
              src={post.cover}
              alt=''
              data-testid='FeaturedBlogPostItem-Img'
            />
            <div className='flex flex-1 flex-col justify-between border-none bg-white p-6 text-left'>
              <div className='flex-1'>
                <Paragraph typeStyle={ParagraphTypeStyle.sm} textColor='text-indigo-500'>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-0.5 ${typeColors[0]} ${typeColors[1]}`}
                    data-testid='FeaturedBlogPost-type'
                  >
                    {post.type}
                  </span>
                </Paragraph>
                <div>
                  <span className='block' data-testid='FeaturedBlog-title'>
                    <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.smSemibold} className='mt-2'>
                      {post.title}
                    </Heading>
                    <Paragraph typeStyle={ParagraphTypeStyle.sm} className='mt-3'>
                      <TextTruncate element='span' line={2} text={post.excerpt} />
                    </Paragraph>
                  </span>
                </div>
              </div>
              <div className='mt-6 flex items-center'>
                <div className='relative shrink-0' data-testid='FeaturedBlog-Authorimg'>
                  <AuthorAvatars authors={post.authors} />
                </div>
                <div className='ml-3'>
                  <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.xsSemibold} textColor='text-gray-900'>
                    <span className='hover:underline' data-testid='FeaturedBlogPost-AuthorName'>
                      {post.authors
                        .map((author, index) =>
                          author.link ? (
                            <span key={index} data-alt={author.name} rel='noreferrer'>
                              {author.name}
                            </span>
                          ) : (
                            author.name
                          )
                        )
                        .reduce((prev, curr) => [prev, ' & ', curr].join(''))}
                    </span>
                  </Heading>
                  <Paragraph typeStyle={ParagraphTypeStyle.sm} className='flex'>
                    <time dateTime={post.date} data-testid='FeaturedBlogPost-date'>
                      {moment(post.date).format('MMMM D, YYYY')}
                    </time>
                    <span className='mx-1'>&middot;</span>
                    <span data-testid='FeaturedBlogPost-RT'>{post.readingTime} min read</span>
                  </Paragraph>
                </div>
              </div>
            </div>
          </span>
        </Link>
      </article>
    </div>
  );
}

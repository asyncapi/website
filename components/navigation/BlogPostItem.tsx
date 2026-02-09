import dayjs from 'dayjs';
import Link from 'next/link';
import type { Ref } from 'react';
import React, { forwardRef } from 'react';
import TextTruncate from 'react-text-truncate';

import { BlogPostType } from '@/types/components/navigation/BlogPostType';
import type { IBlogPost } from '@/types/post';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import AuthorAvatars from '../AuthorAvatars';
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';

interface BlogPostItemProps {
  // eslint-disable-next-line prettier/prettier

  /** The blog post data. */
  post: IBlogPost;

  /** Additional CSS classes for styling. */
  className?: string;

  /** The HTML id attribute for the component. */
  id?: string;
}

/**
 * Functional component representing a single blog post item.
 *
 * @param {BlogPostItemProps} props - The props for the BlogPostItem component.
 * @param {IBlogPost} props.post - The blog post data.
 * @param {string} [props.className] - The additional CSS classes for styling.
 * @param {string} [props.id] - The HTML id attribute for the component.
 * @param {Ref<HTMLLIElement>} ref - The reference object for the component.
 */
const BlogPostItem = ({ post, className = '', id = '' }: BlogPostItemProps, ref: Ref<HTMLLIElement>) => {
  let typeColors: [string, string] = ['bg-indigo-100', 'text-indigo-800'];

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
    case BlogPostType.Conference:
      typeColors = ['bg-purple-100', 'text-purple-800'];
      break;
    case BlogPostType.Engineering:
      typeColors = ['bg-blue-100', 'text-blue-800'];
      break;
    case BlogPostType.Community:
      typeColors = ['bg-indigo-100', 'text-indigo-800'];
      break;
    default:
  }

  return (
    <li className={`list-none rounded-lg ${className}`} ref={ref} id={id}>
      <article className='h-full rounded-lg'>
        <Link href={post.slug}>
          <span
            className='relative flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:border-gray-300 dark:hover:border-gray-600'
            data-testid='BlogPostItem-Link'
          >
            {post.featured && (
              <div className='absolute right-0 top-0 z-10 m-3'>
                <span className='inline-flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800'>
                  Featured
                </span>
              </div>
            )}
            <img
              className='h-36 w-full object-cover'
              src={post.cover}
              alt={post.title}
              loading='lazy'
              data-testid='BlogPostItem-Img'
            />
            <div className='flex flex-1 flex-col p-4'>
              <div className='flex-1'>
                <Paragraph typeStyle={ParagraphTypeStyle.sm}>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${typeColors[0]} ${typeColors[1]}`}
                  >
                    {post.type}
                  </span>
                </Paragraph>
                <Heading
                  level={HeadingLevel.h5}
                  typeStyle={HeadingTypeStyle.smSemibold}
                  className='mt-2 line-clamp-2 text-sm text-gray-900 dark:text-gray-100'
                >
                  {post.title}
                </Heading>
                <Paragraph
                  typeStyle={ParagraphTypeStyle.sm}
                  className='mt-2 line-clamp-2 text-xs text-gray-600 dark:text-gray-400'
                >
                  <TextTruncate element='span' line={2} text={post.excerpt} />
                </Paragraph>
              </div>
              <div className='mt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3'>
                <div className='flex items-center'>
                  <div className='relative shrink-0'>
                    <AuthorAvatars authors={post.authors} />
                  </div>
                  <div className='ml-2'>
                    <Heading
                      level={HeadingLevel.h3}
                      typeStyle={HeadingTypeStyle.xsSemibold}
                      className='text-gray-900 dark:text-gray-100'
                    >
                      <span className='text-xs'>
                        {post.authors
                          .map((author) => author.name)
                          .join(', ')
                          .split(', ')
                          .slice(0, 2)
                          .join(' & ')}
                      </span>
                    </Heading>
                    <Paragraph typeStyle={ParagraphTypeStyle.sm} className='text-xs text-gray-500 dark:text-gray-400'>
                      {post.date ? moment(post.date).format('MMMM D, YYYY') : ''}
                    </Paragraph>
                  </div>
                </div>
                <div className='ml-3'>
                  <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.xsSemibold} textColor='text-gray-900'>
                    <span>
                      {post.authors
                        .map((author, index) =>
                          author.link ? (
                            <button
                              key={index}
                              data-alt={author.name}
                              className='cursor-pointer border-none bg-inherit p-0 hover:underline'
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(author.link, '_blank');
                              }}
                            >
                              {author.name}
                            </button>
                          ) : (
                            author.name
                          )
                        )
                        .reduce((prev, curr, index) => (
                          <React.Fragment key={`author-${index}`}>
                            {prev} & {curr}
                          </React.Fragment>
                        ))}
                    </span>
                  </Heading>
                  <Paragraph typeStyle={ParagraphTypeStyle.sm} className='flex'>
                    <time dateTime={post.date}>{dayjs(post.date).format('MMMM D, YYYY')}</time>
                    <span className='mx-1'>&middot;</span>
                    <span>{post.readingTime} min read</span>
                  </Paragraph>
                </div>
              </div>
            </div>
          </span>
        </Link>
      </article>
    </li>
  );
};

export default forwardRef(BlogPostItem);

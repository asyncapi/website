import moment from 'moment';
import Link from 'next/link';
import type { Ref } from 'react';
import { forwardRef } from 'react';
import TextTruncate from 'react-text-truncate';

import { BlogPostType } from '@/types/components/navigation/BlogPostType';
import type { IBlogPost } from '@/types/post';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import AuthorAvatars from '../AuthorAvatars';
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';

interface BlogPostItemProps {
  post: IBlogPost;
  className?: string;
  id?: string;
}

/**
 * @description Functional component representing a single blog post item.
 * @param {Object} props - Props for the BlogPostItem component.
 * @param {IBlogPost} props.post - The blog post data.
 * @param {string} [props.className=''] - Additional CSS classes for styling.
 * @param {string} [props.id=''] - The HTML id attribute for the component.
 * @param {Ref<HTMLLIElement>} ref - Reference object for the component.
 */
export default forwardRef(function BlogPostItem(
  { post, className = '', id = '' }: BlogPostItemProps,
  ref: Ref<HTMLLIElement>
) {
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
    default:
  }

  return (
    <li className={`rounded-lg ${className}`} ref={ref} id={id}>
      <article className='h-full rounded-lg'>
        <Link href={post.slug}>
          <span
            className={
              'flex h-full cursor-pointer flex-col divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg'
            }
            data-testid='BlogPostItem-Link'
          >
            <img
              className='h-48 w-full object-cover'
              src={post.cover}
              alt=''
              loading='lazy'
              data-testid='BlogPostItem-Img'
            />
            <div className='flex flex-1 flex-col justify-between bg-white p-6'>
              <div className='flex-1'>
                <Paragraph typeStyle={ParagraphTypeStyle.sm} textColor='text-indigo-500'>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-0.5 ${typeColors[0]} ${typeColors[1]}`}
                  >
                    {post.type}
                  </span>
                </Paragraph>
                <Link href={post.slug}>
                  <span className='block'>
                    <Heading level={HeadingLevel.h5} typeStyle={HeadingTypeStyle.smSemibold} className='mt-2'>
                      {post.title}
                    </Heading>
                    <Paragraph typeStyle={ParagraphTypeStyle.sm} className='mt-3'>
                      <TextTruncate element='span' line={4} text={post.excerpt} />
                    </Paragraph>
                  </span>
                </Link>
              </div>
              <div className='mt-6 flex items-center'>
                <div className='relative shrink-0'>
                  <AuthorAvatars authors={post.authors} />
                </div>
                <div className='ml-3'>
                  <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.xsSemibold} textColor='text-gray-900'>
                    <span className='hover:underline'>
                      {post.authors
                        .map((author, index) =>
                          author.link ? (
                            <a
                              key={index}
                              data-alt={author.name}
                              href={author.link}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              target='_blank'
                              rel='noreferrer'
                            >
                              {author.name}
                            </a>
                          ) : (
                            author.name
                          )
                        )
                        .reduce((prev, curr) => (
                          <>
                            {prev} & {curr}
                          </>
                        ))}
                    </span>
                  </Heading>
                  <Paragraph typeStyle={ParagraphTypeStyle.sm} className='flex'>
                    <time dateTime={post.date}>{moment(post.date).format('MMMM D, YYYY')}</time>
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
});

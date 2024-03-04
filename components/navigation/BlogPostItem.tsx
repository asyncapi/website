import moment from 'moment';
import Link from 'next/link';
import type { Ref } from 'react';
import { forwardRef } from 'react';
import TextTruncate from 'react-text-truncate';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import AuthorAvatars from '../AuthorAvatars';
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';

interface Author {
  name: string;
  photo: string;
  link?: string;
}

interface Post {
  type: string;
  alt?: string;
  slug: string;
  cover: string;
  title: string;
  excerpt: string;
  authors: Author[];
  date: string;
  readingTime: number;
}

interface Props {
  post: Post;
  className?: string;
  id?: string;
}

const BlogPostItem = forwardRef(function BlogPostItem({ post, className = '', id = '' }: Props,
  ref: Ref<HTMLLIElement>) {
  let typeColors: [string, string] = ['bg-indigo-100', 'text-indigo-800'];

  switch (post.type.toLowerCase()) {
    case 'video':
      typeColors = ['bg-pink-100', 'text-pink-800'];
      break;
    case 'marketing':
      typeColors = ['bg-orange-100', 'text-orange-800'];
      break;
    case 'strategy':
      typeColors = ['bg-green-100', 'text-green-800'];
      break;
    case 'communication':
      typeColors = ['bg-teal-100', 'text-teal-800'];
      break;
    default:
  }

  return (
    <li className={`rounded-lg ${className}`} ref={ref} id={id}>
      <article className='h-full rounded-lg'>
        <Link href={post.slug} passHref>
          <a
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
                  <a className='block'>
                    <Heading level={HeadingLevel.h5} typeStyle={HeadingTypeStyle.smSemibold} className='mt-2'>
                      {post.title}
                    </Heading>
                    <Paragraph typeStyle={ParagraphTypeStyle.sm} className='mt-3'>
                      <TextTruncate element='span' line={4} text={post.excerpt} />
                    </Paragraph>
                  </a>
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
                        .map((author, index) => author.link ? (
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
                        ))
                        .reduce((prev, curr) => [prev, ' & ', curr].join(''))}
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
          </a>
        </Link>
      </article>
    </li>
  );
});

export default BlogPostItem;

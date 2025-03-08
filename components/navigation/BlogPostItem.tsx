import moment from 'moment';
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
 */
export default forwardRef(function BlogPostItem(
  { post, className = '', id = '' }: BlogPostItemProps,
  ref: Ref<HTMLLIElement> /** Reference object for the component. */,
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
    <li
      className={`list-none rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg ${className}`}
      ref={ref}
      id={id}
    >
      <article className="h-full rounded-lg border border-gray-300 shadow-md hover:border-gray-400 hover:shadow-xl">
        <Link href={post.slug}>
          <span className="flex overflow-hidden flex-col h-full rounded-lg divide-y divide-gray-200 cursor-pointer">
            {/* Blog Image */}
            <img
              className="object-cover w-full h-48"
              src={post.cover}
              alt={post.title}
              loading="lazy"
            />

            {/* Blog Content */}
            <div className="flex flex-col flex-1 justify-between p-6 bg-white md:p-8">
              <div className="flex-1">
                {/* Blog Type Badge */}
                <Paragraph
                  typeStyle={ParagraphTypeStyle.sm}
                  textColor="text-indigo-500"
                >
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-0.5 ${typeColors[0]} ${typeColors[1]}`}
                  >
                    {post.type}
                  </span>
                </Paragraph>

                {/* Blog Title */}
                <Heading
                  level={HeadingLevel.h5}
                  typeStyle={HeadingTypeStyle.smSemibold}
                  className="mt-3"
                >
                  {post.title}
                </Heading>

                {/* Blog Excerpt */}
                <Paragraph
                  typeStyle={ParagraphTypeStyle.sm}
                  className="mt-4 text-gray-600"
                >
                  <TextTruncate element="span" line={4} text={post.excerpt} />
                </Paragraph>
              </div>

              {/* Author & Date */}
              <div className="flex items-center mt-6">
                <div className="relative shrink-0">
                  <AuthorAvatars authors={post.authors} />
                </div>
                <div className="ml-3">
                  <Heading
                    level={HeadingLevel.h3}
                    typeStyle={HeadingTypeStyle.xsSemibold}
                    textColor="text-gray-900"
                  >
                    {post.authors.map((author, index) => (
                      <span key={index} className="hover:underline">
                        {author.name}
                      </span>
                    ))}
                  </Heading>
                  <Paragraph typeStyle={ParagraphTypeStyle.sm} className="flex">
                    <time dateTime={post.date}>
                      {moment(post.date).format('MMMM D, YYYY')}
                    </time>
                    <span className="mx-1">&middot;</span>
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

import Link from 'next/link';
import type { HTMLAttributeAnchorTarget } from 'react';
import React from 'react';
import type { Url } from 'url';

import IconArrowRight from '../icons/ArrowRight';

export interface IChapterSuggestionProps {
  href: string | Url;
  target?: HTMLAttributeAnchorTarget;
  title: string;
  description: string;
  linkText: string;
  className?: string;
}

/**
 *
 * @param {Object} props - The props of the component
 * @param {string} props.href - The URL of the chapter
 * @param {string} props.target - The target of the link
 * @param {string} props.title - The title of the chapter
 * @param {string} props.description - The description of the chapter
 * @param {string} props.linkText - The text of the link
 * @param {string} props.className - The class name of the component
 */
export default function ChapterSuggestion({
  href = '/',
  target = '_self',
  title,
  description,
  linkText,
  className
}: IChapterSuggestionProps) {
  return (
    <Link
      href={href}
      target={target}
      rel='noopener noreferrer'
      title={description}
      className={`${className} mt-4 flex max-w-lg flex-col rounded border border-gray-200 p-6
      text-gray-900 shadow-md transition-all duration-300 ease-in-out hover:border-gray-300 hover:shadow-lg`}
      data-testid='ChapterSuggestion-link'
    >
      <h5 className='mb-2 font-sans text-lg font-medium antialiased'>{title}</h5>
      <p className='font-normal mb-2 flex-1 font-sans text-gray-600 antialiased'>{description}</p>
      <p className='font-sans font-medium text-primary-500 antialiased'>
        {linkText}
        <IconArrowRight className='inline-block h-4' />
      </p>
    </Link>
  );
}

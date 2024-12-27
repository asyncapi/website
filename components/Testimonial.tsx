import React from 'react';

import IconQuote from './icons/Quote';
import Paragraph from './typography/Paragraph';

interface TestimonialProps {
  className?: string;
  text: string;
  authorName: string;
  authorDescription: string;
  authorAvatar: string;
}

/**
 * @description This component displays Testimonial component.
 *
 * @param {TestimonialProps} props - The props for the Testimonial component.
 * @param {string} props.className - Additional CSS class for styling the card.
 * @param {string} props.text - The testimonial from the author.
 * @param {string} props.authorName - The name of the author.
 * @param {string} props.authorDescription - The description of the author.
 * @param {string} props.authorAvatar - The path to avatar of the author.
 */
export default function Testimonial({
  className = '',
  text,
  authorName,
  authorDescription,
  authorAvatar
}: TestimonialProps) {
  return (
    <li className={`flex flex-col gap-6 p-6 sm:px-8 sm:py-6 md:flex-row md:items-start md:gap-8 md:p-8 ${className}`}>
      <blockquote className='flex flex-col gap-6 text-left md:grow'>
        <div className='relative text-lg font-medium leading-7 text-gray-600'>
          <IconQuote className='absolute left-0 top-0 size-8 -translate-y-2 text-primary-500' />
          <Paragraph className='relative pl-12'>{text}</Paragraph>
        </div>
        <footer className='flex items-center gap-4'>
          <figure className='shrink-0'>
            <img
              className='size-12 rounded-full border-2 border-white'
              src={authorAvatar}
              alt={authorName}
              data-testid='Testimonial-img'
            />
          </figure>
          <div className='ml-4 text-left'>
            <p className='text-base font-bold leading-6 text-gray-900'>{authorName}</p>
            <p className='text-sm font-medium leading-6 text-primary-500'>{authorDescription}</p>
          </div>
        </footer>
      </blockquote>
    </li>
  );
}

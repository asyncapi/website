import React from 'react';

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
    <li
      className={`flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${className}`}
    >
      <header className='flex items-center gap-4'>
        <figure className='shrink-0'>
          <img
            className='size-12 rounded-full object-cover'
            src={authorAvatar}
            alt={authorName}
            data-testid='Testimonial-img'
          />
        </figure>
        <div className='flex flex-col text-left'>
          <p className='text-base font-bold text-gray-900'>{authorName}</p>
          <p className='text-sm text-gray-500'>{authorDescription}</p>
        </div>
      </header>
      <blockquote className='text-left'>
        <Paragraph className='text-gray-600 leading-relaxed'>{text}</Paragraph>
      </blockquote>
    </li>
  );
}

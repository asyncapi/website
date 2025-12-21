import React, { useState } from 'react';

import Paragraph from './typography/Paragraph';

interface TestimonialProps {
  className?: string;
  text: string;
  authorName: string;
  authorDescription: string;
  authorAvatar: string;
}

export default function Testimonial({
  className = '',
  text,
  authorName,
  authorDescription,
  authorAvatar
}: TestimonialProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li
      onClick={() => setIsExpanded(!isExpanded)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsExpanded(!isExpanded);
        }
      }}
      role='button'
      tabIndex={0}
      className={`flex flex-col gap-4 rounded-xl border bg-white p-6 shadow-sm transition-all duration-500 ease-in-out
      cursor-pointer overflow-hidden
        ${isExpanded ? 'w-[400px] md:w-[600px] border-primary-500 ring-2 ring-primary-500/10 shadow-xl' : 'w-[300px] md:w-[450px] border-gray-100 h-[240px] hover:border-primary-500'}
        ${className}`}
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
          <p className='text-sm text-gray-400'>{authorDescription}</p>
        </div>
      </header>
      <blockquote className='text-left'>
        <Paragraph
          className={`text-sm text-gray-600 leading-relaxed transition-all duration-500 ${isExpanded ? '' : 'line-clamp-4'}`}
        >
          {text}
        </Paragraph>
        <span className='mt-3 block text-xs font-bold text-primary-500'>
          {isExpanded ? 'Show less ↑' : 'Read full testimonial →'}
        </span>
      </blockquote>
    </li>
  );
}

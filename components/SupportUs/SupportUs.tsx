import React from 'react';

import { items } from './SupportItemsList';

interface SupportUsProps {
  className?: string;
  showSupportBanner?: boolean;
}

/**
 * @description This component displays support items.
 * @param {SupportUsProps} props - The props for SupportUs component.
 * @param {string} props.className - Additional CSS classes for styling.
 * @param {boolean} props.showSupportBanner - Indicates whether support banner should be displayed.
 */
export default function SupportUs({ className = '' }: SupportUsProps): React.ReactNode {
  return (
    <div className={`text-center ${className}`} data-testid='SupportUs-main'>
      <div
        className='flex flex-wrap items-center justify-center sm:py-2 md:mb-4 md:px-4'
        data-testid='SupportUs-section'
      >
        {items
          .filter((item) => item.section === 1)
          .map((item, index) => (
            <a
              key={index}
              href={item.href}
              target='_blank'
              rel='noopener noreferrer'
              className='relative block w-2/3 p-4 text-center sm:w-1/3 sm:p-0 md:w-1/3 lg:w-1/5'
            >
              <img className={item.imgClass} src={item.imgSrc} title={item.imgTitle} alt={item.imgTitle} />
            </a>
          ))}
      </div>
      <div className='mb-4 flex flex-wrap items-center justify-center md:px-2' data-testid='SupportUs-subsection'>
        {items
          .filter((item) => item.section === 2)
          .map((item, index) => (
            <a
              key={index}
              href={item.href}
              target='_blank'
              rel='noopener noreferrer'
              className='relative block w-2/3 p-4 text-center sm:w-1/3 sm:p-0 md:w-1/3 lg:w-1/5'
            >
              <img className={item.imgClass} src={item.imgSrc} title={item.imgTitle} alt={item.imgTitle} />
            </a>
          ))}
      </div>
      <div className='mb-4 flex flex-wrap items-center justify-center md:px-2' data-testid='SupportUs-last-div'>
        {items
          .filter((item) => item.section === 3)
          .map((item, index) => (
            <a
              key={index}
              href={item.href}
              target='_blank'
              rel='noopener noreferrer'
              className='relative block w-2/3 p-4 text-center sm:w-1/3 sm:p-0 md:w-1/3 lg:w-1/5'
            >
              <img className={item.imgClass} src={item.imgSrc} title={item.imgTitle} alt={item.imgTitle} />
            </a>
          ))}
      </div>
    </div>
  );
}

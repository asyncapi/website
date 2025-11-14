import React from 'react';

import IconArrowRight from '../icons/ArrowRight';

interface ConferenceBannerProps {
  title: string;
  city: string;
  dateLocation: string;
  cfaText: string;
  link: string;
  className?: string;
}

/**
 * @description Small banner component for conference announcements, similar to the green banner style
 * @param {string} props.title - The title of the conference
 * @param {string} props.city - The city of the conference
 * @param {string} props.dateLocation - The date and location of the conference
 * @param {string} props.cfaText - The call to action text
 * @param {string} props.link - The link to the conference
 * @param {string} props.className - Additional CSS classes
 */
export default function ConferenceBanner({
  title,
  city,
  dateLocation,
  cfaText,
  link,
  className = ''
}: ConferenceBannerProps) {
  return (
    <div
      className={`bg-primary-500 text-white py-2 px-4 transition-opacity duration-500 ${className}`}
      data-testid='ConferenceBanner-main-div'
    >
      <div className='mx-auto max-w-screen-xl px-3 sm:px-6 lg:px-8'>
        <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-0'>
          <div className='flex flex-1 items-center text-xs sm:text-sm'>
            <p className='font-medium text-white flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0'>
              <span className='bg-primary-600 text-white px-2 py-1 rounded text-xs font-semibold sm:mr-3 inline-block w-fit'>
                NEW
              </span>
              <span className='inline-block'>
                {title} {city} - {dateLocation}
              </span>
            </p>
          </div>
          <div className='flex sm:flex-shrink-0'>
            <a
              href={link}
              className='flex w-full sm:w-auto items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 sm:py-1 text-sm font-medium text-primary-500 shadow-sm hover:bg-gray-50 focus:text-primary-600 transition-colors duration-200'
              target='_blank'
              rel='noopener noreferrer'
            >
              {cfaText}
              <IconArrowRight className='ml-1 w-4 h-4' />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

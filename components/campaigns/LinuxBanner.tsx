import React from 'react';

interface LinuxBannerProps {
  className?: string;
}

/**
 * LinuxBanner component displays a simple banner component that displays a message
 * with a link to the Linux Foundation website.
 */
export default function LinuxBanner({ className }: LinuxBannerProps) {
  return (
    <div
      className={`bg-sky-100 w-full font-heading font-semibold dark:bg-dark-card dark:text-gray-100 text-gray-900 px-1 py-1 text-center mt-4 overflow-x-hidden ${className ?? ''}`}
    >
      <p>
        <a
          href='https://www.linuxfoundation.org/'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-block align-middle mr-2'
        >
          <img src='/img/logos/LFX.svg' alt='LFX Logo' className='inline-block h-6 align-middle' />
        </a>
        Part of the{' '}
        <a href='https://www.linuxfoundation.org/' target='_blank' rel='noopener noreferrer' className='font-regular'>
          Linux Foundation
        </a>
        .
      </p>
    </div>
  );
}

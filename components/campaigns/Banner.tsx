import React from 'react';

/**
 * @description The banner to use for Announcement of AsyncAPI releases
 */
export default function Banner() {
  const day = new Date().getUTCDate();
  const month = new Date().getUTCMonth();
  const year = new Date().getUTCFullYear();

  // month=11 is December. Show only between 6-31 December.

  if (year > 2023 || month > 11 || day < 6) {
    return null;
  }

  return (
    <div className='bg-gray-100' data-testid='Banner-main-div'>
      <div className='mx-auto max-w-screen-xl px-3 py-1 sm:px-6 lg:px-8'>
        <div className='flex flex-wrap items-center justify-between'>
          <div className='flex w-0 flex-1 items-center text-xs md:flex'>
            <p className='font-medium text-gray-700'>
              <span className='md:inline'>AsyncAPI v3 has landed! ⭐️</span>
            </p>
          </div>
          <div className='flex'>
            <a
              href='/blog/release-notes-3.0.0'
              className='flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-1 text-xs font-medium text-indigo-600 shadow-sm hover:bg-indigo-50 focus:text-indigo-600'
              target='_blank'
              rel='noopener noreferrer'
            >
              Release notes
            </a>
            <a
              href='https://v2.asyncapi.com/'
              className='ml-2 flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-1 text-xs font-medium text-indigo-400 shadow-sm hover:bg-indigo-50 focus:text-indigo-600'
              target='_blank'
              rel='noopener noreferrer'
            >
              Old v2 docs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

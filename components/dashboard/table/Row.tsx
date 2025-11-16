import React from 'react';

import type { Issue } from '@/types/components/dashboard/TableTypes';

interface RowProps {
  item: Issue;
}

/**
 * @description Row component.
 *
 * @param {RowProps} props - The props for the component.
 * @param {RowProps.item} props.item - The item to display.
 */
export default function Row({ item }: RowProps) {
  return (
    <li>
      <a
        target='_blank'
        rel='noreferrer'
        href={`https://github.com/${item.resourcePath}`}
        className='block group'
      >
        <div className='rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-background p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary-300 dark:hover:border-primary-600 cursor-pointer'>
          <div className='flex justify-between items-start gap-4'>
            <div className='flex flex-col gap-3 flex-1 min-w-0'>
              <div className='flex items-center gap-2'>
                <div className={`flex items-center justify-center w-5 h-5 rounded ${item.isPR ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-green-100 dark:bg-green-900/30'}`}>
                  <img
                    alt='issue or pull-request icon'
                    className='size-3 dark:invert dark:opacity-80'
                    src={item.isPR ? '/img/illustrations/icons/pull-request.svg' : '/img/illustrations/icons/issue.svg'}
                    data-testid='Row-img-issue'
                  />
                </div>
                <a
                  target='_blank'
                  rel='noreferrer'
                  onClick={(e) => e.stopPropagation()}
                  className='text-xs font-medium lowercase text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors'
                  href={`https://github.com/${item.repo}`}
                  data-testid='Row-github-redirect'
                >
                  {item.repo}
                </a>
              </div>
              <span
                className='two-liner w-full text-base font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors'
                data-testid='Row-spanText'
              >
                {item.title}
              </span>
              {item.labels && item?.labels?.length > 0 && (
                <div className='flex flex-wrap items-center gap-2'>
                  {item.labels.map((label) => (
                    <span
                      key={label.name}
                      className='rounded-full bg-secondary-200 dark:bg-secondary-600 text-gray-700 dark:text-white px-3 py-1 text-xs font-medium leading-4 border border-secondary-300 dark:border-secondary-500'
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className='flex-shrink-0 my-auto'>
              <div className='w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors'>
                <svg className='w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </a>
    </li>
  );
}

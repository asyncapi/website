import React from 'react';

import type { Issue } from '@/types/components/dashboard/TableTypes';

import Row from './Row';

interface TableProps {
  title: React.ReactElement;
  data: Issue[];
  className: string;
  listClassName: string;
}

/**
 * @description Table component.
 *
 * @param {TableProps} props - The props for the component.
 * @param {React.ReactElement} props.title - The title of the table.
 * @param {Issue[]} props.data - The data to display.
 * @param {string} props.className - The class name for the table.
 * @param {string} props.listClassName - The class name for the list.
 */
export default function Table({ title, data, className, listClassName }: TableProps) {
  return (
    <div className={`rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card shadow-lg dark:shadow-xl overflow-hidden lg:w-1/2 transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl flex flex-col ${className}`}>
      <div className='inline-flex w-full bg-gradient-to-r from-gray-50 to-white dark:from-dark-background dark:to-dark-card border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4 sm:py-5'>
        <h2 className='w-full text-base sm:text-lg font-semibold dark:text-white flex items-center gap-2'>{title}</h2>
      </div>
      <div className='min-w-full inline-block overflow-y-auto max-h-[600px] flex-1'>
        {data.length === 0 && (
          <div className='w-full p-8 text-base font-medium dark:text-gray-300'>
            <div className='flex flex-col items-center justify-center py-8'>
              <div className='w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4'>
                <svg className='w-8 h-8 text-gray-400 dark:text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <p className='text-center mb-4 dark:text-gray-300'>There aren&apos;t any good first issues open for the given repository and area at the moment.</p>
              <ul className='mt-4 space-y-3 text-sm text-left max-w-md'>
                <li className='flex items-start gap-2'>
                  <span className='text-primary-500 dark:text-primary-400 mt-1'>•</span>
                  <span className='dark:text-gray-300'>
                    Join our{' '}
                    <a href='https://asyncapi.com/slack-invite' className='text-blue-500 dark:text-blue-400 underline font-medium'>
                      Slack
                    </a>{' '}
                    to seek help.
                  </span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-primary-500 dark:text-primary-400 mt-1'>•</span>
                  <span className='dark:text-gray-300'>
                    In the <span className='font-semibold text-green-700 dark:text-green-400'>#11_contributing</span> channel, call out the
                    maintainers that you want to work with. Ask them if there are any issues you could solve. You know who
                    these people are from <span className='font-bold dark:text-white'>CODEOWNERS</span> file in each repo.
                  </span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-primary-500 dark:text-primary-400 mt-1'>•</span>
                  <span className='dark:text-gray-300'>If there is no response, you need to look for a different issue from different repository.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
        <ul className={`p-4 grid gap-3 ${listClassName}`}>
          {data.map((item) => (
            <Row key={item.title} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

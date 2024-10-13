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
    <div className={`rounded border border-gray-200  bg-gray-50 lg:w-1/2 ${className}`}>
      <div className='inline-flex w-full rounded bg-white p-5'>
        <h2 className='w-full text-base font-semibold'>{title}</h2>
      </div>
      <div className='min-w-full inline-block overflow-y-scroll'>
        {data.length === 0 && (
          <div className='w-full p-5 text-base font-medium'>
            <p>There aren&apos;t any good first issues open for the given repository and area at the moment.</p>
            <ul className='mt-3 list-disc pl-5 text-sm font-[400]'>
              <li className='mb-2'>
                Join our{' '}
                <a href='https://asyncapi.com/slack-invite' className='text-blue-500 underline'>
                  Slack
                </a>{' '}
                to seek help.
              </li>
              <li className='mb-2'>
                In the <span className='font-semibold text-green-900'>#11_contributing</span> channel, call out the
                maintainers that you want to work with. Ask them if there are any issues you could solve. You know who
                these people are from <span className='font-bold'>CODEOWNERS</span> file in each repo.
              </li>
              <li className='mb-2'>
                If there is no response, you need to look for a different issue from different repository.
              </li>
            </ul>
          </div>
        )}
        <ul className={`m-4 grid gap-4  ${listClassName}`}>
          {data.map((item) => (
            <Row key={item.title} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

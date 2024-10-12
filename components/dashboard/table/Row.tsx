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
      <div className=' rounded-md border border-gray-200 bg-white p-4'>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-1 underline'>
              <img
                alt='issue or pull-request icon'
                className='size-4'
                src={item.isPR ? '/img/illustrations/icons/pull-request.svg' : '/img/illustrations/icons/issue.svg'}
                data-testid='Row-img-issue'
              />
              <a
                target='_blank'
                rel='noreferrer'
                className='text-sm font-light lowercase text-gray-900'
                href={`https://github.com/${item.repo}`}
                data-testid='Row-github-redirect'
              >
                {item.repo}
              </a>
            </div>
            <a target='_blank' rel='noreferrer' href={`https://github.com/${item.resourcePath}`}>
              <span
                className='two-liner w-full text-base font-medium leading-5 text-gray-900'
                data-testid='Row-spanText'
              >
                {item.title}
              </span>
            </a>
            {item.labels && item?.labels?.length > 0 && (
              <div className='flex flex-wrap items-center gap-1'>
                {item.labels.map((label) => (
                  <span key={label.name} className={'rounded-full bg-secondary-300 px-2 text-sm leading-5'}>
                    {label.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          <a
            target='_blank'
            rel='noreferrer'
            className='my-auto w-fit'
            href={`https://github.com/${item.resourcePath}`}
          >
            <img alt='arrow icon' src='/img/illustrations/icons/arrow.svg' />
          </a>
        </div>
      </div>
    </li>
  );
}

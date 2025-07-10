import Link from 'next/link';
import React from 'react';

import type { IDocs } from '@/types/post';

export interface IDocsButtonProps {
  post: IDocs[number];
  className?: string;
}

/**
 * @description The DocsButton component is a button that links to the previous and next pages of the documentation.
 * @param {Object} props - The props of the component
 * @param {IPost} props.post - The post object
 * @param {string} props.className - The class name of the component
 * @returns {React.JSX.Element} The DocsButton component
 */
export default function DocsButton({ post, className = '' }: IDocsButtonProps) {
  return (
    <div className={`mb-4 flex h-full flex-row gap-4 ${className}`}>
      <div className='w-1/2'>
        {post?.prevPage && (
          <Link href={post.prevPage.href}>
            <div
              className={`h-full cursor-pointer rounded border border-gray-200 p-4 text-center shadow-md transition-all
                            duration-300 ease-in-out hover:border-gray-300 hover:shadow-lg lg:text-left`}
            >
              <div className='text-secondary-500' data-testid='DocsButton-Prevdiv'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='mr-1 inline size-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z'
                  />
                </svg>
                <div className='my-auto inline text-sm font-bold uppercase'>Go Back</div>
              </div>
              <div className='my-2 text-base font-medium' data-testid='DocsButton-PrevPage'>
                {post.prevPage.title}
              </div>
            </div>
          </Link>
        )}
      </div>
      <div className='w-1/2'>
        {post?.nextPage && (
          <Link href={post.nextPage.href}>
            <div
              className={`h-full cursor-pointer rounded border border-gray-200 p-4 text-center shadow-md
                          transition-all duration-300 ease-in-out hover:border-gray-300 hover:shadow-lg lg:text-right`}
            >
              <div className='text-secondary-500' data-testid='DocsButton-Nextdiv'>
                <div className='my-auto inline text-sm font-bold uppercase'>Up Next</div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='ml-1 inline size-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <div className='my-2 text-base font-medium' data-testid='DocsButton-NextPage'>
                {post.nextPage.title}
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

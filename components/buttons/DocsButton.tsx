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
 * @returns {JSX.Element} The DocsButton component
 */
export default function DocsButton({ post, className = '' }: IDocsButtonProps) {
  return (
    <div className={`mb-4 flex flex-col gap-4 md:flex-row ${className}`}>
    {[post?.prevPage, post?.nextPage].map((page, index) => (
      <div key={index} className="w-full md:w-1/2">
        {page && (
          <Link href={page.href}>
            <div
              className={`flex h-full flex-col justify-between rounded border border-gray-200 p-4 text-center shadow-md
                          transition-all duration-300 ease-in-out hover:border-gray-300 hover:shadow-lg`}
            >
              <div
                className={`text-secondary-500 flex items-center justify-center ${
                  index === 0 ? 'lg:justify-start' : 'lg:justify-end'
                }`}
                data-testid={index === 0 ? 'DocsButton-Prevdiv' : 'DocsButton-Nextdiv'}
              >
                {index === 0 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                    />
                  </svg>
                )}
                <div className="text-sm font-bold uppercase">
                  {index === 0 ? 'Go Back' : 'Up Next'}
                </div>
                {index === 1 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </div>
              <div
                className="my-2 text-base font-medium mt-1"
                data-testid={index === 0 ? 'DocsButton-PrevPage' : 'DocsButton-NextPage'}
              >
                {page.title}
              </div>
            </div>
          </Link>
        )}
      </div>
    ))}
  </div>
  
  );
}

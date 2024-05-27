import React from 'react';

import type { IDoc } from '@/types/post';

import { DOCS_INDEX_NAME, SearchButton } from '../AlgoliaSearch';
import ClickableLogo from '../ClickableLogo';
import IconLoupe from '../icons/Loupe';
import DocsNav from './DocsNav';

export interface DocsMobileMenuProps {
  post: IDoc;
  navigation: {
    [key: string]: any;
  };
  onClickClose?: () => void;
}

/**
 * @description Component representing the mobile menu for documentation.
 * @param {Object} props - Props for the DocsMobileMenu component.
 * @param {DocsMobileMenuProps} props.post - The post data.
 * @param {Object} props.navigation - The navigation data.
 * @param {Function} [props.onClickClose] - The function to handle closing the mobile menu.
 */
export default function DocsMobileMenu({ post, navigation, onClickClose = () => {} }: DocsMobileMenuProps) {
  return (
    <div className='z-60 lg:hidden'>
      <div className='fixed inset-0 z-40 flex'>
        <div className='fixed inset-0'>
          <div className='absolute inset-0 bg-gray-600 opacity-75' onClick={onClickClose}></div>
        </div>
        <div className='relative flex w-full max-w-xs flex-1 flex-col bg-white'>
          <div className='absolute right-0 top-0 -mr-14 p-1'>
            <button
              onClick={onClickClose}
              className='flex size-12 items-center justify-center rounded-full focus:bg-gray-600 focus:outline-none'
              aria-label='Close sidebar'
            >
              <svg className='size-6 text-white' stroke='currentColor' fill='none' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
          <div className='h-0 flex-1 overflow-y-auto pt-5'>
            <div className='pl-2.5'>
              <ClickableLogo logoClassName='h-8 w-auto ml-3' />
            </div>
            <div className='mb-4 mt-10 w-full px-2'>
              <SearchButton
                className='flex w-full items-center space-x-3 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-left text-sm text-gray-700 shadow-sm transition-all duration-500 ease-in-out hover:border-secondary-500 hover:bg-secondary-100 hover:text-secondary-500'
                indexName={DOCS_INDEX_NAME}
              >
                <IconLoupe />
                <span className='flex-auto'>Search docs...</span>
              </SearchButton>
            </div>
            <nav className='mb-4 mt-5 px-2'>
              <ul>
                {Object.values(navigation).map((navItem) => (
                  <DocsNav key={navItem.item.title} item={navItem} active={post.slug} onClick={onClickClose} />
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className='w-14 shrink-0'>{/* Force sidebar to shrink to fit close icon */}</div>
      </div>
    </div>
  );
}

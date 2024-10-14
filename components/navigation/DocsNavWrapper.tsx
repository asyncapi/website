import React from 'react';

import type { IDocsTree, IPost } from '@/types/post';

import { DOCS_INDEX_NAME, SearchButton } from '../AlgoliaSearch';
import IconLoupe from '../icons/Loupe';
import DocsNav from './DocsNav';

interface IDocsNavWrapperProps {
  post: IPost;
  navigation: IDocsTree;
  setShowMenu: React.Dispatch<boolean>;
}

/**
 * @description DocsNav component wrapper
 * @param {IPost} props.post The post to render in the layout
 * @param {IDocsTree} props.navigation Navigation items for the docs nav
 * @param {React.Dispatch} props.setShowMenu The dispatch for showing docs nav
 */
export default function DocsNavWrapper({ setShowMenu, navigation, post }: IDocsNavWrapperProps) {
  return (
    <div className='hidden lg:flex lg:shrink-0' data-testid='DocsLayout-main'>
      <div className='flex w-72 flex-col border-r border-gray-200 bg-white py-2'>
        <div className='flex flex-1 flex-col md:sticky md:top-20 md:max-h-(screen-14) md:overflow-y-auto'>
          <SearchButton
            className='mb-4 mr-2 mt-8 flex items-center space-x-3 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-left text-sm text-gray-700 shadow-sm transition-all duration-500 ease-in-out hover:border-secondary-500 hover:bg-secondary-100 hover:text-secondary-500'
            indexName={DOCS_INDEX_NAME}
          >
            {({ actionKey }) => (
              <>
                <IconLoupe />
                <span className='flex-auto'>Search docs...</span>
                {actionKey && (
                  <kbd className='font-sans font-semibold'>
                    <abbr title={actionKey.key} className='no-underline'>
                      {actionKey.shortKey}
                    </abbr>{' '}
                    K
                  </kbd>
                )}
              </>
            )}
          </SearchButton>
          <nav className='flex-1 bg-white'>
            <ul>
              {Object.values(navigation).map((navItem) => (
                <DocsNav
                  key={navItem.item.title}
                  item={navItem}
                  active={post.slug}
                  onClick={() => setShowMenu(false)}
                />
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

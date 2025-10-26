import Link from 'next/link';
import React, { useState } from 'react';

import i18nextConfig from '@/next-i18next.config.cjs';

import { SearchButton } from '../AlgoliaSearch';
import DarkModeToggle from '../DarkModeToggle';
import IconLanguage from '../icons/Language';
import NavItemDropdown from '../icons/NavItemDropdown';
import SearchIcon from '../icons/SearchIcon';
import AsyncAPILogo from '../logos/AsyncAPILogo';
import communityItems from './communityItems';
import learningItems from './learningItems';
import MenuBlocks from './MenuBlocks';
import otherItems from './otherItems';
import toolingItems from './toolingItems';

interface MenuItem {
  href: string;
  target?: string;
  text: string;
}

interface MobileNavMenuProps {
  onClickClose?: () => void;
  uniqueLangs: { key: string; text: string; value: string }[];
  currentLanguage: string;
  changeLanguage: (locale: string, langPicker: boolean) => void;
}

/**
 * @description MobileNavMenu component for displaying a responsive navigation menu on mobile devices.
 * @param {MobileNavMenuProps} props - The props for the MobileNavMenu component.
 */
export default function MobileNavMenu({
  onClickClose = () => {},
  uniqueLangs,
  currentLanguage,
  changeLanguage
}: MobileNavMenuProps) {
  const [open, setOpen] = useState<string | null>(null);

  /**
   * @description Function to toggle the visibility of a menu.
   * @param {string} menu - The menu to toggle.
   */
  function showMenu(menu: string) {
    if (open === menu) {
      setOpen(null);

      return;
    }
    setOpen(menu);
  }

  const { langMap } = i18nextConfig;

  return (
    <div className='fixed inset-x-0 top-0 z-60 max-h-full origin-top-right overflow-y-auto py-2 transition lg:hidden animate-in fade-in slide-in-from-top-5 duration-300'>
      <div className='mx-2 rounded-2xl'>
        <div className='shadow-xs divide-y divide-gray-100/50 dark:divide-gray-700/50 rounded-2xl bg-white/90 dark:bg-dark-card/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50'>
          <div className='space-y-6 px-5 pb-6 pt-5'>
            <div className='flex items-center justify-between'>
              <Link
                href='/'
                className='cursor-pointer transition-transform hover:scale-105'
                data-testid='MobileNav-Logo'
              >
                <AsyncAPILogo className='h-10 w-auto' />
              </Link>
              <div className='justify-content -mr-2 flex flex-row items-center gap-1' data-testid='MobileNav-button'>
                <SearchButton
                  className='flex items-center rounded-lg p-2.5 text-gray-700 dark:text-gray-200 transition-all duration-200 ease-in-out hover:bg-gray-100/80 dark:hover:bg-gray-700/50 hover:scale-105 active:scale-95'
                  aria-label='Open Search'
                >
                  <SearchIcon />
                </SearchButton>
                <div className='flex items-center'>
                  <DarkModeToggle />
                </div>
                <button
                  onClick={onClickClose}
                  type='button'
                  className='inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700 dark:text-gray-200 transition-all duration-200 ease-in-out hover:bg-gray-100/80 dark:hover:bg-gray-700/50 hover:rotate-90 active:scale-95'
                >
                  <svg className='size-6' stroke='currentColor' fill='none' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className='space-y-2 px-5 py-3' onClick={() => showMenu('learning')} data-testid='MobileNav-docs'>
            <h4 className='flex justify-between font-semibold text-gray-800 dark:text-white text-base'>
              <Link
                href='/docs'
                className='flex cursor-pointer hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors'
              >
                Docs
              </Link>
              <NavItemDropdown />
            </h4>
            {open === 'learning' && (
              <div className='animate-in fade-in slide-in-from-top-2 duration-200'>
                <MenuBlocks items={learningItems} />
              </div>
            )}
          </div>
          <div className='space-y-2 px-5 py-3' onClick={() => showMenu('tooling')} data-testid='MobileNav-tools'>
            <h4 className='flex justify-between font-semibold text-gray-800 dark:text-white text-base'>
              <Link
                href='/tools'
                className='flex cursor-pointer hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors'
              >
                Tools
              </Link>
              <NavItemDropdown />
            </h4>
            {open === 'tooling' && (
              <div className='animate-in fade-in slide-in-from-top-2 duration-200'>
                <MenuBlocks items={toolingItems} />
              </div>
            )}
          </div>
          <div className='space-y-2 px-5 py-3' onClick={() => showMenu('community')} data-testid='MobileNav-community'>
            <h4 className='flex justify-between font-semibold text-gray-800 dark:text-white text-base'>
              <Link
                href='/community'
                className='flex cursor-pointer hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors'
              >
                Community
              </Link>
              <NavItemDropdown />
            </h4>
            {open === 'community' && (
              <div className='animate-in fade-in slide-in-from-top-2 duration-200'>
                <MenuBlocks items={communityItems} />
              </div>
            )}
          </div>
          <div className='space-y-2 px-5 py-3' onClick={() => showMenu('others')} data-testid='MobileNav-others'>
            <div className='grid gap-4'>
              <div>
                <h4 className='mb-4 flex justify-between font-semibold text-gray-800 dark:text-white text-base'>
                  <button
                    type='button'
                    className='cursor-pointer hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors'
                  >
                    Others
                  </button>
                  <NavItemDropdown />
                </h4>
                {open === 'others' && (
                  <div className='animate-in fade-in slide-in-from-top-2 duration-200'>
                    {otherItems.map((item: MenuItem, index: number) => (
                      <Link
                        href={item.href}
                        key={index}
                        target={item.target || '_self'}
                        rel='noopener noreferrer'
                        className='mb-3 block rounded-lg px-3 py-2 text-base font-medium leading-6 text-gray-700 dark:text-gray-300 transition-all duration-150 ease-in-out hover:bg-gray-100/60 dark:hover:bg-gray-700/40 hover:translate-x-1'
                        data-testid='MobileNav-others'
                      >
                        {item.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='space-y-2 px-5 py-3 pb-6' onClick={() => showMenu('language')}>
            <div className='grid gap-4'>
              <div>
                <h4 className='mb-4 flex justify-between font-semibold text-gray-800 dark:text-white text-base'>
                  <button
                    type='button'
                    className='flex cursor-pointer items-center gap-x-2 hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors'
                  >
                    Language <IconLanguage className='size-5' />
                  </button>
                  <NavItemDropdown />
                </h4>
                {open === 'language' && (
                  <div className='animate-in fade-in slide-in-from-top-2 duration-200'>
                    {uniqueLangs.map((lang) => (
                      <button
                        key={lang.key}
                        onClick={() => changeLanguage(lang.value.toLowerCase(), true)}
                        className={`mb-3 ml-2 block w-full rounded-lg px-3 py-2 text-start text-sm ${'font-medium leading-6 transition-all duration-150 ease-in-out'} ${'hover:bg-gray-100/60 dark:hover:bg-gray-700/40 hover:translate-x-1'} ${
                          currentLanguage.toLowerCase() === lang.text.toLowerCase()
                            ? 'text-secondary-600 dark:text-secondary-400 bg-secondary-100/70 dark:bg-gray-700/50'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                        data-testid='MobileNav-language-item'
                      >
                        {langMap[lang.text.toLowerCase() as keyof typeof langMap] || lang.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

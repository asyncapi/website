import Link from 'next/link';
import type { NextRouter } from 'next/router';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

import { defaultLanguage, i18nPaths, languages } from '@/utils/i18n';

import { SearchButton } from '../AlgoliaSearch';
import GithubButton from '../buttons/GithubButton';
import DarkModeToggle from '../DarkModeToggle';
import { isMobileDevice } from '../helpers/is-mobile';
import { useOutsideClick } from '../helpers/use-outside-click';
import IconLoupe from '../icons/Loupe';
import LanguageSelect from '../languageSelector/LanguageSelect';
import AsyncAPILogo from '../logos/AsyncAPILogo';
import CommunityPanel from './CommunityPanel';
import LearningPanel from './LearningPanel';
import MobileNavMenu from './MobileNavMenu';
import NavItem from './NavItem';
import otherItems from './otherItems';
import ToolsPanel from './ToolsPanel';

interface NavBarProps {
  className?: string;
  hideLogo?: boolean;
}

const isMobile = isMobileDevice();

/**
 * @description Renders the navigation bar component.
 * @param {Object} props - Props object for NavBar component.
 * @param {string} [props.className=''] - Additional CSS classes for styling.
 * @param {boolean} [props.hideLogo=false] - Indicates whether to hide the logo.
 */
export default function NavBar({ className = '', hideLogo = false }: NavBarProps) {
  const router: NextRouter = useRouter();
  const { pathname, query, asPath } = router;
  const [open, setOpen] = useState<'learning' | 'tooling' | 'community' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { i18n } = useTranslation();

  // Adding Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Retrieves unique language options based on the current path and i18nPaths configuration.
   *
   * @returns {string[]} - An array of unique language options with first letter in uppercase.
   */
  const getUniqueLangs = (): string[] => {
    let pathnameWithoutLocale = pathname;

    // Check if the pathname includes "/[lang]", if so, replace it with an empty string
    if (pathname && pathname.includes('/[lang]')) {
      pathnameWithoutLocale = pathname.replace('/[lang]', '');
    }

    // Filter unique languages based on i18nPaths that include the modified pathnameWithoutLocale
    const uniqueLangs = Object.keys(i18nPaths).filter((lang) => i18nPaths[lang].includes(pathnameWithoutLocale));

    // If no unique languages are found, default to ['en']
    return uniqueLangs.length === 0 ? ['en'] : uniqueLangs;
  };

  const uniqueLangs = getUniqueLangs().map((lang) => ({
    key: lang,
    text: lang,
    value: lang
  }));

  /**
   * @description Changes the language and updates the URL accordingly.
   * @param {string} locale - The new locale/language to set.
   * @param {boolean} langPicker - Indicates whether the change is from the language picker.
   *                              If true, stores the language in local storage.
   */
  const changeLanguage = async (locale: string, langPicker: boolean): Promise<void> => {
    // Verifies if the language change is from langPicker or the browser-api
    if (langPicker) {
      localStorage.setItem('i18nLang', locale);
    }

    // Detect current language
    const slug = asPath.split('/')[1];
    const langSlug = languages.includes(slug) && slug;
    const language = query.lang || langSlug || defaultLanguage;

    let href = pathname;

    if (locale) {
      if (pathname.startsWith('/404')) {
        href = `/${locale}`;
      } else {
        href = pathname.replace('[lang]', locale);
      }
    } else if (language) {
      href = `/${language}${href}`;
    } else {
      href = `/${href}`;
    }

    // Fix double slashes
    href = href.replace(/([^:]\/)\/+/g, '$1').replace('//', '/');

    router.push(href);
  };

  /**
   * @description Handles the outside click event for closing menus.
   * @param {('learning' | 'tooling' | 'community' | null)} menu - The menu to close if clicked outside.
   */
  function outsideClick(menu: 'learning' | 'tooling' | 'community' | null) {
    if (open !== menu) return;
    setOpen(null);
  }

  const learningRef = useOutsideClick(() => outsideClick('learning'));
  const toolingRef = useOutsideClick(() => outsideClick('tooling'));
  const communityRef = useOutsideClick(() => outsideClick('community'));

  /**
   * @description Shows or hides the specified menu.
   * @param {('learning' | 'tooling' | 'community' | null)} menu - The menu to show or hide.
   */
  function showMenu(menu: 'learning' | 'tooling' | 'community' | null) {
    if (open === menu) return;
    setOpen(menu);
  }

  /**
   * @description Shows or hides the specified menu on click (for mobile).
   * @param {('learning' | 'tooling' | 'community' | null)} menu - The menu to show or hide.
   */
  function showOnClickMenu(menu: 'learning' | 'tooling' | 'community' | null) {
    if (!isMobile) return;
    if (open === menu) {
      setOpen(null);
    } else {
      setOpen(menu);
    }
  }

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpen(null);
  }, [asPath]);

  return (
    <>
      <div
        // eslint-disable-next-line max-len
        className={`bg-white/60 transition-all duration-500 ease-in-out lg:rounded-xl  backdrop-blur-lg z-100 
          ${isScrolled ? 'mx-auto p-2 lg:p-1 lg:m1-1 shadow-md ring-1 dark:backdrop-blur-xl dark:bg-dark-card/60  ring-black/5  max-w-[76rem] lg:rounded-xl' : ' w-full mt-0 p-4 dark:bg-dark-background  max-w-[76rem] rounded-none'} ${className}`}
      >
        {/* <div
        className={`bg-white/60 mx-auto fixed flex left-0 right-0 top-0 w-full z-[12] items-center justify-between max-w-[76rem] select-none transition-all duration-300 ease-spring ring-1 ring-black/5 bg-white/76 backdrop-blur-lg shadow-lg lg:rounded-full lg:mt-3 translate-y-0 ${className} z-50`}
      ></div> */}
        <div className='flex w-full max-w-[76rem] items-center justify-between py-1 lg:justify-start lg:space-x-2'>
          {!hideLogo && (
            <div className='lg:w-auto lg:flex-1'>
              <div className='flex'>
                <Link href='/' className='cursor-pointer' aria-label='AsyncAPI' data-testid='Navbar-logo'>
                  <AsyncAPILogo
                    className={`w-auto transition-all duration-500 ease-in-out ${isScrolled ? 'h-6 ' : 'h-8'}`}
                  />
                </Link>
              </div>
            </div>
          )}

          <div className='-my-2 -mr-2 flex flex-row items-center justify-center lg:hidden' data-testid='Navbar-search'>
            <SearchButton
              className='flex items-center space-x-2 rounded-md p-2 text-left text-gray-400 dark:text-dark-heading transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 '
              aria-label='Open Search'
            >
              <IconLoupe />
            </SearchButton>
            <button
              onClick={() => setMobileMenuOpen(true)}
              type='button'
              className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none'
            >
              <svg className='size-6' stroke='currentColor' fill='none' viewBox='0 0 24 24'>
                <title>Menu</title>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            </button>
          </div>

          <nav
            className='hidden w-full space-x-4 lg:flex lg:items-center lg:justify-end xl:space-x-8'
            data-testid='Navbar-main'
          >
            <div className='relative' onMouseLeave={() => showMenu(null)} ref={learningRef}>
              <NavItem
                text='Docs'
                href='/docs'
                onClick={() => showOnClickMenu('learning')}
                onMouseEnter={() => showMenu('learning')}
                hasDropdown
              />
              {open === 'learning' && <LearningPanel />}
            </div>

            <div className='relative' onMouseLeave={() => showMenu(null)} ref={toolingRef}>
              <NavItem
                text='Tools'
                href='/tools'
                onClick={() => showOnClickMenu('tooling')}
                onMouseEnter={() => showMenu('tooling')}
                hasDropdown
              />
              {open === 'tooling' && <ToolsPanel />}
            </div>

            <div className='relative' onMouseLeave={() => showMenu(null)} ref={communityRef}>
              <NavItem
                text='Community'
                href='/community'
                onClick={() => showOnClickMenu('community')}
                onMouseEnter={() => showMenu('community')}
                hasDropdown
              />
              {open === 'community' && <CommunityPanel />}
            </div>

            {otherItems.map((item, index) => (
              <NavItem href={item.href} key={index} text={item.text} target={item.target} className={item.className} />
            ))}

            <div className='justify-content flex flex-row items-center'>
              <SearchButton
                className='mr-2 flex items-center space-x-2 rounded-md p-2 text-left text-zinc-700 dark:text-dark-text dark:hover:text-dark-heading  text-opacity-75 transition duration-150 ease-in-out hover:bg-gray-100 dark:hover:bg-dark-border hover:text-gray-800 focus:bg-gray-100 focus:text-gray-500 focus:outline-none'
                aria-label='Open Search'
              >
                <IconLoupe />
              </SearchButton>

              {/* // Language Picker Component */}
              <LanguageSelect
                options={uniqueLangs}
                onChange={(value) => {
                  changeLanguage(value.toLowerCase(), true);
                }}
                className=''
                selected={i18n.language ? i18n.language : 'en'}
              />

              <GithubButton
                text='Star on GitHub'
                href='https://github.com/asyncapi/spec'
                className='ml-2 py-2'
                inNav={true}
              />
              <DarkModeToggle />
            </div>
          </nav>
        </div>
      </div>

      {/* </div> */}
      {/* Mobile menu, show/hide based on mobile menu state. */}
      {mobileMenuOpen && (
        <MobileNavMenu
          onClickClose={() => setMobileMenuOpen(false)}
          uniqueLangs={uniqueLangs}
          currentLanguage={i18n.language ? i18n.language : 'en'}
          changeLanguage={changeLanguage}
        />
      )}
    </>
  );
}

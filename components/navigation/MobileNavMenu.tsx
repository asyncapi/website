import Link from 'next/link';
import React, { useState } from 'react';

import i18nextConfig from '@/next-i18next.config.cjs';

import { SearchButton } from '../AlgoliaSearch';
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
  isOpen: boolean;
  onClickClose?: () => void;
  uniqueLangs: { key: string; text: string; value: string }[];
  currentLanguage: string;
  changeLanguage: (locale: string, langPicker: boolean) => void;
}

export default function MobileNavMenu({
  isOpen,
  onClickClose = () => { },
  uniqueLangs,
  currentLanguage,
  changeLanguage
}: MobileNavMenuProps) {
  const [open, setOpen] = useState<string | null>(null);
  const { langMap } = i18nextConfig;

  function showMenu(menu: string) {
    setOpen((prev) => (prev === menu ? null : menu));
  }

  return (
    <div
      className={`
        fixed menueAnimation ease-in-out inset-x-0 top-0 z-60 max-h-full
        origin-top-right overflow-y-auto py-2 lg:hidden
        transform transition-all duration-700
        ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}
      `}
    >
      <div className="rounded-lg shadow-lg">
        <div className="divide-y-2 divide-gray-50 rounded-lg bg-white">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4">
            <Link href="/">
              <AsyncAPILogo className="h-10 w-auto" />
            </Link>

            <div className="flex items-center">
              <SearchButton className="p-2 text-gray-400 hover:bg-gray-100">
                <SearchIcon />
              </SearchButton>

              <button
                onClick={onClickClose}
                className="p-2 text-gray-400 hover:bg-gray-100"
              >
                <svg className="size-6" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Docs */}
          <div className="px-5 py-2" onClick={() => showMenu('learning')}>
            <h4 className="flex justify-between font-medium text-gray-800 active:scale-[0.98] transition">
              <Link href="/docs">Docs</Link>
              <span className={`transition-transform ${open === 'learning' ? 'rotate-180' : ''}`}>
                <NavItemDropdown />
              </span>
            </h4>
            <div className={`overflow-hidden transition-all duration-300 ${open === 'learning' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              {open === 'learning' && <MenuBlocks items={learningItems} />}
            </div>
          </div>

          {/* Tools */}
          <div className="px-5 py-2" onClick={() => showMenu('tooling')}>
            <h4 className="flex justify-between font-medium text-gray-800 active:scale-[0.98] transition">
              <Link href="/tools">Tools</Link>
              <span className={`transition-transform ${open === 'tooling' ? 'rotate-180' : ''}`}>
                <NavItemDropdown />
              </span>
            </h4>
            <div className={`overflow-hidden transition-all duration-300 ${open === 'tooling' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              {open === 'tooling' && <MenuBlocks items={toolingItems} />}
            </div>
          </div>

          {/* Community */}
          <div className="px-5 py-2" onClick={() => showMenu('community')}>
            <h4 className="flex justify-between font-medium text-gray-800 active:scale-[0.98] transition">
              <Link href="/community">Community</Link>
              <span className={`transition-transform ${open === 'community' ? 'rotate-180' : ''}`}>
                <NavItemDropdown />
              </span>
            </h4>
            <div className={`overflow-hidden transition-all duration-300 ${open === 'community' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              {open === 'community' && <MenuBlocks items={communityItems} />}
            </div>
          </div>

          {/* Others */}
          <div className="px-5 py-2" onClick={() => showMenu('others')}>
            <h4 className="flex justify-between font-medium text-gray-800 active:scale-[0.98] transition">
              <span>Others</span>
              <span className={`transition-transform ${open === 'others' ? 'rotate-180' : ''}`}>
                <NavItemDropdown />
              </span>
            </h4>
            <div className={`overflow-hidden transition-all duration-300 ${open === 'others' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              {open === 'others' &&
                otherItems.map((item, index) => (
                  <Link key={index} href={item.href} className="block py-1 text-gray-700 hover:bg-gray-50">
                    {item.text}
                  </Link>
                ))}
            </div>
          </div>

          {/* Language */}
          <div className="px-5 py-2" onClick={() => showMenu('language')}>
            <h4 className="flex justify-between font-medium text-gray-800 active:scale-[0.98] transition">
              <span className="flex items-center gap-2">Language <IconLanguage /></span>
              <span className={`transition-transform ${open === 'language' ? 'rotate-180' : ''}`}>
                <NavItemDropdown />
              </span>
            </h4>
            <div className={`overflow-hidden transition-all duration-300 ${open === 'language' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              {open === 'language' &&
                uniqueLangs.map((lang) => (
                  <button
                    key={lang.key}
                    onClick={() => changeLanguage(lang.value.toLowerCase(), true)}
                    className={`block w-full text-left py-1 ${currentLanguage.toLowerCase() === lang.text.toLowerCase()
                      ? 'text-secondary-500'
                      : 'text-gray-700'
                      }`}
                  >
                    {langMap[lang.text.toLowerCase() as keyof typeof langMap] || lang.text}
                  </button>
                ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

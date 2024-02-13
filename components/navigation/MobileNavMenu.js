import AsyncAPILogo from '../AsyncAPILogo';
import MenuBlocks from './MenuBlocks';
import { SearchButton } from '../AlgoliaSearch';
import learningItems from './learningItems';
import toolingItems from './toolingItems';
import communityItems from './communityItems';
import otherItems from './otherItems';
import Link from 'next/link';
import NavItemDropdown from '../icons/NavItemDropdown';
import { useState } from 'react';
import AsyncAPILogoLight from '../AsyncAPILogoLight';
import { useTheme } from 'next-themes';
import DarkModeToggle from '../DarkModeToggle';

export default function MobileNavMenu({ onClickClose = () => {} }) {
  const [open, setOpen] = useState();
  const { theme } = useTheme();
  function showMenu(menu) {
    if (open === menu) {
      setOpen(null)
      return;
    }
    setOpen(menu);
  }
  return (
    <div className="fixed top-0 z-60 inset-x-0 py-2 transition transform origin-top-right max-h-full lg:hidden overflow-y-scroll">
      <div className="rounded-lg shadow-lg">
        <div className="rounded-lg shadow-xs dark:bg-slate-800 bg-white divide-y-2 divide-gray-50 dark:divide-slate-700">
          <div className="pt-5 pb-6 px-5 space-y-6">
            <div className="flex items-center justify-between">
              <DarkModeToggle/>
              <div className="flex flex-row items-center justify-content -mr-2" data-testid="MobileNav-button">
                <SearchButton
                  className="flex items-center text-left space-x-2 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                  aria-label="Open Search"
                >
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-none text-slate-300 dark:text-slate-400"
                    aria-hidden="true"
                  >
                    <path d="m19 19-3.5-3.5" />
                    <circle cx="11" cy="11" r="6" />
                  </svg>
                </SearchButton>
                <button
                  onClick={onClickClose}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="py-2 px-5 space-y-2" onClick={() => showMenu('learning')} data-testid="MobileNav-docs">
            <h4 className="dark:text-slate-400 text-gray-800 font-medium flex justify-between"> <a className="cursor-pointer"><Link href="/docs" className="flex">Docs</Link></a><NavItemDropdown/></h4>
            {open === 'learning' && <MenuBlocks items={learningItems} />}
          </div>
          <div className="py-2 px-5 space-y-2" onClick={() => showMenu('tooling')} data-testid="MobileNav-tools">
            <h4 className="dark:text-slate-400 text-gray-800 font-medium flex justify-between"> <a className="cursor-pointer"><Link href="/tools" className="flex">Tools</Link></a><NavItemDropdown/></h4>
            {open === 'tooling' && <MenuBlocks items={toolingItems} />}
          </div>
          <div className="py-2 px-5 space-y-2" onClick={() => showMenu('community')} data-testid="MobileNav-community">
            <h4 className="dark:text-slate-400 text-gray-800 font-medium flex justify-between"><a className="cursor-pointer"><Link href="/community" className="flex">Community</Link></a><NavItemDropdown/></h4>
            {open === 'community' && <MenuBlocks items={communityItems} />}
          </div>
          <div className="py-2 px-5 space-y-2" onClick={() => showMenu('others')} data-testid="MobileNav-others">
            <div className="grid gap-4">
              <div>
                <h4 className="dark:text-slate-400 text-gray-800 font-medium mb-4 flex justify-between"><a className="cursor-pointer">Others</a><NavItemDropdown /></h4>
                {open === 'others' && otherItems.map((item, index) => (
                  <Link href={item.href} key={index}>
                    <a
                      target={item.target || '_self'}
                      rel="noopener noreferrer"
                      key={index}
                      className="py-1 text-base leading-6 font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150 block mb-4"
                      data-testid="MobileNav-others"
                    >
                      {item.text}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

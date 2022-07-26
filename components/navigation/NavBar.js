import { useState, useEffect } from "react"
import { useRouter } from "next/router";
import { isMobileDevice } from '../helpers/is-mobile'
import { useOutsideClick } from '../helpers/use-outside-click';
import AsyncAPILogo from '../AsyncAPILogo'
import NavItem from './NavItem'
import ToolsPanel from './ToolsPanel'
import LearningPanel from './LearningPanel'
import CommunityPanel from "./CommunityPanel"
import MobileNavMenu from './MobileNavMenu'
import otherItems from './otherItems'
import Button from '../buttons/Button'
import GithubButton from "../buttons/GithubButton"
import { SearchButton } from '../AlgoliaSearch';
import Link from 'next/link';

const isMobile = isMobileDevice();

export default function NavBar({
  className = '',
  hideLogo = false,
}) {
  const { asPath } = useRouter();
  const [open, setOpen] = useState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState();

  function outsideClick(menu) {
    if (open !== menu) return;
    setOpen(null);
  }

  const learningRef = useOutsideClick(() => outsideClick('learning'));
  const toolingRef = useOutsideClick(() => outsideClick('tooling'));
  const communityRef = useOutsideClick(() => outsideClick('community'));

  function showMenu(menu) {
    if (open === menu) return;
    setOpen(menu);
  }

  function showOnClickMenu(menu) {
    if (!isMobile) return ;
    if (open === menu) return setOpen(null);
    setOpen(menu);
  }

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpen(null);
  }, [asPath])

  return (
    <div className={`bg-white ${className} z-50`}>
      <Button className="block md:inline-block absolute transform -translate-y-20 focus:translate-y-0" text="Skip to main content" href="#" bgClassName="bg-gray-100" textClassName="text-gray-700"/>
      <div className="flex w-full justify-between items-center py-6 lg:justify-start lg:space-x-10">
        {!hideLogo && (
          <div className="lg:w-auto lg:flex-1">
            <div className="flex">
              <Link href="/">
                <a className="cursor-pointer">
                  <AsyncAPILogo className="h-8 w-auto sm:h-8" />
                </a>
              </Link>
            </div>
          </div>
        )}

        <div className="-mr-2 -my-2 lg:hidden">
          <button onClick={() => setMobileMenuOpen(true)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <title>Menu</title>
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>

        <nav className="hidden lg:flex lg:items-center lg:justify-end space-x-6 xl:space-x-10 w-full">
          <div className="relative" onMouseLeave={() => showMenu(null)} ref={learningRef}>
            <NavItem 
              text="Docs" 
              href='/docs' 
              onClick={() => showOnClickMenu('learning')} 
              onMouseEnter={() => showMenu('learning')} 
              hasDropdown
            />
            {open === 'learning' && <LearningPanel />}
          </div>

          <div className="relative" onMouseLeave={() => showMenu(null)} ref={toolingRef}>
            <NavItem 
              text="Tools" 
              onClick={() => showOnClickMenu('tooling')} 
              onMouseEnter={() => showMenu('tooling')} 
              hasDropdown 
            />
            { open === 'tooling' && <ToolsPanel /> }
          </div>

          <div className="relative" onMouseLeave={() => showMenu(null)} ref={communityRef}>
            <NavItem 
              text="Community" 
              onClick={() => showOnClickMenu('community')} 
              onMouseEnter={() => showMenu('community')} 
              hasDropdown
            />
            {open === 'community' && <CommunityPanel />}
          </div>

          {otherItems.map((item, index) => (
            <NavItem href={item.href} key={index} text={item.text} target={item.target} className={item.className} />
          ))}

          <div className="flex flex-row items-center justify-content">
            <SearchButton 
              className="flex items-center text-left space-x-2 px-2 py-1.5 bg-white border-secondary-500 border text-secondary-500 hover:text-white shadow-md bg-secondary-100 hover:bg-secondary-500 transition-all duration-500 ease-in-out rounded-md"
            >
              {({ actionKey }) => (
                <>
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
                  <span className="flex-auto text-sm">Search...</span>
                  {actionKey ? (
                    <kbd className="font-sans font-semibold dark:text-slate-500 text-sm">
                      <abbr
                        title={actionKey.key}
                        className="no-underline text-slate-300 dark:text-slate-500"
                      >
                        {actionKey.shortKey}
                      </abbr>{' '}
                      K
                    </kbd>
                  ) : null}
                </>
              )}
            </SearchButton>

            <GithubButton text="Star on Github" href="https://github.com/asyncapi/spec" className="py-2 ml-2" inNav="true" />
          </div>
        </nav>

      </div>

      {/* Mobile menu, show/hide based on mobile menu state. */}
      {mobileMenuOpen && <MobileNavMenu onClickClose={() => setMobileMenuOpen(false)} />}
    </div>
  )
}

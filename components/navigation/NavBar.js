import { useState, useEffect } from "react"
import { registerClickAway } from '../helpers/click-away'
import AsyncAPILogo from '../AsyncAPILogo'
import NavItem from './NavItem'
import ToolsPanel from './ToolsPanel'
import LearningPanel from './LearningPanel'
import NavMenu from './NavMenu'
import MobileNavMenu from './MobileNavMenu'
import communityItems from './communityItems'
import otherItems from './otherItems'
import Button from '../buttons/Button'
import GithubButton from "../buttons/GithubButton"
import Link from 'next/link';

export default function NavBar ({
  className = '',
  hideLogo = false,
}) {
  const [open, setOpen] = useState()
  const [mobileMenuOpen, setMobileMenuOpen] = useState()

  function showMenu(menu) {
    if (open === menu) return setOpen(null)

    setTimeout(() => {
      setOpen(menu)
    }, 0)
  }

  useEffect(() => {
    if (open) registerClickAway(() => {
      setOpen(null)
    })
  }, [open])

  return (
      <div className={`bg-white ${className} z-50`}>
        <Button className="block md:inline-block absolute transform -translate-y-20 focus:translate-y-0" text="Skip to main content" href="#"/>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <nav className="hidden lg:flex lg:items-center lg:justify-end space-x-6 xl:space-x-10 w-full">
          <div className="relative">
            <NavItem text="Learning" onClick={() => showMenu('learning')} hasDropdown />
            {open === 'learning' && <LearningPanel />}
          </div>

          <div className="relative">
            <NavItem text="Tools" onClick={() => showMenu('tooling')} hasDropdown />
            {open === 'tooling' && <ToolsPanel />}
          </div>

          <div className="relative">
            <NavItem text="Community" onClick={() => showMenu('community')} hasDropdown />
            {open === 'community' && <NavMenu items={communityItems} />}
          </div>

          {otherItems.map((item, index) => (
            <NavItem href={item.href} key={index} text={item.text} target={item.target} className={item.className} />
          ))}

          <GithubButton text="Star on Github" href="https://github.com/asyncapi/spec" className="py-2" inNav="true" />

        </nav>

      </div>

      {/* Mobile menu, show/hide based on mobile menu state. */}
      {mobileMenuOpen && <MobileNavMenu onClickClose={() => setMobileMenuOpen(false)} />}
    </div>
  )
}

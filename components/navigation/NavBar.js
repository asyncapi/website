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

export default function NavBar ({ className = '' }) {
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
    <div className={`relative bg-white ${className}`}>
      <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
        <div className="lg:w-0 lg:flex-1">
          <a href="/" className="flex">
            <AsyncAPILogo className="h-8 w-auto sm:h-8" />
          </a>
        </div>
        <div className="-mr-2 -my-2 md:hidden">
          <button onClick={() => setMobileMenuOpen(true)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
        <nav className="hidden md:flex space-x-10">
          <div className="relative">
            <NavItem text="Learning" onClick={() => showMenu('learning')} hasDropdown />
            {open === 'learning' && <LearningPanel className="z-50" />}
          </div>

          <div className="relative">
            <NavItem text="Tools" onClick={() => showMenu('tooling')} hasDropdown />
            { open === 'tooling' && <ToolsPanel className="z-50" /> }
          </div>

          <div className="relative">
            <NavItem text="Community" onClick={() => showMenu('community')} hasDropdown />
            {open === 'community' && <NavMenu items={communityItems} className="z-50" />}
          </div>

          {
            otherItems.map((item, index) => (
              <NavItem href={item.href} key={index} text={item.text} target={item.target} />
            ))
          }
        </nav>
        <div className="hidden md:flex md:flex-1">
          
        </div>
      </div>

      { /* Mobile menu, show/hide based on mobile menu state. */ }
      { mobileMenuOpen && <MobileNavMenu onClickClose={() => setMobileMenuOpen(false)} /> }
    </div>
  )
}

import { useState } from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Link from 'next/link'
import AsyncAPILogo from '../AsyncAPILogo'
import Head from '../Head'
import DocsContext from '../../context/DocsContext'

export default function DocsLayout({ post, navItems = {}, children }) {
  if (!post) return <ErrorPage statusCode={404} />
  if (post.title === undefined) throw new Error('Post title is required')

  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const [showMenu, setShowMenu] = useState(false)

  const navigation = navItems.sort((i1, i2) => {
    const i1Weight = i1.isSection ? (i1.weight + 1) * 1000 : (i1.sectionWeight + 1) * 1000 + (i1.weight || 0)
    const i2Weight = i2.isSection ? (i2.weight + 1) * 1000 : (i2.sectionWeight + 1) * 1000 + (i2.weight || 0)
    return i1Weight - i2Weight
  })

  return (
    <DocsContext.Provider value={{ post, navItems }}>
      <div className="flex h-screen max-w-7xl mx-auto overflow-hidden bg-white">
        { showMenu && (
          <DocsMobileMenu onClickClose={() => setShowMenu(false)} />
        ) }
        
        {/* <!-- Static sidebar for desktop --> */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-gray-200 bg-white pb-8">
            <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <Link href="/">
                <a className="flex">
                  <AsyncAPILogo className="h-8 w-auto ml-3" />
                  <div className="self-end mb-0.5 ml-0.5 font-bold italic text-pink-500 text-lg">docs</div>
                </a>
              </Link>
              
              <nav className="mt-3 flex-1 px-2 bg-white">
                {
                  navigation.map((item, i) => (
                    <div key={`menu-item-${i}`}>
                    {
                      item.isSection ? (
                        <DocsNavItem title={item.title} href={item.slug} section />
                      ) : (
                        <DocsNavItem title={item.title} href={item.slug} active={post.slug === item.slug} />
                      )
                    }
                    </div>
                  ))
                }
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <div className="flex md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
            <Link href="/">
              <a className="flex-1 text-left">
                <AsyncAPILogo className="inline-block h-6 w-auto ml-3 mt-3" />
              </a>
            </Link>
            { !showMenu && (
              <button onClick={() => setShowMenu(true)} className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150" aria-label="Open sidebar">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
          </div>
          <main className="flex-1 relative z-0 overflow-y-auto pt-2 pb-6 focus:outline-none md:py-6" tabIndex="0">
            <div className="px-4 sm:px-6 md:px-8">
              <h1 className="text-4xl font-normal text-gray-800 font-sans antialiased">{post.title}</h1>
            </div>
            <div className="px-4 sm:px-6 md:px-8">
              <article className="mb-32">
                <Head title={post.title} />
                { children }
              </article>
            </div>
          </main>
        </div>
      </div>
    </DocsContext.Provider>
  )
}

function DocsMobileMenu({
  sections = {},
  onClickClose = () => {},
}) {
  return (
    <div className="md:hidden">
      <div className="fixed inset-0 flex z-40">
        <div className="fixed inset-0">
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>

        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-14 p-1">
            <button onClick={onClickClose} className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600" aria-label="Close sidebar">
              <svg className="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <Link href="/">
              <a className="flex-shrink-0 flex items-center px-4">
                <AsyncAPILogo className="h-6 w-auto" />
              </a>
            </Link>
            <nav className="mt-5 px-2">
              <a href="#" className="group flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-900 rounded-md bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150">
                Dashboard
                </a>
              <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition ease-in-out duration-150">
                <svg className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                  Team
                </a>
              <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition ease-in-out duration-150">
                <svg className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                  Projects
                </a>
              <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition ease-in-out duration-150">
                <svg className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                  Calendar
                </a>
              <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition ease-in-out duration-150">
                <svg className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                  Documents
                </a>
              <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition ease-in-out duration-150">
                <svg className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                  Reports
                </a>
            </nav>
          </div>
        </div>
        <div className="flex-shrink-0 w-14">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </div>
    </div>
  )
}

function DocsNavItem ({ href, title, section = false, active = false }) {
  const commonClassNames = 'flex px-2 transition ease-in-out duration-150 focus:outline-none'
  const sectionClassNames = `mt-8 mb-2 text-primary-800 text-xs font-medium uppercase hover:text-primary-800 ${commonClassNames}`
  const activeItemClassNames = 'font-medium text-primary-600'
  const nonActiveItemClassNames = 'font-thin hover:text-primary-800 hover:font-normal'
  const itemClassNames = `mb-3 text-gray-500 text-sm ${commonClassNames} ${active ? activeItemClassNames : nonActiveItemClassNames}`
  const LinkWrapper = ({ children }) => (
    <Link href={href}>{children}</Link>
  )
  const Anchor = () => (
    <a href={section ? undefined : href} className={section ? sectionClassNames : itemClassNames}>
      {title}
    </a>
  )

  if (section) return <Anchor />

  return <LinkWrapper><Anchor /></LinkWrapper>
}
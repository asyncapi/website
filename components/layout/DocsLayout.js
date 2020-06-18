import { useState } from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from '../Head'
import DocsContext from '../../context/DocsContext'
import TOC from '../TOC'
import ClickableLogo from '../ClickableLogo'
import DocsNavItem from '../navigation/DocsNavItem'
import DocsMobileMenu from '../navigation/DocsMobileMenu'

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
    console.group()
    console.log(i1, i2)
    console.log(i1Weight, i2Weight)
    console.log(i1Weight - i2Weight)
    console.groupEnd()

    return i1Weight - i2Weight
  })

  return (
    <DocsContext.Provider value={{ post, navItems }}>
      <div className="flex max-w-7xl mx-auto bg-white min-h-screen">
        { showMenu && (
          <DocsMobileMenu onClickClose={() => setShowMenu(false)} post={post} navigation={navigation} />
        ) }
        
        {/* <!-- Static sidebar for desktop --> */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 md:overflow-y-auto md:sticky md:top-0 md:max-h-screen">
              <ClickableLogo logoClassName="h-8 w-auto ml-3" />
              
              <nav className="flex-1 mt-3 pb-8 px-2 bg-white">
                {
                  navigation.map((item, i) => (
                    <div key={`menu-item-${i}`}>
                      <DocsNavItem item={item} active={post.slug === item.slug} />
                    </div>
                  ))
                }
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-0 flex-1">
          <div className="flex md:hidden pl-1 pt-2 pb-2 sm:pl-3 sm:pt-3">
            <div className="flex-1 mt-1.5">
              <ClickableLogo logoClassName="h-8 w-auto ml-3" />
            </div>

            { !showMenu && (
              <button onClick={() => setShowMenu(true)} className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150" aria-label="Open sidebar">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
          </div>
          <main className="relative z-0 pt-2 pb-6 focus:outline-none md:py-6" tabIndex="0">
            <div className="px-4 sm:px-6 md:px-8">
              <h1 className="text-4xl font-normal text-gray-800 font-sans antialiased">{post.title}</h1>
            </div>
            <div className="px-4 sm:px-6 md:px-8">
              <p className="text-sm font-normal text-gray-400 font-sans antialiased">
                Found an error? Have a suggestion? 
                <a href={`https://github.com/asyncapi/website/blob/master/pages${post.slug}.md`} className="ml-1 underline">Edit this page on Github</a>
              </p>
            </div>
            <div className={`xl:flex ${post.toc && post.toc.length ? 'xl:flex-row-reverse' : ''}`}>
              <TOC toc={post.toc} className="bg-blue-100 mt-4 p-4 sticky top-0 xl:bg-transparent xl:mt-0 xl:pt-0 xl:pb-8 xl:top-4 xl:overflow-y-auto xl:max-h-(screen-16) xl:w-72 xl:border-l xl:border-gray-200" />
              <div className="mt-8 px-4 sm:px-6 xl:px-8 xl:flex-1 xl:max-w-184">
                <article className="mb-32">
                  <Head
                    title={post.title}
                    description={post.excerpt}
                    image={post.cover}
                  />
                  { children }
                </article>
              </div>
            </div>
          </main>
        </div>
      </div>
    </DocsContext.Provider>
  )
}

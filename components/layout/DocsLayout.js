import { useState } from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import sortBy from 'lodash/sortBy'
import Head from '../Head'
import DocsContext from '../../context/DocsContext'
import TOC from '../TOC'
import ClickableLogo from '../ClickableLogo'
import DocsNavItem from '../navigation/DocsNavItem'
import DocsMobileMenu from '../navigation/DocsMobileMenu'
import NavBar from '../navigation/NavBar'
import ArrowRight from '../icons/ArrowRight'
import AnnouncementRemainingDays from '../campaigns/AnnouncementRamainingDays'
import AnnouncementHero from '../campaigns/AnnoucementHero'

function generateEditLink(post) {
  if (post.slug.includes('/specifications/')) {
    return <a target="_blank" rel="noopener noreferrer" href={`https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md`} className="ml-1 underline">Edit this page on Github</a>
  } 
  return <a target="_blank" rel="noopener noreferrer" href={`https://github.com/asyncapi/website/blob/master/pages${post.isIndex ? post.slug + '/index' : post.slug}.md`} className="ml-1 underline">Edit this page on Github</a>
}

export default function DocsLayout({ post, navItems = {}, children }) {
  if (!post) return <ErrorPage statusCode={404} />
  if (post.title === undefined) throw new Error('Post title is required')

  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const [showMenu, setShowMenu] = useState(false)

  const navigation = sortBy(navItems.map(item => {
    const sortWeight = item.isSection ? (item.weight + 1) * 1000 : (item.sectionWeight + 1) * 1000 + (item.weight || 0)
    return {
      ...item,
      sortWeight: sortWeight,
    }
  }), ['sortWeight'])

  return (
    <DocsContext.Provider value={{ post, navItems }}>
      <div className="flex bg-white min-h-screen xl:max-w-7xl xl:mx-auto">
        { showMenu && (
          <DocsMobileMenu onClickClose={() => setShowMenu(false)} post={post} navigation={navigation} />
        ) }
        
        {/* <!-- Static sidebar for desktop --> */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 md:overflow-y-auto md:sticky md:top-0 md:max-h-screen">
              <ClickableLogo logoClassName="h-8 w-auto ml-4 mt-0.5" />
              
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
        <div className="flex flex-col w-0 flex-1 max-w-full lg:max-w-(screen-16)">
          <div className="flex pl-1 pt-2 pb-2 sm:pl-3 sm:pt-3 lg:hidden">
            <NavBar className="flex px-4 w-full lg:hidden" />
          </div>
          <div className="hidden lg:flex lg:border-b lg:border-gray-200">
            <NavBar hideLogo />
          </div>
          <main className="relative z-0 pt-2 pb-6 focus:outline-none md:py-6" tabIndex="0">
            <AnnouncementHero className="text-center mx-4" small={true} />
            {!showMenu && (
              <div className="lg:hidden">
                <button onClick={() => setShowMenu(true)} className="flex text-gray-500 px-4 sm:px-6 md:px-8 hover:text-gray-900 focus:outline-none" aria-label="Open sidebar">
                  <span>{post.sectionTitle}</span>
                  <ArrowRight className="pl-1 w-5 h-5 transform rotate-90" />
                </button>
              </div>
            )}
            <h1 className="px-4 text-4xl font-normal text-gray-800 font-sans antialiased sm:px-6 md:px-8">{post.title}</h1>
            {
              post.isPrerelease 
              ? <h3 className="px-4 text-lxl font-normal text-gray-800 font-sans antialiased sm:px-6 md:px-8">To be released on {post.releaseDate}</h3> 
              : null
            }
            <div className="px-4 sm:px-6 md:px-8">
              <p className="text-sm font-normal text-gray-400 font-sans antialiased">
                Found an error? Have a suggestion? 
                {generateEditLink(post)}
              </p>
            </div>
            <div className={`xl:flex ${post.toc && post.toc.length ? 'xl:flex-row-reverse' : ''}`}>
              <TOC toc={post.toc} depth={3} className="bg-blue-100 mt-4 p-4 sticky top-0 overflow-y-auto max-h-screen xl:bg-transparent xl:mt-0 xl:pt-0 xl:pb-8 xl:top-4 xl:max-h-(screen-16) xl:w-72" />
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

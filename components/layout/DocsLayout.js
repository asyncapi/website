import { useState } from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from '../Head'
import DocsContext from '../../context/DocsContext'
import TOC from '../TOC'
import DocsNav from '../navigation/DocsNav'
import DocsMobileMenu from '../navigation/DocsMobileMenu'
import DocsButton from '../buttons/DocsButton'
import NavBar from '../navigation/NavBar'
import ArrowRight from '../icons/ArrowRight'
import Feedback from '../Feedback'
import StickyNavbar from '../navigation/StickyNavbar'
import Heading from '../typography/Heading'
import AnnouncementHero from '../campaigns/AnnoucementHero'
import { SearchButton, DOCS_INDEX_NAME } from '../AlgoliaSearch';
import IconLoupe from '../icons/Loupe';
import { getAllPosts } from '../../lib/api'

function generateEditLink(post) {
  if (post.slug.includes('/specifications/')) {
    return <a target="_blank" rel="noopener noreferrer" href={`https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md`} className="ml-1 underline">Edit this page on GitHub</a>
  } 
  return <a target="_blank" rel="noopener noreferrer" href={`https://github.com/asyncapi/website/blob/master/pages${post.isIndex ? post.slug + '/index' : post.slug}.md`} className="ml-1 underline">Edit this page on GitHub</a>
}

export default function DocsLayout({ post, navItems = {}, children }) {
  const posts = getAllPosts()
  if (!post) return <ErrorPage statusCode={404} />
  if (post.title === undefined) throw new Error('Post title is required')

  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const [showMenu, setShowMenu] = useState(false)
  const navigation = posts["docsTree"]

  return (
    <DocsContext.Provider value={{ post, navItems }}>
      <StickyNavbar>
        <NavBar className="max-w-screen-xl block px-4 sm:px-6 lg:px-8 mx-auto" />
      </StickyNavbar>
      <div className="bg-white px-4 sm:px-6 lg:px-8 w-full xl:max-w-7xl xl:mx-auto">
        {showMenu && (
          <DocsMobileMenu onClickClose={() => setShowMenu(false)} post={post} navigation={navigation} />
        )}
        <div className="flex flex-row" id="main-content">
        {/* <!-- Static sidebar for desktop --> */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-gray-200 bg-white py-2">
            <div className="flex-1 flex flex-col md:overflow-y-auto md:sticky md:top-20 md:max-h-(screen-14)">

              <SearchButton 
                className="mt-8 mb-4 mr-2 flex items-center text-left text-sm space-x-3 px-3 py-1.5 bg-white hover:bg-secondary-100 border-gray-300 hover:border-secondary-500 border text-gray-700 hover:text-secondary-500 shadow-sm transition-all duration-500 ease-in-out rounded-md"
                indexName={DOCS_INDEX_NAME}
              >
                {({ actionKey }) => (
                  <>
                    <IconLoupe />
                    <span className="flex-auto">Search docs...</span>
                    {actionKey && (
                      <kbd className="font-sans font-semibold">
                        <abbr
                          title={actionKey.key}
                          className="no-underline"
                        >
                          {actionKey.shortKey}
                        </abbr>{' '}
                        K
                      </kbd>
                    )}
                  </>
                )}
              </SearchButton>
              
              <nav className="flex-1 bg-white">
                <ul>
                  {Object.values(navigation).map(navItem => (
                    <DocsNav key={navItem.item.title} item={navItem} active={post.slug} onClick={() => setShowMenu(false)} />
                  ))}
                </ul>
              </nav>

            </div>
          </div>
        </div>
        <div className="flex flex-col w-0 flex-1 max-w-full lg:max-w-(screen-16)">
          <main className="relative z-0 pt-2 pb-6 focus:outline-none md:py-6" tabIndex="0">
            {!showMenu && (
              <div className="lg:hidden">
                <button onClick={() => setShowMenu(true)} className="flex text-gray-500 px-4 sm:px-6 md:px-8 hover:text-gray-900 focus:outline-none" aria-label="Open sidebar">
                  <span>{post.sectionTitle}</span>
                  <ArrowRight className="pl-1 w-5 h-5 transform rotate-90" />
                </button>
              </div>
            )}
            
            <AnnouncementHero className='ml-6' hideVideo={true} />

            <div className={`xl:flex ${post.toc && post.toc.length ? 'xl:flex-row-reverse' : ''}`}>
              <TOC toc={post.toc} depth={3} className="bg-blue-100 mt-4 p-4 sticky top-20 overflow-y-auto max-h-screen xl:bg-transparent xl:mt-0 xl:pb-8 xl:w-72" />
              <div className="px-4 sm:px-6 xl:px-8 xl:flex-1 xl:max-w-184">
              <Heading level="h1" typeStyle="heading-lg">
                {post.title}
              </Heading>
              <div>
                <p className="text-sm font-normal text-gray-600 font-sans antialiased">
                  Found an error? Have a suggestion? 
                  {generateEditLink(post)}
                </p>
              </div>
                <article className="mb-12 mt-12">
                  <Head
                    title={post.title}
                    description={post.excerpt}
                    image={post.cover}
                  />
                  { children }
                </article>
                <div>
                  <DocsButton post={post} />
                </div>
                <div className="">
                  <Feedback />
                </div>
              </div>
            </div>
          </main>
        </div>
        </div>
      </div>
    </DocsContext.Provider>
  )
}

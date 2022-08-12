import { useState } from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import sortBy from 'lodash/sortBy'
import Head from '../Head'
import DocsContext from '../../context/DocsContext'
import TOC from '../TOC'
import DocsNav from '../navigation/DocsNav'
import DocsMobileMenu from '../navigation/DocsMobileMenu'
import NavBar from '../navigation/NavBar'
import ArrowRight from '../icons/ArrowRight'
import Feedback from '../Feedback'
import StickyNavbar from '../navigation/StickyNavbar'
import Heading from '../typography/Heading'
import IconHamburgerMenu from '../icons/HamburgerMenu'
import { SearchButton, DOCS_INDEX_NAME } from '../AlgoliaSearch';
import IconLoupe from '../icons/Loupe';

function generateEditLink(post) {
  if (post.slug.includes('/specifications/')) {
    return <a target="_blank" rel="noopener noreferrer" href={`https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md`} className="ml-1 underline">Edit this page on Github</a>
  } 
  return <a target="_blank" rel="noopener noreferrer" href={`https://github.com/asyncapi/website/blob/master/pages${post.isIndex ? post.slug + '/index' : post.slug}.md`} className="ml-1 underline">Edit this page on Github</a>
}

function buildNavTree(navItems) {
  const tree = {
    'welcome': {
      item: { title: 'Welcome', weight: 0, isRootSection: true, isSection: true, rootSectionId: 'welcome', sectionWeight: 0, slug: '/docs' },
      children: {}
    }
  }
  
  //first we make sure that list of items lists main section items and then sub sections, documents last
  const sortedItems = sortBy(navItems, ['isRootSection', 'weight', 'isSection']);

  sortedItems.forEach(item => {
    //identify main sections
    if (item.isRootSection) {
      tree[item.rootSectionId] = { item, children: {} }
    }

    //identify subsections
    if (item.parent) {
      tree[item.parent].children[item.sectionId] = { item, children: [] }
    }

    if (!item.isSection) {
      if (item.sectionId) {
        let section = tree[item.rootSectionId].children[item.sectionId];
        if (!section) {
          tree[item.rootSectionId].children[item.sectionId] = { item, children: [] }
        }
        tree[item.rootSectionId].children[item.sectionId].children.push(item)
      } else {
        tree[item.rootSectionId].children[item.title] = { item };
      }
    }
  })

  for (const [rootKey, rootValue] of Object.entries(tree)) {
    const allChildren = rootValue.children;
    const allChildrenKeys = Object.keys(allChildren);

    rootValue.children = allChildrenKeys
      .sort((prev, next) => {
        return allChildren[prev].item.weight - allChildren[next].item.weight;
      }).reduce(
        (obj, key) => { 
          obj[key] = allChildren[key]; 
          return obj;
        }, 
        {}
      );

    //handling subsections
    if (allChildrenKeys.length > 1) {
      for (const key of allChildrenKeys) {
        allChildren[key].children?.sort((prev, next) => {
          return prev.weight - next.weight;
        });

        // point in slug for specification subgroup to the latest specification version
        if (rootKey === 'reference' && key === 'specification') {
          allChildren[key].item.href = allChildren[key].children[0].slug;
        }
      }
    }
  }

  return tree;
}

export default function DocsLayout({ post, navItems = {}, children }) {
  if (!post) return <ErrorPage statusCode={404} />
  if (post.title === undefined) throw new Error('Post title is required')

  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const [showMenu, setShowMenu] = useState(false)
  const navigation = buildNavTree(navItems);

  return (
    <DocsContext.Provider value={{ post, navItems }}>
      <StickyNavbar>
        <NavBar className="max-w-screen-xl block px-4 sm:px-6 lg:px-8 mx-auto" />
      </StickyNavbar>

      <div className="sticky top-23 lg:top-20 right-0 px-3 sm:px-6 lg:px-8 pt-3 pb-3 z-10 bg-white opacity-100 border-b border-gray-200 w-full overflow-auto lg:hidden">
        <div className="block bg-white text-gray-500">
          <button onClick={() => {(showMenu)?setShowMenu(false):setShowMenu(true)}} className="flex items-center w-full justify-between focus:outline-none " aria-label="Open sidebar">
            <span className='flex justify-between'>
            <span className="text-sm md:text-base my-1">{post.sectionTitle}</span>
              {(!(post.sectionTitle == null) && (post.title != post.sectionTitle))?(<span className="w-5 h-auto mt-1 md:mx-2 text-sm" >&gt;</span>):(<span></span>)}
              {(post.title != post.sectionTitle)? <span className="text-sm md:text-base p-0 fit-content text-gray-900 my-1">{post.title}</span> : <></>}
            </span>
            <span>
              { (showMenu)? (<ArrowRight className="w-7 h-max text-gray-900 transform scale-[120] -rotate-90" />):(<ArrowRight className="w-7 h-max text-gray-900 transform scale-[120] rotate-90" />)}
            
            </span>
          </button>
        </div>
        { showMenu && (
          <DocsMobileMenu onClickClose={() => setShowMenu(false)} post={post} navigation={navigation} />
        ) }
      </div>

      <div className="bg-white px-4 sm:px-6 lg:px-8 w-full xl:max-w-7xl xl:mx-auto">
        <div className="flex flex-row">
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
                          className="no-underline text-slate-300"
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
            <div className={`xl:flex ${post.toc && post.toc.length ? 'xl:flex-row' : ''}`}>
              <div className="px-4 mt-6 sm:px-6 xl:px-8 xl:flex-1 xl:max-w-184">
              <Heading level="h1" typeStyle="heading-lg">
                {post.title}
              </Heading>
            {
              post.isPrerelease 
              ? <h3 className="text-lxl font-normal text-gray-800 font-sans antialiased">To be released on {post.releaseDate}</h3> 
              : null
            }
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
                <div className="">
                  <Feedback />
                </div>
              </div>

              <TOC toc={post.toc} depth={3} className="sticky z-50 bottom-6 right-6 float-right rounded-md xl:inherit-0 xl:border-0 w-11 overflow-y-auto xl:max-h-screen xl:bg-transparent xl:mt-0 xl:pb-8 xl:w-72" />
            
            </div>
          </main>
        </div>
        </div>
      </div>
    </DocsContext.Provider>
  )
}

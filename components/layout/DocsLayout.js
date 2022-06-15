import { useState } from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from '../Head'
import TOC from '../TOC'
import DocsNav from '../navigation/DocsNav'
import DocsMobileMenu from '../navigation/DocsMobileMenu'
import NavBar from '../navigation/NavBar'
import ArrowRight from '../icons/ArrowRight'
import Feedback from '../Feedback'
import StickyNavbar from '../navigation/StickyNavbar'
import Heading from '../typography/Heading'

import docs from '../../config/docs.json'

function generateEditLink(doc) {
  if (doc.slug.includes('/specifications/')) {
    return <a target="_blank" rel="noopener noreferrer" href={`https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md`} className="ml-1 underline">Edit this page on Github</a>
  } 
  return <a target="_blank" rel="noopener noreferrer" href={`https://github.com/asyncapi/website/blob/master/${doc.filePath}`} className="ml-1 underline">Edit this page on Github</a>
}

function buildNavigation() {
  const firstSection = {
    section: docs.section,
    files: docs.files.filter(file => !file.files),
  }
  docs.files.unshift(firstSection);
  docs.files = docs.files.filter(file => file.files);
  return docs.files;
}
const navigation = buildNavigation();

export default function DocsLayout({ doc, children }) {
  if (!doc) return <ErrorPage statusCode={404} />

  const meta = doc.meta;
  if (meta.title === undefined) throw new Error('Post title is required')

  const router = useRouter()
  if (!router.isFallback && !doc?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <StickyNavbar>
        <NavBar className="max-w-screen-xl block px-4 sm:px-6 lg:px-8 mx-auto" />
      </StickyNavbar>
      <div className="bg-white px-4 sm:px-6 lg:px-8 w-full xl:max-w-7xl xl:mx-auto">
        {showMenu && (
          <DocsMobileMenu onClickClose={() => setShowMenu(false)} doc={doc} navigation={navigation} />
        )}
        <div className="flex flex-row">
        {/* <!-- Static sidebar for desktop --> */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-gray-200 bg-white py-2">
            <div className="flex-1 flex flex-col md:overflow-y-auto md:sticky md:top-20 md:max-h-(screen-14)">
              
              <nav className="flex-1 pt-8 pb-8 bg-white">
                <ul>
                  {navigation.map(file => (
                    <DocsNav key={file.section.title} file={file} active={doc.slug} level={0} onClick={() => setShowMenu(false)} />
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
                  <span>{doc.sectionTitle}</span>
                  <ArrowRight className="pl-1 w-5 h-5 transform rotate-90" />
                </button>
              </div>
            )}
            
            <div className={`xl:flex ${doc.toc && doc.toc.length ? 'xl:flex-row-reverse' : ''}`}>
              <TOC toc={doc.toc} depth={3} className="bg-blue-100 mt-4 p-4 sticky top-20 overflow-y-auto max-h-screen xl:bg-transparent xl:mt-0 xl:pb-8 xl:w-72" />
              <div className="px-4 sm:px-6 xl:px-8 xl:flex-1 xl:max-w-184">
              <Heading level="h1" typeStyle="heading-lg">
                {meta.title}
              </Heading>
            {
              meta.isPrerelease 
              ? <h3 className="text-lxl font-normal text-gray-800 font-sans antialiased">To be released on {meta.releaseDate}</h3> 
              : null
            }
            <div>
              <p className="text-sm font-normal text-gray-600 font-sans antialiased">
                Found an error? Have a suggestion? 
                {generateEditLink(doc)}
              </p>
            </div>
                <article className="mb-12 mt-12">
                  <Head
                    title={meta.title}
                    description={meta.excerpt}
                    image={meta.cover}
                  />
                  {children}
                </article>
                <div className="">
                  <Feedback />
                </div>
              </div>
            </div>
          </main>
        </div>
        </div>
      </div>
    </>
  )
}

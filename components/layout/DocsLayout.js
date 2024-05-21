import { useState } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from '../Head';
import DocsContext from '../../context/DocsContext';
import TOC from '../TOC';
import DocsNav from '../navigation/DocsNav';
import DocsMobileMenu from '../navigation/DocsMobileMenu';
import DocsButton from '../buttons/DocsButton';
import ArrowRight from '../icons/ArrowRight';
import Feedback from '../Feedback';
import Heading from '../typography/Heading';
import AnnouncementHero from '../campaigns/AnnoucementHero';
import { SearchButton, DOCS_INDEX_NAME } from '../AlgoliaSearch';
import IconLoupe from '../icons/Loupe';
import { getAllPosts } from '../../lib/api';
import Link from 'next/link';
import editOptions from '../../config/edit-page-config.json';
import Button from '../buttons/Button';
import IconMenuCenter from '../icons/CenterMenu';

function generateEditLink(post) {
  let last = post.id.substring(post.id.lastIndexOf('/') + 1);
  const target = editOptions.find((edit) => {
    return post.slug.includes(edit.value);
  });
  const editHref = target.href;
  const hrefList = editHref.split('/');
  const lastListElement = hrefList[hrefList.length - 1].split('.');
  const isHrefToFile = lastListElement.length > 1;
  const EditPage = 'Edit this page on GitHub';

  if (target.value == '') {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`${target.href}${
          post.isIndex ? post.slug + '/index' : post.slug
        }.md`}
        className="ml-1 underline"
      >
        {EditPage}
      </a>
    );
  }
  if (isHrefToFile) last = '';
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={`${target.href}/${last}`}
      className="ml-1 underline"
    >
      {EditPage}
    </a>
  );
}

export default function DocsLayout({ post, navItems = {}, children }) {
  const posts = getAllPosts();
  if (!post) return <ErrorPage statusCode={404} />;
  if (post.title === undefined) throw new Error('Post title is required');

  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const [showMenu, setShowMenu] = useState(false);
  const [explorerDocMenu, setExplorerDocMenu] = useState(false)
  const navigation = posts['docsTree'];
 
  const sidebar = <div
    className="hidden lg:flex lg:flex-shrink-0"
    data-testid="DocsLayout-main"
  >
    <div className="flex flex-col w-72 border-r border-gray-200 bg-white py-2">
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
                  <abbr title={actionKey.key} className="no-underline">
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
            {Object.values(navigation).map((navItem) => (
              <DocsNav
                key={navItem.item.title}
                item={navItem}
                active={post.slug}
                onClick={() => setShowMenu(false)}
              />
            ))}
          </ul>
        </nav>
      </div>
      </div>
          </div>

  if (router.pathname.includes('v3.0.0-Explorer')) {
    return <div>
      <div className='absolute top-24 left-2 z-10'>
        <Button
          className="h-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:border-gray-500 focus:outline-none focus:ring-0 focus:ring-black"
          text="Menu"
          icon={<IconMenuCenter className='w-6 h-6 fill-gray-700' />}
          onClick={() => {
            if (explorerDocMenu) {
              setExplorerDocMenu(false)
            } else {
              setExplorerDocMenu(true)
            }
          }}
        />
        {explorerDocMenu &&
          <div className='mt-2 explorer-menu-wrapper'>
            {sidebar}
          </div>
       }
      </div>
          <article className="">
      {children}
    </article>
    </div>
  }
  return (
    <DocsContext.Provider value={{ post, navItems }}>
      <div className="bg-white px-4 sm:px-6 lg:px-8 w-full xl:max-w-7xl xl:mx-auto">
        {showMenu && (
          <DocsMobileMenu
            onClickClose={() => setShowMenu(false)}
            post={post}
            navigation={navigation}
          />
        )}
        <div className="flex flex-row" id="main-content">
          {/* <!-- Static sidebar for desktop --> */}
          {sidebar}
          <div className="flex flex-col w-0 flex-1 max-w-full lg:max-w-(screen-16)">
            <main
              className="relative z-0 pt-2 pb-6 focus:outline-none md:py-6"
              tabIndex="0"
            >
              {!showMenu && (
                <div className="lg:hidden">
                  <button
                    onClick={() => setShowMenu(true)}
                    className="flex text-gray-500 px-4 sm:px-6 md:px-8 hover:text-gray-900 focus:outline-none"
                    aria-label="Open sidebar"
                  >
                    <span>{post.sectionTitle}</span>
                    <ArrowRight className="pl-1 w-5 h-5 transform rotate-90" />
                  </button>
                </div>
              )}

              <AnnouncementHero className="ml-6" hideVideo={true} />

              <div
                className={`xl:flex ${
                  post.toc && post.toc.length ? 'xl:flex-row-reverse' : ''
                }`}
              >
                <TOC
                  toc={post.toc}
                  depth={3}
                  className="bg-blue-100 mt-4 p-4 sticky top-20 overflow-y-auto max-h-screen xl:bg-transparent xl:mt-0 xl:pb-8 xl:w-72"
                />
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
                  {post.releaseNoteLink && (
                    // show only when it is related to specification (/docs/reference/specification) AND is not a pre-release
                    // for example, if the post's title is "3.0.0 (Pre-release)", which will not have RN, so do not render this section.
                    <div className="w-full mt-5 py-3 px-2 text-center rounded-lg bg-secondary-100">
                      <div>
                        <span className="text-sm font-sans antialiased text-gray-800">
                          {`What is new in v${post.title}? Have a look at the `}
                        </span>
                        <Link href={post.releaseNoteLink}>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`cursor-pointer font-body text-sm leading-6 underline font-medium text-secondary-500 hover:text-secondary-600 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150`}
                          >
                            release notes
                          </a>
                        </Link>
                        .
                      </div>
                      <div>
                        <span className="text-sm font-sans antialiased text-gray-800">
                          Want to interactively navigate the new v3.0.0?&nbsp;
                        </span>
                        <span className="text-sm font-sans antialiased text-gray-800">
                          Check&nbsp;
                          <Link href="/spec-json-schema">
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`cursor-pointer font-body text-sm leading-6 underline font-medium text-secondary-500 hover:text-secondary-600 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150`}
                            >
                              Version 3 visualizer
                            </a>
                          </Link>
                          .
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-sans antialiased text-gray-800">
                          Interested in release notes of other versions of the
                          specification?&nbsp;
                        </span>
                        <span className="text-sm font-sans antialiased text-gray-800">
                          Check&nbsp;
                          <Link href="https://www.asyncapi.com/blog?tags=Release+Notes">
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`cursor-pointer font-body text-sm leading-6 underline font-medium text-secondary-500 hover:text-secondary-600 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150`}
                            >
                              list of release notes
                            </a>
                          </Link>
                          .
                        </span>
                      </div>
                    </div>
                  )}
                  <article className="mb-12 mt-12">
                    <Head
                      title={post.title}
                      description={post.excerpt}
                      image={post.cover}
                    />
                    {children}
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
  );
}

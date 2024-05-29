import ErrorPage from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import type { NavigationItems } from '@/types/context/DocsContext';
import type { IPost } from '@/types/post';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';

import editOptions from '../../config/edit-page-config.json';
import DocsContext from '../../context/DocsContext';
import { getAllPosts } from '../../utils/api';
import { DOCS_INDEX_NAME, SearchButton } from '../AlgoliaSearch';
import DocsButton from '../buttons/DocsButton';
import Feedback from '../Feedback';
import Head from '../Head';
import ArrowRight from '../icons/ArrowRight';
import IconLoupe from '../icons/Loupe';
import DocsMobileMenu from '../navigation/DocsMobileMenu';
import DocsNav from '../navigation/DocsNav';
import TOC from '../TOC';
import Heading from '../typography/Heading';
import Button from '../buttons/Button';
import IconMenuCenter from '../icons/CenterMenu';

interface IDocsLayoutProps {
  post: IPost;
  navItems?: NavigationItems;
  children: React.ReactNode;
}

/**
 * @description Generate edit link for the post
 * @param {IPost} post
 */
function generateEditLink(post: IPost) {
  let last = post.id.substring(post.id.lastIndexOf('/') + 1);
  const target = editOptions.find((edit) => {
    return post.slug.includes(edit.value);
  });
  const editHref = target?.href;
  const hrefList = editHref?.split('/');

  if (!hrefList) return null;

  const lastListElement = hrefList[hrefList.length - 1].split('.');
  const isHrefToFile = lastListElement.length > 1;
  const EditPage = 'Edit this page on GitHub';

  if (target?.value === '') {
    return (
      <a
        target='_blank'
        rel='noopener noreferrer'
        href={`${target.href}${post.isIndex ? `${post.slug}/index` : post.slug}.md`}
        className='ml-1 underline'
      >
        {EditPage}
      </a>
    );
  }
  if (isHrefToFile) last = '';

  return (
    <a target='_blank' rel='noopener noreferrer' href={`${target?.href}/${last}`} className='ml-1 underline'>
      {EditPage}
    </a>
  );
}

/**
 * @description DocsLayout component
 * @param {IPost} props.post The post to render in the layout
 * @param {NavigationItems} props.navItems Navigation items for the post
 * @param {React.ReactNode} props.children The children to render in the layout
 */
export default function DocsLayout({ post, navItems = {}, children }: IDocsLayoutProps) {
  const posts = getAllPosts();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [explorerDocMenu, setExplorerDocMenu] = useState(false)

  if (!post) return <ErrorPage statusCode={404} />;
  if (post.title === undefined) throw new Error('Post title is required');

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const navigation = posts.docsTree;

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
  if (router.pathname.includes('v3.0.0-explorer')) {
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
      <div className='w-full bg-white px-4 sm:px-6 lg:px-8 xl:mx-auto xl:max-w-7xl'>
        {showMenu && <DocsMobileMenu onClickClose={() => setShowMenu(false)} post={post} navigation={navigation} />}
        <div className='flex flex-row' id='main-content'>
          {/* <!-- Static sidebar for desktop --> */}
          {sidebar}
          <div className='flex w-0 max-w-full flex-1 flex-col lg:max-w-(screen-16)'>
            <main className='relative z-0 pb-6 pt-2 focus:outline-none md:py-6' tabIndex={0}>
              {!showMenu && (
                <div className='lg:hidden'>
                  <button
                    onClick={() => setShowMenu(true)}
                    className='flex px-4 text-gray-500 hover:text-gray-900 focus:outline-none sm:px-6 md:px-8'
                    aria-label='Open sidebar'
                  >
                    <span>{post.sectionTitle}</span>
                    <ArrowRight className='size-5 rotate-90 pl-1' />
                  </button>
                </div>
              )}

              {/* @TODO Will uncomment the component once it is in use */}
              {/* <AnnouncementHero className='ml-6' hideVideo={true} /> */}

              <div className={`xl:flex ${post.toc && post.toc.length ? 'xl:flex-row-reverse' : ''}`}>
                <TOC
                  toc={post.toc}
                  depth={3}
                  className='sticky top-20 mt-4 max-h-screen overflow-y-auto bg-blue-100 p-4 xl:mt-0 xl:w-72 xl:bg-transparent xl:pb-8'
                />
                <div className='px-4 sm:px-6 xl:max-w-184 xl:flex-1 xl:px-8'>
                  <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.lg}>
                    {post.title}
                  </Heading>
                  <div>
                    <p className='font-normal font-sans text-sm text-gray-600 antialiased'>
                      Found an error? Have a suggestion?
                      {generateEditLink(post)}
                    </p>
                  </div>
                  {post.releaseNoteLink && (
                    // show only when it is related to specification (/docs/reference/specification) AND is not a pre-release
                    // for example, if the post's title is "3.0.0 (Pre-release)", which will not have RN, so do not render this section.
                    <div className='mt-5 w-full rounded-lg bg-secondary-100 px-2 py-3 text-center'>
                      <div>
                        <span className='font-sans text-sm text-gray-800 antialiased'>
                          {`What is new in v${post.title}? Have a look at the `}
                        </span>
                        <Link href={post.releaseNoteLink}>
                          <a
                            target='_blank'
                            rel='noopener noreferrer'
                            className={
                              'cursor-pointer font-body text-sm font-medium leading-6 text-secondary-500 underline transition duration-150 ease-in-out hover:text-secondary-600 focus:text-gray-900 focus:outline-none'
                            }
                          >
                            release notes
                          </a>
                        </Link>
                        .
                      </div>
                      <div>
                        <span className='font-sans text-sm text-gray-800 antialiased'>
                          Interested in release notes of other versions of the specification?&nbsp;
                        </span>
                        <span className='font-sans text-sm text-gray-800 antialiased'>
                          Check&nbsp;
                          <Link href='https://www.asyncapi.com/blog?tags=Release+Notes'>
                            <a
                              target='_blank'
                              rel='noopener noreferrer'
                              className={
                                'cursor-pointer font-body text-sm font-medium leading-6 text-secondary-500 underline transition duration-150 ease-in-out hover:text-secondary-600 focus:text-gray-900 focus:outline-none'
                              }
                            >
                              list of release notes
                            </a>
                          </Link>
                          .
                        </span>
                      </div>
                    </div>
                  )}
                  <article className='my-12'>
                    <Head title={post.title} description={post.excerpt} image={post.cover} />
                    {children}
                  </article>
                  <div>
                    <DocsButton post={post} />
                  </div>
                  <div className=''>
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

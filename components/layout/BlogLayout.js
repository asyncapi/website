import { useRouter } from 'next/router'
import HtmlHead from 'next/head'
import ErrorPage from 'next/error'
import moment from 'moment'
import Head from '../Head'
import BlogContext from '../../context/BlogContext'
import TOC from '../TOC'
import NavBar from '../navigation/NavBar'
import Container from './Container'
import AuthorAvatars from '../AuthorAvatars'
import StickyNavbar from '../navigation/StickyNavbar'
import AnnouncementHero from '../campaigns/AnnoucementHero'

export default function BlogLayout({ post, children }) {
  if (!post) return <ErrorPage statusCode={404} />
  if (post.title === undefined) throw new Error('Post title is required')

  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <BlogContext.Provider value={{ post }}>
      <StickyNavbar>
        <NavBar className="max-w-screen-xl block px-4 sm:px-6 lg:px-8 mx-auto" />
      </StickyNavbar>
      <AnnouncementHero className='my-4 mx-8' />
      <Container cssBreakingPoint="lg" flex flexReverse>
        <TOC toc={post.toc} cssBreakingPoint="lg" className="bg-blue-100 mt-4 p-4 sticky top-20 overflow-y-auto max-h-screen lg:bg-transparent lg:mt-2 lg:pt-0 lg:pb-8 lg:top-24 lg:max-h-(screen-16) lg:border-l lg:border-gray-200 lg:min-w-40 lg:max-w-64 lg:-mr-20 xl:min-w-72 xl:-mr-36" />
        <main className="mt-8 px-4 sm:px-6 lg:pr-8 lg:pl-0 lg:flex-1 lg:max-w-172 xl:max-w-172">
          <header className="pr-4 sm:pr-6 md:pr-8">
            <h1 className="text-4xl font-normal text-gray-800 font-sans antialiased">{post.title}</h1>
            <div className="mt-6 flex items-center">
              <div className="relative flex-shrink-0">
                <AuthorAvatars authors={post.authors} />
              </div>
              <div className="ml-3">
                <p className="text-sm leading-5 font-medium text-gray-900">
                  <span className="hover:underline">
                    {post.authors.map((author, index) => author.link ? <a key={index} alt={author.name} href={author.link}>{author.name}</a> : author.name).reduce((prev, curr) => [prev, ' & ', curr])}
                  </span>
                </p>
                <div className="flex text-sm leading-5 text-gray-500">
                  <time dateTime={post.date}>
                    {moment(post.date).format('MMMM D, YYYY')}
                  </time>
                  <span className="mx-1">
                    &middot;
                  </span>
                  <span>
                    {post.readingTime} min read
                  </span>
                </div>
              </div>
            </div>
          </header>
          <article className="mb-32">
            <Head
              title={post.title}
              description={post.excerpt}
              image={post.cover}
            />
            <HtmlHead>
              <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5cb852c7b57ed596" async />
              <style>{`
                /* AddThis hack */

                #at4-share {
                    left: 50%;
                    margin-left: -500px !important;
                    position: absolute;

                    &amp;.addthis-animated {
                      animation-duration: 0s !important;
                    }
                }

                #at4-scc {
                    display: none !important;
                }
              `}</style>
            </HtmlHead>
            <img src={post.cover} alt={post.coverCaption} title={post.coverCaption} className="mt-6 mb-6 w-full" />
            {children}
          </article>
        </main>
      </Container>
    </BlogContext.Provider>
  )
}
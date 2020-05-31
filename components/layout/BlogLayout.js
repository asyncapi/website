import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from '../Head'
import BlogContext from '../../context/BlogContext'
import TOC from '../TOC'
import NavBar from '../navigation/NavBar'
import Container from './Container'
import Footer from '../Footer'

export default function BlogLayout({ post, children }) {
  if (!post) return <ErrorPage statusCode={404} />
  if (post.title === undefined) throw new Error('Post title is required')

  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <BlogContext.Provider value={{ post }}>
      <Container>
        <NavBar />
      </Container>
      <Container className="js-main-content" cssBreakingPoint="lg" flex flexReverse>
        <TOC toc={post.toc} cssBreakingPoint="lg" className="bg-blue-100 mt-4 p-4 lg:bg-transparent lg:mt-0 lg:pt-0 lg:pb-8 lg:sticky lg:top-4 lg:overflow-y-auto lg:max-h-(screen-16) lg:border-l lg:border-gray-200 lg:min-w-40 lg:max-w-64 lg:-mr-20 xl:min-w-72 xl:-mr-36" />
        <main className="mt-8 px-4 sm:px-6 lg:pr-8 lg:pl-0 lg:flex-1 lg:max-w-172 xl:max-w-172">
          <header className="pr-4 sm:pr-6 md:pr-8">
            <h1 className="text-4xl font-normal text-gray-800 font-sans antialiased">{post.title}</h1>
          </header>
          <article className="mb-32">
            <Head title={post.title} />
            {children}
          </article>
        </main>
      </Container>
      <Footer />
    </BlogContext.Provider>
  )
}

function A() {
  return (<div className="flex h-screen max-w-7xl mx-auto overflow-hidden bg-white">
    <main className="js-main-content relative z-0 overflow-y-auto pt-2 pb-6 focus:outline-none md:py-6" tabIndex="0">
      <div className="px-4 sm:px-6 md:px-8">
        <h1 className="text-4xl font-normal text-gray-800 font-sans antialiased">{post.title}</h1>
      </div>
      <div className="px-4 sm:px-6 md:px-8">
        <p className="text-sm font-normal text-gray-400 font-sans antialiased">
          Found an error? Have a suggestion? 
          <a href={`https://github.com/asyncapi/website/blob/master/pages${post.slug}.md`} className="ml-1 underline">Edit this page on Github</a>
        </p>
      </div>
      <div className={`md:flex ${post.toc && post.toc.length ? 'md:flex-row-reverse' : ''}`}>
        <TOC toc={post.toc} className="bg-blue-100 mt-4 p-4 md:bg-transparent md:mt-0 md:pt-0 md:pb-8 md:sticky md:top-4 md:overflow-y-auto md:max-h-(screen-16) md:w-72 md:border-l md:border-gray-200" />
        <div className="mt-8 px-4 sm:px-6 md:px-8 md:flex-1 md:max-w-9">
          <article className="mb-32">
            <Head title={post.title} />
            { children }
          </article>
        </div>
      </div>
    </main>
  </div>)
}
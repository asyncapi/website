import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from '../Head'
import BlogContext from '../../context/BlogContext'
import TOC from '../TOC'
import NavBar from '../navigation/NavBar'
import Container from './Container'
import Footer from '../Footer'
import JobSummary from '../JobSummary'
import ApplyJobButton from '../buttons/ApplyJob'

export default function JobsLayout({ post, children }) {
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
      <Container cssBreakingPoint="lg" flex flexReverse>
        <div className="">
          <JobSummary job={post} className="hidden mt-24 max-w-xs sticky top-4 lg:block" />
        </div>
        <main className="mt-8 px-4 sm:px-6 lg:pr-8 lg:pl-0 lg:flex-1">
          <header className="pr-4 sm:pr-6 md:pr-8">
            <h1 className="text-4xl font-normal text-gray-800 font-sans antialiased">{post.title}</h1>
          </header>
          <div className="lg:flex">
            <JobSummary job={post} className="block my-8 lg:hidden" />
            <article className="mb-32">
              <Head
                title={`${post.title} | Jobs`}
                description={post.excerpt}
                image={post.cover}
              />
              {children}
              <ApplyJobButton className="mt-4 inline-block" />
            </article>
          </div>
        </main>
      </Container>
      <Footer />
    </BlogContext.Provider>
  )
}

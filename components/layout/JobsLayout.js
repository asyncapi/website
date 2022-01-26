import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from '../Head'
import JobsContext from '../../context/JobsContext'
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
    <JobsContext.Provider value={{ post }}>
      <div className="sticky top-0 w-full bg-white border-b border-gray-300 z-50">
       <NavBar className="max-w-screen-xl block px-4 sm:px-6 lg:px-8 mx-auto" />
      </div>
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
              <Head title={`${post.title} | Jobs`} />
              {children}
              <ApplyJobButton job={post} className="mt-4 inline-block" />
            </article>
          </div>
        </main>
      </Container>
      <Footer />
    </JobsContext.Provider>
  )
}

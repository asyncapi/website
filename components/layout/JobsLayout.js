import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from '../Head'
import NavBar from '../navigation/NavBar'
import Container from './Container'
import JobSummary from '../JobSummary'
import ApplyJobButton from '../buttons/ApplyJob'
import StickyNavbar from '../navigation/StickyNavbar'

export default function JobsLayout({ job, children }) {
  if (!job) return <ErrorPage statusCode={404} />
  
  const meta = job.meta;
  if (meta.title === undefined) throw new Error('Job title is required')

  const router = useRouter()
  if (!router.isFallback && !job?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <StickyNavbar>
       <NavBar className="max-w-screen-xl block px-4 sm:px-6 lg:px-8 mx-auto" />
      </StickyNavbar>
      
      <Container cssBreakingPoint="lg" flex flexReverse>
        <div className="">
          <JobSummary job={job} className="hidden mt-24 max-w-xs sticky top-4 lg:block" />
        </div>
        <main className="mt-8 px-4 sm:px-6 lg:pr-8 lg:pl-0 lg:flex-1">
          <header className="pr-4 sm:pr-6 md:pr-8">
            <h1 className="text-4xl font-normal text-gray-800 font-sans antialiased">{meta.title}</h1>
          </header>
          <div className="lg:flex">
            <JobSummary job={job} className="block my-8 lg:hidden" />
            <article className="mb-32">
              <Head title={`${meta.title} | Jobs`} />
              {children}
              <ApplyJobButton job={job} className="mt-4 inline-block" />
            </article>
          </div>
        </main>
      </Container>
    </>
  )
}

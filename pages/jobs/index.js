import { useContext } from "react"
import NavBar from "../../components/navigation/NavBar"
import Container from "../../components/layout/Container"
import JobsContext from "../../context/JobsContext"
import JobPostItem from "../../components/navigation/JobPostItem"
import Footer from "../../components/Footer"
import Head from "../../components/Head"
import AnnouncementHero from "../../components/campaigns/AnnoucementHero"

export default function JobsIndexPage() {
  const { navItems } = useContext(JobsContext)

  const posts = navItems.sort((i1, i2) => {
    const i1Date = new Date(i1.date)
    const i2Date = new Date(i2.date)
    return i2Date - i1Date
  })

  return (
    <div>
      <Head title="Jobs" />
      <Container>
        <NavBar />
      </Container>
      <AnnouncementHero className="text-center m-4" small={true} />
      <div className="relative pt-8 pb-20 px-4 sm:px-6 lg:pt-12 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3"></div>
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
             Job Postings
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
              Want to work on a great open-source project with a lovely team and a vibrant community? Come work with us!
            </p>
          </div>
          <div className="mt-8 flex flex-col items-stretch sm:rounded-md">
            <ul className="bg-white shadow overflow-hidden divide-y divide-gray-200 sm:w-2/3 sm:self-center">
            {
              posts.map((post, index) => (
                <JobPostItem key={index} job={post} />
              ))
            }
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
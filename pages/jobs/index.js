import { useContext, useState } from "react"
import NavBar from "../../components/navigation/NavBar"
import Container from "../../components/layout/Container"
import JobsContext from "../../context/JobsContext"
import JobPostItem from "../../components/navigation/JobPostItem"
import Footer from "../../components/Footer"
import Head from "../../components/Head"
import Filter from "../../components/navigation/Filter"
import AnnouncementHero from "../../components/campaigns/AnnoucementHero"
import Empty from "../../components/illustrations/empty";

export default function JobsIndexPage() {
  const { navItems } = useContext(JobsContext)
  navItems.map((job) => {
    if(new Date() > new Date(job.closingOn)){
      navItems.splice(job, 1)
    }
  })
  const [posts, setPosts] = useState(navItems.sort((i1, i2) => {
    const i1Date = new Date(i1.date)
    const i2Date = new Date(i2.date)
    return i2Date - i1Date
  }));

  const onFilter = (data) => {
    setPosts(data);
  }
  const filterChecks = [
    {
      name: "category",
    },
  ]; 
  const jobPostUrl = '---%0Atitle%3A%20%27Job%20Title%27%0Adate%3A%20DD%2FMM%2FYYYY%20(current%20date)%0Acategory%3A%20job%20category%0AclosingOn%3A%20MM%2FDD%2FYYYY%0A---%0A%23%23%20About%20the%20team%0ALet%20potential%20employees%20knows%20what%20it%27ll%20feel%20like%20to%20joining%20your%20team%20in%20this%20section%0A%0A%23%23%20TL%3BDR%0AEnter%20list%20of%20perks%20for%20potential%20employees%20in%20this%20section.%0AE.g.%0A*%20%3Amuscle%3A%20Growing%20team%0A*%20%3Ahouse_with_garden%3A%20Fully%20remote%20job%0A*%20%3Amoney_mouth_face%3A%20Great%20salary%20and%20compensation%20package%0A*%20%3Amountain_snow%3A%20Unlimited%20paid%20time%20off%0A%0A%23%23%20About%20the%20job%0ALet%20the%20potential%20employee%20knows%20about%20the%20job%20in%20this%20section%0A%0A%23%23%20About%20youY%0AThe%20Potential%20employees%20would%20love%20to%20know%20more%20about%20you.%20Tell%20them%20more%20about%20you%20in%20this%20section%0A%0A%23%23%20Pay%20and%20benefits%0ALet%20the%20potential%20employees%20knows%20what%20comes%20with%20joining%20your%20team%20in%20this%20section.%0A%0AJoin%20us!%0A'
  const hasPosts = Object.keys(posts).length;
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
              Want to work on a great open-source project with a lovely team and a vibrant community? Browse through available job offers!
            </p>
            <p className="max-w-2xl mx-auto text-md leading-7 text-gray-400">
            <span role="img">💡</span> Want to post a job offer? <a className="ml-1 text-primary-500 hover:text-primary-400" href={`https://github.com/asyncapi/website/new/master/pages/jobs?value=${jobPostUrl}`} target="_blank">Post it now!</a>
            </p>
            <p className="max-w-2xl mx-auto text-md leading-7 text-gray-400"> Do you want to discuss your job offer first?
            <a className="ml-1 text-primary-500 hover:text-primary-400" href="https://github.com/asyncapi/website/issues/new" target="_blank">Get started here.</a>
            </p>
          </div>
          <div className="text-center">
            {!hasPosts ? <div className="flex content-center justify-center">
             <div>
             <Empty/>
             <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500">No open positions currently. Check back later</p>
             </div>
            </div> : <div className="mt-8 flex flex-col items-stretch sm:rounded-md text-left">
              <div className="divide-y divide-gray-200 sm:w-2/3 sm:self-center">
                <Filter data={navItems} onFilter={onFilter} checks={filterChecks} />
              </div>
              <ul className="bg-white shadow overflow-hidden divide-y divide-gray-200 sm:w-2/3 sm:self-center">
                {
                posts.map((post, index) => (
                  <JobPostItem key={index} job={post} />
                ))}
              </ul>
            </div>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

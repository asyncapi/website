import { useContext, useState } from "react"
import NavBar from "../../components/navigation/NavBar"
import Container from "../../components/layout/Container"
import JobsContext from "../../context/JobsContext"
import JobPostItem from "../../components/navigation/JobPostItem"
import Footer from "../../components/Footer"
import Head from "../../components/Head"
import Filter from "../../components/navigation/Filter"
import AnnouncementHero from "../../components/campaigns/AnnoucementHero"
import emptyChecker from "../../utils/emptyChecker";
import Empty from "../../components/illustrations/empty";

// eslint-disable-next-line react/prop-types
export default function JobsIndexPage({template}) {
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
            <p className="max-w-2xl mx-auto text-md leading-7 text-gray-400">
            <span role="img">💡</span> Want to post a job? All job posting must be AsyncAPI-related jobs. <a className="ml-1 text-primary-500 hover:text-primary-400" href={`https://github.com/asyncapi/website/new/master/pages/jobs?value=${template}`} target="_blank" rel="noreferrer">Get started now!</a>
            </p>
            <p className="max-w-2xl mx-auto text-md leading-7 text-gray-400">Do you want to discuss about your job posting?
            <a className="ml-1 text-primary-500 hover:text-primary-400" href="https://github.com/asyncapi/website/issues/new" target="_blank" rel="noreferrer">Get started here</a>
            </p>
          </div>
          <div className="mt-8 flex flex-col items-stretch sm:rounded-md text-center">
            {emptyChecker(posts) ? <div className="flex content-center justify-center">
             <div>
             <Empty/>
             <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500">No open positions currently. Check back later</p>
             </div>
            </div> : <div>
              <div className="divide-y divide-gray-200 sm:w-2/3 sm:self-center">
                <Filter data={navItems} onFilter={onFilter} />
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

// eslint-disable-next-line no-unused-vars
export async function getStaticProps(context) {
  // eslint-disable-next-line no-undef
  const fs = require('fs'); 
  // eslint-disable-next-line no-undef
  const process = require("process");
  const template =`${process.cwd()}/template/encoded_job_template.txt`;
  const rawContent = fs.readFileSync(template, {
    encoding: "utf-8",
  });
  return {
    props: {
      template: rawContent
    }
  }

}
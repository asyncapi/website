import { useContext, useState } from "react";
import NavBar from "../../components/navigation/NavBar";
import JobsContext from "../../context/JobsContext";
import JobPostItem from "../../components/navigation/JobPostItem";
import Footer from "../../components/Footer";
import Head from "../../components/Head";
import Filter from "../../components/navigation/Filter";
import AnnouncementHero from "../../components/campaigns/AnnoucementHero";
import Empty from "../../components/illustrations/empty";
import StickyNavbar from "../../components/navigation/StickyNavbar"
import Heading from "../../components/typography/Heading";
import Paragraph from "../../components/typography/Paragraph";
import TextLink from "../../components/typography/TextLink";
import GenericLayout from "../../components/layout/GenericLayout";

export default function JobsIndexPage() {
  let { navItems } = useContext(JobsContext);

  const closedJobPosts = navItems.filter((job) => {
    return new Date() > new Date(job.closingOn)
  });

  const openJobPosts = navItems.filter((job) => {
    return new Date() <= new Date(job.closingOn)
  });

  const [posts, setPosts] = useState(
    openJobPosts.sort((i1, i2) => {
      const i1Date = new Date(i1.date);
      const i2Date = new Date(i2.date);
      return i2Date - i1Date;
    })
  );

  const [checkOldPost, setOldPost] = useState(false);

  const onClickOldPost = () => setOldPost(!checkOldPost);

  const onFilter = (data) => setPosts(data);
  const toFilter = [
    {
      name: "category",
    },
  ];
  const body = `---
title: 'Job Title'
date: MM/DD/YYYY (current date)
category: job category
closingOn: MM/DD/YYYY
contact: provide link to oryginal job posting or a contact email address
company: 
  name: 'YourCompanyName'
  logoUrl: /img/logos/companies/YourCompanyName.png
  # Add your image in /pages/img/logos/companies
---
## About the team
Let potential employees knows what it'll feel like to joining your team in this section
## TL;DR
Enter list of perks for potential employees in this section.
E.g.
* :muscle: Growing team
* :house_with_garden: Fully remote job
* :money_mouth_face: Great salary and compensation package
* :mountain_snow: Unlimited paid time off
## About the job
Let the potential employee knows about the job in this section
## About you
The potential employees would love to know more about you. Tell them more about you in this section
## Pay and benefits
Let the potential employees knows what comes with joining your team in this section.
Join us!
`;
  const jobPostUrl = encodeURIComponent(body);
  const hasPosts = Object.keys(posts).length;

  const description = 'Browse through available job offers!';
  const image = '/img/social/job.webp'

  return (
    <GenericLayout
      title="Jobs"
      description={description}
      image={image}
      wide
    >

      <div className="relative pt-8 pb-20 px-4 sm:px-6 lg:pt-12 lg:pb-28 lg:px-8" id="main-content">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3"></div>
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <Heading level="h1" typeStyle="heading-lg">
              Job Postings
            </Heading>
            <Paragraph className="my-3 sm:my-4 max-w-2xl mx-auto">
              Want to work on a great open-source project with a lovely team and
              a vibrant community? Browse through available job offers!
            </Paragraph>
            <Paragraph typeStyle="body-md" className="max-w-2xl mx-auto mb-4">
              <span role="img">💡</span> Want to post a job offer?
              <TextLink href={`https://github.com/asyncapi/website/new/master/pages/jobs?value=${jobPostUrl}`} target="_blank">
                Post it now!
              </TextLink>
            </Paragraph>
            <Paragraph typeStyle="body-md" className="max-w-2xl mx-auto mb-4">
              Do you want to discuss your job offer first?
              <TextLink href="https://github.com/asyncapi/website/issues/new" target="_blank">
                Get started here.
              </TextLink>
            </Paragraph>
            <Paragraph typeStyle="body-md" className="max-w-2xl mx-auto mb-4">
              We have an{" "}
              <img
                className="ml-1 text-primary-500 hover:text-primary-400"
                style={{ display: "inline" }}
                src="/img/logos/rss.svg"
                height="18px"
                width="18px"
              />
              <TextLink href="jobs/rss.xml" target="_blank">
                RSS Feed
              </TextLink>
              , too!
            </Paragraph>
          </div>
          <div className="text-center">
            {!hasPosts ? (
              <div className="flex content-center justify-center">
                <div>
                  <Empty className="mt-5" />
                  <Paragraph typeStyle="body-md" className="mt-5 max-w-2xl mx-auto">
                    No open positions currently. Check back later!
                  </Paragraph>
                </div>
              </div>
            ) : (
              <div className="mt-8 flex flex-col items-stretch sm:rounded-md text-left">
                <div className="divide-y divide-gray-200 mb-2 sm:w-2/3 sm:self-center">
                  <Filter
                    className="w-full inline-flex mx-px justify-center sm:mt-0 sm:w-1/5 sm:text-sm"
                    data={openJobPosts}
                    filteredData={posts}
                    onFilter={onFilter}
                    checks={toFilter}
                  />
                </div>
                <ul className="bg-white shadow overflow-hidden divide-y divide-gray-200 sm:w-2/3 sm:self-center">
                  {posts.map((post, index) => (
                    <JobPostItem key={index} job={post} />
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="text-center mt-3 p-4">
            {!checkOldPost ? (
              <button className="btn btn-outline btn-lg text-gray-600" onClick={onClickOldPost}>
                Show closed jobs
              </button>
            ) : (
              <div className="mt-8 flex flex-col items-stretch sm:rounded-md text-left">
                <ul className="bg-white shadow overflow-hidden divide-y divide-gray-200 sm:w-2/3 sm:self-center">
                  {closedJobPosts.map((post, index) => (
                    <JobPostItem key={index} job={post} />
                  ))}
                </ul>
                <button className="btn btn-outline-dark back-to-top mt-1 text-gray-600" onClick={onClickOldPost}>
                  Back
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </GenericLayout>
  );
}

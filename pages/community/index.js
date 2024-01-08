import React from 'react';
import Heading from '../../components/typography/Heading';
import NewsletterSubscribe from '../../components/NewsletterSubscribe';
import GenericLayout from '../../components/layout/GenericLayout';
import { getEvents } from '../../lib/staticHelpers';
import eventsData from '../../config/meetings.json';
import Hero from '../../components/community/Hero';
import Header from '../../components/community/Header';
import HomeCards from '../../components/community/HomeCard';
import Card from '../../components/community/Card';

function CommunityIndexPage() {
  const image = '/img/social/community.webp';
  return (
    <GenericLayout
      title="AsyncAPI Community Meetings"
      description="The home for developer communities"
      image={image}
      wide
    >
      <div className="md:hidden mt-15">
        <Header />
      </div>
      <Hero />
      <div className="gh-img mt-10 md:mt-0 w-full h-auto w-full object-contain">
        <img
          className="gh-img object-contain"
          src="/img/homepage/discuss-page.webp"
          alt="github-discussion"
        />
      </div>
      <div className="text-center flex justify-center flex-col items-center mt-[5rem]">
        <Heading level="h1" typeStyle="heading-xl">
          Home of #CommunityOps
        </Heading>
        <div>
          <Heading
            level="h2"
            typeStyle="body-lg"
            textColor="text-gray-700"
            className="text-slate-500 text-sm"
          >
            Join the conversation with over 10k+ developers from literally
            everywhere.
          </Heading>
        </div>
      </div>
      <div data-testid="CommunityIndex-HomeCard">
        <HomeCards
          headline="Thanking our AsyncAPI Ambassadors"
          title="Ambassador Programs"
          description="Launch OSS community programs that your community is proud to
            participate in. Let's build thriving OSS communities together!"
          btnText="Become an ambassador"
          link="/community/ambassadors"
          className="bg-ambassador"
        />
      </div>
      <div className="md:flex md:justify-between w-full mt-20">
        <div className="md:w-[50%]" data-testid="CommunityIndex-IssuesCard">
          <Card
            taglineBg="bg-pink-100"
            bg="bg-code-editor-dark"
            heading="Explore and Contribute to Hot Issues"
            description="Discover over 100s of interesting issues, suitable for new and existing contributors."
            tagline="Issues"
            icon="🔥"
            btnText="Explore issues"
            btnBg="fill-pink-200 text-pink-200"
            link="/community/dashboard"
          />
        </div>
        <div className="md:w-[45%] flex flex-col justify-between mt-10 md:mt-0" data-testid="CommunityIndex-SmallsCards">
          <div data-testid="CommunityIndex-Newsroom-Card">
            <Card
              type="small"
              tagline="Newsroom"
              icon="📣"
              heading="Never Get Left Behind"
              description="Do you want to get the latest news with recent activities happening in the community?"
              link="/community/newsroom"
            />
          </div>
          <div className="mt-10 md:mt-0" data-testid="CommunityIndex-Toolings-Card">
            <Card
              type="small"
              taglineBg=""
              tagline="Toolings"
              icon="🧰"
              heading="Check out our collection of Toolings"
              description="Discover various AsyncAPI tools to optimize your journey! These tools are made by the community, for the community."
              bg="bg-pink-200"
              link="/tools"
            />
          </div>
        </div>
      </div>
      <div className="relative w-full h-full">
        <HomeCards
          headline="Community heartbeat"
          title="AsyncAPI Community Meetings & Events"
          description="Join an AsyncAPI meeting from anywhere in the world! We host both
              live and recorded community events. You can also sign up for our
              community newsletter to stay up-to-date on all meetings and
              events."
          className="bg-eventCover"
          btnText="Explore more events"
          link="/community/events"
        />
        <div className="absolute justify-end top-0 right-0 hidden md:block mt-[100px] w-[500px]">
          <ul>
            {getEvents(eventsData, 3).map((event, index) => {
              return (
                <li
                  key={index}
                  className="bg-white w-full mt-2 p-2 md:p-10 rounded-l-md"
                >
                  <a href={event.url} className="flex">
                    <div className="inline-flex flex-row h-12 min-w-12 rounded-full bg-pink-500 text-white font-bold">
                      <span className="flex-1 text-center self-center">
                        {event.date.format('D')}
                      </span>
                    </div>
                    <div className="ml-4 text-left">
                      <h1 className="text-md md:text-lg">{event.title}</h1>
                      <span className="text-gray-500 text-xs md:text-sm">
                        {event.date.local().format('LLLL')} UTC
                        {event.date.local().format('Z')}
                      </span>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="md:flex md:justify-between w-full mt-20" >
        <div className="md:w-[45%] flex flex-col justify-between mt-10 md:mt-0">
          <div data-testid="CommunityCards-Goals">
            <Card
              type="small"
              tagline="Goals"
              icon="🎯"
              heading="Community Goals 2023"
              description="Look into the AsyncAPI community building/maintenance goals for
              2023 and help us improve."
              link="https://github.com/asyncapi/community/discussions/513"
            />
          </div>
          <div className="mt-10 md:mt-0" data-testid="CommunityCards-Contributors">
            <Card
              type="small"
              taglineBg=""
              tagline="Contributors"
              icon="🏅"
              heading="Recognize AsyncAPI OSS contributors"
              description="Recognize the people who inspire and contribute to our OSS
                    project and community."
              bg="bg-primary-200"
              link="https://github.com/orgs/asyncapi/discussions/593"
            />
          </div>
        </div>
        <div className="md:w-[50%] mt-10 md:mt-0" data-testid="CommunityCards-TSC">
          <Card
            taglineBg="bg-primary-200"
            heading="Meet Folks Redefining the Initiative"
            description="Learn how to become a Technical Steering Committee (TSC) member and see our current members."
            tagline="TSC"
            icon="🚀"
            btnText="Meet all TSC members"
            btnBg="fill-primary-500 text-primary-500"
            link="/community/tsc"
          />
        </div>
      </div>
      <div className="" data-testid="CommunityCards-Slack">
        <HomeCards
          headline="All community info, tracked"
          title="AsyncAPI Slack"
          description="AsyncAPI’s incredible community of developers, designers,
              technical writers, and more hail from over 83 countries. We
              actively contribute, collaborate, and mentor others on how to
              build with AsyncAPI."
          btnText="Join AsyncAPI slack"
          link="https://asyncapi.com/slack-invite"
          className="bg-channelCover"
        />
      </div>
      <div className="flex sm:flex-row flex-col mt-10">
        <div className="m-5">
          <Card
            type="small"
            tagline="Finance"
            icon="💰"
            heading="Track Company Spending with Budget Analysis"
            description="Delve into our finance section for a detailed analysis of the project's budget. Gain insights into how funds are allocated, track expenses, and ensure transparent financial management."
            link="/finance"
          />
        </div>
        <div className="m-5">
          <Card
            type="small"
            tagline="Store"
            icon="🛒"
            heading="Get Stylish Swags and Goodies"
            description="Explore our collection of project-themed t-shirts and goodies. Show your support and grab some cool swags to represent the community!"
            link="https://www.store.asyncapi.com/"
            bg="bg-primary-200"
          />
        </div>
      </div>
      <div className="bg-dark py-12 mt-8 md:mt-20 rounded-lg" data-testid="CommunityCard-subscribe">
        <NewsletterSubscribe dark />
      </div>
    </GenericLayout>
  );
}

export default CommunityIndexPage;

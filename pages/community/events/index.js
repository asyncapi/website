/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Button from '../../../components/buttons/Button';
import GoogleCalendarButton from '../../../components/buttons/GoogleCalendarButton';
import ICSFileButton from '../../../components/buttons/ICSFileButton';
import Heading from '../../../components/typography/Heading';
import { ArrowRightIcon } from '@heroicons/react/outline';
import EventPostItem from '../../../components/navigation/EventPostItem';
import EventFilter from '../../../components/navigation/EventFilter';
import GenericLayout from '../../../components/layout/GenericLayout';
import Meeting from '../../../components/Meeting';
import NewsletterSubscribe from '../../../components/NewsletterSubscribe';
import TextLink from '../../../components/typography/TextLink';
import meetings from '../../../config/meetings.json';


import Paragraph from '../../../components/typography/Paragraph';

function index() {
  const image = '/img/social/website-card.png';
  const [events, setEvents] = useState(
    meetings
      ? meetings.sort((i1, i2) => {
          const i1Date = new Date(i1.date);
          const i2Date = new Date(i2.date);

          if (i1.featured && !i2.featured) return -1;
          if (!i1.featured && i2.featured) return 1;
          return i2Date - i1Date;
        })
      : meetings
  );

  return (
    <GenericLayout
      title="AsyncAPI events"
      description="Our catalogs of events and meetups"
      image={image}
      hideBanner={true}
      wide
    >
      <div className="mt-10 sm:mt-28">
        <div className="w-full sm:w-9/12">
          <h1 className="countdown-text-gradient font-semibold text-3xl lg:text-7xl leading-tight md:text-4xl">
            Join an AsyncAPI event from anywhere in the world.
          </h1>
          <div className="mt-10">
            <GoogleCalendarButton href="https://calendar.google.com/calendar/u/3?cid=Y19xOXRzZWlnbG9tZHNqNm5qdWh2YnB0czExY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t" />
            <ICSFileButton
              href="https://calendar.google.com/calendar/ical/c_q9tseiglomdsj6njuhvbpts11c%40group.calendar.google.com/public/basic.ics"
              className="mt-2 md:mt-0 md:ml-2"
            />
          </div>
        </div>
        <div className="flex justify-end mt-10">
          <div className="w-[80%] sm:w-1/3">
            <Heading
              level="h2"
              typeStyle="body-lg"
              textColor="text-gray-700"
              className="text-slate-500"
            >
              “All events/meetings are live streamed to all AsyncAPI social
              media accounts. To learn more about meetings setup and automation
              <TextLink
                href="https://github.com/asyncapi/community/blob/master/MEETINGS_ORGANIZATION.md"
                target="_blank"
              >
                read our FAQ
              </TextLink>
              .”
            </Heading>
          </div>
        </div>
        <hr className="mt-20 border-dotted border-t-2 border-black " />
      </div>
      <div className="mt-24 sm:flex justify-between items-center h-auto sm:h-[400px]">
        <div className="w-full sm:w-[55%] h-full bg-confBg rounded-md bg-cover bg-center p-10 flex flex-col justify-between text-white">
          <img
            src="/img/logos/conflogo.png"
            alt="conf-logo"
            className="w-[100px] sm:w-[150px]"
          />
          <div className="w-full sm:w-[70%]">
            <Heading
              level="h2"
              typeStyle="heading-sm-semibold"
              className="mt-10"
            >
              Watch the AsyncAPI 2022 conference recordings from anywhere around
              the world for free
            </Heading>
            <a
              href="https://www.youtube.com/watch?v=NTHsezlKBh8&list=PLbi1gRlP7pijRiA32SU36hD_FW-2qyPhl"
              target="_blank"
              rel="noreferrer"
            >
              <div className="mt-5 flex items-center">
                <span>Watch now</span>
                <ArrowRightIcon className="w-[20px] ml-3 mt-1" />
              </div>
            </a>
          </div>
        </div>
        <div className="h-full mt-10 sm:mt-0 w-full sm:w-[43%] bg-secondary-600 rounded-md flex">
          <div className="w-[50%] h-full hidden sm:flex sm:flex-col">
            <div className="h-[50%] bg-officeHourCover bg-center bg-cover rounded-tl-md"></div>
            <div className="h-[50%]  bg-patternCover bg-center bg-cover rounded-bl-md" />
          </div>
          <div className="text-white w-full sm:w-[50%] p-5 flex flex-col items-center justify-center h-full">
            <div>
              <Heading level="h2" typeStyle="heading-md-semibold">
                Start a discussion with Technical Steering Committee members
              </Heading>
              <Button
                className="block md:inline-block focus:outline-none mt-10 bg-black text-center sm:text-left"
                text="Create TSC discussion"
                href="https://github.com/orgs/asyncapi/discussions"
                target="_blank"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-24">
        <div className="lg:flex lg:justify-between">
          <div className="lg:w-[30%]">
            <Heading level="h2" typeStyle="heading-md">
              Featured Events
            </Heading>
            <Paragraph typeStyle="body-md" className="mt-4">
              Explore over 100s of AsyncAPI's livestreams specifically curated
              for you
            </Paragraph>
          </div>
          <div className="flex lg:flex-row flex-col mt-10 lg:mt-0">
            <div className="">
              <Meeting
                name="Community Meeting"
                purpose="This is a community meeting to regularly talk in open about important topics around AsyncAPI Initiative. We organize it every two weeks in different time zones."
                host="Lukasz Gornicki"
                bg="gray-100"
                hostProfile="https://github.com/derberg"
                youtube="https://www.youtube.com/playlist?list=PLbi1gRlP7pijUwZJErzyYf_Rc-PWu4lXS"
              />
            </div>
            <div className="">
              <Meeting
                name="Spec 3.0 Meeting"
                purpose="This is the meeting for community member involved in works related to 3.0 release of AsyncAPI Specification. We organize it every two weeks at the same time."
                host="Jonas Lagoni"
                hostProfile="https://github.com/jonaslagoni"
                youtube="https://www.youtube.com/playlist?list=PLbi1gRlP7pihClJY-kXuTRRJ8n1awb0VV"
              />
            </div>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col lg:justify-end lg:items-center">
          <div className="">
            <Meeting
              name="Thinking Out Loud"
              bg="gray-100"
              purpose="This is a live stream about different topics related to AsyncAPI Initiative and Event Driven Architectures. It is always an open discussion between a host and a guest."
              host="Fran Mendez"
              hostProfile="https://github.com/fmvilas"
              youtube="https://www.youtube.com/playlist?list=PLbi1gRlP7pigPxRRylHGCvpdppYLmSKfJ"
            />
          </div>
          <div className="">
            <Meeting
              name="Let's talk about contributing"
              purpose="This live stream focuses on contributors, focuses on people that want to contribute to AsyncAPI Initiative but do not know how to do it."
              host="Lukasz Gornicki"
              hostProfile="https://github.com/derberg"
              youtube="https://www.youtube.com/playlist?list=PLbi1gRlP7pigPBrBMaNQhUeniR1pdDMiY"
            />
          </div>
          <div className="">
            <Meeting
              name="Ad Hoc Meeting"
              bg="gray-100"
              purpose="Do you want to discuss something with community and other meeting formats won't work? This is what this meeting is for, to schedule something specific with the community."
              host="Any of the hosts"
              youtube="https://www.youtube.com/asyncapi"
            />
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="sm:flex justify-between items-center">
          <Heading level="h2" typeStyle="heading-md">
            More Events
          </Heading>
          <div className="mt-5 sm:mt-0">
            <EventFilter data={meetings} setData={setEvents} />
          </div>
        </div>
        <div className="mt-10">
          {!events || events.length === 0 ? (
            <div className="flex content-center justify-center">
              <Paragraph typeStyle="body-md" className="mt-5 max-w-2xl mx-auto">
                No Events. Check back later!
              </Paragraph>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event, i) => {
                return <EventPostItem key={i} post={event} />;
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="bg-dark py-12 mt-8 md:mt-20 rounded-lg">
        <NewsletterSubscribe
          dark={true}
          type="meetings-email"
          title="Get a weekly email in your inbox"
          subtitle="You'll receive a weekly email with a summary of all the planned meetings for this week."
        />
      </div>
    </GenericLayout>
  );
}

export default index;

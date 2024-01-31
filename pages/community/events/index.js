/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
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
import { getEvents } from '../../../lib/staticHelpers';

function Eventindex() {
  const image = '/img/social/community-events.webp';
  const [events, setEvents] = useState(getEvents(meetings));

  return (
    <GenericLayout
      title="AsyncAPI events"
      description="Our catalogs of events and meetups"
      image={image}
      wide
    >
      <div className="mt-10 sm:mt-28" data-testid="Events-main">

        <div className="w-full sm:w-9/12">
          <h1 className="countdown-text-gradient font-semibold text-3xl lg:text-7xl leading-tight md:text-4xl" >
            Join an AsyncAPI event from anywhere in the world.
          </h1>
          <div className="mt-10" data-testid="Events-Button">
            <GoogleCalendarButton href="https://calendar.google.com/calendar/u/3?cid=Y19xOXRzZWlnbG9tZHNqNm5qdWh2YnB0czExY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t" />
            <ICSFileButton
              href="https://calendar.google.com/calendar/ical/c_q9tseiglomdsj6njuhvbpts11c%40group.calendar.google.com/public/basic.ics"
              className="mt-2 md:mt-0 md:ml-2"
            />
          </div>
        </div>
        <div className="flex justify-end mt-10">
          <div className="w-full sm:w-1/3">
            <Heading
              level="h2"
              typeStyle="body-lg"
              textColor="text-gray-700"
              className="text-slate-500"
            >
              All events/meetings are live streamed to all AsyncAPI social media
              accounts. To learn more about meetings setup and automation
              <TextLink
                href="https://github.com/asyncapi/community/blob/master/MEETINGS_ORGANIZATION.md"
                target="_blank"
              >
                read our FAQ
              </TextLink>
              .
            </Heading>
          </div>
        </div>
        <hr className="mt-20 border-dotted border-t-2 border-black " />
      </div>
      <div className="mt-24 w-full h-auto sm:h-[400px]">
        <div className="w-full h-full bg-confBg rounded-md bg-cover bg-center p-10 flex flex-col justify-between text-white">
          <img data-testid="RecordingsCard-img"
            src="/img/logos/confLogo.webp"
            alt="conf-logo"
            className="w-[100px] sm:w-[150px]"
          />
          <div className="w-full sm:w-[70%]">
            <Heading
              level="h2"
              typeStyle="heading-sm-semibold"
              className="mt-10 lg:text-2xl"
            >
              Watch the AsyncAPI 2022 conference recordings from anywhere around
              the world for free
            </Heading>
            <a data-testid="Recordings-Link"
              href="https://www.youtube.com/playlist?list=PLbi1gRlP7pijRiA32SU36hD_FW-2qyPhl"
              target="_blank"
              rel="noreferrer"
            >
              <div className="mt-5 flex gap-3 items-center">
                <span data-testid="Recordings-text">Watch now</span>
                <ArrowRightIcon className="w-[20px]" />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="sm:flex justify-between items-center">
          <Heading level="h2" typeStyle="heading-md">
            All Events
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
      <div className="mt-24">
        <div className="lg:flex lg:justify-between" data-testid="EventTypesCard">
          <div className="lg:w-[30%]">
            <Heading level="h2" typeStyle="heading-md">
              Event Types
            </Heading>
            <Paragraph typeStyle="body-md" className="mt-4">
              Explore numerous AsyncAPI's livestreams, specifically curated
            </Paragraph>
          </div>
          <div className="flex lg:flex-row flex-col mt-10 lg:mt-0">
            <div className="" data-testid="CommunityMeeting-Card">
              <Meeting
                name="Community Meeting"
                purpose="This is an open community meeting to discuss important topics around the AsyncAPI Initiative regularly. We organize it every two weeks in different time zones."
                host="Azeez Elegbede"
                bg="gray-100"
                hostProfile="https://github.com/AceTheCreator"
                youtube="https://www.youtube.com/playlist?list=PLbi1gRlP7pijUwZJErzyYf_Rc-PWu4lXS"
              />
            </div>
            <div className="">
              <Meeting
                name="Spec 3.0 Meeting"
                purpose="This is the meeting for community members involved in work related to the 3.0 release of AsyncAPI Specification. We organize it every two weeks at the same time."
                host="Jonas Lagoni"
                hostProfile="https://github.com/jonaslagoni"
                youtube="https://www.youtube.com/playlist?list=PLbi1gRlP7pihClJY-kXuTRRJ8n1awb0VV"
              />
            </div>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col lg:justify-end lg:items-center" data-testid="EventTypesCard-others">
          <div className="">
            <Meeting
              name="Thinking Out Loud"
              bg="gray-100"
              purpose="This is a live stream about diverse topics related to the AsyncAPI Initiative and Event-Driven Architectures. It is always an open discussion between a host and a guest."
              host="Fran Mendez"
              hostProfile="https://github.com/fmvilas"
              youtube="https://www.youtube.com/playlist?list=PLbi1gRlP7pigPxRRylHGCvpdppYLmSKfJ"
            />
          </div>
          <div className="">
            <Meeting
              name="Let's talk about contributing"
              purpose="This live stream focuses on contributors, people that want to contribute to AsyncAPI Initiative but do not know how to get started."
              host="Azeez Elegbede"
              hostProfile="https://github.com/AceTheCreator"
              youtube="https://www.youtube.com/playlist?list=PLbi1gRlP7pigPBrBMaNQhUeniR1pdDMiY"
            />
          </div>
          <div className="">
            <Meeting
              name="Ad Hoc Meeting"
              bg="gray-100"
              purpose="Do you want to discuss something with the community and our other meeting formats don't apply? Use this meeting to schedule ad hoc topics with the community."
              host="Any of the hosts"
              youtube="https://www.youtube.com/asyncapi"
            />
          </div>
        </div>
      </div>
      <div className="bg-dark py-12 mt-8 md:mt-20 rounded-lg">
        <NewsletterSubscribe
          dark={true}
          type="Meetings"
          title="Get a weekly email in your inbox"
          subtitle="You'll receive a weekly email with a summary of all the planned meetings for this week."
        />
      </div>
    </GenericLayout>
  );
}

export default Eventindex;

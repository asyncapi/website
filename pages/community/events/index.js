/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect, useState } from 'react'
import Button from '../../../components/buttons/Button';
import CommunityLayout from '../../../components/layout/CommunityLayout'
import Heading from '../../../components/typography/Heading';
import IconRocket from '../../../components/icons/Rocket';
import EventsContext from '../../../context/EventsContext';
import { ArrowRightIcon } from '@heroicons/react/outline';
import EventPostItem from '../../../components/navigation/EventPostItem';
import EventFilter from '../../../components/navigation/EventFilter';

function index() {
  let {navItems} = useContext(EventsContext)
  const [events, setEvents] = useState(navItems)
  // useEffect(() => {
  //   const newList = navItems.filter((list) => {
  //     return list.isIndex === false;
  //   });
  //   setEvents(newList)
  // },[])
  return (
    <CommunityLayout
      title="AsyncAPI events"
      description="Our catalogs of events and meetups"
      wide
    >
      <div className="mt-10 sm:mt-28">
        <div className="w-full sm:w-9/12">
          <h1 className="font-semibold text-3xl lg:text-7xl leading-tight md:text-4xl">
            Join a AsyncAPI event, from anywhere in the world.
          </h1>
        </div>
        <div className="flex justify-end mt-10">
          <div className="w-[80%] sm:w-1/3">
            <Heading
              level="h2"
              typeStyle="body-lg"
              textColor="text-gray-700"
              className="text-slate-500"
            >
              "Learn more about our live and recorded events below. You can also
              sign up to our community newsletter to stay up-to-date on our
              events."
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
              Join us at the AsyncAPI 2022 conference with thousands around the
              world for free
            </Heading>
            <a
              href="https://conference.asyncapi.com/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="mt-5 flex items-center">
                <span>Join us now </span>
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
                Schedule an appointment with any of the Technical steering
                committees
              </Heading>
              <Button
                className="block md:inline-block focus:outline-none mt-10 bg-black text-center sm:text-left"
                text="Schedule a call"
                href="https://github.com/orgs/asyncapi/discussions"
                target="_blank"
                icon={<IconRocket className="w-5 h-5 -mb-1 ml-1" />}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="sm:flex justify-between items-center">
          <Heading level="h2" typeStyle="heading-sm">
            More Events
          </Heading>
          <div className="mt-5 sm:mt-0">
            <EventFilter data={navItems} setData={setEvents} />
          </div>
        </div>
        <div className="mt-10">
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event, i) => {
              return <EventPostItem key={i} post={event} />;
            })}
          </ul>
        </div>
      </div>
    </CommunityLayout>
  );
}

export default index
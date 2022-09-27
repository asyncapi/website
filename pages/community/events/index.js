/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Button from '../../../components/buttons/Button';
import Architecture from '../../../components/illustrations/architecture';
import CommunityLayout from '../../../components/layout/CommunityLayout'
import Heading from '../../../components/typography/Heading';
import IconRocket from '../../../components/icons/Rocket';
import { ArrowRightIcon } from '@heroicons/react/outline';

function index() {
  return (
    <CommunityLayout
      title="AsyncAPI events"
      description="Our catalogs of events and meetups"
      wide
    >
      <div className="mt-28">
        <div className="w-9/12">
          <h1 className="font-semibold text-7xl leading-tight">
            Join a AsyncAPI event, from anywhere in the world.
          </h1>
        </div>
        <div className="flex justify-end mt-10">
          <div className="w-1/3">
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
      <div className="mt-24 flex justify-between items-center h-[400px]">
        <div className="w-[55%] h-full bg-confBg rounded-md bg-cover bg-center p-10 flex flex-col justify-between text-white">
          <img
            src="/img/logos/conflogo.png"
            alt="conf-logo"
            className="w-[150px]"
          />
          <div className="w-[70%]">
            <Heading level="h2" typeStyle="heading-sm-semibold">
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
        <div className="h-full w-[43%] bg-secondary-600 rounded-md flex">
          <div className="w-[50%] h-full flex-col">
            <div className="h-[50%] bg-officeHourCover bg-center bg-cover rounded-tl-md"></div>
            <div className="h-[50%]  bg-patternCover bg-center bg-cover rounded-bl-md" />
          </div>
          <div className="text-white w-[50%] p-5 flex flex-col items-center justify-center h-full">
            <div>
              <Heading level="h2" typeStyle="heading-md-semibold">
                Schedule an appointment with any of the Technical steering
                committees
              </Heading>
              <Button
                className="block md:inline-block focus:outline-none mt-10 bg-black"
                text="Schedule a call"
                href="https://github.com/orgs/asyncapi/discussions"
                target="_blank"
                icon={<IconRocket className="w-5 h-5 -mb-1 ml-1" />}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-20'>
        more
      </div>
    </CommunityLayout>
  );
}

export default index
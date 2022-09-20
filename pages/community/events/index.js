/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import CommunityLayout from '../../../components/layout/CommunityLayout'
import Heading from '../../../components/typography/Heading';

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
        <hr className='mt-20 border-dotted border-t-2 border-black '/>
      </div>
      <div className='mt-32'>
        <h1>Hello</h1>
      </div>
    </CommunityLayout>
  );
}

export default index
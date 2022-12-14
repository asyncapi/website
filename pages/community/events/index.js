/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Button from '../../../components/buttons/Button';
import Heading from '../../../components/typography/Heading';
import { ArrowRightIcon } from '@heroicons/react/outline';
import EventPostItem from '../../../components/navigation/EventPostItem';
import EventFilter from '../../../components/navigation/EventFilter';
import GenericLayout from '../../../components/layout/GenericLayout';
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
      title='AsyncAPI events'
      description='Our catalogs of events and meetups'
      image={image}
      hideBanner={true}
      wide
    >
      <div className='mt-10 sm:mt-28'>
        <div className='w-full sm:w-9/12'>
          <h1 className='font-semibold text-3xl lg:text-7xl leading-tight md:text-4xl'>
            Join an AsyncAPI event from anywhere in the world.
          </h1>
        </div>
        <div className='flex justify-end mt-10'>
          <div className='w-[80%] sm:w-1/3'>
            <Heading
              level='h2'
              typeStyle='body-lg'
              textColor='text-gray-700'
              className='text-slate-500'
            >
              'Learn more about our live and recorded events below. You can also
              sign up to our community newsletter to stay up-to-date on our
              events.'
            </Heading>
          </div>
        </div>
        <hr className='mt-20 border-dotted border-t-2 border-black ' />
      </div>
      <div className='mt-24 sm:flex justify-between items-center h-auto sm:h-[400px]'>
        <div className='w-full sm:w-[55%] h-full bg-confBg rounded-md bg-cover bg-center p-10 flex flex-col justify-between text-white'>
          <img
            src='/img/logos/conflogo.png'
            alt='conf-logo'
            className='w-[100px] sm:w-[150px]'
          />
          <div className='w-full sm:w-[70%]'>
            <Heading
              level='h2'
              typeStyle='heading-sm-semibold'
              className='mt-10'
            >
              Watch the AsyncAPI 2022 conference recordings from anywhere around
              the world for free
            </Heading>
            <a
              href='https://www.youtube.com/watch?v=NTHsezlKBh8&list=PLbi1gRlP7pijRiA32SU36hD_FW-2qyPhl'
              target='_blank'
              rel='noreferrer'
            >
              <div className='mt-5 flex items-center'>
                <span>Watch now</span>
                <ArrowRightIcon className='w-[20px] ml-3 mt-1' />
              </div>
            </a>
          </div>
        </div>
        <div className='h-full mt-10 sm:mt-0 w-full sm:w-[43%] bg-secondary-600 rounded-md flex'>
          <div className='w-[50%] h-full hidden sm:flex sm:flex-col'>
            <div className='h-[50%] bg-officeHourCover bg-center bg-cover rounded-tl-md'></div>
            <div className='h-[50%]  bg-patternCover bg-center bg-cover rounded-bl-md' />
          </div>
          <div className='text-white w-full sm:w-[50%] p-5 flex flex-col items-center justify-center h-full'>
            <div>
              <Heading level='h2' typeStyle='heading-md-semibold'>
                Start a discussion with Technical Steering
                Committee members
              </Heading>
              <Button
                className='block md:inline-block focus:outline-none mt-10 bg-black text-center sm:text-left'
                text='Create TSC discussion'
                href='https://github.com/orgs/asyncapi/discussions'
                target='_blank'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-20'>
        <div className='sm:flex justify-between items-center'>
          <Heading level='h2' typeStyle='heading-md'>
            More Events
          </Heading>
          <div className='mt-5 sm:mt-0'>
            <EventFilter data={meetings} setData={setEvents} />
          </div>
        </div>
        <div className='mt-10'>
          {!events || events.length === 0 ? (
            <div className='flex content-center justify-center'>
                <Paragraph
                  typeStyle='body-md'
                  className='mt-5 max-w-2xl mx-auto'
                >
                  No Events. Check back later!
                </Paragraph>
            </div>
          ) : (
            <ul className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
              {events.map((event, i) => {
                return <EventPostItem key={i} post={event} />;
              })}
            </ul>
          )}
        </div>
      </div>
    </GenericLayout>
  );
}

export default index;

/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Button from '../../../components/buttons/Button';
import Heading from '../../../components/typography/Heading';
import IconRocket from '../../../components/icons/Rocket';
import { ArrowRightIcon } from '@heroicons/react/outline';
import EventPostItem from '../../../components/navigation/EventPostItem';
import EventFilter from '../../../components/navigation/EventFilter';
import GenericLayout from '../../../components/layout/GenericLayout';
import Empty from '../../../components/illustrations/empty';
import Paragraph from '../../../components/typography/Paragraph';

function index({ meetings }) {
  const image = '/img/social/website-card.png';
  const [events, setEvents] = useState(
    meetings.sort((i1, i2) => {
      const i1Date = new Date(i1.start.dateTime);
      const i2Date = new Date(i2.start.dateTime);

      if (i1.featured && !i2.featured) return -1;
      if (!i1.featured && i2.featured) return 1;
      return i2Date - i1Date;
    })
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
                icon={<IconRocket className='w-5 h-5 -mb-1 ml-1' />}
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
              <div>
                <Empty className='mt-5' />
                <Paragraph
                  typeStyle='body-md'
                  className='mt-5 max-w-2xl mx-auto'
                >
                  No Events. Check back later!
                </Paragraph>
              </div>
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

export async function getServerSideProps() {
  const { google } = require('googleapis');
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/calendar'],
    // credentials: JSON.parse(process.env.CALENDAR_SERVICE_ACCOUNT)
    credentials: {
      type: 'service_account',
      project_id: 'my-lorem',
      private_key_id: '62076836c0dc3367e2650de944cdaea2ec868a6f',
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9anrq5do5aO9G\nRVA+ZTsEZogq+j8UG+V1BlNUBwwOt2+KCwf00KPmHtvAgJA/Rk/TiDaCu7tCgNYT\n8sls+OomXJeS/Re9d0DWEpAo2BYwmF7U9KpSRyT3ZeOBxa8e1hGsFDFKpkHVnZoL\n3eZosbIqKrHah+hDyB6ET2DRCX03ThV/E8vMMbjjEFZNQKBG6n5Be6WD0vt2n0V4\nGhQd3hXsok8KeTCSNabHssjG4uztDkyAKKElEwSC73odRGmrDNrfUrQ970xJVbz/\nxZqby3rl3Ro8nK7B5RRi0amBsoNfqMeGEm7qM+9IX0/8DvzP+CRB9yusk8cijB1s\ndHcpH35TAgMBAAECggEATBkO1/dPRHhRhPhM5Dx0SPDObQHLvM72UR0g9iW8pN7y\na1HCOQtnhYjJPZ4JFbqwUGotiDlW4sFzAGGupd6c55uUc8PFuWNDQ54Cl740sAJP\nOxwun06g3dnr3JOopulXATy9juGbmnAuVu0n59DYJNOxT3wBhtXL2NkxKto2mbRO\nuohmFPyNCWHr3000ARrZC03sbaOcbQjAGv2v1mDlE1qNmvM5v9Lv3PE8p2QOj3Hj\n1ib1OlsXRbpFi/wdEYWPz0lEcI6uWyn/ADXUNTisGl9b6VAGKnKvNiMNiAML4+ez\n360fSw/9eaUNQ3zY3DCDe1ppvx9zVnipKNqy4JIV8QKBgQDgoFARq31AC1AJ1nlx\nEsLnDNe7XEJbzsCKIuHGc708tc8B55GUfF/vPlb5vF4k5DxANYSdgzZC5Ym+J1OF\n3uM8Xcz9YydXdyn05jcmw6KLPwmKsHYX3UjOtib0/7aMNGycGK/PIi3kHp9Zrdfn\nxVqBKIqtjbTUy0/TLb4sp5srUQKBgQDX3zIscj68nzturAUmiaAjlXinspt9B+0S\nXYo4hDxcJ8XmDcOLn7bFmhm9kBhchelRLtmEC307anGlomUlfTxCeZjt8QzfkrEA\n8WXEh5eLwz33PGxdxCRkRjfy04ZeGKnP/Td23sv800dXHcx5/8udfY+yzJG2gHD6\nMibDgVZeYwKBgQChPDF9HX1gNT6UcTDmqzLfqmZIBKdVQwkNnpA1ZOqW42Hd2hyz\nWrt5/WNtC3sAPBvLcx7n+UE/r4e5yHy5gQ3XTPVRhJS+wbiKI52+43qPPQZaWOPL\nqXkTd8hq4ApmhVLYkRfRNJWAQ0LammB56z1VrIYuoaMFg5Ke4Ry67OwCoQKBgBmV\nayXXWFYUbP+9xVJ+5wqwkT8WrNTRlqghi9sM2PZ3BD4yjWVDxW5/x+Mua6SzfiZP\n7hl3Hx1mjRd7Oo+J2xVpwdUZR1RL10xsT4pOI4i9198wOwuVzlZP+BuANCF8vMtY\nkDU3TGenRoItlukyhpggpGIlWnONn1YXkX6EGo9PAoGBAIEVQ360MLeLF82DncG2\nGIiAQBnZUWQGRcY+MgX8v+tFRIGEOvLpLqBpaPhgxOoNtDwWURRHU4+ycO/acmHO\nqsTdmDKdVsvAyq+YwAZk2n40Y/GYtbjDo84XjfixEH+u0u1EDRhHt7QmL1Rmuwek\nbT+34XNq0WXKsjgtEJAr+CxQ\n-----END PRIVATE KEY-----\n',
      client_email: 'cal-823@my-lorem.iam.gserviceaccount.com',
      client_id: '104847313452082580465',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/cal-823%40my-lorem.iam.gserviceaccount.com',
    },
  });

  const calendar = google.calendar({ version: 'v3', auth });
  let meetings = null;
  const currentTime = new Date(Date.now()).toISOString();
  const timeMin = new Date(
    Date.parse(currentTime) - 100 * 24 * 60 * 60 * 1000
  ).toISOString();
  const timeMax = new Date(
    Date.parse(currentTime) + 50 * 24 * 60 * 60 * 1000
  ).toISOString();
  try {
    const eventsList = await calendar.events.list({
      calendarId: 'acebuild404@gmail.com',
      timeMax: timeMax,
      timeMin: timeMin,
    });
    meetings = eventsList.data.items;
  } catch (error) {
    console.log(error);
  }
  return { props: { meetings } };
}

export default index;

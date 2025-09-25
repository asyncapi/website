import type moment from 'moment';
import React from 'react';

import { CardType } from '@/types/components/community/CardPropsType';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';

import Card from '../../components/community/Card';
import Header from '../../components/community/Header';
import Hero from '../../components/community/Hero';
import HomeCards from '../../components/community/HomeCard';
import GenericLayout from '../../components/layout/GenericLayout';
import NewsletterSubscribe from '../../components/NewsletterSubscribe';
import Heading from '../../components/typography/Heading';
import eventsData from '../../config/meetings.json';
import { getEvents } from '../../utils/staticHelpers';

interface Event {
  title: string;
  date: moment.Moment;
  url: string;
}

/**
 * @description This component displays the Community Index Page.
 */
export default function CommunityIndexPage() {
  const image = '/img/social/community.webp';

  return (
    <GenericLayout
      title='AsyncAPI Community Meetings'
      description='The home for developer communities'
      image={image}
      wide
    >
      <div className='mt-15 md:hidden'>
        <Header />
      </div>
      <Hero />
      <div className='gh-img mt-10 h-auto w-full object-contain md:mt-0'>
        <img className='gh-img object-contain' src='/img/homepage/discuss-page.webp' alt='github-discussion' />
      </div>
      <div className='mt-20 flex flex-col items-center justify-center text-center'>
        <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.xl}>
          Home of #CommunityOps
        </Heading>
        <div>
          <Heading
            level={HeadingLevel.h2}
            typeStyle={HeadingTypeStyle.bodyLg}
            textColor='text-gray-700'
            className='text-slate-500'
          >
            Join the conversation with over 10k+ developers from literally everywhere.
          </Heading>
        </div>
      </div>
      <div data-testid='CommunityIndex-HomeCard'>
        <HomeCards
          headline='Thanking our AsyncAPI Ambassadors'
          title='Ambassador Programs'
          description="Launch OSS community programs that your community is proud to
            participate in. Let's build thriving OSS communities together!"
          btnText='Become an ambassador'
          link='/community/ambassadors'
          className='bg-ambassador'
        />
      </div>
      <div className='mt-20 w-full md:flex md:justify-between'>
        <div className='text-white md:w-1/2' data-testid='CommunityIndex-IssuesCard'>
          <Card
            taglineBg='bg-pink-100'
            bg='bg-code-editor-dark'
            heading='Explore and Contribute to Hot Issues'
            description='Discover over 100s of interesting issues, suitable for new and existing contributors.'
            tagline='Issues'
            icon='🔥'
            btnText='Explore issues'
            btnBg='fill-pink-200 text-pink-200'
            link='/community/dashboard'
          />
        </div>
        <div
          className='mt-10 flex flex-col justify-between md:mt-0 md:w-[45%]'
          data-testid='CommunityIndex-SmallsCards'
        >
          <div data-testid='CommunityIndex-Newsroom-Card'>
            <Card
              icon='📣'
              tagline='Newsroom'
              type={CardType.SMALL}
              heading='Never Get Left Behind'
              description='Do you want to get the latest news with recent activities happening in the community?'
              bg='bg-white'
              link='/community/newsroom'
            />
          </div>
          <div className='mt-10 md:mt-0' data-testid='CommunityIndex-Toolings-Card'>
            <Card
              icon='🧰'
              tagline='Toolings'
              type={CardType.SMALL}
              heading='Check out our collection of Toolings'
              description='Discover various AsyncAPI tools to optimize your journey! These tools are made by the community, for the community.'
              bg='bg-pink-200'
              link='/tools'
            />
          </div>
        </div>
      </div>
      <div className='relative size-full'>
        <HomeCards
          headline='Community heartbeat'
          title='AsyncAPI Community Meetings & Events'
          description='Join an AsyncAPI meeting from anywhere in the world! We host both
              live and recorded community events. You can also sign up for our
              community newsletter to stay up-to-date on all meetings and
              events.'
          className='bg-eventCover'
          btnText='Explore more events'
          link='/community/events'
        />
        <div className='absolute right-0 top-0 mt-[100px] hidden w-[500px] justify-end md:block'>
          <ul>
            {getEvents(eventsData, 3).map((event: Event, index: number) => {
              return (
                <li key={index} className='mt-2 w-full rounded-l-md bg-white p-2 md:p-10'>
                  <a href={event.url} className='flex'>
                    <div className='inline-flex h-12 min-w-12 flex-row rounded-full bg-pink-500 font-bold text-white'>
                      <span className='flex-1 self-center text-center'>{event.date.format('D')}</span>
                    </div>
                    <div className='ml-4 text-left'>
                      <h1 className='text-md md:text-lg'>{event.title}</h1>
                      <span className='text-xs text-gray-500 md:text-sm'>
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
      <div className='mt-10 flex flex-col sm:flex-row'>
        <div className='m-5' data-testid='CommunityCards-Goals'>
          <Card
            type={CardType.SMALL}
            tagline='Goals'
            icon='🎯'
            heading='2024 AsyncAPI Community Goals'
            description='Help us improve our 2024 AsyncAPI community building and maintenance goals.'
            bg='bg-white'
            link='https://github.com/orgs/asyncapi/discussions/948'
          />
        </div>
        <div className='m-5' data-testid='CommunityCards-TSC'>
          <Card
            type={CardType.SMALL}
            tagline='TSC'
            icon='🚀'
            heading='Meet Folks Redefining the Initiative'
            description='Learn how to become a Technical Steering Committee (TSC) member and see our current members.'
            bg='bg-white'
            link='/community/tsc'
          />
        </div>
      </div>
      <div className='' data-testid='CommunityCards-Slack'>
        <HomeCards
          headline='All community info, tracked'
          title='AsyncAPI Slack'
          description="AsyncAPI's incredible community of developers, designers,
              technical writers, and more hail from over 83 countries. We
              actively contribute, collaborate, and mentor others on how to
              build with AsyncAPI."
          btnText='Join AsyncAPI slack'
          link='https://asyncapi.com/slack-invite'
          className='bg-channelCover'
        />
      </div>
      <div className='mt-10 flex justify-center'>
        <div className='m-5 w-full max-w-6xl rounded-lg bg-gray-100 p-8 shadow-md'>
          <div className='w-full'>
            <Card
              type={CardType.SMALL}
              tagline='Finance'
              icon='💰'
              heading='Track Initiative Spending with Budget Analysis'
              description="Explore our transparent finance section for a detailed analysis of our project's budget.
               See how we track expenses and gain insights into funds allocation."
              bg='bg-white'
              link='/finance'
            />
          </div>
        </div>
        {/* <div className='m-5'>
          <Card
            type={CardType.SMALL}
            tagline='Store'
            icon='🛒'
            heading='Swags and Goodies'
            description='Explore our swag collection of AsyncAPI-themed t-shirts and goodies.'
            link='https://www.store.asyncapi.com/'
            bg='bg-primary-200'
          />
        </div> */}
      </div>
      <div className='mt-8 rounded-lg bg-dark py-12 md:mt-20' data-testid='CommunityCard-subscribe'>
        <NewsletterSubscribe dark />
      </div>
    </GenericLayout>
  );
}

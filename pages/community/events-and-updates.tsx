import React from 'react';

import Button from '@/components/buttons/Button';
import GoogleCalendarButton from '@/components/buttons/GoogleCalendarButton';
import ICSFileButton from '@/components/buttons/ICSFileButton';
import SubscribeButton from '@/components/buttons/SubscribeButton';
import Calendar from '@/components/Calendar';
import FeatureCard from '@/components/community/FeatureCard';
import IconCalendar from '@/components/icons/Calendar';
import IconNewsroom from '@/components/icons/Newsroom';
import IconUsersGroup from '@/components/icons/UsersGroup';
import IconVideo from '@/components/icons/Video';
import Container from '@/components/layout/Container';
import GenericLayout from '@/components/layout/GenericLayout';
import NewsletterSubscribe from '@/components/NewsletterSubscribe';
import NewsroomBlogPosts from '@/components/newsroom/NewsroomBlogPosts';
import NewsroomYoutube from '@/components/newsroom/NewsroomYoutube';
import Heading from '@/components/typography/Heading';
import Paragraph from '@/components/typography/Paragraph';
import TextLink from '@/components/typography/TextLink';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';
import { makeStaticProps } from '@/utils/getStatic';

const getStaticProps = makeStaticProps(['landing-page', 'footer', 'common']);

export { getStaticProps };

/**
 * @description Events & Updates page combining both newsroom and events functionality
 */
export default function EventsAndUpdates() {
  const description = 'Stay updated with AsyncAPI events, blogs, videos, and community news';
  const image = '/img/social/community-events.webp';

  return (
    <GenericLayout title='Events & Updates' description={description} image={image} wide>
      {/* Hero Section */}
      <div className='relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50'>
        {/* Decorative gradient orbs */}
        <div className='absolute left-0 top-0 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-200/40 to-purple-200/40 blur-3xl' />
        <div className='absolute bottom-0 left-0 size-[400px] -translate-x-1/3 translate-y-1/3 rounded-full bg-gradient-to-tr from-purple-200/30 to-pink-200/30 blur-3xl' />
        <div className='absolute right-0 top-0 size-[450px] translate-x-1/3 -translate-y-1/4 rounded-full bg-gradient-to-bl from-purple-200/40 to-blue-200/40 blur-3xl' />
        <div className='absolute bottom-0 right-0 size-[300px] translate-x-1/4 translate-y-1/2 rounded-full bg-gradient-to-tl from-purple-300/30 to-pink-200/30 blur-3xl' />
        
        <Container wide className='relative z-10 py-20 text-center' data-testid='EventsAndUpdates-Hero'>
          <div className='mx-auto max-w-4xl'>
            <div className='mb-6 inline-block rounded-full bg-cyan-100 px-5 py-2 text-sm font-medium text-cyan-600'>
              Find out what's New
            </div>
            <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.xl} className='mb-6 text-gray-900'>
              Events & Updates
            </Heading>
            <Paragraph typeStyle={ParagraphTypeStyle.lg} className='mx-auto mb-10 max-w-2xl dark:text-gray-400 text-gray-700'>
              Join thousands of developers, creators, and innovators building the future of event-driven architectures.
              Your journey starts here—connect, learn, and grow with us.
            </Paragraph>
            <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
              <Button
                text='Join Our Community'
                href='/community'
                className='rounded-lg bg-indigo-600 px-8 py-3 font-semibold text-white shadow-lg hover:bg-indigo-700'
                bgClassName='bg-indigo-600 hover:bg-indigo-700'
              />
              <Button
                text='Watch intro video +'
                href='https://www.youtube.com/asyncapi'
                target='_blank'
                className='rounded-lg border-2 border-cyan-500 bg-transparent px-8 py-3 font-semibold text-cyan-600 hover:bg-cyan-50'
                bgClassName='bg-transparent hover:bg-cyan-50 border-2 border-cyan-500'
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Everything You Need Section */}
      <div className='bg-white dark:bg-dark-background'>
        <Container wide className='py-20' data-testid='EventsAndUpdates-Features'>
          <div className='text-center'>
            <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.lg} className='mb-4'>
              Everything You Need
            </Heading>
            <Paragraph typeStyle={ParagraphTypeStyle.md} className='mx-auto mb-12 max-w-2xl text-gray-600 dark:text-gray-400'>
              Discover, connect, and grow with our comprehensive community platform
            </Paragraph>
          </div>
          <div className='grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4'>
            <FeatureCard
              icon={<IconCalendar />}
              title='Live Events'
              description='Join workshops, meetups, and conferences from anywhere in the world'
            />
            <FeatureCard
              icon={<IconNewsroom />}
              title='Latest Updates'
              description='Stay informed with news, releases, and community highlights'
            />
            <FeatureCard
              icon={<IconVideo className='size-8' />}
              title='Video Library'
              description='Access recordings, tutorials, and live streams on demand'
            />
            <FeatureCard
              icon={<IconUsersGroup className='size-8' />}
              title='Global Community'
              description='Connect with developers and contributors worldwide'
            />
          </div>
        </Container>
      </div>

      {/* Upcoming Events Section */}
      <div className='bg-secondary-200 rounded-3xl dark:bg-dark-card'>
        <Container wide className='py-20'>
          <div className='text-center'>
            <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.lg} className='mb-4 text-gray-900'>
              Upcoming Events
            </Heading>
            <Paragraph typeStyle={ParagraphTypeStyle.md} className='mx-auto mb-12 max-w-2xl dark:text-gray-400 text-gray-600'>
              Don't miss out on these amazing community gatherings
            </Paragraph>
          </div>

          <div className='mt-12  lg:flex lg:flex-row-reverse lg:items-center lg:gap-12'>
            <section className='mt-10 lg:mt-0 lg:flex-1'>
              <Calendar size={2} />
            </section>
            <section className='mt-10 lg:mt-0 lg:max-w-xl lg:text-left'>
              <div>
                <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.mdSemibold} className='text-gray-900'>
                  Join AsyncAPI meetings
                </Heading>
                <Paragraph typeStyle={ParagraphTypeStyle.md} className='mt-4 dark:text-gray-400 text-gray-600'>
                  We meet every week to discuss the future of AsyncAPI and event-driven architectures. Join us to share
                  your ideas, ask questions, and connect with the community.{' '}
                  <TextLink href='/community/meetings' className='text-indigo-600 hover:text-indigo-700'>
                    Learn more about our meetings
                  </TextLink>
                </Paragraph>
                <ul className='mt-8 flex flex-wrap justify-center gap-3 lg:justify-start'>
                  <li>
                    <GoogleCalendarButton href='https://calendar.google.com/calendar/u/3?cid=Y19xOXRzZWlnbG9tZHNqNm5qdWh2YnB0czExY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t' />
                  </li>
                  <li>
                    <SubscribeButton href='/community/meetings' />
                  </li>
                  <li>
                    <ICSFileButton href='https://calendar.google.com/calendar/ical/c_q9tseiglomdsj6njuhvbpts11c%40group.calendar.google.com/public/basic.ics' />
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </Container>
      </div>

      {/* From the Blogs Section */}
      <div className='bg-white dark:bg-dark-background'>
        <Container wide className='py-20' data-testid='EventsAndUpdates-Blogs'>
          <div className='mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
            <div>
              <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.lg} className='mb-2 text-gray-900'>
                From the Blogs
              </Heading>
              <Paragraph typeStyle={ParagraphTypeStyle.md} className='text-gray-600'>
                Stay connected with the pulse of our community
              </Paragraph>
            </div>
            <Button
              text='Read All Posts'
              href='/blog'
              className='rounded-lg bg-indigo-600 px-8 py-3 font-semibold text-white shadow-lg hover:bg-indigo-700'
              bgClassName='bg-indigo-600 hover:bg-indigo-700'
            />
          </div>
          <div className='mt-12'>
            <NewsroomBlogPosts />
          </div>
        </Container>
      </div>

      {/* Videos & Live Streams Section */}
      <div className='bg-secondary-200 rounded-3xl dark:bg-dark-card'>
        <Container wide className='py-20' data-testid='EventsAndUpdates-Videos'>
          <div className='mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
            <div>
              <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.lg} className='mb-2 text-gray-900 dark:text-dark-heading'>
                Videos & Live Streams
              </Heading>
              <Paragraph typeStyle={ParagraphTypeStyle.md} className='text-gray-800 dark:text-dark-heading'>
                Learn, engage, and stay updated with our video content
              </Paragraph>
            </div>
            <Button
              text='Check Out all Videos'
              href='https://www.youtube.com/asyncapi'
              target='_blank'
              className='rounded-lg bg-indigo-600 px-8 py-3 font-semibold text-white shadow-lg hover:bg-indigo-700'
              bgClassName='bg-indigo-600 hover:bg-indigo-700'
            />
          </div>
          <div className='mt-12'>
            <NewsroomYoutube />
          </div>
        </Container>
      </div>

      {/* Newsletter Section */}
      <div className='mt-8 bg-dark py-12'>
        <Container wide>
          <NewsletterSubscribe dark />
        </Container>
      </div>
    </GenericLayout>
  );
}

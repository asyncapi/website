import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import Header from '../../components/community/Header';
import Hero from '../../components/community/Hero';
import ToolingsShowcase from '../../components/community/ToolingsShowcase';
import IconArrowRightStroke from '../../components/icons/ArrowRightStroke';
import IconBadgeCheckmark from '../../components/icons/BadgeCheckmark';
import IconExternalLink from '../../components/icons/ExternalLink';
import GenericLayout from '../../components/layout/GenericLayout';
import NewsletterSubscribe from '../../components/NewsletterSubscribe';
import Heading from '../../components/typography/Heading';
import eventsData from '../../config/meetings.json';
import { getEvents } from '../../utils/staticHelpers';

dayjs.extend(localizedFormat);

interface Event {
  title: string;
  date: Dayjs;
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

      {/* CTA Section - Contribute & Committee */}
      <div className='mt-10 md:mt-0 bg-secondary-100 dark:bg-dark-card rounded-3xl py-20 px-6 md:px-12'>
        <div className='max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16'>
          {/* Left Content */}
          <div className='flex-1 space-y-12'>
            {/* Contribute to Hot Issues */}
            <div className='space-y-4'>
              <Heading
                level={HeadingLevel.h2}
                typeStyle={HeadingTypeStyle.lg}
                className='text-gray-900 dark:text-dark-heading font-bold'
              >
                Contribute To Hot Issues
              </Heading>
              <Paragraph typeStyle={ParagraphTypeStyle.md} className='text-gray-700 dark:text-gray-300'>
                Discover over 100s of interesting issues, suitable for new and existing contributors.
              </Paragraph>
              <a
                href='https://github.com/search?q=is%3Aissue+is%3Aopen+org%3Aasyncapi+label%3A%22good+first+issue%22&type=issues'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center px-6 py-3 text-secondary-500 dark:text-secondary-400 border-2 border-secondary-500 dark:border-secondary-400 rounded-lg hover:bg-secondary-500 hover:text-white dark:hover:bg-secondary-500 dark:hover:text-white transition-all font-medium group'
              >
                <IconExternalLink className='w-5 h-5 mr-2 transform group-hover:translate-x-1 transition-transform' />
                View on GitHub
              </a>
            </div>

            {/* Become a Committee Member */}
            <div className='space-y-4'>
              <Heading
                level={HeadingLevel.h2}
                typeStyle={HeadingTypeStyle.lg}
                className='text-gray-900 dark:text-dark-heading font-bold'
              >
                Become a Committee Member
              </Heading>
              <Paragraph typeStyle={ParagraphTypeStyle.md} className='text-gray-700 dark:text-gray-300'>
                Learn how to become a Technical Steering Committee (TSC) member and see our current members.
              </Paragraph>
              <Link
                href='/community/tsc'
                className='inline-flex items-center px-6 py-3 text-secondary-500 dark:text-secondary-400 border-2 border-secondary-500 dark:border-secondary-400 rounded-lg hover:bg-secondary-500 hover:text-white dark:hover:bg-secondary-500 dark:hover:text-white transition-all font-medium group'
              >
                <IconArrowRightStroke className='w-5 h-5 mr-2 transform group-hover:translate-x-1 transition-transform' />
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Preview Image */}
          <div className='flex-1 w-full lg:max-w-2xl'>
            <div className='relative bg-white dark:bg-dark-card rounded-lg shadow-2xl dark:shadow-primary-500/20 overflow-hidden border border-gray-200 dark:border-gray-700'>
              <img
                src='/img/social/communitypage.webp'
                alt='AsyncAPI GitHub Community Preview'
                className='w-full h-auto'
              />
            </div>
          </div>
        </div>
      </div>

      {/* AsyncAPI Slack Section */}
      <div className='mt-20 py-20 px-6 md:px-12'>
        <div className='max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16'>
          {/* Left Content */}
          <div className='flex-1 space-y-6'>
            <Heading
              level={HeadingLevel.h1}
              typeStyle={HeadingTypeStyle.xl}
              className='text-gray-900 dark:text-dark-heading font-bold'
            >
              AsyncAPI Slack
            </Heading>
            <Paragraph typeStyle={ParagraphTypeStyle.lg} className='text-gray-700 dark:text-gray-300 leading-relaxed'>
              AsyncAPI&apos;s incredible community of developers, designers, technical writers, and more hail from over
              83 countries. We actively contribute, collaborate, and mentor others on how to build with AsyncAPI.
            </Paragraph>
            <a
              href='https://asyncapi.com/slack-invite'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center px-8 py-4 bg-primary-500 hover:bg-primary-600 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            >
              Join the Slack Community
            </a>
          </div>

          {/* Right Slack Screenshot */}
          <div className='flex-1 w-full lg:max-w-2xl'>
            <div className='relative rounded-lg shadow-2xl dark:shadow-primary-500/20 overflow-hidden'>
              <img
                src='/img/social/slack-ss.webp'
                alt='AsyncAPI Slack Community Screenshot'
                className='w-full h-auto'
              />
            </div>
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
                        {event.date.format('LLLL')} UTC
                        {event.date.format('Z')}
                      </span>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Ambassador Programs Section */}
      <div className='mt-20 py-12 px-6 md:px-12 bg-gray-50 dark:bg-dark-background'>
        <div className='max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12'>
          {/* Left Content */}
          <div className='flex-1 space-y-4'>
            <Heading
              level={HeadingLevel.h2}
              typeStyle={HeadingTypeStyle.lg}
              className='text-gray-900 dark:text-dark-heading font-bold'
            >
              Ambassador Programs
            </Heading>
            <Paragraph typeStyle={ParagraphTypeStyle.md} className='text-gray-700 dark:text-gray-300 leading-relaxed'>
              Launch OSS community programs that your community is proud to participate in. Let&apos;s build thriving
              OSS communities together!
            </Paragraph>
            <Link
              href='/community/ambassadors'
              className='inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg transition-all font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            >
              Become an Ambassador
            </Link>
          </div>

          {/* Right Image */}
          <div className='flex-shrink-0'>
            <div className='relative w-72 lg:w-96 rounded-xl overflow-hidden shadow-2xl dark:shadow-primary-500/20'>
              <img src='/img/social/woman.jpg' alt='AsyncAPI Ambassador' className='w-full h-auto object-cover' />
            </div>
          </div>
        </div>
      </div>

      {/* Our Goals, Financials, and Merchandising Section */}
      <div className='mt-20 py-20 px-6 md:px-12'>
        <div className='max-w-7xl mx-auto'>
          {/* Section Title */}
          <Heading
            level={HeadingLevel.h1}
            typeStyle={HeadingTypeStyle.lg}
            className='text-gray-900 dark:text-dark-heading font-bold mb-12 text-center lg:text-left'
          >
            Our Goals, Financials, and Merchandising
          </Heading>

          {/* Cards Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* Community Goal Card */}
            <a
              href='https://github.com/orgs/asyncapi/discussions/948'
              target='_blank'
              rel='noopener noreferrer'
              className='relative group bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-purple-200 dark:border-purple-700 hover:scale-[1.02] cursor-pointer'
            >
              <div className='absolute top-6 right-6'>
                <IconExternalLink className='w-8 h-8 text-purple-400 dark:text-purple-300 group-hover:text-purple-500 dark:group-hover:text-purple-200 transition-colors' />
              </div>
              <div className='mb-6'>
                <IconBadgeCheckmark className='w-12 h-12 text-purple-600 dark:text-purple-400' />
              </div>
              <Heading
                level={HeadingLevel.h3}
                typeStyle={HeadingTypeStyle.md}
                className='text-purple-900 dark:text-purple-100 font-bold mb-3'
              >
                Community Goal
              </Heading>
              <Paragraph typeStyle={ParagraphTypeStyle.sm} className='text-purple-800 dark:text-purple-200'>
                Help us improve our 2024 AsyncAPI community building and maintenance goals.
              </Paragraph>
            </a>

            {/* Swags & Goodies Card */}
            <a
              href='https://www.store.asyncapi.com/'
              target='_blank'
              rel='noopener noreferrer'
              className='relative group bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-pink-200 dark:border-pink-700 hover:scale-[1.02] cursor-pointer'
            >
              <div className='absolute top-6 right-6'>
                <IconExternalLink className='w-8 h-8 text-pink-400 dark:text-pink-300 group-hover:text-pink-500 dark:group-hover:text-pink-200 transition-colors' />
              </div>
              <div className='mb-6'>
                <IconBadgeCheckmark className='w-12 h-12 text-pink-600 dark:text-pink-400' />
              </div>
              <Heading
                level={HeadingLevel.h3}
                typeStyle={HeadingTypeStyle.md}
                className='text-pink-900 dark:text-pink-100 font-bold mb-3'
              >
                Swags & Goodies
              </Heading>
              <Paragraph typeStyle={ParagraphTypeStyle.sm} className='text-pink-800 dark:text-pink-200'>
                Explore our swag collection of AsyncAPI-themed t-shirts and goodies.
              </Paragraph>
            </a>

            {/* Finance Card */}
            <Link
              href='/finance'
              className='relative group bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-cyan-200 dark:border-cyan-700 hover:scale-[1.02] cursor-pointer block'
            >
              <div className='absolute top-6 right-6'>
                <IconExternalLink className='w-8 h-8 text-cyan-400 dark:text-cyan-300 group-hover:text-cyan-500 dark:group-hover:text-cyan-200 transition-colors' />
              </div>
              <div className='mb-6'>
                <IconBadgeCheckmark className='w-12 h-12 text-cyan-600 dark:text-cyan-400' />
              </div>
              <Heading
                level={HeadingLevel.h3}
                typeStyle={HeadingTypeStyle.md}
                className='text-cyan-900 dark:text-cyan-100 font-bold mb-3'
              >
                Finance
              </Heading>
              <Paragraph typeStyle={ParagraphTypeStyle.sm} className='text-cyan-800 dark:text-cyan-200'>
                Explore our transparent finance section for a detailed analysis of our project&apos;s budget. See how we
                track expenses and gain insights into funds allocation.
              </Paragraph>
            </Link>
          </div>
        </div>
      </div>

      {/* Toolings Showcase Section */}
      <ToolingsShowcase />

      {/* Newsletter Subscribe Section */}
      <div className='mt-20 rounded-lg bg-dark py-12 md:mt-20' data-testid='CommunityCard-subscribe'>
        <NewsletterSubscribe dark />
      </div>
    </GenericLayout>
  );
}

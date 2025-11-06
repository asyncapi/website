import { sortBy } from 'lodash';
import Link from 'next/link';
import React, { useState } from 'react';

import type { Ambassador } from '@/types/pages/community/Community';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';

import Button from '../../../components/buttons/Button';
import IconBook from '../../../components/icons/Book';
import IconClipboard from '../../../components/icons/Clipboard';
import IconCode from '../../../components/icons/Code';
import IconDocument from '../../../components/icons/Document';
import IconLightbulb from '../../../components/icons/LightBulb';
import IconMicrophone from '../../../components/icons/Microphone';
import IconPlay from '../../../components/icons/Play';
import IconStar from '../../../components/icons/Star';
import IconTerminal from '../../../components/icons/Terminal';
import IconUsersGroup from '../../../components/icons/UsersGroup';
import IconVideo from '../../../components/icons/Video';
import GenericLayout from '../../../components/layout/GenericLayout';
import NewsletterSubscribe from '../../../components/NewsletterSubscribe';
import Heading from '../../../components/typography/Heading';
import ambassadorList from '../../../config/ambassador_lists.json';
import ambassadors from '../../../config/AMBASSADORS_MEMBERS.json';

/**
 * @description Add additional user information to the user object having ambassador data
 * @param {Ambassador} user - The user object having ambassador data
 */
export function addAdditionalUserInfo(user: Ambassador) {
  const userData: Ambassador = {
    ...user
  };

  // add social links
  if (userData.github) {
    userData.githubUrl = `https://www.github.com/${userData.github}`;
  }
  if (userData.linkedin) {
    userData.linkedinUrl = `https://www.linkedin.com/in/${userData.linkedin}`;
  }
  if (userData.twitter) {
    userData.twitterUrl = `https://www.twitter.com/${userData.twitter}`;
  }

  // add img url
  // github redirects to avatar url using `https://www.github.com/<username>.png`
  userData.img = `${userData.githubUrl}.png`;

  return userData;
}

/**
 * @description Get the appropriate icon component based on the contribution title
 * @param {string} title - The contribution title
 */
function getContributionIcon(title: string) {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'Written content': IconDocument,
    'Video content': IconVideo,
    'Live streams': IconPlay,
    'Give talks': IconMicrophone,
    'Interactive Learning': IconLightbulb,
    'Build real-life usecases example': IconTerminal,
    'AsyncAPI Contributions': IconStar,
    'Gather Use-Cases': IconClipboard
  };

  return iconMap[title] || IconDocument;
}

/**
 * @description The main page for the AsyncAPI Ambassador Program.
 */
export default function Index() {
  const image = '/img/social/community-ambassadors.webp';
  const asyncapiAmbassadors = sortBy(
    ambassadors.map((user) => addAdditionalUserInfo(user)),
    ['name']
  );

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentAmbassadors = asyncapiAmbassadors.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(asyncapiAmbassadors.length / postsPerPage);

  return (
    <GenericLayout title='AsyncAPI Ambassador Program' description='The AsyncAPI Ambassador Program' image={image} wide>
      {/* Hero Section */}
      <div className='bg-white dark:bg-dark-background py-12 sm:py-16 lg:py-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
            {/* Left Column - Text Content */}
            <div>
              <span className='inline-block rounded-full border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-dark-card px-4 py-2 text-sm font-semibold text-secondary-500 dark:text-secondary-400 mb-6'>
                Community
              </span>
              <h1
                className='text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6'
                data-testid='Ambassadors-title'
              >
                Teachers.
                <br />
                Champions.
                <br />
                <span className='countdown-text-gradient'>Ambassadors.</span>
              </h1>
              <p className='text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl'>
                Passionate about AsyncAPI? Join our global community of ambassadors who drive innovation, education, and
                adoption of event-driven architectures.
              </p>
              <div data-testid='Ambassadors-button'>
                <Button
                  className='inline-block text-center hover:bg-primary-600 focus:outline-none text-base font-semibold'
                  text='Become an Ambassador'
                  href='https://github.com/asyncapi/community/blob/master/docs/020-governance-and-policies/AMBASSADOR_PROGRAM.md'
                  target='_blank'
                />
              </div>
            </div>

            {/* Right Column - Feature Cards */}
            <div className='relative hidden lg:block'>
              <div className='grid grid-cols-2 gap-4'>
                {/* Educational Content Card - Purple/Pink */}
                <div
                  className='rounded-2xl p-6 text-white shadow-xl transform rotate-3 hover:rotate-6 transition-transform duration-300'
                  style={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' }}
                >
                  <div className='mb-4'>
                    <IconBook className='w-8 h-8 text-white' />
                  </div>
                  <h3 className='text-lg font-semibold mb-2 text-white'>Educational Content</h3>
                  <p className='text-sm opacity-90 text-white'>Creating tutorials and guides</p>
                </div>

                {/* Video Tutorials Card - Blue/Cyan */}
                <div
                  className='rounded-2xl p-6 text-white shadow-xl transform -rotate-2 hover:-rotate-1 transition-transform duration-300 mt-8'
                  style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)' }}
                >
                  <div className='mb-4'>
                    <IconVideo className='w-8 h-8 text-white' />
                  </div>
                  <h3 className='text-lg font-semibold mb-2 text-white'>Video Tutorials</h3>
                  <p className='text-sm opacity-90 text-white'>Sharing knowledge through video</p>
                </div>

                {/* Community Building Card - Green/Emerald */}
                <div
                  className='rounded-2xl p-6 text-white shadow-xl transform rotate-1 hover:rotate-3 transition-transform duration-300 -mt-4'
                  style={{ background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)' }}
                >
                  <div className='mb-4'>
                    <IconUsersGroup className='w-8 h-8 text-white' />
                  </div>
                  <h3 className='text-lg font-semibold mb-2 text-white'>Community Building</h3>
                  <p className='text-sm opacity-90 text-white'>Growing local communities</p>
                </div>

                {/* Open Source Card - Orange/Red */}
                <div
                  className='rounded-2xl p-6 text-white shadow-xl transform -rotate-3 hover:-rotate-1 transition-transform duration-300'
                  style={{ background: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)' }}
                >
                  <div className='mb-4'>
                    <IconCode className='w-8 h-8 text-white' />
                  </div>
                  <h3 className='text-lg font-semibold mb-2 text-white'>Open Source</h3>
                  <p className='text-sm opacity-90 text-white'>Contributing to projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Video Section */}
      <div className='bg-secondary-100 rounded-3xl dark:bg-dark-card py-20 sm:py-28'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='relative rounded-3xl overflow-hidden shadow-2xl bg-gray-900' data-testid='Ambassadors-video'>
            <div className='relative w-full' style={{ paddingBottom: '56.25%' }}>
              <iframe
                src='https://www.youtube.com/embed/3rg_7hIb9PQ'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                className='absolute top-0 left-0 w-full h-full'
                data-testid='Ambassadors-Iframe'
              ></iframe>
            </div>
            <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
              <div className='bg-gray-900/30 backdrop-blur-sm rounded-lg px-6 py-3'>
                <p className='text-white text-sm sm:text-base font-semibold'>Watch our Ambassador Program overview</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contributions Section */}
      <div className='bg-white dark:bg-dark-background py-16 sm:py-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12' data-testid='Ambassadors-contributions'>
            <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.lg} className='text-gray-900 dark:text-white'>
              AsyncAPI Ambassador Contributions
            </Heading>
            <Heading
              level={HeadingLevel.h3}
              typeStyle={HeadingTypeStyle.bodyLg}
              className='mt-4 mx-auto max-w-3xl text-gray-600 dark:text-gray-400'
            >
              Our ambassadors are passionate about APIs and AsyncAPI. They share their knowledge, expertise, and
              excitement within their communities to help others build the future of APIs.
            </Heading>
          </div>

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4' data-testid='Ambassadors-list'>
            {ambassadorList.contents.map((link, index) => {
              const IconComponent = getContributionIcon(link.title);

              return (
                <div
                  key={index}
                  className='flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 hover:shadow-lg  transition-shadow '
                >
                  <div className='rounded-full bg-secondary-100 dark:bg-secondary-900/30 p-4 mb-4'>
                    <div className='h-12 w-12 flex items-center justify-center'>
                      <IconComponent className='h-8 w-8 text-primary-500' />
                    </div>
                  </div>
                  <Heading
                    level={HeadingLevel.h4}
                    typeStyle={HeadingTypeStyle.sm}
                    className='mb-2 text-gray-900 dark:text-white font-semibold'
                  >
                    {link.title}
                  </Heading>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>{link.details}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Ambassadors Section */}
      <div className='bg-secondary-100 dark:bg-dark-card rounded-3xl py-16 sm:py-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.lg} className='text-gray-900 dark:text-white'>
              Meet Our AsyncAPI Ambassadors
            </Heading>
            <Heading
              level={HeadingLevel.h3}
              typeStyle={HeadingTypeStyle.bodyLg}
              className='mt-4 mx-auto max-w-3xl text-gray-600 dark:text-gray-400'
            >
              Learn and grow alongside community members who are passionate about AsyncAPI and event-driven
              architectures.
            </Heading>
          </div>

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3' data-testid='Ambassadors-members-main'>
            {currentAmbassadors.map((ambassador: Ambassador, index: number) => (
              <div
                key={index}
                className='group relative bg-white dark:bg-dark-background rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
                data-testid='Ambassadors-members'
              >
                <Link href={`ambassadors/${ambassador.github}`} as={`ambassadors/${ambassador.github}`}>
                  <div className='relative'>
                    {ambassador.country && (
                      <div className='absolute top-4 right-4 z-10 bg-white dark:bg-gray-800 rounded-full text-3xl w-12 h-12 flex items-center justify-center shadow-lg'>
                        {ambassador.country}
                      </div>
                    )}
                    <div className='aspect-w-3 aspect-h-4 bg-gradient-to-br from-primary-400 to-primary-600'>
                      <img src={ambassador.img} alt={ambassador.name} className='w-full h-full object-cover' />
                    </div>
                  </div>
                </Link>

                <div className='p-6'>
                  <div className='flex items-start justify-between mb-3'>
                    <div>
                      <h3 className='text-lg font-bold text-gray-900 dark:text-white'>{ambassador.name}</h3>
                      <p className='text-sm text-primary-600 dark:text-primary-400 font-medium'>{ambassador.title}</p>
                    </div>
                  </div>

                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>{ambassador.company}</p>

                  <div className='pt-4 border-t border-gray-200 dark:border-gray-700'>
                    <p className='text-xs text-gray-500 dark:text-gray-500 mb-3'>Socials</p>
                    <div className='flex items-center gap-3' data-testid='Ambassadors-members-socials'>
                      {ambassador.twitterUrl && (
                        <a
                          href={ambassador.twitterUrl}
                          target='_blank'
                          rel='noreferrer'
                          className='text-gray-600 dark:text-gray-400 hover:!text-primary-500 dark:hover:!text-primary-500 transition-colors duration-200'
                          data-testid='Ambassadors-members-twitter'
                        >
                          <svg
                            className='h-5 w-5 transition-colors duration-200'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path d='M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84' />
                          </svg>
                        </a>
                      )}
                      {ambassador.githubUrl && (
                        <a
                          href={ambassador.githubUrl}
                          target='_blank'
                          rel='noreferrer'
                          className='text-gray-600 dark:text-gray-400 hover:!text-primary-500 dark:hover:!text-primary-500 transition-colors duration-200'
                        >
                          <svg
                            className='h-5 w-5 transition-colors duration-200'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path
                              fillRule='evenodd'
                              d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </a>
                      )}
                      {ambassador.linkedinUrl && (
                        <a
                          href={ambassador.linkedinUrl}
                          target='_blank'
                          rel='noreferrer'
                          className='text-gray-600 dark:text-gray-400 hover:!text-primary-500 dark:hover:!text-primary-500 transition-colors duration-200'
                        >
                          <svg
                            className='h-5 w-5 transition-colors duration-200'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path d='M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z' />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='mt-12 flex items-center justify-center gap-2'>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className='px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-primary-500 text-white'
                      : 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className='px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Tokens Section */}
      <div className='bg-white dark:bg-dark-background py-16 sm:py-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12' data-testid='Events-token'>
            <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.lg} className='text-gray-900 dark:text-white'>
              Tokens of our appreciation
            </Heading>
            <Heading
              level={HeadingLevel.h3}
              typeStyle={HeadingTypeStyle.bodyLg}
              className='mt-4 mx-auto max-w-3xl text-gray-600 dark:text-gray-400'
            >
              We appreciate your commitment and passion for sharing your knowledge with your communities. Let us support
              you!
            </Heading>
          </div>

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {ambassadorList.tokens.map((token, index) => (
              <div
                key={index}
                className='flex flex-col items-center text-center p-8 rounded-3xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300'
              >
                <div className='rounded-full bg-secondary-100 dark:bg-secondary-900/30 p-4 mb-6'>
                  <div className='h-16 w-16 flex items-center justify-center text-5xl'>{token.emoji}</div>
                </div>
                <Heading
                  level={HeadingLevel.h4}
                  typeStyle={HeadingTypeStyle.sm}
                  className='mb-3 text-gray-900 dark:text-white font-bold'
                >
                  {token.title}
                </Heading>
                <p className='text-sm text-gray-600 dark:text-gray-400 leading-relaxed'>{token.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='relative py-20 sm:py-24 overflow-hidden' data-testid='Events-ambassadors'>
        {/* Gradient background div */}
        <section
          className='relative overflow-hidden py-12 sm:py-16 rounded-xl mx-4 sm:mx-6 lg:mx-8 mb-12'
          style={{ background: 'linear-gradient(90deg, #8B5CF6 0%, #7C3AED 50%, #22D3EE 100%)' }}
        >
          <div className='relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center'>
            <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.lg} className='text-white mb-6 font-bold'>
              Become an AsyncAPI Ambassador
            </Heading>
            <Heading
              level={HeadingLevel.h3}
              typeStyle={HeadingTypeStyle.bodyLg}
              className='text-white/95 mb-10 leading-relaxed'
            >
              The AsyncAPI Ambassador program is now open for applications! If you&apos;re selected, you&apos;ll join
              AsyncAPI&apos;s mission of helping community members all over the world, build the future of Event-Driven
              APIs.
            </Heading>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <Button
                className='w-full sm:w-auto bg-white text-primary-600 hover:bg-gray-50 focus:outline-none font-semibold shadow-lg'
                text='Become an Ambassador Now'
                href='https://github.com/asyncapi/community/blob/master/AMBASSADOR_ORGANIZATION.md#are-you-interested-in-becoming-an-official-asyncapi-ambassador'
                target='_blank'
              />
              <Button
                bgClassName='bg-transparent border-2 border-white hover:bg-white/20'
                className='w-full sm:w-auto text-white focus:outline-none font-semibold'
                text='Learn More'
                href='https://www.asyncapi.com/blog/asyncapi-ambassador-program'
                target='_blank'
              />
            </div>
          </div>
        </section>
      </div>
      <NewsletterSubscribe className='mt-20 text-center' />
    </GenericLayout>
  );
}

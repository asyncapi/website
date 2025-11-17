import React from 'react';

import ToolsDashboard from '@/components/tools/ToolsDashboard';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';

import GenericLayout from '../../components/layout/GenericLayout';
import Heading from '../../components/typography/Heading';
import Paragraph from '../../components/typography/Paragraph';
import TextLink from '../../components/typography/TextLink';
import ToolFilter from '../../context/ToolFilterContext';

/**
 * @description The Tools Index page component.
 */
export default function ToolsIndex() {
  const description = 'Tools Dashboard for AsyncAPI Initiative';
  const image = '/img/social/tools-dashboard-card.webp';

  return (
    <div className='bg-white dark:bg-dark-background min-h-screen transition-colors duration-300'>
      <GenericLayout title='Tools' description={description} image={image}>
        <div className='px-4 sm:px-6 lg:px-8'>
          {/* Hero Section */}
          <div className='relative mt-16 mb-12 text-center overflow-hidden'>
            {/* Background decorative elements */}
            <div className='absolute inset-0 -z-10 overflow-hidden'>
              {/* Gradient orbs */}
              <div className='absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl'></div>
              <div className='absolute top-10 right-1/4 w-80 h-80 bg-secondary-500/10 dark:bg-secondary-500/5 rounded-full blur-3xl'></div>

              {/* Grid pattern */}
              <div className='absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]'></div>
            </div>

            {/* Content */}
            <div className='relative'>
              {/* Icon/Badge */}
              <div className='mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 border border-primary-200 dark:border-primary-800'>
                <svg
                  className='w-5 h-5 text-primary-600 dark:text-primary-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
                  />
                </svg>
                <span className='text-sm font-semibold text-gray-700 dark:text-gray-300'>Community Tools</span>
              </div>

              <div className='mb-8'>
                <Heading
                  level={HeadingLevel.h1}
                  typeStyle={HeadingTypeStyle.lg}
                  className='text-gray-900 dark:text-white mb-4 font-bold'
                >
                  AsyncAPI Tools Dashboard
                </Heading>
                <div className='w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full shadow-lg shadow-primary-500/50'></div>
              </div>

              <Paragraph className='mx-auto my-6 max-w-3xl text-gray-700 dark:text-gray-300 text-lg leading-relaxed px-4'>
                Discover various AsyncAPI tools to optimize your journey! These tools are made by the community, for the
                community. Have an AsyncAPI tool you want to be featured on this list? Then follow the procedure given
                in the{' '}
                <TextLink
                  href='https://github.com/asyncapi/community/blob/master/new-tool-documentation.md'
                  target='_blank'
                  className='text-gray-900 dark:text-white font-semibold hover:text-gray-600 dark:hover:text-gray-300 underline-offset-4 underline decoration-2 decoration-primary-500 dark:decoration-primary-400 transition-colors duration-200'
                >
                  Tool Documentation
                </TextLink>{' '}
                file, and show up your AsyncAPI Tool card in the website.
              </Paragraph>

              {/* Stats or Feature badges */}
              <div className='mt-10 flex flex-wrap justify-center gap-6 text-sm'>
                <div className='flex items-center gap-2 px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 backdrop-blur-sm'>
                  <svg className='w-5 h-5 text-green-600 dark:text-green-400' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                      fillRule='evenodd'
                      d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span className='font-medium text-gray-700 dark:text-gray-300'>Open Source</span>
                </div>
                <div className='flex items-center gap-2 px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 backdrop-blur-sm'>
                  <svg className='w-5 h-5 text-blue-600 dark:text-blue-400' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z' />
                  </svg>
                  <span className='font-medium text-gray-700 dark:text-gray-300'>Community Driven</span>
                </div>
                <div className='flex items-center gap-2 px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 backdrop-blur-sm'>
                  <svg className='w-5 h-5 text-purple-600 dark:text-purple-400' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                      fillRule='evenodd'
                      d='M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span className='font-medium text-gray-700 dark:text-gray-300'>Production Ready</span>
                </div>
              </div>
            </div>
          </div>

          <ToolFilter>
            <ToolsDashboard />
          </ToolFilter>
        </div>
      </GenericLayout>
    </div>
  );
}

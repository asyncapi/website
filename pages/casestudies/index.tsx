import Link from 'next/link';
import React, { useState } from 'react';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { ICaseStudies } from '@/types/post';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';

import Button from '../../components/buttons/Button';
import Container from '../../components/layout/Container';
import GenericLayout from '../../components/layout/GenericLayout';
import Heading from '../../components/typography/Heading';
import Paragraph from '../../components/typography/Paragraph';
import AdoptersList from '../../config/adopters.json';
import CaseStudiesList from '../../config/case-studies.json';

interface Resource {
  title: string;
  link: string;
}

interface Adopter {
  companyName: string;
  useCase: string;
  resources: Resource[];
}

const ITEMS_PER_PAGE = 5;

/**
 * @description Renders the Case Studies page with modern design and horizontal card carousel.
 */
export default function CaseStudies() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const adopters = AdoptersList as Adopter[];
  const totalPages = Math.ceil(adopters.length / ITEMS_PER_PAGE);

  const paginatedAdopters = adopters.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <GenericLayout
      title='Real Stories, Real Impact'
      description='Discover how leading companies use AsyncAPI to transform their API architecture, streamline development, and accelerate innovation.'
      image='/img/social/case-studies.webp'
      wide
    >
      {/* Hero Section */}
      <section className='relative bg-white dark:bg-dark-background py-12 sm:py-16 lg:py-20'>
        <Container wide>
          <div className='text-center max-w-4xl mx-auto'>
            <div className='inline-block mb-4'>
              <span className='bg-secondary-100 dark:bg-primary-500/20 text-secondary-600 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-semibold'>
                Case Studies
              </span>
            </div>

            <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.xl} className='mb-6'>
              Real Stories, Real Impact
            </Heading>

            <Paragraph className='text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto'>
              Discover how leading companies use AsyncAPI to transform their API architecture, streamline development,
              and accelerate innovation.
            </Paragraph>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Button
                text='Explore Case Studies'
                href='#case-studies'
                className='w-full sm:w-auto bg-primary-500 hover:bg-primary-600 text-white'
              />
              <Button
                text='Explore Use Cases'
                href='#use-cases'
                className='w-full sm:w-auto bg-transparent border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-50 hover:bg-secondary-500/10'
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Case Studies Cards - Horizontal Carousel */}
      <section id='case-studies' className='bg-secondary-100 rounded-lg dark:bg-dark-card py-12 sm:py-16 lg:py-20'>
        <Container wide>
          <div className='relative px-12'>
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={{
                prevEl: '.featured-swiper-button-prev',
                nextEl: '.featured-swiper-button-next'
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20
                }
              }}
              className='featured-case-studies-swiper'
            >
              {(CaseStudiesList as ICaseStudies).map((study, index) => (
                <SwiperSlide key={index}>
                  <Link href={`/casestudies/${study.id}`} className='group block h-full'>
                    <div className='h-full bg-white dark:bg-dark-background border border-gray-200 dark:border-gray-700 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-[320px] flex flex-col'>
                      {/* Company Logo */}
                      <div className='flex items-center justify-center h-24 mb-8'>
                        <img
                          src={study.company.logo}
                          alt={study.company.name}
                          className='max-h-20 max-w-full object-contain'
                        />
                      </div>

                      {/* Description */}
                      <Paragraph className='text-gray-600 dark:text-gray-400 text-sm mb-8 line-clamp-4 flex-1'>
                        {study.company.description}
                      </Paragraph>

                      {/* CTA Button */}
                      <Button
                        text='Read case study →'
                        className='w-full bg-primary-500 hover:bg-primary-600 text-white group-hover:bg-primary-600'
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons - Only show on mobile/tablet when needed */}
            <button
              className='featured-swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 flex lg:hidden items-center justify-center text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed'
              aria-label='Previous slide'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={3}
                stroke='currentColor'
                className='w-8 h-8'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </button>
            <button
              className='featured-swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 z-10 flex lg:hidden items-center justify-center text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed'
              aria-label='Next slide'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={3}
                stroke='currentColor'
                className='w-8 h-8'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </Container>
      </section>

      {/* Trusted by Industry Leaders - Table Layout */}
      <section id='use-cases' className='bg-white dark:bg-dark-background py-12 sm:py-16'>
        <Container wide>
          <div className='text-center mb-8'>
            <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.lg} className='mb-4'>
              Trusted by Industry Leaders
            </Heading>
            <Paragraph className='text-gray-700 dark:text-gray-400 max-w-3xl mx-auto'>
              See how different companies leverage AsyncAPI to solve complex integration challenges and drive digital
              transformation.
            </Paragraph>
          </div>

          {/* Table Header - Hidden on mobile, visible on tablet+ */}
          <div className='hidden sm:block bg-primary-100 dark:bg-primary-500/60 rounded-t-xl px-6 py-4'>
            <div className='grid grid-cols-12 gap-4'>
              <div className='col-span-12 sm:col-span-2'>
                <Heading
                  level={HeadingLevel.h6}
                  typeStyle={HeadingTypeStyle.xs}
                  className='text-gray-700 dark:text-gray-300 font-semibold'
                >
                  Company
                </Heading>
              </div>
              <div className='col-span-12 sm:col-span-7'>
                <Heading
                  level={HeadingLevel.h6}
                  typeStyle={HeadingTypeStyle.xs}
                  className='text-gray-700 dark:text-gray-300 font-semibold'
                >
                  Use Case
                </Heading>
              </div>
              <div className='col-span-12 sm:col-span-3 text-left sm:text-center'>
                <Heading
                  level={HeadingLevel.h6}
                  typeStyle={HeadingTypeStyle.xs}
                  className='text-gray-700 dark:text-gray-300 font-semibold'
                >
                  Resources
                </Heading>
              </div>
            </div>
          </div>

          {/* Table Rows */}
          <div className='space-y-4 mt-4'>
            {paginatedAdopters.map((adopter, index) => (
              <div
                key={index}
                className='border-2 border-primary-500/50 dark:border-primary-500/50 rounded-xl px-6 py-6 bg-white dark:bg-dark-card transition-all duration-300 hover:border-primary-500 dark:hover:border-primary-400 hover:shadow-2xl hover:-translate-y-1 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 cursor-pointer'
              >
                <div className='grid grid-cols-12 gap-4 items-center'>
                  {/* Company Name */}
                  <div className='col-span-12 sm:col-span-2'>
                    <Heading
                      level={HeadingLevel.h6}
                      typeStyle={HeadingTypeStyle.xs}
                      className='font-semibold text-gray-900 dark:text-white'
                    >
                      {adopter.companyName}
                    </Heading>
                  </div>

                  {/* Use Case */}
                  <div className='col-span-12 sm:col-span-7'>
                    <Paragraph className='text-sm text-gray-700 dark:text-gray-400'>{adopter.useCase}</Paragraph>
                  </div>

                  {/* Resources Button */}
                  <div className='col-span-12 sm:col-span-3 flex justify-start sm:justify-center'>
                    <Link href={adopter.resources[0]?.link || '#'} target='_blank' rel='noopener noreferrer'>
                      <Button
                        text='Learn More'
                        className='bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 w-full sm:w-auto'
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2 mt-6'>
              {/* Page Navigation Buttons */}
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className='px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
                  aria-label='Previous page'
                >
                  ‹
                </button>

                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;

                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === pageNum
                          ? 'bg-primary-500 text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {totalPages > 5 && <span className='px-2 text-gray-600 dark:text-gray-400'>...</span>}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className='px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
                  aria-label='Next page'
                >
                  ›
                </button>
              </div>

              {/* Go to Page Dropdown - Custom dropdown that opens downward */}
              <div className='relative flex items-center gap-2 sm:ml-4'>
                <span className='text-sm text-gray-600 dark:text-gray-400'>Go to page</span>
                <div className='relative'>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                    className='px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm min-w-[60px] text-left flex items-center justify-between gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
                    aria-label='Select page'
                  >
                    {currentPage}
                    <svg
                      className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                    </svg>
                  </button>

                  {/* Dropdown Menu - Opens downward */}
                  {isDropdownOpen && (
                    <div className='absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto z-50'>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => {
                            setCurrentPage(page);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                            currentPage === page
                              ? 'bg-primary-500 text-white hover:bg-primary-600'
                              : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* CTA Section with Gradient */}
      <section
        className='relative overflow-hidden py-12 sm:py-16 rounded-xl mx-4 sm:mx-6 lg:mx-8 mb-12'
        style={{ background: 'linear-gradient(90deg, #8B5CF6 0%, #7C3AED 50%, #22D3EE 100%)' }}
      >
        <Container wide className='relative z-10'>
          <div className='text-center max-w-3xl mx-auto'>
            <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.lg} className='text-white mb-6'>
              Ready to Share Your Success Story?
            </Heading>

            <Paragraph className='text-white/90 text-lg mb-8'>
              Join the growing community of companies transforming their API architecture with AsyncAPI.
            </Paragraph>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                text='Share Your Case'
                href='https://github.com/asyncapi/website/blob/master/README.md#case-studies'
                target='_blank'
                className='w-full sm:w-auto bg-white text-primary-600 hover:bg-gray-100'
              />
              <Button
                text='Join Our Community'
                href='https://asyncapi.slack.com/join/shared_invite/zt-3clk6rmc0-Cujl2fChHYnHDUwFKRlQCw'
                className='w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/10'
              />
            </div>
          </div>
        </Container>
      </section>
    </GenericLayout>
  );
}

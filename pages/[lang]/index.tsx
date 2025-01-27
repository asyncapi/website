import { useTranslation } from 'next-i18next';
import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { getStaticPaths, makeStaticProps } from '@/utils/getStatic';

import Button from '../../components/buttons/Button';
import GoogleCalendarButton from '../../components/buttons/GoogleCalendarButton';
import ICSFileButton from '../../components/buttons/ICSFileButton';
import Head from '../../components/Head';
import Hero from '../../components/Hero';
import Container from '../../components/layout/Container';
import Slack from '../../components/slack';
import GoldSponsors from '../../components/sponsors/GoldSponsors';
import PlatinumSponsors from '../../components/sponsors/PlatinumSponsors';
import SilverSponsors from '../../components/sponsors/SilverSponsors';
import SupportUs from '../../components/SupportUs/SupportUs';
import Heading from '../../components/typography/Heading';
import Paragraph from '../../components/typography/Paragraph';

const getStaticProps = makeStaticProps(['landing-page', 'footer', 'common']);

export { getStaticPaths, getStaticProps };

/**
 * @description The HomePage is the landing page of the website.
 */
export default function HomePage() {
  const { t } = useTranslation('landing-page');

  return (
    <>
      <Head title='AsyncAPI Initiative for event-driven APIs' />
      <main id='main-content' className='scroll-mt-5'>
        <div className='flex w-screen items-center justify-center bg-blue-100 py-2'>
          <img className='mr-4 h-8 w-auto' src='/img/logos/LFX.svg' alt='Linux Foundation' />
          <span className='font-semibold'>{t('main.linuxFoundation_txt')}</span>
        </div>
        <Container wide>
          <Hero className='mb-24' />
        </Container>

        <Container className='py-12 text-left' wide as='section'>
          <div className='flex flex-col gap-8 px-4 lg:flex-row lg:gap-12 lg:px-0'>
            <div className='text-center lg:w-1/2 lg:text-left'>
              <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.lg} className='mb-4'>
                {t('community.title')}
              </Heading>
              <Paragraph className='mx-auto mt-2 text-left md:w-2/3 lg:mx-0'>{t('community.subtitle')}</Paragraph>
              <div className='mt-5 flex justify-center lg:justify-start'>
                <Button className='w-full md:w-auto' text={t('community.slackCTABtn')} href='/slack-invite' />
              </div>
            </div>

            <div className='mt-10 w-full lg:mt-0 lg:w-1/2'>
              <Slack />
            </div>
          </div>

          <Container className='mt-20 text-center' wide>
            <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.lg}>
              {t('community.meetingTitle')}
            </Heading>
            <Paragraph className='mt-4 lg:mx-36'>{t('community.meetingDesc')}</Paragraph>
            <div className='mt-4 flex flex-col items-center justify-center gap-2 md:flex-row'>
              <GoogleCalendarButton
                className='bg-primary-500 text-white hover:bg-primary-400'
                href='https://calendar.google.com/calendar/u/3?cid=Y19xOXRzZWlnbG9tZHNqNm5qdWh2YnB0czExY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t'
              />
              <h1 className='m-2'>OR</h1>
              <ICSFileButton
                href='https://calendar.google.com/calendar/ical/c_q9tseiglomdsj6njuhvbpts11c%40group.calendar.google.com/public/basic.ics'
                className='block border border-blue-500 bg-white text-blue-500 hover:bg-white md:w-auto'
              />
            </div>
          </Container>
        </Container>

        <section className='pb-20' role='contentinfo' aria-label='Our Sponsors'>
          <Container className='pb-6 text-center' wide as='section'>
            <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.lg} className='mb-4'>
              {t('sponsors.platinumTitle')}
            </Heading>
            <PlatinumSponsors className='mt-4' showSupportBanner={false} />
          </Container>

          <Container className='pb-6 text-center' wide as='section'>
            <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.lg} className='mb-4'>
              {t('sponsors.goldTitle')}
            </Heading>
            <GoldSponsors className='mt-4' showSupportBanner={false} />
          </Container>

          <Container className='pyb-6 text-center' wide as='section'>
            <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.lg} className='mb-4'>
              {t('sponsors.silverTitle')}
            </Heading>
            <SilverSponsors className='mt-4' showSupportBanner={false} />
          </Container>
          <SupportUs />
        </section>
      </main>
    </>
  );
}

/**
 * @description This function generates all language slugs for the landing page.
 * @returns {object} The paths object containing all language slugs.
 */

import { useTranslation } from 'next-i18next';
import React from 'react';

import LinuxBanner from '@/components/campaigns/LinuxBanner';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { getStaticPaths, makeStaticProps } from '@/utils/getStatic';

import Button from '../../components/buttons/Button';
import GoogleCalendarButton from '../../components/buttons/GoogleCalendarButton';
import ICSFileButton from '../../components/buttons/ICSFileButton';
import Head from '../../components/Head';
import Hero from '../../components/Hero';
import Container from '../../components/layout/Container';
import NewsletterSubscribe from '../../components/NewsletterSubscribe';
import GoldSponsors from '../../components/sponsors/GoldSponsors';
import PlatinumSponsors from '../../components/sponsors/PlatinumSponsors';
import SilverSponsors from '../../components/sponsors/SilverSponsors';
import SupportUs from '../../components/SupportUs/SupportUs';
import Heading from '../../components/typography/Heading';
import Paragraph from '../../components/typography/Paragraph';
import TextLink from '../../components/typography/TextLink';

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
        <LinuxBanner className='mt-[1px] pt-2 lg:py-1 ' />
        <Container wide>
          <Hero className='mb-24' />
        </Container>

        <div className='mt-8 dark:bg-dark-card bg-dark py-12'>
          <Container wide as='section'>
            <NewsletterSubscribe dark />
          </Container>
        </div>

        <Container className='py-12 text-left' wide as='section'>
          <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.lg} className='mb-4'>
            {t('community.title')}
          </Heading>
          <Paragraph className='mt-2 text-left md:mx-auto dark:text-dark-text '>{t('community.subtitle')}</Paragraph>
          <div className='mt-5 flex justify-center lg:justify-start'>
            <Button className='w-full px-40 md:w-auto' text={t('community.slackCTABtn')} href='/slack-invite' />
          </div>
          <div className='mt-8'>
            <img src="/img/social/slack.webp" alt="Community Slack" className='rounded-lg shadow-md' />
          </div>
        </Container>

        <Container className='mt-8 pb-20 text-center' wide as='section'>
          <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.lg} className='mb-4'>
            {t('events.title')}
          </Heading>
          <Paragraph className='mx-auto mt-2 dark:text-dark-text  max-w-prose'>{t('events.description')}</Paragraph>
          <Paragraph className='mx-auto mb-6 underline text-sky-400 max-w-prose'>{t('events.meetingTitle')}</Paragraph>
          <div className='flex flex-col items-center justify-center gap-2 md:flex-row'>
            <GoogleCalendarButton
              href='https://calendar.google.com/calendar/u/3?cid=Y19xOXRzZWlnbG9tZHNqNm5qdWh2YnB0czExY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t'
              className='mt-2 md:ml-2 md:mt-0'
            />
            <ICSFileButton
              href='https://calendar.google.com/calendar/ical/c_q9tseiglomdsj6njuhvbpts11c%40group.calendar.google.com/public/basic.ics'
              className='mt-2 md:ml-2 md:mt-0'
            />
          </div>
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

          <Container className='py-6 text-center' wide as='section'>
            <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.mdSemibold} className='mb-4'>
              {t('sponsors.sponsorCTATitle')}
            </Heading>
            <Paragraph className='mt-2 dark:text-dark-text md:mx-auto md:w-1/2'>
              {t('sponsors.sponsorCTADesc')}
              <TextLink href='https://opencollective.com/asyncapi' target='_blank'>
                {t('sponsors.sponsorCTALink')}
              </TextLink>
            </Paragraph>
          </Container>
        </section>
        <Container className='py-6 pb-20 text-center' wide>
          <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.lg} className='mb-4'>
            {t('sponsors.supportedByTitle')}
          </Heading>
          <Paragraph className='mx-auto mt-3 max-w-2xl pb-4 dark:text-dark-text sm:mt-4'>
            {t('sponsors.supportedByPretext')}
            <TextLink href='mailto:info@asyncapi.io' target='_blank'>
              {t('sponsors.supportedByLink')}
            </TextLink>{' '}
            {t('sponsors.supportedByPosttext')}
          </Paragraph>
          <SupportUs className='mt-4' showSupportBanner={false} />
        </Container>
      </main>
    </>
  );
}

/**
 * @description This function generates all language slugs for the landing page.
 * @returns {object} The paths object containing all language slugs.
 */

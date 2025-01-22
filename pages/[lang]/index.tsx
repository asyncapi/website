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
import SilverSponsors from '../../components/sponsors/SilverSponsors';
import Sponsors from '../../components/sponsors/Sponsors';
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
      <Head title="AsyncAPI Initiative for event-driven APIs" />
      <main id="main-content" className="scroll-mt-5">
        <div className="w-screen bg-blue-100 flex justify-center items-center py-2">
          <img
            className="h-8 w-auto mr-4"
            src="/img/logos/LFX.svg"
            alt="Linux Foundation"
          />
          <span className="font-semibold">Part of the Linux Foundation</span>
        </div>
        <Container wide>
          <Hero className="mb-24" />
        </Container>

        <Container className="py-12 text-left" wide as="section">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-4 lg:px-0">
            <div className="lg:w-1/2 text-center lg:text-left">
              <Heading
                level={HeadingLevel.h3}
                typeStyle={HeadingTypeStyle.lg}
                className="mb-4"
              >
                {t('community.title')}
              </Heading>
              <Paragraph className="text-left mt-2 md:w-2/3 mx-auto lg:mx-0">
                {t('community.subtitle')}
              </Paragraph>
              <div className="mt-5 flex justify-center lg:justify-start">
                <Button
                  className="w-full md:w-auto"
                  text={t('community.slackCTABtn')}
                  href="/slack-invite"
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
              <Slack />
            </div>
          </div>

          <Container className="text-center mt-20" wide>
            <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.lg}>
              {t('community.meetingTitle')}
            </Heading>
            <Paragraph className="mt-4 lg:mx-36">
              {t('community.meetingDesc')}
            </Paragraph>
            <div className="flex flex-col items-center justify-center gap-2 md:flex-row mt-4">
              <GoogleCalendarButton
                className="bg-primary-500 hover:bg-primary-400 text-white"
                href="https://calendar.google.com/calendar/u/3?cid=Y19xOXRzZWlnbG9tZHNqNm5qdWh2YnB0czExY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
              />
              <h1 className="m-2">OR</h1>
              <ICSFileButton
                href="https://calendar.google.com/calendar/ical/c_q9tseiglomdsj6njuhvbpts11c%40group.calendar.google.com/public/basic.ics"
                className="block md:w-auto bg-white text-blue-500 border border-blue-500 hover:bg-white"
              />
            </div>
          </Container>
        </Container>

        <section className="pb-20" role="contentinfo" aria-label="Our Sponsors">
          <Container className="pb-6 text-center" wide as="section">
            <Heading
              level={HeadingLevel.h3}
              typeStyle={HeadingTypeStyle.lg}
              className="mb-4"
            >
              {t('sponsors.platinumTitle')}
            </Heading>
            <Sponsors className="mt-4" showSupportBanner={false} />
          </Container>

          <Container className="pb-6 text-center" wide as="section">
            <Heading
              level={HeadingLevel.h3}
              typeStyle={HeadingTypeStyle.lg}
              className="mb-4"
            >
              {t('sponsors.goldTitle')}
            </Heading>
            <GoldSponsors className="mt-4" showSupportBanner={false} />
          </Container>

          <Container className="pyb-6 text-center" wide as="section">
            <Heading
              level={HeadingLevel.h3}
              typeStyle={HeadingTypeStyle.lg}
              className="mb-4"
            >
              {t('sponsors.silverTitle')}
            </Heading>
            <SilverSponsors className="mt-4" showSupportBanner={false} />
          </Container>
        </section>
      </main>
    </>
  );
}

/**
 * @description This function generates all language slugs for the landing page.
 * @returns {object} The paths object containing all language slugs.
 */

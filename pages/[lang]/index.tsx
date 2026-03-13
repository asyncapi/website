import { useTranslation } from 'next-i18next';
import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { getStaticPaths, makeStaticProps } from '@/utils/getStatic';

import Button from '../../components/buttons/Button';
import GoogleCalendarButton from '../../components/buttons/GoogleCalendarButton';
import ICSFileButton from '../../components/buttons/ICSFileButton';
import SubscribeButton from '../../components/buttons/SubscribeButton';
import Calendar from '../../components/Calendar';
import Head from '../../components/Head';
import Hero from '../../components/Hero';
import Container from '../../components/layout/Container';
import AdidasLogo from '../../components/logos/Adidas';
import AxwayLogo from '../../components/logos/Axway';
import SalesforceLogo from '../../components/logos/Salesforce';
import SapLogo from '../../components/logos/SAP';
import SlackLogo from '../../components/logos/Slack';
import NewsletterSubscribe from '../../components/NewsletterSubscribe';
import NewsroomSection from '../../components/newsroom/NewsroomSection';
import Slack from '../../components/slack';
import GoldSponsors from '../../components/sponsors/GoldSponsors';
import PlatinumSponsors from '../../components/sponsors/PlatinumSponsors';
import SilverSponsors from '../../components/sponsors/SilverSponsors';
import SupportUs from '../../components/SupportUs/SupportUs';
import Testimonial from '../../components/Testimonial';
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
      <main id='main-content' className='scroll-mt-5 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_24%,#eef6ff_100%)]'>
        <Container className='pt-6 md:pt-10' wide>
          <Hero className='mb-24' />
        </Container>

        <Container className='pb-16 text-center' wide as='section'>
          <div className='rounded-[2rem] border border-slate-200 bg-white px-6 py-10 shadow-sm md:px-10'>
            <div className='mx-auto max-w-3xl'>
              <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.lg} className='mb-4'>
                {t('adopters.title')}
              </Heading>
              <Paragraph className='mb-12 mt-2 text-slate-600 md:mx-auto md:w-2/3'>
                {t('adopters.description')}
                <TextLink href='https://github.com/asyncapi/website/issues/new' target='_blank'>
                  {t('adopters.linkText')}
                </TextLink>
              </Paragraph>
            </div>
            <ul className='grid items-center gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-5'>
              <li className='flex justify-center rounded-2xl border border-slate-100 bg-slate-50 px-6 py-8'>
                <AdidasLogo className='h-8 text-gray-400 hover:text-black' />
              </li>
              <li className='flex justify-center rounded-2xl border border-slate-100 bg-slate-50 px-6 py-8'>
                <AxwayLogo className='group h-14 text-gray-400 hover:text-black' />
              </li>
              <li className='flex justify-center rounded-2xl border border-slate-100 bg-slate-50 px-6 py-8'>
                <SlackLogo className='group h-10 text-gray-400 hover:text-black' />
              </li>
              <li className='flex justify-center rounded-2xl border border-slate-100 bg-slate-50 px-6 py-8'>
                <SalesforceLogo className='h-16 text-gray-400 hover:text-black' />
              </li>
              <li className='flex justify-center rounded-2xl border border-slate-100 bg-slate-50 px-6 py-8'>
                <SapLogo className='h-12 text-gray-400 hover:text-black' />
              </li>
            </ul>
          </div>
        </Container>

        <div className='mt-2 bg-slate-950 py-12'>
          <Container wide as='section'>
            <NewsletterSubscribe dark />
          </Container>
        </div>

        <Container className='py-12 text-center' wide as='section'>
          <div className='rounded-[2rem] bg-white/80 px-6 py-10 shadow-sm ring-1 ring-slate-200/80 backdrop-blur md:px-10'>
            <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.lg} className='mb-4'>
              {t('community.title')}
            </Heading>
            <Paragraph className='mx-auto mt-2 max-w-2xl text-slate-600'>{t('community.subtitle')}</Paragraph>
            <div className='py-2 lg:py-12'>
              <Container wide>
                <div className='items-center rounded-[1.75rem] bg-slate-50 px-6 py-8 lg:flex'>
                  <div className='mt-10 lg:mt-0 lg:w-1/2'>
                    <Slack />
                  </div>
                  <section className='lg:ml-12 lg:w-1/2 lg:max-w-xl lg:text-left'>
                    <div className='mt-5'>
                      <Heading level={HeadingLevel.h4} typeStyle={HeadingTypeStyle.mdSemibold}>
                        {t('community.slackCTATitle')}
                      </Heading>
                      <Paragraph className='mt-2 text-slate-600'>{t('community.slackCTADesc')}</Paragraph>
                    </div>
                    <div className='mt-5 flex justify-center lg:justify-start'>
                      <Button className='w-full md:w-auto' text={t('community.slackCTABtn')} href='/slack-invite' />
                    </div>
                  </section>
                </div>

                <div className='mt-12 items-center rounded-[1.75rem] bg-slate-50 px-6 py-8 lg:flex lg:flex-row-reverse'>
                  <section className='mt-10 lg:mt-0 lg:flex-1'>
                    <Calendar size={2} />
                  </section>
                  <section className='lg:mr-12 lg:max-w-xl lg:text-left'>
                    <div className='mt-5 lg:mr-12'>
                      <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.mdSemibold}>
                        {t('community.meetingTitle')}
                      </Heading>
                      <Paragraph className='mt-2 text-slate-600'>
                        {t('community.meetingDesc')}
                        <TextLink href='/community/meetings'>{t('community.meetingLink')}</TextLink>
                      </Paragraph>
                      <ul className='mt-5 justify-center md:flex'>
                        <li>
                          <GoogleCalendarButton href='https://calendar.google.com/calendar/u/3?cid=Y19xOXRzZWlnbG9tZHNqNm5qdWh2YnB0czExY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t' />
                        </li>
                        <li>
                          <SubscribeButton href='/community/meetings' className='mt-2 md:ml-2 md:mt-0' />
                        </li>
                        <li>
                          <ICSFileButton
                            href='https://calendar.google.com/calendar/ical/c_q9tseiglomdsj6njuhvbpts11c%40group.calendar.google.com/public/basic.ics'
                            className='mt-2 md:ml-2 md:mt-0'
                          />
                        </li>
                      </ul>
                    </div>
                  </section>
                </div>
              </Container>
              <Container wide>
                <NewsroomSection />
              </Container>
            </div>
          </div>
        </Container>

        <section className='pb-20' role='contentinfo' aria-label='Our Sponsors'>
          <Container
            className='rounded-[2rem] border border-slate-200 bg-white px-6 py-10 text-center shadow-sm md:px-10'
            wide
            as='section'
          >
            <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.lg} className='mb-4'>
              {t('sponsors.platinumTitle')}
            </Heading>
            <PlatinumSponsors className='mt-4' showSupportBanner={false} />
            <div className='mt-10 border-t border-slate-200 pt-10'>
              <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.lg} className='mb-4'>
                {t('sponsors.goldTitle')}
              </Heading>
              <GoldSponsors className='mt-4' showSupportBanner={false} />
            </div>
            <div className='mt-10 border-t border-slate-200 pt-10'>
              <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.lg} className='mb-4'>
                {t('sponsors.silverTitle')}
              </Heading>
              <SilverSponsors className='mt-4' showSupportBanner={false} />
            </div>
            <div className='mt-10 border-t border-slate-200 pt-10'>
              <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.mdSemibold} className='mb-4'>
                {t('sponsors.sponsorCTATitle')}
              </Heading>
              <Paragraph className='mt-2 text-slate-600 md:mx-auto md:w-1/2'>
                {t('sponsors.sponsorCTADesc')}
                <TextLink href='https://opencollective.com/asyncapi' target='_blank'>
                  {t('sponsors.sponsorCTALink')}
                </TextLink>
              </Paragraph>
            </div>
          </Container>
        </section>
        <Container className='pb-20 text-center' wide>
          <div className='rounded-[2rem] bg-slate-950 px-6 py-10 text-white shadow-[0_24px_60px_rgba(15,23,42,0.24)] md:px-10'>
            <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.lg} className='mb-4'>
              {t('sponsors.supportedByTitle')}
            </Heading>
            <Paragraph className='mx-auto mt-3 max-w-2xl pb-4 text-slate-300 sm:mt-4'>
              {t('sponsors.supportedByPretext')}
              <TextLink href='mailto:info@asyncapi.io' target='_blank'>
                {t('sponsors.supportedByLink')}
              </TextLink>{' '}
              {t('sponsors.supportedByPosttext')}
            </Paragraph>
            <SupportUs className='mt-4' showSupportBanner={false} />
          </div>
        </Container>
        <Container className='mt-2 pb-20 text-center' wide as='section'>
          <div className='rounded-[2rem] border border-slate-200 bg-white px-6 py-10 shadow-sm md:px-10'>
            <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.lg} className='mb-4'>
              {t('testimonials.title')}
            </Heading>
            <ul className='mx-auto max-w-screen-xl gap-y-8 md:grid md:grid-cols-2 md:px-6 lg:px-8'>
              <Testimonial
                className='md:pr-10 lg:pr-16'
                text='Microservices underline the need for event-based communication in distributed architectures. AsyncAPI brings the richness of the REST API ecosystem to asynchronous APIs.'
                authorAvatar='/img/testimonials/matt-mclarty.jpg'
                authorName='Matt McLarty'
                authorDescription='Global Leader of API Strategy at MuleSoft'
              />
              <Testimonial
                className='md:pl-10 lg:pl-16'
                text='Event-driven APIs need love too! AsyncAPI brings the many benefits of a machine/human-readable specification to these nuanced approaches.'
                authorAvatar='/img/testimonials/bill-doerrfeld.jpg'
                authorName='Bill Doerrfeld'
                authorDescription='Editor in Chief at Nordic APIs'
              />
              <Testimonial
                className='md:pr-10 lg:pr-16'
                text="Developers need to be able to quickly and consistently create event-driven applications that provide business value and react to customer needs in realtime. I can't count how many times I've heard developers ask for OpenAPI/Swagger style tools for the asynchronous and event-driven world, and that is exactly what the AsyncAPI initiative is making a reality."
                authorAvatar='/img/testimonials/jonathan-schabowsky.jpg'
                authorName='Jonathan Schabowsky'
                authorDescription='Sr. Architect, Office of the CTO at Solace'
              />
              <Testimonial
                className='md:pl-10 lg:pl-16'
                text='We’ve been focusing on event-driven APIs since 2014 and thank the AsyncAPI contributors every day for driving the community towards common standards.'
                authorAvatar='/img/testimonials/eric-horesnyi.jpg'
                authorName='Eric Horesnyi'
                authorDescription='CEO at Streamdata.io'
              />
            </ul>
          </div>
        </Container>
      </main>
    </>
  );
}

/**
 * @description This function generates all language slugs for the landing page.
 * @returns {object} The paths object containing all language slugs.
 */

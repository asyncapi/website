import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';

import { useTranslation } from '../utils/i18n';
import Button from './buttons/Button';
import AnnouncementHero from './campaigns/AnnouncementHero';
import DemoAnimation from './DemoAnimation';
import Features from './features';
import ArrowRight from './icons/ArrowRight';
import DiamondSponsors from './sponsors/DiamondSponsors';
import Heading from './typography/Heading';

interface HeroProps {
  className?: string;
}

/**
 * @description This component displays the hero section on the Home page.
 *
 * @param {HeroProps} props - The props for Hero Component.
 * @param {string} props.className - Additional CSS classes for styling.
 */
export default function Hero({ className = '' }: HeroProps) {
  const { t } = useTranslation('landing-page');

  return (
    <>
      <AnnouncementHero className='my-4' />
      <header className={`mt-12 px-2 ${className}`}>
        <div className='text-center'>
          <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.xxl} className='mb-4'>
            {t('main.header')} <span className='block md:-mt-4'> {t('main.subHeader')}</span>
            <span className='block md:-mt-4'>{t('main.extraSubHeader')}</span>
          </Heading>

          <Heading
            level={HeadingLevel.h2}
            typeStyle={HeadingTypeStyle.bodyLlg}
            textColor='text-gray-700 dark:text-dark-text'
            className='mx-auto mb-10 max-w-4xl'
          >
            {t('main.body_pretext')} <strong>{t('main.body_boldtext')}</strong>
            {t('main.body_posttext')}
          </Heading>
          <div className='flex flex-col items-center justify-center gap-2 md:flex-row'>
            <Button
              className='block w-full md:w-1/3 hover:bg-primary-600'
              text={t('main.community_btn')}
              href='https://www.asyncapi.com/slack-invite'
              target='_blank'
              rel='noopener noreferrer'
              icon={<ArrowRight className='-mb-1 size-5' />}
              data-testid='Hero-Button'
            />
          </div>

          <DiamondSponsors
            className={'w-full relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]'}
            showSupportBanner={false}
          />
        </div>
        <Features />
        <div className='mt-8 md:mt-16'>
          <DemoAnimation />
        </div>
      </header>
    </>
  );
}

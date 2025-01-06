import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import { useTranslation } from '../utils/i18n';
import AlgoliaSearch, { SearchButton } from './AlgoliaSearch'; // Import AlgoliaSearch component
import Button from './buttons/Button';
import AnnouncementHero from './campaigns/AnnouncementHero';
import DemoAnimation from './DemoAnimation';
import Features from './features';
import ArrowRight from './icons/ArrowRight';
import IconLoupe from './icons/Loupe';
import Heading from './typography/Heading';
import Paragraph from './typography/Paragraph';

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
          <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.xl} className='mb-4'>
            {t('main.header')} <span className='block md:-mt-4'> {t('main.subHeader')}</span>
          </Heading>
          <Heading
            level={HeadingLevel.h2}
            typeStyle={HeadingTypeStyle.bodyLg}
            textColor='text-gray-700'
            className='mx-auto mb-10 max-w-4xl'
          >
            {t('main.body_pretext')} <strong>{t('main.body_boldtext')}</strong>
            {t('main.body_posttext')}
          </Heading>
          <div className='flex flex-col items-center justify-center gap-2 md:flex-row'>
            <Button
              className='block w-full md:w-auto'
              text={t('main.docs_btn')}
              href='/docs'
              icon={<ArrowRight className='-mb-1 size-5' />}
              data-testid='Hero-Button'
            />
            {/* Wrap SearchButton with AlgoliaSearch component */}
            <AlgoliaSearch>
              <SearchButton className='flex w-full items-center space-x-3 rounded-md border border-secondary-500 bg-secondary-100 px-4 py-3 text-left text-secondary-500 shadow-md transition-all duration-500 ease-in-out hover:bg-secondary-500 hover:text-white md:w-auto'>
                {({ actionKey }) => (
                  <>
                    <IconLoupe />
                    <span className='flex-auto'>{t('main.search_btn')}</span>
                    {actionKey && (
                      <kbd className='font-sans font-semibold'>
                        <abbr title={actionKey.key} className='no-underline'>
                          {actionKey.shortKey}
                        </abbr>{' '}
                        K
                      </kbd>
                    )}
                  </>
                )}
              </SearchButton>
            </AlgoliaSearch>
          </div>
          <Paragraph typeStyle={ParagraphTypeStyle.sm} className='mt-4' textColor='text-gray-500'>
            {t('main.slogan_text')}{' '}
            <a className='underline' href='https://www.linuxfoundation.org/'>
              {t('main.slogan_link')}
            </a>
          </Paragraph>
        </div>
        <div className='mt-8 md:mt-16'>
          <DemoAnimation />
        </div>
        <Features />
      </header>
    </>
  );
}

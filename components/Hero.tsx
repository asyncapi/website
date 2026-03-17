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
      <header
        className={`relative overflow-hidden rounded-[2rem] bg-slate-950 px-4 pb-12 pt-8 text-white shadow-[0_32px_80px_rgba(15,23,42,0.28)] md:px-8 md:pb-16 md:pt-10 ${className}`}
      >
        <div className='absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.24),_transparent_48%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.20),_transparent_42%)]' />
        <div className='absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent' />
        <div className='relative grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center'>
          <div className='text-center lg:text-left'>
            <div className='inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100'>
              {t('main.heroBadge')}
            </div>
            <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.xl} className='mt-6 text-white'>
              {t('main.header')} <span className='block text-cyan-200 md:-mt-4'>{t('main.subHeader')}</span>
            </Heading>
            <Heading
              level={HeadingLevel.h2}
              typeStyle={HeadingTypeStyle.bodyLg}
              textColor='text-slate-200'
              className='mx-auto mb-10 mt-6 max-w-4xl lg:mx-0'
            >
              {t('main.body_pretext')} <strong className='text-white'>{t('main.body_boldtext')}</strong>
              {t('main.body_posttext')}
            </Heading>
            <div className='flex flex-col items-center justify-center gap-3 md:flex-row lg:justify-start'>
              <Button
                className='block w-full md:w-auto'
                text={t('main.docs_btn')}
                href='/docs'
                icon={<ArrowRight className='-mb-1 size-5' />}
                data-testid='Hero-Button'
              />
              <AlgoliaSearch>
                <SearchButton className='flex w-full items-center space-x-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-left text-white shadow-lg shadow-black/10 backdrop-blur-md transition-all duration-300 ease-in-out hover:border-cyan-300/40 hover:bg-white/15 md:w-auto'>
                  {({ actionKey }) => (
                    <>
                      <IconLoupe />
                      <span className='flex-auto'>{t('main.search_btn')}</span>
                      {actionKey && (
                        <kbd className='rounded-full border border-white/20 bg-white/10 px-2 py-1 font-sans text-xs font-semibold'>
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
            <Paragraph typeStyle={ParagraphTypeStyle.sm} className='mt-5' textColor='text-slate-300'>
              {t('main.slogan_text')}{' '}
              <a
                className='underline decoration-cyan-300/70 underline-offset-4'
                href='https://www.linuxfoundation.org/'
              >
                {t('main.slogan_link')}
              </a>
            </Paragraph>
          </div>
          <div className='relative'>
            <div className='absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 via-sky-500/10 to-transparent blur-2xl' />
            <div className='relative rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-sm'>
              <div className='mb-4 flex items-center justify-between rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300'>
                <span>{t('main.specSignalTitle')}</span>
                <span className='text-cyan-200'>{t('main.specSignalSubtitle')}</span>
              </div>
              <div className='grid gap-3 sm:grid-cols-3'>
                <div className='rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-left'>
                  <p className='text-xs uppercase tracking-[0.18em] text-slate-400'>{t('main.cards.standardize.label')}</p>
                  <p className='mt-3 text-2xl font-semibold text-white'>{t('main.cards.standardize.title')}</p>
                  <p className='mt-2 text-sm text-slate-300'>{t('main.cards.standardize.description')}</p>
                </div>
                <div className='rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-4 text-left'>
                  <p className='text-xs uppercase tracking-[0.18em] text-cyan-100'>{t('main.cards.generate.label')}</p>
                  <p className='mt-3 text-2xl font-semibold text-white'>{t('main.cards.generate.title')}</p>
                  <p className='mt-2 text-sm text-cyan-50'>{t('main.cards.generate.description')}</p>
                </div>
                <div className='rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-left'>
                  <p className='text-xs uppercase tracking-[0.18em] text-slate-400'>{t('main.cards.align.label')}</p>
                  <p className='mt-3 text-2xl font-semibold text-white'>{t('main.cards.align.title')}</p>
                  <p className='mt-2 text-sm text-slate-300'>{t('main.cards.align.description')}</p>
                </div>
              </div>
              <div className='mt-5 rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-3'>
                <DemoAnimation />
              </div>
            </div>
          </div>
        </div>
        <div className='relative mt-10 md:mt-14'>
          <Features />
        </div>
      </header>
    </>
  );
}

import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import { useTranslation } from '../../utils/i18n';
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';
import TextLink from '../typography/TextLink';
import { features } from './FeatureList';

/**
 * @description This component displays AsyncAPI Features in the Hero section of the Home page.
 */
export default function Features() {
  const { t } = useTranslation('landing-page');

  return (
    <section className='relative rounded-[2rem] border border-white/10 bg-white/95 px-4 py-12 text-slate-900 shadow-[0_24px_60px_rgba(15,23,42,0.14)] backdrop-blur md:px-8'>
      <div className='mx-auto max-w-md text-center sm:max-w-3xl lg:max-w-7xl'>
        <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.lg} className='mt-2'>
          {t('features.title')}
        </Heading>
        <Paragraph className='mx-auto mt-3 max-w-2xl text-slate-600'>{t('features.description')}</Paragraph>
        <div className='mt-12 text-left'>
          <ul className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3' data-testid='Feature-ul'>
            {features.map((feature) => (
              <li
                key={feature.id}
                className='flex flex-col justify-between rounded-[1.5rem] border border-slate-200 bg-white px-6 pb-8 pt-2 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl'
                data-testid='Feature-li'
              >
                <div>
                  <div className='mt-6 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    {feature.id.replace(/-/g, ' ')}
                  </div>
                  <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.mdSemibold} className='mt-6'>
                    {t(`features.${feature.id}.name`)}
                  </Heading>
                  {
                    <Paragraph typeStyle={ParagraphTypeStyle.md} className='mt-5 text-slate-600'>
                      {t(`features.${feature.id}.description`)}
                    </Paragraph>
                  }
                </div>
                <div className='flex flex-wrap gap-x-4'>
                  {feature.links.map((link) => (
                    <TextLink id={link.id} href={link.href} key={link.id} className='mt-6 inline-block font-semibold'>
                      {t(`features.${feature.id}.links.${link.id}`)}
                    </TextLink>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

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
    <section className='relative bg-white py-16'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.lg} className='mt-2'>
            {t('features.title')}
          </Heading>
          <Paragraph className='mx-auto mt-4 max-w-2xl text-gray-500'>{t('features.description')}</Paragraph>
        </div>
        <div className='mt-12'>
          <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3' data-testid='Feature-ul'>
            {features.map((feature) => (
              <li
                key={feature.id}
                className='rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl'
                data-testid='Feature-li'
              >
                <Heading level={HeadingLevel.h4} typeStyle={HeadingTypeStyle.mdSemibold} className='mb-4 text-gray-900'>
                  {t(`features.${feature.id}.name`)}
                </Heading>
                <Paragraph typeStyle={ParagraphTypeStyle.md} className='mt-4 text-gray-600'>
                  {t(`features.${feature.id}.description`)}
                </Paragraph>
                <div className='mt-6'>
                  <TextLink
                    id={feature.link.id}
                    href={feature.link.href}
                    key={feature.link.id}
                    className='font-large text-black no-underline hover:underline'
                  >
                    {t('features.read-more')}
                  </TextLink>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

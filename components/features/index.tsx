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
    <section className='relative bg-white pt-16'>
      <div className='mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8'>
        <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.lg} className='mt-2'>
          {t('features.title')}
        </Heading>
        <Paragraph className='mx-auto mt-2 max-w-prose'>{t('features.description')}</Paragraph>
        <div className='mt-12 text-left'>
          <ul className='grid  grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3' data-testid='Feature-ul'>
            {features.map((feature) => (
              <li
                key={feature.id}
                className='flex flex-col justify-between rounded-lg border border-gray-200 px-6 pb-8 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg'
                data-testid='Feature-li'
              >
                <div>
                  <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.mdSemibold} className='mt-8'>
                    {t(`features.${feature.id}.name`)}
                  </Heading>
                  {
                    <Paragraph typeStyle={ParagraphTypeStyle.md} className='mt-5'>
                      {t(`features.${feature.id}.description`)}
                    </Paragraph>
                  }
                </div>
                <div className='flex justify-between'>
                  {feature.links.map((link) => (
                    <TextLink id={link.id} href={link.href} key={link.id} className='mt-6 inline-block'>
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

import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import Button from '../buttons/Button';
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';

/**
 * @description Component representing the AsyncAPI Financial Summary.
 */
export default function AsyncAPISummary() {
  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='mx-4 my-8 grid lg:grid-cols-9 lg:gap-8 lg:text-center'>
        <div className='col-span-5 col-start-3'>
          <Heading level={HeadingLevel.h2} className='m-3 text-center text-5xl'>
            AsyncAPI Financial Summary
          </Heading>
          <Paragraph typeStyle={ParagraphTypeStyle.md} className='my-1 max-w-4xl text-darkGunMetal'>
            To help improve the current state of Event-Driven Architectures and their tooling, you can show your support
            for the AsyncAPI Initiative by making a financial contribution. We offer three donation options:{' '}
            <strong>Open Collective, GitHub Sponsors, and Linux Foundation Crowdfunding</strong>. Our expenses are
            managed through Open Collective and GitHub Sponsors, while Linux Foundation Crowdfunding operates
            separately.
          </Paragraph>
        </div>
      </div>
      <div className='mb-20 flex justify-center'>
        <Button
          text='Become a Sponsor'
          href='https://opencollective.com/asyncapi#category-CONTRIBUTE'
          target='_blank'
        />
      </div>
      <div className='mt-4 text-center text-sm'>
        <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.md} className='4xl'>
          Ways to Support Us?
        </Heading>
      </div>
      <div className='max-width my-4 text-center text-base text-darkGunMetal'>
        <Paragraph typeStyle={ParagraphTypeStyle.sm} className='my-4'>
          The easiest way to support AsyncAPI is by becoming a financial sponsor. While{' '}
          <br className='hidden lg:inline-block' />
          there are alternative options, they may involve greater effort. Contribute{' '}
          <br className='hidden lg:inline-block' />
          monetarily using the following channels.
        </Paragraph>
      </div>

      <div className='text-center'>
        <a href='https://opencollective.com/asyncapi' target='_blank'>
          <img
            className='mx-4 inline size-10 transition-transform hover:scale-110 active:scale-90'
            src='/img/logos/OpenCollective.svg'
            alt='Open Collective'
          />
        </a>
        <a
          href='https://crowdfunding.lfx.linuxfoundation.org/projects/445898e9-42a2-4965-9e0a-c2a714f381bc'
          target='_blank'
        >
          <img
            className='mx-4 inline size-10 transition-transform hover:scale-110 active:scale-90'
            src='/img/logos/LFX.svg'
            alt='Linux Foundation'
          />
        </a>
        <a href='https://github.com/sponsors/asyncapi' target='_blank'>
          <img
            className='mx-4 inline size-10 transition-transform hover:scale-110 active:scale-90'
            src='/img/logos/github-black.svg'
            alt='Github'
          />
        </a>
      </div>
    </div>
  );
}

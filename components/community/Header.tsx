import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';

import Button from '../buttons/Button';
import IconRocket from '../icons/Rocket';
import Heading from '../typography/Heading';

interface HeaderProps {
  className?: string;
}

/**
 * @description This component displays Header.
 * @param {HeaderProps} props - The props for Header component.
 * @param {string} props.className - Additional CSS classes for styling.
 */
export default function Header({ className = '' }: HeaderProps) {
  return (
    <div
      className={`mt-10 flex flex-col items-center justify-center text-center md:mt-0 ${className}`}
      data-testid='Header-hero-heading'
    >
      <Heading className='countdown-text-gradient font-bold' level={HeadingLevel.h6} typeStyle={HeadingTypeStyle.xs}>
        AsyncAPI Community
      </Heading>
      <div className='mt-10' data-testid='Header-heading-1'>
        <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.xl} className=''>
          <span className='title block leading-[3rem] md:-mt-1'>
            Welcome to the
            <br /> AsyncAPI Community
          </span>
        </Heading>
      </div>
      <div className='mt-5 w-5/6' data-testid='Header-heading-2'>
        <Heading
          level={HeadingLevel.h2}
          typeStyle={HeadingTypeStyle.bodyMd}
          textColor='text-gray-700'
          className='text-slate-500'
        >
          We&apos;re an OSS community that&apos;s passionate about AsyncAPI. Join us in building the future of Event
          Driven APIs by asking questions, sharing ideas, and building connections.
        </Heading>
      </div>
      <div className='mt-10'>
        <Button
          className='block focus:outline-none md:inline-block'
          text='AsyncAPI Discussions'
          href='https://github.com/orgs/asyncapi/discussions'
          target='_blank'
          icon={<IconRocket className='-mb-1 ml-1 size-5' data-testid='Header-IconRocket' />}
        />
      </div>
    </div>
  );
}

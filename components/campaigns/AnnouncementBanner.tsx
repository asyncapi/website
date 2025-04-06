import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import Button from '../buttons/Button';
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';
import AnnouncementRemainingDays from './AnnouncementRemainingDays';

interface BannerProps {
  title: string;
  dateLocation: string;
  cfaText: string;
  eventName: string;
  cfpDeadline: string;
  link: string;
  city: string;
  activeBanner: boolean;
  small: boolean;
  className: string;
}

/**
 * @description The banner to use for Announcement
 * @param {string} props.title - The title of the banner
 * @param {string} props.dateLocation - The date and location of the banner
 * @param {string} props.cfaText - The call for action text
 * @param {string} props.eventName - The name of the event
 * @param {string} props.cfpDeadline - The deadline for the call for speakers
 * @param {string} props.link - The link of the banner
 * @param {string} props.city - The city of the banner
 * @param {Boolean} props.activeBanner - Whether the banner is active
 * @param {Boolean} props.small - Whether the banner is small
 * @param {string} props.className - The class name of the banner
 */
export default function Banner({
  title,
  dateLocation,
  cfaText,
  eventName,
  cfpDeadline,
  link,
  city,
  activeBanner,
  small,
  className
}: BannerProps) {
  return (
    <div
      className={`size-full rounded border border-gray-200 bg-gray-50 py-6
          transition-transform${className} ${small ? 'mb-4' : 'mx-3 my-6 p-3'}
          ${activeBanner ? 'z-10 scale-100 opacity-100' : 'z-0 scale-90 opacity-0'}`}
      data-testid='AnnouncementHero-main-div'
    >
      <Heading className='countdown-text-gradient' level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.lg}>
        {title}
      </Heading>
      <Heading className='countdown-text-gradient' level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.md}>
        {city}
      </Heading>
      <Paragraph typeStyle={ParagraphTypeStyle.lg}>{dateLocation}</Paragraph>
      <AnnouncementRemainingDays dateTime={cfpDeadline} eventName={eventName} />
      <div className='mt-6 space-x-2 pb-2'>
        <Button href={link} target='_blank' text={cfaText} data-testid='AnnouncementHero-submit-session' />
      </div>
    </div>
  );
}

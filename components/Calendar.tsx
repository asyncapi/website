import moment from 'moment';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { IEvent } from '@/types/event';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';

import eventsData from '../config/meetings.json';
import { useTranslation } from '../utils/i18n';
import { getEvents } from '../utils/staticHelpers';
import GoogleCalendarButton from './buttons/GoogleCalendarButton';
import Heading from './typography/Heading';

interface ICalendarProps {
  className?: string;
  size: number;
  text?: string;
}

/**
 * @description A component that displays a list of upcoming events
 * @param {string} props.className - The class name for the component
 * @param {number} props.size - The number of events to display
 * @param {string} props.text - The text alignment for the component
 */
export default function Calendar({ className = '', size }: ICalendarProps) {
  const { t } = useTranslation('common');

  const CALENDAR_URL =
    'https://calendar.google.com/calendar/embed?src=c_q9tseiglomdsj6njuhvbpts11c%40group.calendar.google.com&ctz=UTC';
  const currentDate = new Date();
  const eventsExist = eventsData?.filter((event: IEvent) => moment(event.date).isAfter(currentDate)).length > 0;

  return (
    <div
      className={twMerge(
        'overflow-hidden rounded-md border border-gray-200 bg-white p-4 h-full flex flex-col gap-2',
        className
      )}
    >
      <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.mdSemibold}>
        {t('calendar.title')}
      </Heading>
      <ul>
        {getEvents(eventsData, size).map((event: IEvent, index: number) => (
          <li key={index} data-testid='Calendar-list-item'>
            <a href={event.url} className='mb-1 mt-2 flex grow flex-col items-start sm:flex-row sm:items-center'>
              <div className='inline-flex h-12 min-w-12 flex-row rounded-full bg-pink-500 font-bold text-white'>
                <span className='flex-1 self-center text-center'>{moment(event.date).format('D')}</span>
              </div>
              <div className='grow text-left sm:mt-0 sm:pl-6'>
                <h2 className='title-font font-medium text-gray-900 hover:text-gray-500'>{event.title}</h2>
                <p className='text-gray-600'>
                  {moment(event.date).local().format('LLLL')} UTC
                  {moment(event.date).local().format('Z')}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <div className='h-full content-center'>
        {!eventsExist && <div className='font-bold text-gray-700 lg:pb-8'>{t('calendar.noMeetingsMessage')}</div>}
        <div className='sm:pt-0 md:pt-2 lg:pb-8 lg:pt-0' data-testid='Calendar-button'>
          <GoogleCalendarButton href={CALENDAR_URL} text={t('calendar.viewCalendarBtn')} />
        </div>
      </div>
    </div>
  );
}

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
        'overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md p-2 sm:p-3 h-full flex flex-col gap-1',
        className,
      )}
    >
      <Heading
        level={HeadingLevel.h2}
        typeStyle={HeadingTypeStyle.mdSemibold}
        className="pl-1 sm:pl-3 border-b border-gray-100 text-left"
      >
        {t('calendar.title')}
      </Heading>
      <ul className="space-y-2 mt-2">
        {getEvents(eventsData, size).map((event: IEvent, index: number) => (
          <li key={index} data-testid="Calendar-list-item">
            <a
              href={event.url}
              className="group block rounded-lg p-2 sm:p-3 transition-all hover:bg-gray-50"
            >
              <div className="flex flex-row items-center space-x-3 sm:space-x-4">
                <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 rounded-lg bg-[#4284f3] font-bold text-white">
                  <span className="flex-1 self-center text-center text-xs sm:text-base">
                    {moment(event.date).format('D')}
                  </span>
                </div>
                <div className="flex-1 text-left">
                  <h2 className="text-sm sm:text-lg font-semibold text-gray-900 group-hover:text-[#4284f3] transition-colors">
                    {event.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 break-words">
                    {moment(event.date).local().format('LLLL')} UTC
                    {moment(event.date).local().format('Z')}
                  </p>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-2 sm:pt-3 border-t border-gray-100">
        {!eventsExist && (
          <div className="text-center sm:text-left text-gray-600 italic mb-2 sm:mb-4 px-2">
            {t('calendar.noMeetingsMessage')}
          </div>
        )}
        <div data-testid="Calendar-button">
          <GoogleCalendarButton
            href={CALENDAR_URL}
            text={t('calendar.viewCalendarBtn')}
            className="w-full justify-center"
          />
        </div>
      </div>
    </div>
  );
}

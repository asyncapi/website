import React from 'react';

import { getDaysDifference, getHoursDifference, getMinutesDifference, parseDate } from '../../utils/dateHelpers';

interface AnnouncementRemainingDaysProps {
  dateTime: string;
  eventName: string;
}

/**
 * @description The announcement remaining days
 * @param {string} props.dateTime - The date and time of the announcement
 * @param {string} props.eventName - The name of the event
 */
export default function AnnouncementRemainingDays({ dateTime, eventName }: AnnouncementRemainingDaysProps) {
  const date = parseDate(dateTime);
  const now = new Date();
  const days = getDaysDifference(date, now);
  const hours = getHoursDifference(date, now);
  const minutes = getMinutesDifference(date, now);

  let text = '';

  if (days >= 1) {
    text = `${days} ${days === 1 ? 'day' : 'days'}`;
  } else if (hours > 1) {
    text = 'A few hours';
  } else if (minutes > 1) {
    text = 'A few minutes';
  }

  return (
    <span className='countdown-text-gradient block font-extrabold' data-testid='AnnouncementRemainingDays-text'>
      {text} until {eventName}
    </span>
  );
}

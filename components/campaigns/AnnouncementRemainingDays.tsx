import moment from 'moment';

interface IAnnouncementRemainingDaysProps {
  dateTime: string;
  eventName: string;
}

/**
 * @param {String} props.dateTime - The date and time of the event
 * @param {String} props.eventName - The name of the event
 */
export default function AnnouncementRemainingDays({ dateTime, eventName }: IAnnouncementRemainingDaysProps) {
  const date = moment(dateTime);
  const now = moment();
  const days = date.diff(now, 'days');
  const hours = date.diff(now, 'hours');
  const minutes = date.diff(now, 'minutes');

  let text;

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

import moment from "moment"

export default function AnnouncementRemainingDays({ dateTime, eventName }) {
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
    <span className="font-extrabold countdown-text-gradient block">
      {text} until {eventName}
    </span>
  )
}
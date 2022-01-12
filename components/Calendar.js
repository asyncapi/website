import moment from 'moment';
import Button from './buttons/Button';
import eventsData from '../meetings.json';

export default function Calendar({ className = '' }) {
  const CALENDAR_URL =
    'https://calendar.google.com/calendar/u/0/embed?src=tbrbfq4de5bcngt8okvev4lstk@group.calendar.google.com';
  const eventsExist = eventsData.length > 0;

  function getEvents() {
    if (eventsExist) {
      let meetingsWithDates = eventsData.map((event) => ({
        ...event,
        date: moment(event.date),
      }));
      meetingsWithDates.sort((a, b) => a.date - b.date);
      return meetingsWithDates
        .filter((meeting) => meeting.date > new Date())
        .slice(0, 2);
    } else {
      return getCalculatedEvents();
    }
  }
  function getCalculatedEvents() {
    const referenceDate = moment.utc('2020-06-09T08:00:00');
    let nextDate = referenceDate;
    let morningOrAfternoon = 'morning';

    do {
      morningOrAfternoon = toggleMorningAfternoon(morningOrAfternoon);
      nextDate.add(14, 'days').hours(morningOrAfternoon === 'morning' ? 8 : 16);
    } while (nextDate.isBefore());

    return [
      nextDate.hours(morningOrAfternoon === 'morning' ? 8 : 16),
      moment(nextDate)
        .add(14, 'days')
        .hours(morningOrAfternoon === 'morning' ? 16 : 8),
    ].map((date) => ({
      title: 'Community SIG Meeting',
      url: CALENDAR_URL,
      date,
    }));
  }
  function toggleMorningAfternoon(morningOrAfternoon) {
    return morningOrAfternoon === 'morning' ? 'afternoon' : 'morning';
  }

  return (
    <div
      className={`rounded-md border border-gray-200 overflow-hidden bg-white p-4 ${className}`}
    >
      <h3 className="text-left text-lg mb-8">Upcoming events</h3>
      {getEvents().map((event, index) => (
        <a
          href={event.url}
          className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row mb-1"
          key={index}
        >
          <div className="inline-flex flex-row h-12 min-w-12 rounded-full bg-pink-500 text-white font-bold">
            <span className="flex-1 text-center self-center">
              {event.date.format('D')}
            </span>
          </div>
          <div className="text-left flex-grow sm:pl-6 sm:mt-0">
            <h2 className="font-medium title-font text-gray-900 text-xl">
              {event.title}
            </h2>
            <p className="text-gray-600">
              {event.date.local().format('LLLL')} UTC
              {event.date.local().format('Z')}
            </p>
          </div>
        </a>
      ))}
      {eventsExist && (
        <Button
          className="block md:inline-block md:text-center float-right mt-4"
          text="Go to Calendar"
          href={CALENDAR_URL}
          target="_blank"
        />
      )}
    </div>
  );
}

import moment from 'moment';
import eventsData from '../config/meetings.json';
import GoogleCalendarButton from './buttons/GoogleCalendarButton';
import Heading from './typography/Heading';

export default function Calendar({ className = '', size, text="text-left" }) {
  const CALENDAR_URL =
    'https://calendar.google.com/calendar/embed?src=c_q9tseiglomdsj6njuhvbpts11c%40group.calendar.google.com&ctz=UTC';
  const eventsExist = eventsData.length > 0;

  function getEvents() {
      let meetingsWithDates = eventsData.map((event) => ({
        ...event,
        date: moment(event.date),
      }));
      meetingsWithDates.sort((a, b) => a.date - b.date);
      return meetingsWithDates
        .filter((meeting) => meeting.date > new Date())
        .slice(0, size || meetingsWithDates.length);
  }


  return (
    <div
      className={`rounded-md border border-gray-200 overflow-hidden bg-white p-4`}
    >
      <Heading level="h2" typeStyle="heading-md-semibold">
        Upcoming events
      </Heading> 
      <ul>
        {getEvents().map((event, index) => (
          <li key={index}>
            <a
              href={event.url}
              className="flex-grow flex sm:items-center items-start flex-col sm:flex-row mb-1 mt-2"
            >
              <div className="inline-flex flex-row h-12 min-w-12 rounded-full bg-pink-500 text-white font-bold">
                <span className="flex-1 text-center self-center">
                  {event.date.format('D')}
                </span>
              </div>
              <div className="text-left flex-grow sm:pl-6 sm:mt-0">
                <h2 className="font-medium title-font text-gray-900 text-xl hover:text-gray-500">
                  {event.title}
                </h2>
                <p className="text-gray-600">
                  {event.date.local().format('LLLL')} UTC
                  {event.date.local().format('Z')}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
      {eventsExist ? 
        <div className='pt-4'>
          <GoogleCalendarButton 
            href={CALENDAR_URL}
            text="View Calendar"
          />
        </div>
        :
        <div className="mt-2 text-gray-700">
          There are no meetings scheduled for next few days.
        </div>
      }
    </div>
  );
}

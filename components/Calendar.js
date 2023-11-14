import eventsData from '../config/meetings.json';
import GoogleCalendarButton from './buttons/GoogleCalendarButton';
import Heading from './typography/Heading';
import { getEvents } from '../lib/staticHelpers';
import { useTranslation } from '../lib/i18n';

export default function Calendar({ className = '', size, text="text-left" }) {

  const { t } = useTranslation('common');

  const CALENDAR_URL =
    'https://calendar.google.com/calendar/embed?src=c_q9tseiglomdsj6njuhvbpts11c%40group.calendar.google.com&ctz=UTC';
  const eventsExist = eventsData.length > 0;
  return (
    <div
      className={`rounded-md border border-gray-200 overflow-hidden bg-white p-4`}
    >
      <Heading level="h2" typeStyle="heading-md-semibold">
        {t("calendar.title")}
      </Heading> 
      <ul>
        {getEvents(eventsData, size).map((event, index) => (
          <li key={index} data-testid="Calendar-list-item">
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
        <div className='pt-4' data-testid="Calendar-button">
          <GoogleCalendarButton 
            href={CALENDAR_URL}
            text={t("calendar.viewCalendarBtn")}
          />
        </div>
        :
        <div className="mt-2 text-gray-700">
        {t("calendar.noMeetingsMessage")}
        </div>
      }
    </div>
  );
}

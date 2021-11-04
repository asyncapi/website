import moment from 'moment';
import GoToCalendarButton from './buttons/GoToCalendarButton';
export default function DynamicCalendar({ className = '', meetingsData }) {
  let meetingsWithDates = meetingsData.map((meeting) => ({
    ...meeting,
    date: new Date(meeting.date),
  }));
  meetingsWithDates.sort((a, b) => a.date - b.date);
  meetingsWithDates = meetingsWithDates.filter(
    (meeting) => meeting.date > new Date()
  );

  return (
    <div
      className={`rounded-md border border-gray-200 overflow-hidden bg-white p-4 ${className}`}
    >
      <h3 className="text-left text-lg mb-8">Upcoming events</h3>
      {meetingsWithDates.slice(0, 2).map((meeting, index) => (
        <a
          href={meeting.url}
          className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row mb-1"
          key={index}
        >
          <div className="inline-flex flex-row h-12 min-w-12 rounded-full bg-pink-500 text-white font-bold">
            <span className="flex-1 text-center self-center">
              {meeting.date.getDate()}
            </span>
          </div>
          <div className="text-left flex-grow sm:pl-6 sm:mt-0">
            <h2 className="font-medium title-font text-gray-900 text-xl">
              {meeting.title}
            </h2>
            <p className="text-gray-600">
              {moment(meeting.date).format('LLLL')}
            </p>
          </div>
        </a>
      ))}
      <GoToCalendarButton />
    </div>
  );
}

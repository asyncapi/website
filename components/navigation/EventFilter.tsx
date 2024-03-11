import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getEvents } from '../../utils/staticHelpers';

interface Event {
  date: moment.Moment;
}

interface EventFilterProps {
  data: Event[];
  setData: React.Dispatch<React.SetStateAction<Event[]>>;
}

function EventFilter({ data, setData }: EventFilterProps) {
  const localTime = moment().format('YYYY-MM-DD');
  const currentDate = localTime + 'T00:00:00.000Z';
  const filterList: string[] = ['All', 'Upcoming', 'Recorded'];
  const [active, setActive] = useState<string>('All');

  useEffect(() => {
    switch (active) {
      case 'All':
        setData(getEvents(data));
        break;
      case 'Upcoming':
        setData(
          getEvents(data).filter((a: Event) => {
            return a.date.format() > currentDate;
          })
        );
        break;
      case 'Recorded':
        setData(
          getEvents(data).filter((a: Event) => {
            return a.date.format() < currentDate;
          })
        );
        break;
      default:
        break;
    }
  }, [active, data, setData, currentDate]);

  return (
    <div className="p-2 bg-secondary-200 rounded-md flex justify-between w-full sm:w-[400px] text-secondary-600" data-testid="EventFilters-main">
      {filterList.map((list) => (
        <div
          data-testid="EventFilter-click"
          key={list}
          className={`p-3 w-[100px] cursor-pointer text-center ${
            active === list ? 'bg-secondary-600 rounded-md text-white' : 'hover:text-black'
          }`}
          onClick={() => setActive(list)}
        >
          {list}
        </div>
      ))}
    </div>
  );
}

export default EventFilter;

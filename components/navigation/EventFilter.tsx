import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { getEvents } from '../../utils/staticHelpers';

interface Event {
  date: moment.Moment;
}

interface EventFilterProps {
  data: Event[];
  setData: React.Dispatch<React.SetStateAction<Event[]>>;
}

/**
 * @description A component for filtering events based on date.
 * @param {Object} props - The props for the EventFilter component.
 * @param {Event[]} props.data - The array of events to filter.
 * @param {React.Dispatch<React.SetStateAction<Event[]>>} props.setData - The function to update the filtered events.
 */
export default function EventFilter({ data, setData }: EventFilterProps) {
  const localTime = moment().format('YYYY-MM-DD');
  const currentDate = `${localTime  }T00:00:00.000Z`;
  const filterList: string[] = ['All', 'Upcoming', 'Recorded'];
  const [active, setActive] = useState<string>('All');

  useEffect(() => {
    switch (active) {
      case 'All':
        setData(getEvents(data));
        break;
      case 'Upcoming':
        setData(getEvents(data).filter((a: Event) => {
          return a.date.format() > currentDate;
        }));
        break;
      case 'Recorded':
        setData(getEvents(data).filter((a: Event) => {
          return a.date.format() < currentDate;
        }));
        break;
    }
  }, [active, data, setData, currentDate]);

  return (
    <div className='flex w-full justify-between rounded-md bg-secondary-200 p-2 text-secondary-600 sm:w-[400px]' data-testid='EventFilters-main'>
      {filterList.map((list) => (
        <div
          data-testid='EventFilter-click'
          key={list}
          className={`w-[100px] cursor-pointer p-3 text-center ${
            active === list ? 'rounded-md bg-secondary-600 text-white' : 'hover:text-black'
          }`}
          onClick={() => setActive(list)}
        >
          {list}
        </div>
      ))}
    </div>
  );
}

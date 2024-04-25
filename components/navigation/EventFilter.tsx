import moment from 'moment';
import React, { useEffect, useState } from 'react';

import type { IEvent } from '@/types/event';

import { getEvents } from '../../utils/staticHelpers';

enum ActiveState {
  All = 'All',
  Upcoming = 'Upcoming',
  Recorded = 'Recorded'
}

interface EventFilterProps {
  data: IEvent[];
  setData: React.Dispatch<React.SetStateAction<IEvent[]>>;
}

/**
 * @description A component for filtering events based on date.
 * @param {Object} props - The props for the EventFilter component.
 * @param {IEvent[]} props.data - The array of events to filter.
 * @param {React.Dispatch<React.SetStateAction<IEvent[]>>} props.setData - The function to update the filtered events.
 */
export default function EventFilter({ data, setData }: EventFilterProps) {
  const localTime = moment().format('YYYY-MM-DD');
  const currentDate = `${localTime}T00:00:00.000Z`;
  const filterList: string[] = ['All', 'Upcoming', 'Recorded'];
  const [active, setActive] = useState<string>('All');

  useEffect(() => {
    switch (active) {
      case ActiveState.All:
        setData(getEvents(data));
        break;
      case ActiveState.Upcoming:
        setData(
          getEvents(data).filter((event: IEvent) => {
            return moment(event.date).format() > currentDate;
          })
        );
        break;
      case ActiveState.Recorded:
        setData(
          getEvents(data).filter((event: IEvent) => {
            return moment(event.date).format() < currentDate;
          })
        );
        break;
      default:
        setData(getEvents(data));
        break;
    }
  }, [active, data, setData, currentDate]);

  return (
    <div
      className='flex w-full justify-between rounded-md bg-secondary-200 p-2 text-secondary-600 sm:w-[400px]'
      data-testid='EventFilters-main'
    >
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

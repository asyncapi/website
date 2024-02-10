import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getEvents } from '../../lib/staticHelpers';

function EventFilter({ data, setData }) {
  const localTime = moment().format('YYYY-MM-DD'); // store localTime
  const currentDate = localTime + 'T00:00:00.000Z';
  const filterList = ['All', 'Upcoming', 'Recorded'];
  const [active, setActive] = useState('All');
  useEffect(() => {
    switch (active) {
      case 'All':
        setData(getEvents(data));
        break;
      case 'Upcoming':
        setData(
            getEvents(data).filter((a) => {
              return a.date.format() > currentDate;
            })
        );
        break;
      case 'Recorded':
        setData(
          getEvents(data).filter((a) => {
            return a.date.format() < currentDate;
          })
        );
        break;
    }
  }, [active]);
  return (
    <div className="p-2 bg-secondary-200 dark:bg-gray-500 dark:text-black rounded-md flex justify-between w-full sm:w-[400px] text-secondary-600"  data-testid="EventFilters-main">
      {filterList.map((list) => (
        <div data-testid = "EventFilter-click"
          key={list}
          className={`p-3 w-[100px] cursor-pointer text-center ${
            active === list
              ? 'bg-secondary-600 dark:bg-gray-800 rounded-md text-white'
              : 'hover:text-black'
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

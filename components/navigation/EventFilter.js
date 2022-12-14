import React, { useEffect, useState } from 'react';
import moment from 'moment';

function EventFilter({ data, setData }) {
  const localTime = moment().format('YYYY-MM-DD'); // store localTime
  const currentDate = localTime + 'T00:00:00.000Z';
  const filterList = ['All', 'Upcoming', 'Recorded'];
  const [active, setActive] = useState('All');
  useEffect(() => {
    switch (active) {
      case 'All':
        setData(data);
        break;
      case 'Upcoming':
        setData(
<<<<<<< HEAD
          data && data.filter((a) => {
            return a.date > currentDate;
<<<<<<< HEAD
=======
          data.filter((a) => {
            return a.start.dateTime > currentDate;
>>>>>>> f1d1b66 (integrated events with google cal)
=======
>>>>>>> a817c70 (extended build-meeting script)
          })
        );
        break;
      case 'Recorded':
        setData(
<<<<<<< HEAD
          data && data.filter((a) => {
            return a.date < currentDate;
<<<<<<< HEAD
=======
          data.filter((a) => {
            return a.start.dateTime < currentDate;
>>>>>>> f1d1b66 (integrated events with google cal)
=======
>>>>>>> a817c70 (extended build-meeting script)
          })
        );
        break;
    }
  }, [active]);
  return (
    <div className='p-2 bg-secondary-200 rounded-md flex justify-between w-full sm:w-[400px] text-secondary-600'>
      {filterList.map((list) => (
        <div
          key={list}
          className={`p-3 w-[100px] cursor-pointer text-center ${
            active === list
              ? 'bg-secondary-600 rounded-md text-white'
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

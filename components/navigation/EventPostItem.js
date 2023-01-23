import { ArrowRightIcon } from '@heroicons/react/outline';
import React from 'react';
import moment from 'moment';
import IconCalendar from '../icons/Calendar';
import Community from '../icons/Community';
import Conference from '../icons/Conference';
import Webinar from '../icons/Webinar';
import Heading from '../typography/Heading';

function EventPostItem({ post, className, id }) {
  const localTime = moment().format('YYYY-MM-DD'); // store localTime
  const currentDate = localTime + 'T00:00:00.000Z';
  const title = post.title || '';
  let color = '';
  let icon = '';
  let type = '';
  if (title.includes('community')) {
    icon = <Community />;
    color = 'text-green-800';
    type = 'COMMUNITY';
  } else if (title.includes('conference')) {
    icon = <Conference />;
    color = 'text-orange-800';
    type = 'CONFERENCE';
  } else if (title.includes('workshop')) {
    icon = <Webinar />;
    color = 'text-blue-400';
    type = 'WORKSHOP';
  }

  const defaultCover = '/img/homepage/confBlurBg.webp';
  let active = true;
  if(currentDate > post.date){
    active = false
  }
  return (
    <li key={id} className={`${className}`}>
      <article className='h-full rounded-lg shadow-md hover:shadow-lg'>
          <a href={post.url} target='_blank' rel='noreferrer'>
            <img
              src={
                post.banner
                  ? post.banner
                  : defaultCover
              }
              alt={post.title}
              className='w-full h-52 object-cover rounded-t-lg'
            />
            <div className='mt-2 p-5 flex flex-col justify-between h-52 '>
              <div>
                <div className='flex items-center'>
                  {icon}{' '}
                  <p className={`ml-3 font-bold text-md ${color}`}>{type}</p>
                </div>
                <Heading level='h3' typeStyle='body-lg' className='mt-4'>
                  {post.title}
                </Heading>
              </div>
              <div className='flex items-center'>
                <IconCalendar className='' />{' '}
                <span className='text-sm font-semibold ml-4'>
                  {active
                    ? moment(post.date).format('MMMM D, YYYY')
                    : 'View Recording'
                  }
                </span>{' '}
                <ArrowRightIcon className='w-4 ml-3' />
              </div>
            </div>
          </a>
      </article>
    </li>
  );
}

export default EventPostItem;

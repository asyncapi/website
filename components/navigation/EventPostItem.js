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
  const summary = post.summary || '';
  let color = '';
  let icon = '';
  let type = '';
  if (summary.includes('community')) {
    icon = <Community />;
    color = 'text-green-800';
    type = 'COMMUNITY';
  } else if (summary.includes('conference')) {
    icon = <Conference />;
    color = 'text-orange-800';
    type = 'CONFERENCE';
  } else if (summary.includes('workshop')) {
    icon = <Webinar />;
    color = 'text-blue-400';
    type = 'WORKSHOP';
  }

  const defaultCover = '/img/homepage/confBlurBg.png';
  let active = true;
  if(currentDate > post.start.dateTime){
    active = false
  }
  let url;
  if(post.extendedProperties?.private){
    url = `https://github.com/asyncapi/community/issues/${post.extendedProperties.private.ISSUE_ID}`
  }
  return (
    <li key={id} className={`${className}`}>
      <article className='h-full rounded-lg shadow-md hover:shadow-lg'>
          <a href={active ? post.htmlLink : url } target='_blank'>
            <img
              src={
                post.extendedProperties
                  ? post.extendedProperties.private
                    ? post.extendedProperties.private.banner
                    : defaultCover
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
                  {post.summary}
                </Heading>
              </div>
              <div className='flex items-center'>
                <IconCalendar className='' />{' '}
                <span className='text-sm font-semibold ml-4'>
                  {active
                    ? moment(post.start.dateTime).format('MMMM D, YYYY')
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

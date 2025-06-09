import { ArrowRightIcon } from '@heroicons/react/outline';
import moment from 'moment';
import React from 'react';

import type { IEvent } from '@/types/event';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';

import IconCalendar from '../icons/Calendar';
import Community from '../icons/Community';
import Conference from '../icons/Conference';
import Webinar from '../icons/Webinar';
import Heading from '../typography/Heading';

interface EventPostItemProps {
  post: IEvent;
  className?: string;
  id: string;
}

/**
 * @description Component representing an event post item.
 * @param {EventPostItemProps} props - The props for the EventPostItem component.
 * @param {Event} props.post - The event post object.
 * @param {string} [props.className] - The optional CSS class name.
 *
 */
function EventPostItem({ post, className = '', id }: EventPostItemProps): React.JSX.Element {
  const localTime = moment().format('YYYY-MM-DD'); // store localTime
  const currentDate = `${localTime}T00:00:00.000Z`;
  const title = post.title || '';
  let color = '';
  let icon: React.ReactElement | null = null;
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

  const defaultCover = 'https://github.com/asyncapi/community/assets/40604284/01c2b8de-fa5c-44dd-81a5-70cb96df4813';
  let active = true;
  const postDate = moment(post.date); // Convert post.date to a moment object if necessary

  if (!postDate.isValid()) {
    // Handle invalid date if necessary
    active = false;
  } else if (currentDate > postDate.format()) {
    active = false;
  }

  return (
    <li key={id} className={className} data-testid='EventPostItem-main'>
      <article className='h-full rounded-lg shadow-md hover:shadow-lg'>
        <a href={post.url} target='_blank' rel='noreferrer' data-testid='EventPostItem-link'>
          <img
            src={post.banner ? post.banner : defaultCover}
            alt={post.title}
            className='h-52 w-full rounded-t-lg object-cover'
            data-testid='EventPostItem-img'
          />
          <div className='mt-2 flex h-52 flex-col justify-between p-5 ' data-testid='EventPostItem-post'>
            <div>
              <div className='flex items-center'>
                {icon}
                <p className={`text-md ml-3 font-bold ${color}`}>{type}</p>
              </div>
              <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.bodyLg} className='mt-4'>
                {post.title}
              </Heading>
            </div>
            <div className='flex items-center'>
              <IconCalendar />
              <span className='ml-4 text-sm font-semibold' data-testid='Event-span'>
                {active ? moment(postDate).format('MMMM D, YYYY') : 'View Recording'}
              </span>
              <ArrowRightIcon className='ml-3 w-4' />
            </div>
          </div>
        </a>
      </article>
    </li>
  );
}

export default EventPostItem;

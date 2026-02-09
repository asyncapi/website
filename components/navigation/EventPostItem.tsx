import { ArrowRightIcon } from '@heroicons/react/outline';
import dayjs from 'dayjs';
import React from 'react';

import type { IEvent } from '@/types/event';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';

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
  const localTime = dayjs().format('YYYY-MM-DD'); // store localTime
  const currentDate = `${localTime}T00:00:00.000Z`;
  const title = post.title || '';
  let type = '';

  if (title.includes('community')) {
    type = 'COMMUNITY';
  } else if (title.includes('conference')) {
    type = 'CONFERENCE';
  } else if (title.includes('workshop')) {
    type = 'WORKSHOP';
  }

  let active = true;
  const postDate = dayjs(post.date); // Convert post.date to a dayjs object if necessary

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
                {active ? postDate.format('MMMM D, YYYY') : 'View Recording'}
              </span>
            </div>
            <div className='text-sm text-gray-600'>{postDate.isValid() && moment(postDate).format('h:mm A [UTC]')}</div>
          </div>

          <a
            href={post.url}
            target='_blank'
            rel='noreferrer'
            className='mt-4 block w-full rounded-lg bg-indigo-600 py-3 text-center font-semibold text-white transition-colors hover:bg-indigo-700'
            data-testid='EventPostItem-link'
          >
            Join Our Community
          </a>
        </div>
      </article>
    </li>
  );
}

export default EventPostItem;

import moment from 'moment';
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
  const localTime = moment().format('YYYY-MM-DD'); // store localTime
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
  const postDate = moment(post.date); // Convert post.date to a moment object if necessary

  if (!postDate.isValid()) {
    // Handle invalid date if necessary
    active = false;
  } else if (currentDate > postDate.format()) {
    active = false;
  }

  return (
    <li key={id} className={className} data-testid='EventPostItem-main'>
      <article className='flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg'>
        {/* Header with gradient background */}
        <div className='relative h-40 bg-gradient-to-br from-indigo-600 to-purple-600 p-4'>
          {/* Badge */}
          <div className='absolute right-4 top-4'>
            <span className='rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700'>
              {type || 'Online'}
            </span>
          </div>
          {/* Attending count */}
          <div className='absolute bottom-4 left-4'>
            <span className='text-sm font-semibold text-white'>150 attending</span>
          </div>
        </div>

        {/* Card body */}
        <div className='flex flex-1 flex-col justify-between p-6'>
          <div>
            <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.bodyLg} className='mb-2 text-gray-900'>
              {post.title}
            </Heading>
            <div className='flex items-center text-sm text-gray-600'>
              <span data-testid='Event-span'>
                {active ? moment(postDate).format('MMMM D, YYYY') : 'View Recording'}
              </span>
            </div>
            <div className='text-sm text-gray-600'>{postDate.isValid() && moment(postDate).format('h:mm A [UTC]')}</div>
          </div>

          {/* Button */}
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

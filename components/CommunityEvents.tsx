import React, { useState } from 'react';

import EventFilter from '@/components/navigation/EventFilter';
import EventPostItem from '@/components/navigation/EventPostItem';
import Heading from '@/components/typography/Heading';
import Paragraph from '@/components/typography/Paragraph';
import meetings from '@/config/meetings.json';
import type { Event } from '@/types/pages/community/Community';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';
import { getEvents } from '@/utils/staticHelpers';

/**
 * CommunityEvents component for displaying all events
 */
const CommunityEvents = () => {
  const [events, setEvents] = useState(getEvents(meetings));

  return (
    <div className='mt-20'>
      <div className='items-center justify-between sm:flex'>
        <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.md}>
          All Events
        </Heading>
        <div className='mt-5 sm:mt-0'>
          <EventFilter data={meetings} setData={setEvents} />
        </div>
      </div>
      <div className='mt-10'>
        {!events || events.length === 0 ? (
          <div className='flex content-center justify-center'>
            <Paragraph typeStyle={ParagraphTypeStyle.md} className='mx-auto mt-5 max-w-2xl'>
              No Events. Check back later!
            </Paragraph>
          </div>
        ) : (
          <ul className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
            {events.map((event: Event, index: number) => {
              return <EventPostItem key={index} id={event.title} post={event} />;
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CommunityEvents;

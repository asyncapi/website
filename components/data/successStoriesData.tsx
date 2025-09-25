// Code: Used this file as tsx file to extend the description field as React.JSX.Element
import React from 'react';

import TextLink from '../typography/TextLink';

/**
 * @description renders each item's description in the format of React.ReactNode
 * @param {React.ReactNode} props.children contain descriptions of each story
 */
export function DescriptionComponent({ children }: { children: React.ReactNode }) {
  return children;
}

export const successStories = [
  {
    title: 'Community Manager',
    description: (
      <DescriptionComponent>
        With the addition of a dedicated Community Manager, we now have a monthly newsletter, regular status updates, an
        active social media presence, and the ability to drive initiatives such as event organization. Dedicated focus
        enables us to also focus on{' '}
        <TextLink href='https://github.com/orgs/asyncapi/discussions/948' target='_blank' className='text-violet'>
          a year to year vision
        </TextLink>
        .
      </DescriptionComponent>
    )
  },
  {
    title: 'AsyncAPI Mentorship',
    description: (
      <DescriptionComponent>
        The 2022 mentorship program yielded significant achievements: Kafka support in Glee, a centralized platform for
        sharing AsyncAPI tools, and a versatile error handling library for multiple projects.
      </DescriptionComponent>
    )
  },
  {
    title: 'AsyncAPI Conference',
    description: (
      <DescriptionComponent>
        Every year we organize a conference that attracts many participants. In 2022 the online conference generated{' '}
        <TextLink
          href='https://www.youtube.com/playlist?list=PLbi1gRlP7pijRiA32SU36hD_FW-2qyPhl'
          target='_blank'
          className='text-violet'
        >
          3k views
        </TextLink>
        . In 2023 we organized{' '}
        <TextLink href='https://conference.asyncapi.com' target='_blank' className='text-violet'>
          four different in person events
        </TextLink>
        , some that was also live streamed.
      </DescriptionComponent>
    )
  }
];

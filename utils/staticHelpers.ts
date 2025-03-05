import moment from 'moment';

import type { IEvent } from '@/types/event';

/**
 * Retrieves events sorted by date.
 * @param {IEvent[]} events - The list of events to retrieve.
 * @param {number} [size] - The optional maximum number of events to return.
 * @returns {any[]} The sorted list of events.
 */
export function getEvents(events: IEvent[], size?: number) {
  let meetingsWithDates: any = events.map((event) => ({
    ...event,
    date: moment(event.date)
  }));

  meetingsWithDates.sort((a: any, b: any) => a.date - b.date);

  if (size) {
    return meetingsWithDates
      .filter((meeting: any) => meeting.date > moment(new Date()))
      .slice(0, size || meetingsWithDates.length);
  }

  const sortedMeetings: any = [];

  for (const meeting of meetingsWithDates) {
    if (meeting.date > moment(new Date())) {
      sortedMeetings.push(meeting);
    }
  }

  meetingsWithDates.sort((a: any, b: any) => {
    return b.date - a.date;
  });

  for (const meeting of meetingsWithDates) {
    if (meeting.date < moment(new Date())) {
      sortedMeetings.push(meeting);
    }
  }

  meetingsWithDates = sortedMeetings;

  return meetingsWithDates;
}

export const generateCaseStudyContent = (data: any) => {
  const {
    challenges,
    solution,
    usecase,
    architecture,
    testing,
    codegen,
    schemaStorage,
    registry,
    versioning,
    validation,
    asyncapiStorage,
    asyncapiEditing,
    asyncapiExtensions,
    asyncapiDocumentation,
    asyncapiBindings,
    asyncapiTools,
    additionalResources,
    fullExample,
    casestudy
  } = data;
  const { languages } = casestudy.technical;
  const { frameworks } = casestudy.technical;
  const { protocols } = casestudy.technical;
  const { versions } = casestudy.asyncapi;

  return [
    {
      title: 'Challenges',
      content: challenges
    },
    {
      title: 'Solution',
      content: solution
    },
    {
      title: 'Use Case',
      content: usecase
    },
    {
      title: 'More Details',
      items: [
        `Languages: ${languages.join(', ')}`,
        `Frameworks: ${frameworks.join(', ')}`,
        `Protocols: ${protocols.join(', ')}`
      ],
      children: [
        {
          title: 'Testing strategy',
          content: testing
        },
        {
          title: 'Approach to code generation',
          content: codegen
        },
        {
          title: 'Architecture',
          content: architecture
        },
        {
          title: 'More Details about AsyncAPI',
          items: [
            `Version: ${versions.join(', ')}`,
            `Who maintains documents: ${casestudy.asyncapi.maintainers}`,
            `Internal users: ${casestudy.asyncapi.audience.internal.toString()}`,
            `External users: ${casestudy.asyncapi.audience.external.toString()}`
          ],
          children: [
            {
              title: 'How AsyncAPI documents are stored',
              content: asyncapiStorage
            },
            {
              title: 'Where maintainers edit AsyncAPI documents',
              content: asyncapiEditing
            },
            {
              title: 'What extensions are used',
              content: asyncapiExtensions
            },
            {
              title: 'How documentation is generated',
              content: asyncapiDocumentation
            },
            {
              title: 'What bindings are used',
              content: asyncapiBindings
            },
            {
              title: 'What tools are used',
              content: asyncapiTools
            }
          ]
        },
        {
          title: 'Schemas',
          items: [`Spec: ${casestudy.schemas.description}`],
          children: [
            {
              title: 'Storage strategy',
              content: schemaStorage
            },
            {
              title: 'Schema Registry',
              content: registry
            },
            {
              title: 'Versioning of schemas',
              content: versioning
            },
            {
              title: 'Validation of message schemas',
              content: validation
            },
            {
              title: 'Additional Resources',
              content: additionalResources
            }
          ]
        }
      ]
    },
    {
      title: 'Production-use AsyncAPI document',
      content: fullExample
    }
  ];
};

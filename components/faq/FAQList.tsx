import Link from 'next/link';
import React from 'react';

import type { AccordionItemType as FAQ } from '@/types/components/AccordionItemType';

/**
 * This is the FAQ list. It contains the frequently asked questions and their answers.
 */
export const faqList: FAQ[] = [
  {
    title: 'What is the goal of the project?',
    content: <div>To make asynchronous APIs as successful and mature as REST APIs.</div>
  },
  {
    title: 'What protocols does it support?',
    content: (
      <div>
        AsyncAPI is protocol - agnostic, so you can use it for APIs that work over any protocol(e.g., AMQP, MQTT,
        WebSockets, Kafka, STOMP, HTTP, Mercure, etc). For more information, refer to the{' '}
        <a
          href='https://www.asyncapi.com/docs/reference/specification/latest#serverBindingsObject'
          className='border-b border-secondary-400 font-semibold text-gray-900 transition duration-300 ease-in-out hover:border-secondary-500'
        >
          AsyncAPI specification documentation
        </a>
        .
      </div>
    )
  },
  {
    title: 'Who are the users of AsyncAPI?',
    content: (
      <div>
        <p>
          AsyncAPI users are those who implement and maintain event - driven architecture. For example, people that
          write backend API using WebSocket, or people that maintain communication between their microservices using
          Kafka.
        </p>
      </div>
    )
  },
  {
    title: 'What is the AsyncAPI Community?',
    content: (
      <div>
        It’s the core of the initiative. The AsyncAPI community contributes to the development of the tool, it promotes
        access and distribution of the specification allowing freedom of use, study, copying, modification, and
        redistribution to anyone who wishes to do so. The cooperation between these people in all areas of software
        production generates a substantial improvement in the quality of the software, as well as greater dissemination
        and sustainability over time, and prioritizing the benefit of society over any other.
      </div>
    )
  },
  {
    title: 'Who can use it?',
    content: (
      <div>
        Anyone. All projects under AsyncAPI Initiative are part of the Linux Foundation, licensed under the Apache 2.0
        license. It’s open to use and contribution.
      </div>
    )
  },
  {
    title: 'Where can I find more information?',
    content: (
      <div>
        <ul className='font-normal list-disc pl-8 font-semibold text-gray-900 antialiased'>
          <li className='py-1'>
            <Link
              href='/docs'
              className='border-b border-secondary-400 transition duration-300 ease-in-out hover:border-secondary-500'
            >
              Official AsyncAPI Documentation
            </Link>{' '}
          </li>
          <li className='py-1'>
            <a
              href='https://www.youtube.com/watch?v=UID1nnuFDtM&list=PLbi1gRlP7piitNgvqhIAvGNZM_kvP0r8R'
              className='border-b border-secondary-400 transition duration-300 ease-in-out hover:border-secondary-500'
            >
              Presentation by Fran Méndez
            </a>{' '}
          </li>
        </ul>
      </div>
    )
  }
];

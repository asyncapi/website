import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';

import ConnectCard, { ConnectCardProps } from './connect/ConnectCard';
import IconLinkedInColor from './icons/LinkedInColor';
import IconMail from './icons/Mail';
import IconMastodonColor from './icons/MastodonColor';
import IconPodium from './icons/Podium';
import IconSlackColor from './icons/SlackColor';
import Heading from './typography/Heading';

const CONNECT_LINKS: ConnectCardProps[] = [
  {
    label: 'Slack',
    url: 'https://asyncapi.com/slack-invite',
    Icon: IconSlackColor,
  },
  {
    label: 'Email',
    url: 'mailto:info@asyncapi.com',
    Icon: IconMail,
  },
  {
    label: 'Conferences',
    url: 'https://conference.asyncapi.com',
    Icon: IconPodium,
  },
  {
    label: 'Mastodon',
    url: 'https://fosstodon.org/@AsyncAPISpec',
    Icon: IconMastodonColor,
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/company/asyncapi',
    Icon: IconLinkedInColor,
  },
];

/**
 * @description ConnectPage renders the /connect route with a grid of AsyncAPI social links.
 * This page is designed to be converted into a QR code for conference banners and printed materials.
 */
export default function ConnectPage() {
  const isLastOdd = CONNECT_LINKS.length % 2 !== 0;

  return (
    <div data-testid='ConnectPage-main'>
      <div className='mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.xl} textColor='text-gray-900 dark:text-white'>
            Get in Touch
          </Heading>
        </div>
        <ul className='mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2' aria-label='AsyncAPI connect links'>
          {CONNECT_LINKS.map((link, idx) => {
            const isLast = idx === CONNECT_LINKS.length - 1;

            return (
              <li key={link.label} className={isLast && isLastOdd ? 'sm:col-span-2' : ''}>
                <ConnectCard {...link} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

import React, { useCallback } from 'react';

import Button from '@/components/buttons/Button';
import IconConference from '@/components/icons/Conference';
import IconEmail from '@/components/icons/Email';
import IconGithub from '@/components/icons/Github';
import IconLinkedIn from '@/components/icons/LinkedIn';
import IconMastodon from '@/components/icons/Mastodon';
import IconSlack from '@/components/icons/Slack';
import IconTwitter from '@/components/icons/Twitter';
import IconYoutubeGray from '@/components/icons/YouTubeGray';
import Container from '@/components/layout/Container';
import GenericLayout from '@/components/layout/GenericLayout';
import Heading from '@/components/typography/Heading';
import Paragraph from '@/components/typography/Paragraph';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';

const CHANNELS = [
  {
    label: 'Slack',
    href: '/slack-invite',
    icon: <IconSlack className='size-10 text-[#611f69]' />
  },
  {
    label: 'Email',
    href: 'mailto:info@asyncapi.com',
    icon: <IconEmail className='size-10 text-gray-900' />
  },
  {
    label: 'Conferences',
    href: 'https://conference.asyncapi.com',
    icon: <IconConference className='size-10 text-[#C78017]' />
  },
  {
    label: 'Mastodon',
    href: 'https://mastodon.social/@asyncapi',
    icon: <IconMastodon className='size-10 text-[#6364FF]' />
  },
  {
    label: 'GitHub',
    href: 'https://github.com/asyncapi',
    icon: <IconGithub className='size-10 text-gray-900' />
  },
  {
    label: 'X',
    href: 'https://twitter.com/AsyncAPISpec',
    icon: <IconTwitter className='size-10 text-gray-900' />
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/asyncapi',
    icon: <IconLinkedIn className='size-10 text-[#0A66C2]' />
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/asyncapi',
    icon: <IconYoutubeGray className='size-10 text-red-600' />
  }
];

/**
 * @description Join the community page listing all channels and QR.
 */
export default function JoinPage() {
  const joinUrl = 'https://www.asyncapi.com/join';

  const copyUrl = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(joinUrl);
    }
  }, [joinUrl]);

  const image = '/img/social/community.webp';

  return (
    <GenericLayout
      title='Join the AsyncAPI Community'
      description='Choose how you want to connect with us'
      image={image}
      wide
    >
      <Container as='section' wide className='mt-8 md:mt-10'>
        <div className='text-center'>
          <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.lg}>
            Join the AsyncAPI Community
          </Heading>
          <Paragraph className='mx-auto mt-3 max-w-2xl'>
            Prefer Slack, social, or email? Pick your channel and stay connected.
          </Paragraph>
        </div>

        <div className='mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3'>
          <div className='md:col-span-2'>
            <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.mdSemibold} className='mb-4 text-left'>
              Get in Touch
            </Heading>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              {CHANNELS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md'
                >
                  <span className='mr-4 inline-flex items-center justify-center rounded-xl bg-gray-50 p-3 group-hover:bg-gray-100'>
                    {c.icon}
                  </span>
                  <span className='text-2xl font-semibold tracking-tight text-gray-900'>{c.label}</span>
                </a>
              ))}
            </div>
          </div>

          <aside className='rounded-2xl bg-dark p-6 text-white md:sticky md:top-24'>
            <div className='text-center'>
              <h3 className='text-2xl font-bold tracking-wider md:text-3xl'>JOIN OUR COMMUNITY</h3>
            </div>
            <div className='mt-4 flex justify-center'>
              <img
                src='/img/join-qr.png'
                alt='QR code to join page'
                className='h-64 w-64 rounded-lg border border-gray-700 bg-white p-3 shadow-md'
              />
            </div>
            <p className='mt-4 text-center text-sm text-cool-gray'>Share this QR to open {joinUrl}</p>
            <div className='mt-4 flex flex-col gap-2 sm:flex-row'>
              <Button
                text='Copy URL'
                onClick={copyUrl}
                className='w-full sm:w-auto'
                bgClassName='bg-gray-800 hover:bg-gray-700'
                textClassName='text-white'
              />
              <Button
                text='Open QR image'
                href='/img/join-qr.png'
                target='_blank'
                className='w-full sm:w-auto'
                bgClassName='bg-gray-200 hover:bg-gray-100'
                textClassName='text-gray-900'
              />
            </div>
          </aside>
        </div>
      </Container>
    </GenericLayout>
  );
}

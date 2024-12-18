import { ArrowRightIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';

import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import Paragraph from './typography/Paragraph';
import TextLink from './typography/TextLink';

interface MeetingProps {
  name?: string;
  purpose?: string;
  host?: string;
  hostProfile?: string;
  youtube?: string;
  bg?: string;
}

/**
 * @description This is the meeting card component.
 *
 * @param {MeetingProps} props - The props of the component.
 * @param {string} props.name - The name of the meeting.
 * @param {string} props.purpose - The purpose of the meeting.
 * @param {string} props.host - The host of the meeting.
 * @param {string} props.hostProfile - The host profile of the meeting.
 * @param {string} props.youtube - The youtube link of the meeting.
 * @param {string} props.bg - The background color of the meeting.
 */
export default function Meeting({
  name = '',
  purpose = '',
  host = '',
  hostProfile = '',
  youtube = '',
  bg = ''
}: MeetingProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <a href={youtube} target='_blank' rel='noreferrer' data-testid='Meeting-link'>
      <div
        className={`meeting-card bg-overflow-hidden flex h-[300px] w-full cursor-pointer flex-col justify-between p-4 hover:bg-dark hover:text-white lg:w-[300px] ${bg}`}
      >
        <div>
          <h3 className='text-xl' data-testid='Meeting-heading'>
            {name}
          </h3>
          <div data-testid='Meeting-paragraph'>
            <Paragraph typeStyle={ParagraphTypeStyle.sm} className='my-4' textColor='white'>
              {purpose}
            </Paragraph>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <Paragraph typeStyle={ParagraphTypeStyle.md} className='my-4'>
            <strong data-testid='Meeting-host'>Host:&nbsp;</strong>
            {hostProfile ? (
              <TextLink href={hostProfile} target='_blank' className='hover:text-primary-500'>
                {host}
              </TextLink>
            ) : (
              `${host}.`
            )}
          </Paragraph>
          <div>
            <ArrowRightIcon className='ml-3 w-[20px] text-slate-400' />
          </div>
        </div>
      </div>
    </a>
  );
}

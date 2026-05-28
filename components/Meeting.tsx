import { ArrowRightIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

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
        className={twMerge(
          'meeting-card group bg-overflow-hidden flex h-[300px] w-full cursor-pointer flex-col justify-between border border-gray-200 bg-white p-4 text-gray-900 transition-all duration-300 hover:bg-dark hover:text-white dark:border-border dark:bg-dark-card dark:text-white dark:hover:border-primary-400 dark:hover:bg-[#1E2A45] dark:hover:shadow-[0_0_20px_rgba(100,80,220,0.25)] lg:w-[300px]',
          bg
        )}
      >
        <div>
          <h3
            className='text-xl text-gray-900 transition-colors duration-300 group-hover:text-white dark:text-white dark:group-hover:text-primary-200'
            data-testid='Meeting-heading'
          >
            {name}
          </h3>
          <div data-testid='Meeting-paragraph'>
            <Paragraph
              typeStyle={ParagraphTypeStyle.sm}
              className='my-4'
              textColor='text-gray-700 transition-colors duration-300 group-hover:text-white dark:text-gray-300 dark:group-hover:text-gray-100'
            >
              {purpose}
            </Paragraph>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <Paragraph
            typeStyle={ParagraphTypeStyle.md}
            className='my-4'
            textColor='text-gray-700 transition-colors duration-300 group-hover:text-white dark:text-gray-300 dark:group-hover:text-gray-100'
          >
            <strong data-testid='Meeting-host'>Host:&nbsp;</strong>
            {hostProfile ? (
              <TextLink
                href={hostProfile}
                target='_blank'
                className='text-gray-700 transition-colors duration-300 hover:text-primary-500 group-hover:text-white dark:text-gray-300 dark:group-hover:text-primary-200'
              >
                {host}
              </TextLink>
            ) : (
              `${host}.`
            )}
          </Paragraph>
          <div>
            <ArrowRightIcon className='ml-3 w-[20px] text-slate-400 transition-colors duration-300 group-hover:text-white dark:text-gray-400 dark:group-hover:text-primary-300' />
          </div>
        </div>
      </div>
    </a>
  );
}

import Link from 'next/link';
import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import { buckets } from '../data/buckets';
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';

type IconType = (props: { className: string }) => JSX.Element;

interface CardProps {
  title: string;
  description: string;
  link: string;
  className: string;
  Icon: IconType;
}

export const DocsCards: React.FC = () => {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2' data-testid='Docs-main-div' >
      {buckets.map(card => (
        <Card key={card.title} {...card} />
      ))}

    </div>
  );
};

const Card: React.FC<CardProps> = ({ title, description, link, className, Icon }) => {
  return (
    <Link href={link}>
      <a href={link} className='cursor-pointer' data-testid='Docs-link'>
        <div className='h-full rounded-lg border border-gray-200 p-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg'>
          <div data-testid='Docs-div-contents'>
            <Heading
              level={HeadingLevel.h3}
              typeStyle={HeadingTypeStyle.smSemibold}
              className='border-b border-gray-300 pb-4'
              id={title}
            >
              <div className='flex flex-row items-center'>
                <div className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${className} text-gray-900 sm:size-12`} data-testid='Docs-icon'>
                  <Icon className='size-6' />
                </div>
                <span className='ml-4'>{title}</span>
              </div>
            </Heading>
            <Paragraph typeStyle={ParagraphTypeStyle.sm} className='mt-5' fontWeight='light'>
              {description}
            </Paragraph>
          </div>
        </div>
      </a>
    </Link>
  );
};

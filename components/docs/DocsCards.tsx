import React from 'react';
import Link from 'next/link';
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';
import { buckets } from '../data/buckets';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

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
    <div className='grid gap-4 grid-cols-1 sm:grid-cols-2' data-testid="Docs-main-div" >
      {buckets.map(card => (
        <Card key={card.title} {...card} />
      ))}

    </div>
  );
}

const Card: React.FC<CardProps> = ({ title, description, link, className, Icon }) => {
  return (
    <Link href={link}>
      <a href={link} className='cursor-pointer' data-testid="Docs-link">
        <div className="h-full border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out rounded-lg p-6">
          <div data-testid="Docs-div-contents">
            <Heading
              level={HeadingLevel.h3}
              typeStyle={HeadingTypeStyle.smSemibold}
              className='pb-4 border-b border-gray-300'
              id={title}
            >
              <div className='flex flex-row items-center'>
                <div className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg ${className} text-gray-900 sm:h-12 sm:w-12`} data-testid="Docs-icon">
                  <Icon className="h-6 w-6" />
                </div>
                <span className='ml-4'>{title}</span>
              </div>
            </Heading>
            <Paragraph typeStyle={ParagraphTypeStyle.sm} className="mt-5" fontWeight="light">
              {description}
            </Paragraph>
          </div>
        </div>
      </a>
    </Link>
  );
}

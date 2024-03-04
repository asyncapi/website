import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import articlesData from '../../config/articles.json';
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';

interface Article {
  url: string;
  publishDate: string;
  title: string;
}

const NewsroomArticle: React.FC = () => {
  return (
    <ul className='flex w-full flex-col gap-2 px-2 pb-4'>
      {articlesData.map((article: Article, index: number) => (
        <li key={index}>
          <a
            className='mb-2 block rounded-md border border-gray-200 bg-white p-6 text-left shadow-md transition-all duration-300 ease-in-out hover:shadow-lg lg:w-full'
            href={article.url}
            target='_blank'
            rel='noopener noreferrer'
            data-testid={`NewsroomArticle-${index}`}
          >
            <div>
              <Paragraph typeStyle={ParagraphTypeStyle.sm} textColor='text-gray-600'>
                {article.publishDate}
              </Paragraph>
              <Heading level={HeadingLevel.h4} typeStyle={HeadingTypeStyle.xsSemibold} className='mt-3'>
                {article.title}
              </Heading>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default NewsroomArticle;

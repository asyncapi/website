import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import { getAllPosts } from '../../utils/api';
import { useTranslation } from '../../utils/i18n';
import Button from '../buttons/Button';
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';
import FeaturedBlogPost from './FeaturedBlogPost';

/**
 * @description This component displays the latest news, events, and blog posts.
 */
export default function NewsroomSection() {
  const { t } = useTranslation('common');

  /**
   * Retrieves all blog posts and news and sorts them based on their date and featured status.
   */
  const posts = getAllPosts()
    .blog.sort((i1, i2) => {
      const i1Date = new Date(i1.date);
      const i2Date = new Date(i2.date);

      if (i1.featured && !i2.featured) return -1;
      if (!i1.featured && i2.featured) return 1;

      return i2Date.valueOf() - i1Date.valueOf();
    })
    .slice(0, 1);

  return (
    <div className='mt-12 justify-between lg:flex'>
      <section className='relative mx-auto mt-10 w-fit lg:mt-4 lg:w-1/2' data-testid='NewsroomSection-Featured'>
        <div className='absolute z-10 -mt-6'>
          <Button
            className='block border border-secondary-500 p-2 text-center text-secondary-500 shadow-md md:inline-block'
            text={t('newsroomSection.newsroomFeaturedPost')}
            bgClassName='bg-secondary-100'
          />
        </div>
        <FeaturedBlogPost post={posts[0]} />
      </section>
      <section
        className='mt-5 lg:my-auto lg:ml-12 lg:w-1/2 lg:max-w-xl lg:text-left'
        data-testid='NewsroomSection-main'
      >
        <Heading typeStyle={HeadingTypeStyle.mdSemibold} level={HeadingLevel.h3}>
          {t('newsroomSection.title')}
        </Heading>
        <Paragraph typeStyle={ParagraphTypeStyle.lg} className='mt-5'>
          {t('newsroomSection.description')}
        </Paragraph>
        <div className='mt-7'>
          <Button
            text={t('newsroomSection.newsroomBtn')}
            href='/community/newsroom'
            data-testid='NewsroomSection-Link'
          />
        </div>
      </section>
    </div>
  );
}

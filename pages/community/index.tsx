import React from 'react';

import { CardType } from '@/types/components/community/CardPropsType';

import Card from '../../components/community/Card';
import Header from '../../components/community/Header';
import Hero from '../../components/community/Hero';
import HomeCards from '../../components/community/HomeCard';
import GenericLayout from '../../components/layout/GenericLayout';
import NewsletterSubscribe from '../../components/NewsletterSubscribe';

/**
 * @description This component displays the Community Index Page.
 */
export default function CommunityIndexPage() {
  const image = '/img/social/community.webp';

  return (
    <GenericLayout
      title='AsyncAPI Community'
      description='Join 10k+ developers, designers, and technical writers from all over the world.'
      image={image}
      wide
    >
      <div className='mt-15 md:hidden'>
        <Header />
      </div>
      <Hero />

      {/* AsyncAPI Slack Section */}
      <div className='relative mt-16 size-full'>
        <HomeCards
          headline='Join the Community'
          title='AsyncAPI Slack'
          description='AsyncAPI’s incredible community spans over 83 countries, where developers, designers, and technical writers collaborate and mentor others.'
          btnText='Join AsyncAPI Slack'
          link='https://asyncapi.com/slack-invite'
          className='bg-channelCover'
        />
      </div>

      {/* Community Goals Section */}
      <div className='mt-20 flex flex-col justify-center sm:flex-row'>
        <Card
          type={CardType.SMALL}
          tagline='Goals'
          icon='🎯'
          heading='2024 AsyncAPI Community Goals'
          description='See what we’ve achieved so far and what’s next for the community.'
          bg='bg-white'
          link='https://github.com/orgs/asyncapi/discussions/948'
        />
      </div>

      {/* TSC Members Section */}
      <div className='mt-10 flex justify-center'>
        <Card
          type={CardType.SMALL}
          tagline='TSC'
          icon='🚀'
          heading='Meet the TSC Members'
          description='Get to know the people redefining AsyncAPI’s future.'
          bg='bg-white'
          link='/community/tsc'
        />
      </div>

      {/* Finance Section */}
      <div className='mt-10 flex justify-center'>
        <div className='m-5 w-full max-w-6xl rounded-lg bg-gray-100 p-8 shadow-md'>
          <Card
            type={CardType.SMALL}
            tagline='Finance'
            icon='💰'
            heading='Track Initiative Spending'
            description='See our budget breakdown and financial transparency report.'
            bg='bg-white'
            link='/finance'
          />
        </div>
      </div>

      <div className='mt-8 rounded-lg bg-dark py-12 md:mt-20' data-testid='CommunityCard-subscribe'>
        <NewsletterSubscribe dark />
      </div>
    </GenericLayout>
  );
}

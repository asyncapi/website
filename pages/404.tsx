import React from 'react';

import Button from '@/components/buttons/Button';
import AnnouncementHero from '@/components/campaigns/AnnouncementHero';
import Heading from '@/components/typography/Heading';

/**
 * @description The ErrorPage component is the 404 page of the application.
 */
export default function ErrorPage() {
  const image: string = '/img/illustrations/illustration.webp';

  return (
    <div className='text-center'>
      <div className='mt-20 flex-col items-center justify-center md:flex-row'>
        <div>
          <AnnouncementHero className='my-4' />
          <header className='mt-12 px-2 '>
            <div className='text-center'>
              <Heading className='mb-4  '>
                Oops, The page you are looking
                <span className='leading-12 block md:-mt-4'> for doesn&apos;t exist</span>
              </Heading>
            </div>
          </header>
        </div>
        <div>
          <img src={image} className='mx-auto w-52' alt='404 Error' />
        </div>
      </div>

      <div className='mt-8 text-center'>
        <Button className='text-xl' text='Return To Home' href='/' />
      </div>
    </div>
  );
}

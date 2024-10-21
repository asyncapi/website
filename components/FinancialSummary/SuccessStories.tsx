import React from 'react';

import { successStories } from '../data/successStoriesData';

/**
 * @description SuccessStories component displays success stories related to financial support.
 */
export default function SuccessStories() {
  return (
    <div className='bg-purple-100 px-4 sm:px-6 lg:px-8'>
      <div className='my-16 grid lg:grid-cols-9 lg:gap-8 lg:text-center'>
        <div className='col-span-7 col-start-2 my-12'>
          <div className='mx-2'>
            <h1 id='success-stories' className='m-3 text-center text-4xl font-bold'>
              Success Stories
            </h1>
            <p className='mx-auto my-3 max-w-4xl text-center text-lg text-darkGunMetal'>
              Thanks to financial support we can already see many
              <br className='hidden lg:inline-block' /> success stories in the project.
            </p>
          </div>
          <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {successStories.map((story, index) => (
              <div key={index} className='m-4 p-2'>
                <h1 className='mb-2 text-2xl font-semibold'>{story.title}</h1>
                <p className='text-base text-darkGunMetal'>{story.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

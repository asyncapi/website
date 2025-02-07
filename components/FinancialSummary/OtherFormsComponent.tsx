import React from 'react';

import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import { otherFormsData } from '../data/otherFormsData';
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';

/**
 * @description OtherFormsComponent displays other forms of financial support.
 */
export default function OtherFormsComponent() {
  return (
    <div className='bg-[#F5F5F5] px-4 sm:px-6 lg:px-8'>
      <div className='grid lg:grid-cols-9 lg:gap-8 lg:text-center'>
        <div className='col-span-7 col-start-2 my-12'>
          <div className='mx-2'>
            <Heading className='mx-3 mb-5 mt-10 text-center text-base'>Other Forms Of Financial Support</Heading>
            <Paragraph
              typeStyle={ParagraphTypeStyle.md}
              className='mx-auto mb-3 max-w-4xl text-center text-darkGunMetal'
            >
              You can also support AsyncAPI initiative by getting<br className='hidden lg:inline-block'></br> involved
              through employment, providing services and<br className='hidden lg:inline-block'></br> organizing events
            </Paragraph>
          </div>
          <div className='mx-3 mt-8 grid grid-cols-1 gap-10 md:grid-cols-3'>
            {otherFormsData.map((form, index) => (
              <div key={index} className='flex flex-col items-center rounded-md bg-white p-4 text-center shadow-md'>
                <img src={form.imageUrl} alt={form.title} className='m-2 h-auto w-1/3 object-cover' />
                <h2 className='my-2 text-2xl font-semibold'>{form.title}</h2>
                <p className='mx-2 mt-1 text-base text-darkGunMetal'>{form.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

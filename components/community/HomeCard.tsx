import React from 'react';

import { ButtonSize } from '@/types/components/buttons/ButtonPropsType';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';

import Button from '../buttons/Button';
import Heading from '../typography/Heading';

interface HomeCardProps {
  headline: string;
  title: string;
  description: string;
  btnText: string;
  link: string;
  className: string;
}

/**
 * @description This component displays Home Card.
 * @param {HomeCardProps} props - The props for Home Card component.
 * @param {string} props.headline - The headline for the home card.
 * @param {string} props.title - The title for the home card.
 * @param {string} props.description - The description for the home card.
 * @param {string} props.btnText - The text for the button in the home card.
 * @param {string} props.link - The link for the button in the home card.
 * @param {string} props.className - Additional CSS classes for styling..
 */
export default function HomeCards({ headline, title, description, btnText, link, className }: HomeCardProps) {
  return (
    <div className='z-40 mt-20 w-full rounded-lg bg-white shadow-xl md:flex md:h-130 md:justify-between'>
      <div className='flex h-auto w-full flex-col justify-between p-10 text-center md:w-2/5 md:text-left'>
        <div data-testid='HomeCard-main'>
          <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.md} textColor='text-purple-300'>
            {headline}
          </Heading>
        </div>
        <div data-testid='HomeCard-title'>
          <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.lg} className='mt-10'>
            {title}
          </Heading>
          <Heading
            level={HeadingLevel.h2}
            typeStyle={HeadingTypeStyle.bodyLg}
            textColor='text-gray-700'
            className='mt-10 text-slate-500'
          >
            {description}
          </Heading>
          <div className='mt-10' data-testid='HomeCard-button'>
            <Button text={btnText} buttonSize={ButtonSize.DEFAULT} href={link} />
          </div>
        </div>
      </div>
      <div className={`h-fit-content flex w-full justify-end rounded-r-lg bg-cover bg-center md:w-3/6 ${className}`} />
    </div>
  );
}

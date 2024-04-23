import Link from 'next/link';
import React from 'react';

import { CardType } from '@/types/components/community/CardPropsType';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import IconArrowUp from '../icons/ArrowUp';
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';

interface CardProps {
  icon: string;
  tagline: string;
  taglineBg?: string;
  type?: CardType;
  heading: string;
  description: string;
  bg: string;
  btnText?: string;
  btnBg?: string;
  link: string;
}

/**
 * @description This component displays Small Home Card.
 * @param {string} props.icon - The icon for the card.
 * @param {string} props.tagline - The tagline for the card.
 * @param {string} props.taglineBg - The background color for the tagline.
 * @param {CardType} props.type - The type of the card (either 'small' or 'large').
 * @param {string} props.heading - The heading for the card.
 * @param {string} props.description - The description for the card.
 * @param {string} props.bg - The background color for the card.
 * @param {string} props.btnText - The text for the button.
 * @param {string} props.btnBg - The background color for the button.
 * @param {string} props.link - The link for the button.
 */
export default function Card({
  icon,
  tagline,
  taglineBg = '',
  type = CardType.LARGE,
  heading,
  description,
  bg,
  btnText = '',
  btnBg = '',
  link
}: CardProps) {
  if (type === CardType.SMALL) {
    return (
      <Link href={link} target={link.includes('http') ? '_blank' : undefined}>
        <div
          className={`w-full cursor-pointer rounded border border-[#ad20e2] p-3 shadow-xl ${bg}`}
          data-testid='Card-small-bg'
        >
          <div className='flex w-min justify-between rounded-xl bg-gray-100 p-2 text-center text-xs'>
            <span>{icon}</span> <span className='ml-[5px]'>{tagline}</span>
          </div>
          <div className='mt-3' data-testid='Card-heading'>
            <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.md}>
              {heading}
            </Heading>
          </div>
          <div className='mt-2' data-testid='Card-desc'>
            <Paragraph textColor={bg === 'bg-white' ? 'text-gray-600' : 'text-black'} typeStyle={ParagraphTypeStyle.sm}>
              {description}
            </Paragraph>
          </div>
          <div className='flex w-full justify-end text-right' data-testid='Card-icon'>
            <IconArrowUp className='w-[20px]' />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div
      className={`h-140 w-full rounded border p-6 shadow-xl ${!bg && 'border-[#ad20e2]'} ${bg}`}
      data-testid='Card-lg-bg'
    >
      <div
        className={`flex w-min justify-between rounded-xl p-2 text-center text-xs text-black ${taglineBg}`}
        data-testid='Card-lg-tagline'
      >
        <span>{icon}</span> <span className='ml-[5px]'>{tagline}</span>
      </div>

      <div className='mt-10' data-testid='Card-heading-lg'>
        <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.lg} textColor={bg && 'text-white'}>
          {heading}
        </Heading>
      </div>
      <div className='mt-6' data-testid='Card-desc-lg'>
        <Paragraph textColor={bg && 'text-gray-400'}>{description}</Paragraph>
      </div>
      <div className='mt-10'>
        <Link href={link} data-testid='Card-link-lg'>
          <div className={`flex ${btnBg} cursor-pointer`}>
            <IconArrowUp className={`w-[20px] ${btnBg}`} /> <span className='ml-2 text-sm'>{btnText}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
